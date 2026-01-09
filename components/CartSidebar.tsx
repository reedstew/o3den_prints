'use client';

import { useShop } from '@/context/ShopContext';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

// REMOVED: Supabase client initialization (not needed here anymore)

export default function CartSidebar() {
    const { cart, isCartOpen, toggleCart, removeFromCart, cartTotal, clearCart } = useShop();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart,
                    total: cartTotal,
                    customer_email: email,
                }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Checkout failed');

            alert(`Order #${data.orderId} placed successfully! We will contact you at ${email}.`);
            clearCart();
            toggleCart();
            setEmail('');

        } catch (error) {
            // FIX: Proper error handling instead of 'any'
            let message = 'An unexpected error occurred';
            if (error instanceof Error) {
                message = error.message;
            }
            alert('Error: ' + message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleCart} />

            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-6 flex items-center justify-between border-b border-gray-100">
                    <h2 className="text-xl font-bold uppercase tracking-widest italic">Your Selection</h2>
                    <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                            <span className="text-4xl">👜</span>
                            <p className="text-xs uppercase tracking-widest">Cart is empty</p>
                            <button onClick={toggleCart} className="text-xs underline underline-offset-4 text-black">Return to Shop</button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative w-20 h-20 bg-gray-50 flex items-center justify-center text-3xl select-none rounded-sm overflow-hidden shrink-0">
                                    {(item.image.startsWith('/') || item.image.startsWith('http')) ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <span>{item.image}</span>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold uppercase tracking-tight text-sm pr-4 line-clamp-2">{item.name}</h3>
                                        <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-600 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-end mt-2">
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 bg-[#f8f8f8] border-t border-gray-200 space-y-6">
                        <div className="flex justify-between items-center text-lg font-bold uppercase tracking-tighter">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>

                        <form onSubmit={handleCheckout} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Contact Email</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white border border-gray-300 p-3 text-sm focus:outline-none focus:border-[#064e3b] transition-colors"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black text-white py-4 uppercase text-[10px] font-bold tracking-[0.25em] hover:bg-[#064e3b] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? 'Processing...' : 'Submit Enquiry'} <ArrowRight className="w-3 h-3" />
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}