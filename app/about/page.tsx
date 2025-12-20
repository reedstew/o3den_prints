import React from 'react';
import Image from 'next/image';
import { ArrowRight, Printer, Target, Shield, Zap } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white text-black">
            {/* Editorial Hero */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#f8f8f8]">
                <div className="absolute inset-0 z-0">
                    {/* Replace with a high-res shot of your 3D printing studio or a close-up of a model */}
                    <div className="w-full h-full bg-[url('/images/about-hero.jpg')] bg-cover bg-center grayscale opacity-20" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6 text-[#064e3b]">Established 2025</p>
                    <h1 className="text-6xl md:text-9xl font-light tracking-tighter leading-none mb-8">
                        The <span className="font-bold italic">Studio</span>
                    </h1>
                    <div className="w-24 h-px bg-[#064e3b] mx-auto mb-8"></div>
                    <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed tracking-tight">
                        O3Den is a creative collective specializing in high-fidelity 3D manufacturing and digital architectural design.
                    </p>
                </div>
            </section>

            {/* Vision Section - Split Layout */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
                    <div className="relative aspect-[4/5] bg-[#f8f8f8] overflow-hidden group">
                        {/* Placeholder for a high-end process photo */}
                        <div className="absolute inset-0 bg-[#064e3b] mix-blend-multiply opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
                        <Image
                            src="/images/process.jpg"
                            alt="Design Process"
                            fill
                            className="object-cover grayscale"
                        />
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold italic leading-none">Form meets <br/>Function.</h2>
                        <p className="text-lg font-light text-gray-700 leading-relaxed">
                            Our philosophy is rooted in the intersection of traditional aesthetics and modern additive manufacturing. We don't just print; we curate experiences through physical form.
                        </p>
                        <p className="text-gray-500 font-medium">
                            Every model in the O3Den collection undergoes rigorous testing for mechanical integrity and visual balance. We utilize custom resins and polymers to ensure a finish that rivals traditional craftsmanship.
                        </p>
                        <div className="pt-6">
                            <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] group">
                                Our Methodology
                                <span className="p-4 rounded-full border border-gray-200 group-hover:bg-[#064e3b] group-hover:text-white transition-all duration-500">
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values - Minimalist Grid */}
            <section className="py-32 bg-[#f8f8f8] px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#064e3b] mb-4">Values</h2>
                        <h3 className="text-4xl font-light italic">Standard of Excellence</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-16">
                        <ValueItem
                            icon={<Target className="w-6 h-6" />}
                            title="Precision"
                            desc="Micron-level accuracy in every mechanical gear and articulated joint we produce."
                        />
                        <ValueItem
                            icon={<Shield className="w-6 h-6" />}
                            title="Integrity"
                            desc="Proprietary materials designed for longevity, durability, and a premium tactile feel."
                        />
                        <ValueItem
                            icon={<Zap className="w-6 h-6" />}
                            title="Innovation"
                            desc="Constantly pushing the boundaries of what's possible in the consumer 3D space."
                        />
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="py-40 text-center px-6">
                <div className="max-w-4xl mx-auto border-t border-gray-100 pt-20">
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter italic mb-12">Elevate the <br/>Ordinary.</h2>
                    <a
                        href="/shop"
                        className="inline-block bg-black text-white px-12 py-5 uppercase text-[10px] font-bold tracking-[0.3em] hover:bg-[#064e3b] transition-colors duration-500"
                    >
                        Browse the 2025 Collection
                    </a>
                </div>
            </section>
        </div>
    );
}

function ValueItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="space-y-6">
            <div className="text-[#064e3b]">
                {icon}
            </div>
            <h4 className="text-xl font-bold uppercase tracking-tighter">{title}</h4>
            <p className="text-gray-500 font-medium leading-relaxed text-sm">
                {desc}
            </p>
        </div>
    );
}