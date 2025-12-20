import './globals.css';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import { ShoppingBag, Search, Menu } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="antialiased bg-white text-black selection:bg-[#064e3b] selection:text-white">
        <header className="sticky top-0 z-[100] w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
            <nav className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

                {/* --- BRAND IDENTITY WITH LOGO --- */}
                <div className="flex items-center gap-12">
                    <Link href="/" className="group flex items-center gap-4">
                        {/* THE LOGO IMAGE */}
                        <div className="relative w-18 h-18">
                            <Image
                                src="/logo.png" // Path to your logo in the public folder
                                alt="Flynn's Forge Logo"
                                fill
                                className="object-contain transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* THE BRAND TEXT */}
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-bold uppercase tracking-tighter italic text-black">
                                Flynn's
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#064e3b]">
                                Forge
                            </span>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        <Link href="/shop" className="hover:text-black transition-colors">Collections</Link>
                        <Link href="/about" className="hover:text-black transition-colors">The Forge</Link>
                        <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
                    </div>
                </div>
                {/* --- END BRAND IDENTITY --- */}

                {/* Utility Icons */}
                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-6 border-r border-gray-200 pr-6 mr-2">
                        <Search className="w-4 h-4 text-black cursor-pointer hover:text-[#064e3b] transition-colors" />
                    </div>

                    <Link href="/cart" className="group flex items-center gap-3">
                        <div className="relative">
                            <ShoppingBag className="w-5 h-5 text-black group-hover:text-[#064e3b] transition-colors" />
                            <span className="absolute -bottom-1 -right-1 bg-[#064e3b] text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                0
                            </span>
                        </div>
                        <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest text-black">
                            Bag
                        </span>
                    </Link>

                    <button className="md:hidden p-2">
                        <Menu className="w-6 h-6 text-black" />
                    </button>
                </div>
            </nav>
        </header>

        <main>{children}</main>

        <footer className="bg-white border-t border-gray-100 py-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="space-y-4">
                    <span className="text-xl font-bold uppercase italic tracking-tighter">Flynn's Forge</span>
                    <p className="text-[10px] font-medium text-gray-500 max-w-xs leading-relaxed uppercase tracking-widest">
                        High-fidelity 3D manufacturing & digital architectural design.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-20">
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#064e3b]">Inquiries</span>
                        <a href="mailto:studio@flynnsforge.com" className="text-sm font-light hover:underline decoration-1 underline-offset-4">studio@flynnsforge.com</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#064e3b]">Social</span>
                        <a href="#" className="text-sm font-light hover:underline decoration-1 underline-offset-4">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-50 flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-gray-400">
                <p>© {new Date().getFullYear()} Flynn's Forge</p>
                <p>Designed for Excellence</p>
            </div>
        </footer>
        </body>
        </html>
    );
}