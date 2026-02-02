'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react'; // Added X and ArrowRight
import { useShop } from '@/context/ShopContext';
import { useState } from 'react'; // Import useState

export default function Header() {
    const { toggleCart, cart } = useShop();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Calculate total item count
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="sticky top-0 z-[100] w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
            <nav className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

                {/* --- BRAND IDENTITY --- */}
                <div className="flex items-center gap-12">
                    <Link href="/" className="group flex items-center gap-4 z-[110] relative">
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

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-10 text-[16px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        <Link href="/shop" className="hover:text-black transition-colors">Collections</Link>
                        <Link href="/about" className="hover:text-black transition-colors">The Forge</Link>
                        <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
                    </div>
                </div>

                {/* --- UTILITIES --- */}
                <div className="flex items-center gap-6 z-[110] relative">
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

                    {/* MOBILE MENU TOGGLE */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 text-black" />
                        ) : (
                            <Menu className="w-6 h-6 text-black" />
                        )}
                    </button>
                </div>
            </nav>

            {/* --- MOBILE MENU OVERLAY --- */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-0 bg-white z-[100] pt-32 px-6 md:hidden animate-in slide-in-from-top-10 duration-200 h-screen overflow-y-auto">
                    <div className="flex flex-col space-y-8">
                        <MobileLink href="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                            Collections
                        </MobileLink>
                        <MobileLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                            The Forge
                        </MobileLink>
                        <MobileLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                            Contact
                        </MobileLink>

                        <div className="pt-8 border-t border-gray-100 mt-8 space-y-4">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Account</p>
                            <Link href="/login" className="flex items-center gap-2 text-sm font-medium">
                                Sign In <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

// Helper component for consistent mobile link styling
function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="text-4xl font-light tracking-tighter hover:text-[#064e3b] transition-colors flex items-center justify-between group"
        >
            {children}
            <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#064e3b]" />
        </Link>
    );
}