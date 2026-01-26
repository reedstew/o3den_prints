import './globals.css';
import type { Metadata } from 'next'; // <--- Import the type here
import { ShopProvider } from '@/context/ShopContext';
import Header from '@/components/Header';
import CartSidebar from '@/components/CartSidebar';

// Apply the type to the export
export const metadata: Metadata = {
    title: "Flynn's Forge | Precision 3D Manufacturing",
    description: 'High-fidelity 3D manufacturing & digital architectural design.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="antialiased bg-white text-black selection:bg-[#064e3b] selection:text-white">
        <ShopProvider>
            {/* The Header is now a separate component so it can read cart state */}
            <Header />

            {/* The Cart Sidebar sits here, ready to slide in */}
            <CartSidebar />

            <main>
                {children}
            </main>

            {/* Footer remains static here */}
            <footer className="bg-white border-t border-gray-100 py-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="space-y-4">
                        <span className="text-xl font-bold uppercase italic tracking-tighter">Flynn&apos;s Forge</span>
                        <p className="text-[10px] font-medium text-gray-500 max-w-xs leading-relaxed uppercase tracking-widest">
                            High-fidelity 3D printing.
                            <br/>
                            Local to Ogden, UT USA
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-20">
                        <div className="flex flex-col gap-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#064e3b]">Inquiries</span>
                            <a href="mailto:sales@flynnsforge.org" className="text-sm font-light hover:underline decoration-1 underline-offset-4">sales@flynnsforge.org</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#064e3b]">Social</span>
                            <a href="#" className="text-sm font-light hover:underline decoration-1 underline-offset-4">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-50 flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-gray-400">
                    <p>© {new Date().getFullYear()} Flynn&apos;s Forge</p>
                    <p>Designed for Excellence</p>
                </div>
            </footer>
        </ShopProvider>
        </body>
        </html>
    );
}