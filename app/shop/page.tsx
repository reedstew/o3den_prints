'use client';

import React, { useState } from 'react'; // Added useState
import Image from 'next/image';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react'; // Added Check icon
import { useShop } from '@/context/ShopContext';

// 1. Update the Color Interface
interface ProductColor {
    name: string;
    hex: string;
    hex2?: string;
    price?: number; // <--- Optional override price
    image?: string; // <--- Optional image change
}

interface Product {
    // ... (rest of interface remains the same)
    id: string;
    name: string;
    price: number; // Base price
    image: string;
    category: string;
    badge: string | null;
    rating: number;
    reviews: number;
    isNew: boolean;
    colors: ProductColor[];
}

// 2. Update Data with Price Overrides
const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Articulated Crystal Dragon',
        price: 6.99,
        image: '/products/dragon.jpeg', // Default image
        category: 'ANIMALS',
        badge: 'NEW',
        rating: 5,
        reviews: 12,
        isNew: true,
        colors: [
            { name: 'White', hex: '#fdf4e3'}, //, image: '/products/dragon_white.jpeg' }, // <--- Swaps to this
            { name: 'Obsidian', hex: '#1a1a1a' }, //, image: '/products/dragon_black.jpeg' },  // <--- Swaps to this
            { name: 'Rainbow', hex: '#4b369d', hex2: '#50A8B7', price: 8.99 }
        ]
    },
    {
        id: '2',
        name: 'Geometric Spinner',
        price: 9.20,
        image: '/products/gearspinner.png',
        category: 'SPACE',
        badge: 'NEW',
        rating: 5,
        reviews: 2,
        isNew: true,
        colors: [
            { name: 'Grey/Blue', hex: '#888888', hex2: '#57B9FF' }
        ]
    }
];

export default function UnifiedShop() {
    const newProducts = PRODUCTS.filter(p => p.isNew);
    const mainCatalog = PRODUCTS.filter(p => !p.isNew);

    return (
        <div className="min-h-screen bg-white">
            <section className="pt-32 pb-16 px-6 border-b border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-gray-400">Shop / Selected Works</p>
                    <h1 className="text-5xl md:text-8xl font-light tracking-tight leading-none text-black">
                        The <span className="font-bold italic">2026</span> Series
                    </h1>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-6 py-20">
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
    const { addToCart } = useShop();
    const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);

    // LOGIC: Use color image if available, else default
    const currentImage = selectedColor.image || product.image;
    const currentPrice = selectedColor.price || product.price;

    const handleAddToCart = () => {
        addToCart({
            id: `${product.id}-${selectedColor.name.replace(/\s+/g, '_')}`,
            productId: product.id,
            name: product.name,
            price: currentPrice,
            image: currentImage, // <--- Add the specific image to cart
            selectedColor: selectedColor.name
        });
    };

    return (
        <div className="bg-white p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 group transition-all duration-700">
            {/* DYNAMIC IMAGE SECTION */}
            <div className="w-full md:w-1/2 aspect-square relative transition-all duration-700 overflow-hidden">
                <Image
                    key={currentImage} // Key forces a nice fade animation when image changes
                    src={currentImage}
                    alt={`${product.name} - ${selectedColor.name}`}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-1000 animate-in fade-in duration-500"
                />
            </div>

            <div className="flex-1 space-y-8"> {/* Increased space-y for cleaner layout */}
                <div>
                    <p className="text-[9px] font-bold tracking-[0.2em] text-gray-400 mb-2">{product.category}</p>
                    <h3 className="text-3xl font-bold uppercase italic leading-tight text-black">{product.name}</h3>
                </div>

                {/* STABLE COLOR SELECTOR */}
                <div className="space-y-3">
                    {/* Fixed height text area prevents jumping */}
                    <div className="flex justify-between items-baseline h-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            Color: <span className="text-black">{selectedColor.name}</span>
                        </span>
                        {selectedColor.price && (
                            <span className="text-[9px] text-[#064e3b] font-bold uppercase tracking-widest">
                                Premium
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {product.colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setSelectedColor(color)}
                                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                                    selectedColor.name === color.name ? 'border-black scale-110' : 'border-transparent hover:scale-110'
                                }`}
                                style={{
                                    background: color.hex2
                                        ? `linear-gradient(135deg, ${color.hex} 50%, ${color.hex2} 50%)` // Split effect
                                        : color.hex
                                }}
                                title={`${color.name} ${color.price ? `($${color.price})` : ''}`}
                            >
                                {selectedColor.name === color.name && (
                                    <Check className="w-4 h-4 text-white drop-shadow-md" /> // Added shadow so it's visible on any color
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <p className="text-2xl font-light text-black tracking-tighter">
                    ${currentPrice.toFixed(2)}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="w-full bg-black text-white px-8 py-4 uppercase text-[10px] font-bold tracking-[0.2em] hover:bg-[#064e3b] transition-colors flex items-center justify-center gap-3"
                >
                    Add to Bag <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

function ShopProductCard({ product }: ProductProps) {
    const { addToCart } = useShop();
    const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);

    const currentImage = selectedColor.image || product.image;
    const currentPrice = selectedColor.price || product.price;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart({
            id: `${product.id}-${selectedColor.name.replace(/\s+/g, '_')}`,
            productId: product.id,
            name: product.name,
            price: currentPrice,
            image: currentImage,
            selectedColor: selectedColor.name
        });
    };

    return (
        <div className="group flex flex-col cursor-pointer">
            {/* DYNAMIC IMAGE */}
            <div className="relative aspect-[3/4] bg-[#f8f8f8] mb-6 overflow-hidden">
                {product.badge && (
                    <span className="absolute top-6 left-6 z-10 text-[9px] font-bold tracking-widest uppercase bg-black text-white px-3 py-1">
                        {product.badge}
                    </span>
                )}
                <Image
                    key={currentImage} // Trigger fade animation
                    src={currentImage}
                    alt={product.name}
                    fill
                    className="object-contain p-10 group-hover:scale-105 transition-transform duration-700 animate-in fade-in duration-300"
                />
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <p className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">{product.category}</p>
                        <h3 className="text-lg font-bold uppercase tracking-tighter text-black leading-none group-hover:underline decoration-1 underline-offset-4">
                            {product.name}
                        </h3>
                    </div>
                    <p className="text-lg font-light tracking-tighter text-black">
                        ${currentPrice.toFixed(2)}
                    </p>
                </div>

                {/* STABLE COLOR SELECTOR */}
                <div className="space-y-2">
                    {/* Fixed Height Text Container */}
                    <div className="h-4 flex items-center">
                        <span className="text-[9px] font-medium text-gray-400 uppercase tracking-widest">
                             {selectedColor.name}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={(e) => { e.stopPropagation(); setSelectedColor(color); }}
                                className={`w-4 h-4 rounded-full border transition-all ${
                                    selectedColor.name === color.name ? 'ring-1 ring-offset-2 ring-black' : 'border-gray-200 hover:scale-110'
                                }`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="w-full border border-black text-black px-8 py-3 uppercase text-[9px] font-bold tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300"
                >
                    Add to Bag
                </button>
            </div>
        </div>
    );
}