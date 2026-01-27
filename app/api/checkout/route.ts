import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// 1. UPDATE INTERFACE
interface CartItem {
    name: string;
    quantity: number;
    price: number;
    selectedColor?: string; // <--- Add this
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, total, customer_email } = body;

        const { data: order, error: dbError } = await supabase
            .from('orders')
            .insert([
                {
                    items,
                    total,
                    customer_email,
                    status: 'pending',
                },
            ])
            .select()
            .single();

        if (dbError) throw new Error(dbError.message);

        // 2. UPDATE EMAIL HTML GENERATION
        const itemsHtml = `
      <ul style="padding-left: 20px;">
        ${(items as CartItem[]).map((item) => `
          <li style="margin-bottom: 8px;">
            <strong>${item.quantity}x ${item.name}</strong> 
            ${item.selectedColor ? `<br/><span style="color: #666; font-size: 12px;">Color: ${item.selectedColor}</span>` : ''}
            <br/>
            Price: $${item.price.toFixed(2)}
          </li>
        `).join('')}
      </ul>
    `;

        await Promise.all([
            // Admin Email
            resend.emails.send({
                from: 'Stewy Service <service@stewy.me>',
                to: process.env.ADMIN_EMAIL!,
                subject: `New Order #${order.id} ($${Number(total).toFixed(2)})`,
                html: `
          <h1>New Order Received 🚀</h1>
          <p><strong>Customer:</strong> ${customer_email}</p>
          <p><strong>Total:</strong> $${Number(total).toFixed(2)}</p>
          <hr />
          <h3>Items:</h3>
          ${itemsHtml}
          <br />
          <a href="https://supabase.com/dashboard">View in Dashboard</a>
        `,
            }),

            // Customer Email
            resend.emails.send({
                from: 'Stewy Service <service@stewy.me>',
                to: customer_email,
                subject: `Order Confirmation #${order.id}`,
                html: `
          <h1>Thanks for your order! 🎉</h1>
          <p>We have received your order and are getting your prints ready.</p>
          <hr />
          <h3>Order Summary:</h3>
          ${itemsHtml}
          <p><strong>Total Paid:</strong> $${Number(total).toFixed(2)}</p>
          <br />
          <p>We will notify you when your items ship!</p>
          <p><em>- The Stewy Team</em></p>
        `,
            })
        ]);

        return NextResponse.json({ success: true, orderId: order.id });

    } catch (error: unknown) {
        let errorMessage = 'An unexpected error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}