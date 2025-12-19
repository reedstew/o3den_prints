import './globals.css';
import Link from 'next/link';
import { Printer, ShoppingCart, User, Search } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="antialiased bg-white text-gray-900">
        {/* Lego-Style Top Bar */}
        <header className="sticky top-0 z-[100] w-full">
            <div className="bg-[#ffcf00] h-1.5 w-full"></div> {/* Lego Yellow Stripe */}
            <nav className="bg-white border-b-2 border-gray-100 px-4 h-20">
                <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-[#d0021b] p-2 rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                                <Printer className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-2xl font-black uppercase tracking-tighter italic">O3Den</span>
                        </Link>
                        <div className="hidden md:flex gap-6 font-bold uppercase text-sm tracking-wide">
                            <Link href="/shop" className="hover:underline decoration-4 underline-offset-8">Shop</Link>
                            <Link href="/about" className="hover:underline decoration-4 underline-offset-8">About</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Search className="w-6 h-6 cursor-pointer hover:text-blue-600" />
                        <User className="w-6 h-6 cursor-pointer" />
                        <Link href="/cart" className="relative bg-white border-2 border-gray-200 p-2 rounded-full hover:bg-gray-50 transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-[#206db5] text-white text-[10px] font-bold px-1.5 rounded-full">0</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
        <main>{children}</main>
        </body>
        </html>
    );
}