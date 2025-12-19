import React from 'react';
import './globals.css'
import { ChevronRight } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Banner - Lego Blue Style */}
            <section className="bg-[#206db5] text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6 z-10">
                        <span className="inline-block bg-[#ffcf00] text-black font-black px-4 py-1 text-sm uppercase tracking-widest">
                            New Exclusive
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black uppercase italic leading-none">
                            Build Your <br /> Imagination
                        </h1>
                        <p className="text-xl font-medium max-w-lg">
                            Discover the latest 3D printed masterpieces. From articulated dragons to functional builds.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a href="/shop" className="bg-[#d0021b] hover:bg-[#b00217] text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none transition-all">
                                Shop Now <ChevronRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Placeholder for "Feature Build" Image */}
                    <div className="flex-1 relative">
                        <div className="w-full h-[400px] bg-white/10 rounded-3xl flex items-center justify-center text-9xl animate-bounce">
                            🐉
                        </div>
                        <div className="absolute bottom-4 right-4 bg-[#ffcf00] text-black p-4 rounded-lg font-black text-xl shadow-xl transform rotate-3">
                            325 PCS
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop by Category - The "Lego Tile" Look */}
            <section className="py-16 max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-4">
                    Shop by Category
                    <div className="h-1 bg-gray-200 flex-grow"></div>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {['Dragons', 'Mechanical', 'Decor', 'Custom'].map((cat) => (
                        <a key={cat} href={`/shop/${cat.toLowerCase()}`} className="group block text-center">
                            <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-5xl group-hover:bg-gray-200 transition-colors border-b-4 border-gray-300">
                                {cat === 'Dragons' ? '🐲' : cat === 'Mechanical' ? '⚙️' : cat === 'Decor' ? '🏺' : '🎨'}
                            </div>
                            <h3 className="mt-4 font-bold uppercase tracking-tight group-hover:underline decoration-2">{cat}</h3>
                        </a>
                    ))}
                </div>
            </section>

            {/* Featured Product Card */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <ProductCard name="Emerald Wyvern" price={45.99} image="🐉" />
                        <ProductCard name="Clockwork Heart" price={29.99} image="⚙️" />
                        <ProductCard name="Crystal Tower" price={19.99} image="🏰" isNew />
                    </div>
                </div>
            </section>
        </div>
    );
}

interface CardProps {
    name: string;
    price: number;
    image: string;
    isNew?: boolean;
}

function ProductCard({ name, price, image, isNew }: CardProps) {
    return (
        <div className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col">
            <div className="relative aspect-[4/5] bg-gray-100 flex items-center justify-center text-8xl">
                {isNew && (
                    <span className="absolute top-4 left-4 bg-[#ffcf00] text-black font-black text-xs px-2 py-1 uppercase italic">
                        New
                    </span>
                )}
                {image}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-black uppercase text-xl mb-2">{name}</h3>
                <p className="text-2xl font-bold mb-6">${price}</p>
                <button className="mt-auto w-full bg-[#ffcf00] hover:bg-[#e6bb00] text-black font-black py-3 rounded-md shadow-[0px_3px_0px_0px_#cc9900] active:translate-y-[2px] active:shadow-none transition-all uppercase text-sm tracking-widest">
                    Add to Bag
                </button>
            </div>
        </div>
    );
}