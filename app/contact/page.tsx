import React from 'react';
import Image from 'next/image';
import { ArrowRight, Printer, Target, Shield, Zap } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white text-black">
            {/* Editorial Hero */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#f8f8f8]">
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-[url('/images/forge-bg.jpg')] bg-cover bg-center grayscale opacity-20" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <span>Contact and payment details coming soon...</span>
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
