'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext'; // Import the hook

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    badge: string | null;
    rating: number;
    reviews: number;
    isNew: boolean;
}

const PRODUCTS: Product[] = [
    { id: '1', name: 'Articulated Crystal Dragon', price: 8.50, image: '/products/dragon.jpeg', category: 'ANIMALS', badge: 'NEW', rating: 5, reviews: 12, isNew: true },
    { id: '2', name: 'Geometric Spinner', price: 5.50, image: '/products/gearspinner.png', category: 'SPACE', badge: 'NEW', rating: 5, reviews: 2, isNew: true}
    // { id: '3', name: 'Custom Lithophane', price: 19.99, image: '/products/litho.jpeg', category: 'DECOR', badge: null, rating: 5, reviews: 24, isNew: false },
    // { id: '4', name: 'Emerald Wyvern', price: 45.99, image: '/products/wyvern.jpg', category: 'ANIMALS', badge: null, rating: 5, reviews: 15, isNew: false },
    // { id: '5', name: 'Space Explorer', price: 12.99, image: '/products/astronaut.png', category: 'SPACE', badge: 'POPULAR', rating: 5, reviews: 3, isNew: false },
    // { id: '6', name: 'Mechanical Gear Box', price: 39.99, image: '/products/mechgearbox.webp', category: 'TECHNIC', badge: null, rating: 4, reviews: 8, isNew: false }
];

export default function UnifiedShop() {
    const newProducts = PRODUCTS.filter(p => p.isNew);
    const mainCatalog = PRODUCTS.filter(p => !p.isNew);

    return (
        <div className="min-h-screen bg-white">
            {/* Minimalist Hero Branding */}
            <section className="pt-32 pb-16 px-6 border-b border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-gray-400">Shop / Selected Works</p>
                    <h1 className="text-5xl md:text-8xl font-light tracking-tight leading-none text-black">
                        The <span className="font-bold italic">2026</span> Series
                    </h1>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-6 py-20">
                {/* HIGH-END FEATURED SHELF */}
                <section className="mb-32">
                    <div className="flex items-center justify-between mb-12 border-b border-black pb-4">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black">Latest Releases</h2>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Featured ({newProducts.length})</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
                        {newProducts.map((product) => (
                            <FeaturedProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                {/* MAIN CATALOG GRID */}
                <section>
                    <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-4">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black">Entire Collection</h2>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Showing {mainCatalog.length} items</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                        {mainCatalog.map((product) => (
                            <ShopProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

interface ProductProps {
    product: Product;
}

function FeaturedProductCard({ product }: ProductProps) {
    const { addToCart } = useShop(); // Hook connection

    return (
        <div className="bg-white p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 group transition-all duration-700">
            <div className="w-full md:w-1/2 aspect-square relative transition-all duration-700 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-1000"
                />
            </div>
            <div className="flex-1 space-y-6">
                <div>
                    <p className="text-[9px] font-bold tracking-[0.2em] text-gray-400 mb-2">{product.category}</p>
                    <h3 className="text-3xl font-bold uppercase italic leading-tight text-black">{product.name}</h3>
                </div>
                <p className="text-2xl font-light text-black tracking-tighter">${product.price.toFixed(2)}</p>
                <button
                    onClick={() => addToCart({ ...product })}
                    className="w-full bg-black text-white px-8 py-4 uppercase text-[10px] font-bold tracking-[0.2em] hover:bg-[#064e3b] transition-colors flex items-center justify-center gap-3"
                >
                    Add to Bag <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

function ShopProductCard({ product }: ProductProps) {
    const { addToCart } = useShop(); // Hook connection

    return (
        <div className="group flex flex-col cursor-pointer">
            <div className="relative aspect-[3/4] bg-[#f8f8f8] mb-8 overflow-hidden">
                {product.badge && (
                    <span className="absolute top-6 left-6 z-10 text-[9px] font-bold tracking-widest uppercase bg-black text-white px-3 py-1">
                        {product.badge}
                    </span>
                )}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-10 group-hover:scale-105 transition-transform duration-700"
                />
            </div>

            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <p className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">{product.category}</p>
                    <h3 className="text-lg font-bold uppercase tracking-tighter text-black leading-none group-hover:underline decoration-1 underline-offset-4">
                        {product.name}
                    </h3>
                </div>
                <p className="text-lg font-light tracking-tighter text-black">${product.price.toFixed(2)}</p>
            </div>

            <button
                onClick={() => addToCart({ ...product })}
                className="mt-8 border border-black text-black px-8 py-3 uppercase text-[9px] font-bold tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300"
            >
                Add to Bag
            </button>
        </div>
    );
}