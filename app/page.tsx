import React from 'react';
import { ArrowRight, MoveRight} from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-[#064e3b] selection:text-white">
            {/* Minimalist Studio Hero */}
            <section className="relative min-h-[80vh] flex flex-col justify-center py-20 lg:py-32 overflow-hidden">
                {/* Added 'gap-12' (mobile) and 'lg:gap-24' (desktop) to separate video and text */}
                <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                    {/* Video Column (7 cols) */}
                    <div className="lg:col-span-7 relative">
                        <div className="absolute -inset-4 bg-gray-100 -z-10 translate-x-4 translate-y-4" />

                        <div className="relative w-full aspect-video bg-black overflow-hidden shadow-2xl group">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                                poster="/flynnprintingfreeze.jpeg"
                            >
                                <source src="/video/flynnprinting.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                    {/*        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-3 border border-white/20 shadow-lg flex items-center gap-3">*/}
                    {/*            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />*/}
                    {/*            <span className="text-[9px] font-bold uppercase tracking-widest text-black">*/}
                    {/*    Live Production*/}
                    {/*</span>*/}
                    {/*        </div>*/}
                        </div>
                    </div>

                    {/* Text Column (5 cols) */}
                    {/* Added 'lg:pl-6' for extra buffer on large screens */}
                    <div className="lg:col-span-5 space-y-10 z-10 relative lg:pl-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="h-px w-8 bg-[#064e3b]"></span>
                                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-[#064e3b]">
                        Showcase / 2026
                    </span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.9]">
                                Precision <br />
                                <span className="font-bold italic">In Motion.</span>
                            </h1>
                        </div>

                        <p className="text-lg md:text-xl font-light max-w-md leading-relaxed tracking-tight text-gray-600 border-l border-gray-200 pl-6">
                            Experience the intersection of digital architectural design and high-fidelity 3D manufacturing.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <a href="/shop" className="group bg-black text-white px-10 py-5 uppercase text-[10px] font-bold tracking-[0.3em] flex items-center gap-4 hover:bg-[#064e3b] transition-all duration-500">
                                View Collection <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/*/!* Curated Categories *!/*/}
            {/*<section className="py-24 max-w-7xl mx-auto px-6 border-t border-gray-100">*/}
            {/*    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">*/}
            {/*        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter italic">*/}
            {/*            Curated <br /> Categories*/}
            {/*        </h2>*/}
            {/*        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">01 — Specialized Series</p>*/}
            {/*    </div>*/}

            {/*    <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200">*/}
            {/*        {['Animals', 'Technic', 'Decor', 'Custom'].map((cat) => (*/}
            {/*            <a key={cat} href={`/shop/${cat.toLowerCase()}`} className="group relative bg-white aspect-[3/4] flex flex-col items-center justify-center p-8 overflow-hidden hover:z-10 transition-all">*/}
            {/*                <div className="absolute inset-0 bg-[#064e3b] opacity-0 group-hover:opacity-100 transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100" />*/}
            {/*                <div className="text-6xl mb-6 relative z-10 group-hover:scale-125 transition-transform duration-500 grayscale group-hover:grayscale-0">*/}
            {/*                    {cat === 'Animals' ? '🐲' : cat === 'Technic' ? '⚙️' : cat === 'Decor' ? '🏺' : '🎨'}*/}
            {/*                </div>*/}
            {/*                <h3 className="relative z-10 font-bold uppercase text-[10px] tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">*/}
            {/*                    {cat}*/}
            {/*                </h3>*/}
            {/*            </a>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/*/!* Featured Selection Grid *!/*/}
            {/*<section className="py-32 bg-[#f8f8f8]">*/}
            {/*    <div className="max-w-7xl mx-auto px-6">*/}
            {/*        <div className="flex justify-between items-center mb-12">*/}
            {/*            <h3 className="text-2xl font-light tracking-tight">Recent Prints</h3>*/}
            {/*            <a href="/shop" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-[#064e3b] hover:border-[#064e3b] transition-colors">View All</a>*/}
            {/*        </div>*/}
            {/*        <div className="grid md:grid-cols-3 gap-12">*/}
            {/*            <ProductCard name="Emerald Wyvern" price={45.99} image="🐉" category="COLLECTION 01" />*/}
            {/*            <ProductCard name="Clockwork Heart" price={29.99} image="⚙️" category="TECHNIC" />*/}
            {/*            <ProductCard name="Crystal Tower" price={19.99} image="🏰" category="DECOR" isNew />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
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
            <div className="relative aspect-[4/5] bg-white overflow-hidden flex items-center justify-center text-8xl grayscale group-hover:grayscale-0 transition-all duration-700 shadow-sm hover:shadow-xl">
                {isNew && (
                    <span className="absolute top-6 left-6 z-10 bg-[#064e3b] text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest">
                        New
                    </span>
                )}
                <div className="group-hover:scale-110 transition-transform duration-700">
                    {image}
                </div>
                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest">Quick View</span>
                    <ArrowRight className="w-3 h-3" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[9px] font-bold tracking-[0.2em] text-gray-400 mb-1 uppercase">{category}</p>
                        <h3 className="text-xl font-bold uppercase tracking-tighter text-black leading-none group-hover:text-[#064e3b] transition-colors italic">
                            {name}
                        </h3>
                    </div>
                    <p className="text-xl font-light tracking-tighter text-black">${price}</p>
                </div>
            </div>
        </div>
    );
}