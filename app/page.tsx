import React from 'react';
import Image from 'next/image';
import { ArrowRight, MoveRight } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white text-black">
            {/* Minimalist Studio Hero */}
            <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 items-center gap-16">
                    <div className="space-y-10 z-10">
                        <div className="space-y-4">
                            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-[#064e3b]">
                                Selected Works / 2025
                            </span>
                            <h1 className="text-6xl md:text-9xl font-light tracking-tighter leading-[0.85]">
                                Precision <br />
                                <span className="font-bold italic">Manufactured.</span>
                            </h1>
                        </div>

                        <p className="text-xl md:text-2xl font-light max-w-md leading-relaxed tracking-tight text-gray-600">
                            The intersection of digital architectural design and high-fidelity 3D manufacturing.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <a href="/shop" className="group bg-black text-white px-10 py-5 uppercase text-[10px] font-bold tracking-[0.3em] flex items-center gap-4 hover:bg-[#064e3b] transition-all duration-500">
                                Explore Collection <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* High-End Feature Visual */}
                    <div className="relative aspect-[4/5] md:aspect-square bg-[#f8f8f8] overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-[15rem] grayscale opacity-10 font-bold italic select-none">
                            O3D
                        </div>
                        {/* Replace with a professional render of your top product */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-9xl group-hover:scale-110 transition-transform duration-700">🐉</span>
                        </div>
                        <div className="absolute bottom-10 right-10 bg-white border border-gray-100 p-6 shadow-xl backdrop-blur-sm">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#064e3b] mb-1">Price Point</p>
                            <p className="text-3xl font-light tracking-tighter">$9.99</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Curated Categories */}
            <section className="py-32 max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic">
                        Curated <br /> Categories
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">01 — Specialized Series</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
                    {['Animals', 'Technic', 'Decor', 'Custom'].map((cat) => (
                        <a key={cat} href={`/shop/${cat.toLowerCase()}`} className="group relative bg-white aspect-[3/4] flex flex-col items-center justify-center p-8 overflow-hidden">
                            <div className="absolute inset-0 bg-[#064e3b] opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-full group-hover:translate-y-0" />
                            <div className="text-6xl mb-6 relative z-10 group-hover:scale-125 transition-transform duration-500 grayscale group-hover:grayscale-0">
                                {cat === 'Animals' ? '🐲' : cat === 'Technic' ? '⚙️' : cat === 'Decor' ? '🏺' : '🎨'}
                            </div>
                            <h3 className="relative z-10 font-bold uppercase text-[10px] tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">
                                {cat}
                            </h3>
                        </a>
                    ))}
                </div>
            </section>

            {/* Featured Selection Grid */}
            <section className="py-32 bg-[#f8f8f8]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-16">
                        <ProductCard name="Emerald Wyvern" price={45.99} image="🐉" category="COLLECTION 01" />
                        <ProductCard name="Clockwork Heart" price={29.99} image="⚙️" category="TECHNIC" />
                        <ProductCard name="Crystal Tower" price={19.99} image="🏰" category="DECOR" isNew />
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
    category: string;
    isNew?: boolean;
}

function ProductCard({ name, price, image, category, isNew }: CardProps) {
    return (
        <div className="group flex flex-col space-y-6">
            <div className="relative aspect-[4/5] bg-white overflow-hidden flex items-center justify-center text-8xl grayscale group-hover:grayscale-0 transition-all duration-700">
                {isNew && (
                    <span className="absolute top-6 left-6 z-10 bg-[#064e3b] text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest">
                        New
                    </span>
                )}
                <div className="group-hover:scale-110 transition-transform duration-700">
                    {image}
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[9px] font-bold tracking-[0.2em] text-gray-400 mb-1 uppercase">{category}</p>
                        <h3 className="text-xl font-bold uppercase tracking-tighter text-black leading-none group-hover:underline decoration-1 underline-offset-4 italic">
                            {name}
                        </h3>
                    </div>
                    <p className="text-xl font-light tracking-tighter text-black">${price}</p>
                </div>
                <button className="w-full mt-4 border border-black text-black px-8 py-3 uppercase text-[9px] font-bold tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-500 flex items-center justify-center gap-2">
                    Enquire <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}