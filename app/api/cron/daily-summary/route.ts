import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// 1. Define Types (This fixes the 'no-explicit-any' error)
interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: number;
    created_at: string;
    customer_email: string;
    total: number;
    items: OrderItem[]; // We explicitly tell TS that 'items' is a list of OrderItem
}

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { data: rawOrders, error } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', yesterday.toISOString());

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    if (!rawOrders || rawOrders.length === 0) {
        return NextResponse.json({ message: 'No orders today.' });
    }

    // Cast the raw data to our strict Type
    // This tells TypeScript: "Trust me, the JSON in the DB matches this structure"
    const orders = rawOrders as unknown as Order[];

    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    const emailHtml = `
    <h1>Daily Forge Report ⚒️</h1>
    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
    <p><strong>Total Orders:</strong> ${orders.length}</p>
    <p><strong>Total Revenue:</strong> $${totalRevenue.toFixed(2)}</p>
    <hr />
    ${orders.map(order => `
      <div style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
        <p><strong>Order #${order.id}</strong> (${new Date(order.created_at).toLocaleTimeString()})</p>
        <p>Customer: ${order.customer_email}</p>
        <p>Items:</p>
        <ul>
          ${order.items.map((item) => `
            <li>${item.quantity}x ${item.name} ($${item.price})</li>
          `).join('')}
        </ul>
        <p><strong>Total: $${order.total}</strong></p>
      </div>
    `).join('')}
  `;

    await resend.emails.send({
        from: 'Flynn\'s Forge <3d_prints@stewy.me>',
        to: process.env.ADMIN_EMAIL!,
        subject: `Daily Order Summary (${orders.length} orders)`,
        html: emailHtml,
    });

    return NextResponse.json({ success: true, count: orders.length });
}