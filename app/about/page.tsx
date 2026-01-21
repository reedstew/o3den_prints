import React from 'react';
import Image from 'next/image';
import { ArrowRight, Printer, Target, Shield, Zap } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white text-black">
            {/* Editorial Hero */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#f8f8f8]">
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-[url('/images/forge-bg.jpg')] bg-cover bg-center grayscale opacity-20" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6 text-[#064e3b]">Established 2025</p>
                    <h1 className="text-6xl md:text-9xl font-light tracking-tighter leading-none mb-8">
                        The <span className="font-bold italic">Forge</span>
                    </h1>
                    <div className="w-24 h-px bg-[#064e3b] mx-auto mb-8"></div>
                    <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed tracking-tight">
                        Flynn&apos;s Forge is where imagination takes physical form through high-precision 3D printing and local craftsmanship.
                    </p>
                </div>
            </section>

            {/* Vision Section - Split Layout */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
                    <div className="relative aspect-[4/5] bg-[#f8f8f8] overflow-hidden group">
                        <div className="absolute inset-0 bg-[#064e3b] mix-blend-multiply opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
                        <Image
                            src="/images/flynn-working.jpg" 
                            alt="The Maker at Work"
                            fill
                            className="object-cover grayscale"
                        />
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold italic leading-none">Built with <br/>Purpose.</h2>
                        <p className="text-lg font-light text-gray-700 leading-relaxed">
                            Founded by an 11-year-old maker with a passion for engineering, Flynn’s Forge started with a single printer and a big idea: to create high-quality, custom gear for the local community.
                        </p>
                        <p className="text-gray-500 font-medium">
                            Every item that leaves the Forge is personally inspected for quality. We don’t just hit print; we carefully calibrate every layer to ensure that every dragon, tool, or custom part is built to last.
                        </p>
                        <div className="pt-6">
                            <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] group">
                                The Process
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
                        <h3 className="text-4xl font-light italic">The Maker&apos;s Code</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-16">
                        <ValueItem
                            icon={<Printer className="w-6 h-6" />}
                            title="Detail"
                            desc="We focus on layer-height precision to ensure smooth finishes and working mechanical parts."
                        />
                        <ValueItem
                            icon={<Shield className="w-6 h-6" />}
                            title="Quality"
                            desc="We use premium, eco-friendly filaments that are tested for strength and vibrant color."
                        />
                        <ValueItem
                            icon={<Zap className="w-6 h-6" />}
                            title="Speed"
                            desc="Local means fast. We pride ourselves on quick turnaround times for our local customers."
                        />
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="py-40 text-center px-6">
                <div className="max-w-4xl mx-auto border-t border-gray-100 pt-20">
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter italic mb-12">Dream in <br/>3D.</h2>
                    <a
                        href="/shop"
                        className="inline-block bg-black text-white px-12 py-5 uppercase text-[10px] font-bold tracking-[0.3em] hover:bg-[#064e3b] transition-colors duration-500"
                    >
                        Explore the Forge
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
