import React from 'react';
import Image from 'next/image';
import { Box, Layers, Cpu, Hammer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProcessPage() {
    return (
        <div className="min-h-screen bg-white text-black selection:bg-[#064e3b] selection:text-white">

            {/* Minimal Header */}
            <nav className="fixed top-0 left-0 w-full p-6 z-50 mix-blend-difference text-white">
                <Link href="/" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
                    <ArrowLeft className="w-4 h-4" /> Back to Forge
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 border-b border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="h-px w-12 bg-[#064e3b]"></span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#064e3b]">
                            Methodology
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-9xl font-light tracking-tighter leading-none mb-12">
                        Pixels to <br />
                        <span className="font-bold italic">Plastic.</span>
                    </h1>
                    <p className="max-w-xl text-xl font-light text-gray-600 leading-relaxed border-l border-gray-200 pl-6">
                        3D printing is "additive manufacturing." Unlike sculpting, which subtracts material, we build objects layer by layer from the ground up.
                    </p>
                </div>
            </section>

            {/* The Steps - Vertical Timeline */}
            <section className="relative py-32 px-6">
                <div className="max-w-5xl mx-auto space-y-40">

                    {/* Step 01: Design */}
                    <ProcessStep
                        number="01"
                        title="The Blueprint"
                        subtitle="CAD Modeling"
                        description="Everything starts as a digital mesh. We use advanced CAD software to sculpt geometry in a virtual space, defining every curve, edge, and tolerance before a single ounce of plastic is used."
                        icon={<Box className="w-6 h-6" />}
                        image="/process/dragonethereal.gif" // Placeholder for a screenshot of 3D software
                    />

                    {/* Step 02: Slicing */}
                    <ProcessStep
                        number="02"
                        title="The Translation"
                        subtitle="Slicing & G-Code"
                        description="The 3D model is fed into a 'Slicer.' This software cuts the model into thousands of paper-thin horizontal layers and generates a path for the printer nozzle to follow (G-Code)."
                        icon={<Layers className="w-6 h-6" />}
                        video="/process/slicing.mp4"
                    />

                    {/* Step 03: Printing */}
                    <ProcessStep
                        number="03"
                        title="The Fabrication"
                        subtitle="Fused Deposition Modeling"
                        description="The printer heats eco-friendly PLA filament to 210°C. It extrudes this molten plastic through a 0.4mm nozzle, drawing the object layer by layer. Each layer fuses to the one below it instantly."
                        icon={<Cpu className="w-6 h-6" />}
                        video="/process/printing.mp4"
                        isRightAligned
                    />

                    {/* Step 04: Finishing */}
                    <ProcessStep
                        number="04"
                        title="The Finish"
                        subtitle="Post-Processing"
                        description="Once the print cools, it's removed from the build plate. We hand-remove any support structures, sand down rough edges, and inspect the structural integrity of the part."
                        icon={<Hammer className="w-6 h-6" />}
                        video="/process/finishing.mp4"
                    />

                </div>
            </section>

            {/* Footer CTA */}
            <section className="bg-[#f8f8f8] py-32 text-center px-6">
                <h2 className="text-4xl font-bold italic tracking-tight mb-8">Seen enough?</h2>
                <Link href="/shop" className="inline-block bg-[#064e3b] text-white px-10 py-4 uppercase text-[10px] font-bold tracking-[0.3em] hover:bg-black transition-colors duration-500">
                    Visit the Shop
                </Link>
            </section>
        </div>
    );
}

// Reusable Step Component
function ProcessStep({ number, title, subtitle, description, icon, image, video, isRightAligned = false }: any) {
    return (
        <div className={`grid md:grid-cols-2 gap-12 items-center ${isRightAligned ? 'md:flex-row-reverse' : ''}`}>

            {/* Text Side */}
            <div className={`space-y-6 ${isRightAligned ? 'md:order-2' : ''}`}>
                <div className="flex items-center gap-4 text-[#064e3b]">
                    {icon}
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{subtitle}</span>
                </div>

                <h2 className="text-6xl font-light text-gray-200">{number}</h2>
                <h3 className="text-4xl font-bold italic tracking-tight">{title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{description}</p>
            </div>

            {/* Visual Side */}
            <div className={`relative aspect-square bg-gray-100 group overflow-hidden ${isRightAligned ? 'md:order-1' : ''}`}>
                {/* Background Number */}
                <span className="absolute -bottom-10 -right-10 text-[200px] font-bold text-white leading-none select-none z-0">
                    {number}
                </span>

                {/* LOGIC: Video > Image > Placeholder */}
                {video ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-10"
                    >
                        <source src={video} type="video/mp4" />
                    </video>
                ) : image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover z-10 transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-gray-200 z-10 opacity-80" />
                )}
            </div>
        </div>
    );
}