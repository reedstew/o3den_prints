'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function Header() {
    const { toggleCart, cart } = useShop();

    // Calculate total item count
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="sticky top-0 z-[100] w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
            <nav className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

                {/* --- BRAND IDENTITY --- */}
                <div className="flex items-center gap-12">
                    <Link href="/" className="group flex items-center gap-4">
                        <div className="relative w-12 h-12 md:w-16 md:h-16">
                            {/* Ensure width/height matches your actual logo ratio */}
                            <Image
                                src="/logo.png"
                                alt="Flynn's Forge Logo"
                                fill
                                className="object-contain transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-xl md:text-2xl font-bold uppercase tracking-tighter italic text-black">
                                Flynn&apos;s
                            </span>
                            <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] text-[#064e3b]">
                                Forge
                            </span>
                        </div>
                    </Link>

                    <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        <Link href="/shop" className="hover:text-black transition-colors">Collections</Link>
                        <Link href="/about" className="hover:text-black transition-colors">The Forge</Link>
                        <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
                    </div>
                </div>

                {/* --- UTILITIES --- */}
                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-6 border-r border-gray-200 pr-6 mr-2">
                        <Search className="w-4 h-4 text-black cursor-pointer hover:text-[#064e3b] transition-colors" />
                    </div>

                    {/* DYNAMIC CART BUTTON */}
                    <button onClick={toggleCart} className="group flex items-center gap-3">
                        <div className="relative">
                            <ShoppingBag className="w-5 h-5 text-black group-hover:text-[#064e3b] transition-colors" />
                            {itemCount > 0 && (
                                <span className="absolute -bottom-1 -right-1 bg-[#064e3b] text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in">
                                    {itemCount}
                                </span>
                            )}
                        </div>
                        <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest text-black group-hover:text-[#064e3b] transition-colors">
                            Bag
                        </span>
                    </button>

                    <button className="md:hidden p-2">
                        <Menu className="w-6 h-6 text-black" />
                    </button>
                </div>
            </nav>
        </header>
    );
}