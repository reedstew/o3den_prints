import React from 'react';
import { Printer, Zap, Heart, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-[#206db5] py-20 text-white overflow-hidden relative">
                {/* Decorative Brick Pattern (Optional Visual) */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="grid grid-cols-8 gap-4 p-4">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="w-12 h-12 border-4 border-white rounded-full" />
                        ))}
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6">
                        Build Your World
                    </h1>
                    <p className="text-xl md:text-2xl font-bold leading-relaxed">
                        At O3Den Prints, we believe that every great idea starts with a single block.
                        We turn digital dreams into physical reality, one layer at a time.
                    </p>
                </div>
            </section>

            {/* Our Story - Grid Layout */}
            <section className="py-20 max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="brick-card p-2 bg-[#ffcf00] rotate-1">
                        <div className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center text-8xl">
                            🏗️
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="lego-header text-4xl italic">The Story Behind the Prints</h2>
                        <p className="text-gray-900 font-bold leading-relaxed">
                            O3Den Prints started in a small workshop with one printer and a massive imagination.
                            Our goal was simple: to create 3D models that weren&apos;t just &quot;prints&quot; but
                            high-quality pieces of art that you can build, play with, and display.
                        </p>
                        <p className="text-gray-700">
                            Today, we specialize in articulated creatures, complex mechanical builds,
                            and custom home decor. Every model is tested across dozens of machines to
                            ensure that when you hit &quot;print&quot; it works perfectly every time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values - Modular Grid */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="lego-header text-4xl mb-12 text-center">Our Core Pillars</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ValueCard
                            icon={<Zap className="w-8 h-8 text-white" />}
                            title="Precision"
                            color="bg-[#d0021b]"
                            desc="We obsess over tolerances. Our mechanical builds click together like perfect bricks."
                        />
                        <ValueCard
                            icon={<Heart className="w-8 h-8 text-white" />}
                            title="Creativity"
                            color="bg-[#206db5]"
                            desc="We don't just follow trends; we design unique models you won't find anywhere else."
                        />
                        <ValueCard
                            icon={<ShieldCheck className="w-8 h-8 text-white" />}
                            title="Quality"
                            color="bg-[#008542]"
                            desc="Strength matters. We optimize our STL files for maximum durability and detail."
                        />
                        <ValueCard
                            icon={<Printer className="w-8 h-8 text-white" />}
                            title="Community"
                            color="bg-[#ffcf00]"
                            desc="Join thousands of builders worldwide. We love seeing what you create with our files!"
                            darkText
                        />
                    </div>
                </div>
            </section>

            {/* Join the Build CTA */}
            <section className="py-20 text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="lego-header text-4xl mb-6">Ready to start?</h2>
                    <p className="text-gray-700 font-bold mb-8 uppercase tracking-tight">
                        Explore our latest catalog and find your next project.
                    </p>
                    <a href="/shop" className="btn-brick inline-block bg-[#ffcf00] text-black px-12 py-5 text-xl font-black">
                        Back to the Shop
                    </a>
                </div>
            </section>
        </div>
    );
}

interface ValueCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    color: string;
    darkText?: boolean;
}

function ValueCard({ icon, title, desc, color, darkText }: ValueCardProps) {
    return (
        <div className="brick-card flex flex-col items-start p-8 group">
            <div className={`${color} p-4 rounded-xl mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] group-hover:-rotate-6 transition-transform`}>
                {icon}
            </div>
            <h3 className="lego-header text-2xl mb-4">{title}</h3>
            <p className={`font-bold leading-snug ${darkText ? 'text-gray-900' : 'text-gray-700'}`}>
                {desc}
            </p>
        </div>
    );
}