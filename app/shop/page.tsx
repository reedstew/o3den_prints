'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Package, PackageOpen, X, ZoomIn } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

// ─── Interfaces ────────────────────────────────────────────────────────────────

interface BulkTier {
    qty: number;
    price: number;
    label: string;
    badge?: string;
}

interface ProductColor {
    name: string;
    hex: string;
    hex2?: string;
    price?: number;
    image?: string;
    images?: string[];
}

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    images?: string[];
    category: string;
    badge: string | null;
    rating: number;
    reviews: number;
    isNew: boolean;
    colors: ProductColor[];
    bulkTiers?: BulkTier[];
}

// ─── Helper ────────────────────────────────────────────────────────────────────

function getImages(product: Product, color: ProductColor): string[] {
    if (color.images && color.images.length > 0) return color.images;
    if (color.image) return [color.image];
    if (product.images && product.images.length > 0) return product.images;
    return [product.image];
}

// ─── Products Data ─────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Articulated Crystal Dragon',
        price: 6.99,
        image: '/products/dragon.jpeg',
        category: 'ANIMALS',
        badge: 'ADVENTURE',
        rating: 5,
        reviews: 12,
        isNew: false,
        colors: [
            { name: 'White', hex: '#fdf4e3' },
            { name: 'Obsidian', hex: '#1a1a1a' },
            { name: 'Rainbow', hex: '#4b369d', hex2: '#50A8B7', price: 8.99 }
        ]
    },
    {
        id: '2',
        name: 'Geometric Spinner',
        price: 9.20,
        image: '/products/gearspinner.png',
        category: 'SPACE',
        badge: 'FIDGET',
        rating: 5,
        reviews: 2,
        isNew: false,
        colors: [
            { name: 'Grey/Blue', hex: '#888888', hex2: '#57B9FF' }
        ]
    },
    {
        id: '3',
        name: 'Mini Christus Statue',
        price: 2.75,
        image: '/products/ChristusStatues.jpg',
        category: 'RELIGIOUS',
        badge: 'SALE',
        rating: 5,
        reviews: 0,
        isNew: true,
        colors: [
            { name: 'Marble', hex: '#c8c0b4', hex2: '#e8e0d4' },
            { name: 'White Matte', hex: '#f0ede8' },
            { name: 'Glossy White', hex: '#ffffff' }
        ],
        bulkTiers: [
            { qty: 1,  price: 2.75,  label: 'Single' },
            { qty: 30, price: 75.00, label: 'Case of 30', badge: 'Best Value' }
        ]
    },
    {
        id: '4',
        name: 'The Empty Tomb',
        price: 7.50,
        image: '/products/JesusTomb.jpg',
        images: ['/products/JesusTomb.jpg', '/products/Jesus(tomb).jpg', '/products/Tomb.jpg', '/products/TombRock.jpg'],
        category: 'EASTER',
        badge: 'NEW',
        rating: 5,
        reviews: 1,
        isNew: true,
        colors: [
            { name: 'White/Rock', hex: '#fdf4e3', hex2: '#a4a4a4' }
        ]
    }
];

// ─── Page ──────────────────────────────────────────────────────────────────────

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

            <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">
                {/* LATEST RELEASES */}
                {newProducts.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-12 border-b border-black pb-4">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black">Latest Releases</h2>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Featured ({newProducts.length})</span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
                            {newProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                )}

                {/* ENTIRE COLLECTION */}
                {mainCatalog.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-4">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black">Entire Collection</h2>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Showing {mainCatalog.length} items</span>
                        </div>

                        {/* Now using the exact same grid layout and card component */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
                            {mainCatalog.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

interface ProductProps {
    product: Product;
}

// ─── Image Carousel ────────────────────────────────────────────────────────────

interface ImageCarouselProps {
    images: string[];
    alt: string;
    variant?: 'featured' | 'compact';
    className?: string;
}

function ImageCarousel({ images, alt, variant = 'featured', className = '' }: ImageCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false); // Tracks if lightbox is open

    const prev = (e: React.MouseEvent) => { e.stopPropagation(); setActiveIndex(i => (i - 1 + images.length) % images.length); };
    const next = (e: React.MouseEvent) => { e.stopPropagation(); setActiveIndex(i => (i + 1) % images.length); };

    const hasMultiple = images.length > 1;

    return (
        <>
            {/* INLINE CAROUSEL */}
            <div className={`flex flex-col gap-3 ${className}`}>
                <div
                    className="relative w-full aspect-square overflow-hidden group/img cursor-zoom-in bg-[#f8f8f8]"
                    onClick={() => setIsExpanded(true)}
                >
                    {/* Hover Zoom Icon Hint */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm">
                            <ZoomIn className="w-4 h-4 text-black" />
                        </div>
                    </div>

                    <Image
                        key={images[activeIndex]}
                        src={images[activeIndex]}
                        alt={`${alt} — view ${activeIndex + 1}`}
                        fill
                        className="object-contain p-4 transition-all duration-500 animate-in fade-in group-hover/img:scale-105 duration-700"
                    />

                    {hasMultiple && variant === 'featured' && (
                        <>
                            <button onClick={prev} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 hover:bg-white">
                                <ChevronLeft className="w-4 h-4 text-black" />
                            </button>
                            <button onClick={next} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 hover:bg-white">
                                <ChevronRight className="w-4 h-4 text-black" />
                            </button>
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                {images.map((_, i) => (
                                    <button key={i} onClick={e => { e.stopPropagation(); setActiveIndex(i); }} className={`rounded-full transition-all duration-200 ${i === activeIndex ? 'w-4 h-1.5 bg-black' : 'w-1.5 h-1.5 bg-black/30 hover:bg-black/60'}`} aria-label={`View image ${i + 1}`} />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {hasMultiple && (
                    <div className={`flex gap-2 ${variant === 'compact' ? 'justify-start' : 'justify-center'}`}>
                        {images.map((src, i) => (
                            <button key={src} onClick={e => { e.stopPropagation(); setActiveIndex(i); }} aria-label={`Select image ${i + 1}`} className={`relative flex-shrink-0 overflow-hidden border transition-all duration-200 ${variant === 'compact' ? 'w-12 h-12' : 'w-16 h-16'} ${i === activeIndex ? 'border-black ring-1 ring-black ring-offset-1' : 'border-gray-200 hover:border-gray-400 opacity-60 hover:opacity-100'}`}>
                                <Image src={src} alt={`${alt} thumbnail ${i + 1}`} fill className="object-contain p-1" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* FULLSCREEN LIGHTBOX OVERLAY */}
            {isExpanded && (
                <div
                    className="fixed inset-0 z-[300] flex items-center justify-center bg-white/95 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
                    onClick={() => setIsExpanded(false)} // Clicking the background closes it
                >
                    {/* Close Button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                        className="absolute top-6 right-6 p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-50"
                    >
                        <X className="w-6 h-6 text-black" />
                    </button>

                    {/* Main Expanded Image */}
                    <div className="relative w-[90vw] h-[85vh]" onClick={(e) => e.stopPropagation()}>
                        <Image
                            key={`expanded-${images[activeIndex]}`}
                            src={images[activeIndex]}
                            alt={`${alt} — expanded view`}
                            fill
                            className="object-contain animate-in fade-in duration-300"
                        />

                        {/* Lightbox Navigation */}
                        {hasMultiple && (
                            <>
                                <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-4 bg-white border border-gray-100 shadow-xl hover:bg-gray-50 transition-colors rounded-r-xl">
                                    <ChevronLeft className="w-8 h-8 text-black" />
                                </button>
                                <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-4 bg-white border border-gray-100 shadow-xl hover:bg-gray-50 transition-colors rounded-l-xl">
                                    <ChevronRight className="w-8 h-8 text-black" />
                                </button>

                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                                    {images.map((_, i) => (
                                        <button
                                            key={`dot-${i}`}
                                            onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                                            className={`rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 h-2 bg-black' : 'w-2 h-2 bg-gray-300 hover:bg-gray-500'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

// ─── Bulk Order Selector (Horizontal Cards) ────────────────────────────────────

interface BulkSelectorProps {
    tiers: BulkTier[];
    selected: BulkTier;
    onChange: (tier: BulkTier) => void;
    singleUnitPrice: number;
}

function BulkOrderSelector({ tiers, selected, onChange, singleUnitPrice }: BulkSelectorProps) {
    return (
        <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Order Quantity</p>

            <div className="flex flex-row gap-3">
                {tiers.map((tier) => {
                    const isActive = selected.qty === tier.qty;
                    // Calculate savings
                    const fullPrice = singleUnitPrice * tier.qty;
                    const savings = fullPrice - tier.price;
                    const pct = Math.round((savings / fullPrice) * 100);

                    return (
                        <button
                            key={tier.qty}
                            onClick={() => onChange(tier)}
                            className={`relative flex-1 flex flex-col items-start p-4 border transition-all duration-200 text-left ${
                                isActive
                                    ? 'border-black bg-gray-50 shadow-[0_0_0_1px_rgba(0,0,0,1)]'
                                    : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50'
                            }`}
                        >
                            {/* Floating Red Badge */}
                            {tier.badge && (
                                <span className="absolute -top-2.5 left-4 bg-red-600 text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm whitespace-nowrap shadow-sm">
                                    {tier.badge}
                                </span>
                            )}

                            <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-black' : 'text-gray-500'}`}>
                                {tier.label}
                            </span>

                            <span className={`text-2xl font-light tracking-tight mt-1 ${isActive ? 'text-black' : 'text-gray-800'}`}>
                                ${tier.price.toFixed(2)}
                            </span>

                            {pct > 0 && (
                                <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest mt-2 bg-red-50 px-1.5 py-0.5 rounded-sm">
                                    Save {pct}%
                                </span>
                            )}

                            {isActive && (
                                <div className="absolute top-4 right-4">
                                    <Check className="w-4 h-4 text-black" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Universal Product Card ────────────────────────────────────────────────────

function ProductCard({ product }: ProductProps) {
    const { addToCart } = useShop();
    const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
    const [selectedTier, setSelectedTier] = useState<BulkTier | null>(
        product.bulkTiers ? product.bulkTiers[0] : null
    );

    const images = getImages(product, selectedColor);
    const currentPrice = selectedTier ? selectedTier.price : (selectedColor.price ?? product.price);
    const isSaleBadge = product.badge && ['SALE', 'CLEARANCE'].includes(product.badge.toUpperCase());

    const handleAddToCart = () => {
        const qty = selectedTier?.qty ?? 1;
        addToCart({
            id: `${product.id}-${selectedColor.name.replace(/\s+/g, '_')}-x${qty}`,
            productId: product.id,
            name: qty > 1 ? `${product.name} (${selectedTier!.label})` : product.name,
            price: currentPrice,
            image: images[0],
            selectedColor: selectedColor.name,
            ...(qty > 1 ? { quantity: qty } : {})
        });
    };

    return (
        <div className="bg-white p-8 md:p-12 flex flex-col md:flex-row items-start gap-10 group transition-all duration-700 relative">
            {/* BADGE */}
            {product.badge && (
                <span className={`absolute top-6 left-6 z-10 text-[9px] font-bold tracking-widest uppercase text-white px-3 py-1 ${isSaleBadge ? 'bg-red-600' : 'bg-black'}`}>
                    {product.badge}
                </span>
            )}

            <div className="w-full md:w-1/2">
                <ImageCarousel key={selectedColor.name} images={images} alt={`${product.name} — ${selectedColor.name}`} variant="featured" />
            </div>

            <div className="flex-1 space-y-7 w-full">
                <div>
                    <p className="text-[9px] font-bold tracking-[0.2em] text-gray-400 mb-2">{product.category}</p>
                    <h3 className="text-3xl font-bold uppercase italic leading-tight text-black">{product.name}</h3>
                </div>

                {/* COLOR SELECTOR */}
                <div className="space-y-3">
                    <div className="flex justify-between items-baseline h-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            Finish: <span className="text-black">{selectedColor.name}</span>
                        </span>
                        {selectedColor.price && (
                            <span className="text-[9px] text-[#064e3b] font-bold uppercase tracking-widest">Premium</span>
                        )}
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        {product.colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setSelectedColor(color)}
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                                    selectedColor.name === color.name ? 'border-black scale-110' : 'border-gray-200 hover:scale-110 hover:border-gray-400'
                                }`}
                                style={{
                                    background: color.hex2
                                        ? `linear-gradient(135deg, ${color.hex} 50%, ${color.hex2} 50%)`
                                        : color.hex,
                                    boxShadow: (color.hex === '#ffffff' || color.hex === '#f0ede8') ? 'inset 0 0 0 1px #ddd' : undefined
                                }}
                                title={color.name}
                            >
                                {selectedColor.name === color.name && (
                                    <Check
                                        className="w-4 h-4 drop-shadow-md"
                                        style={{ color: color.hex === '#1a1a1a' ? '#fff' : '#000' }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* BULK TIER SELECTOR */}
                {product.bulkTiers && selectedTier && (
                    <BulkOrderSelector
                        tiers={product.bulkTiers}
                        selected={selectedTier}
                        onChange={setSelectedTier}
                        singleUnitPrice={product.price}
                    />
                )}

                {/* PRICE (only shown for non-bulk products) */}
                {!product.bulkTiers && (
                    <p className="text-2xl font-light text-black tracking-tighter">
                        ${currentPrice.toFixed(2)}
                    </p>
                )}

                <button
                    onClick={handleAddToCart}
                    className="w-full bg-black text-white px-8 py-4 uppercase text-[10px] font-bold tracking-[0.2em] hover:bg-[#064e3b] transition-colors flex items-center justify-center gap-3"
                >
                    {selectedTier && selectedTier.qty > 1 ? (
                        <>Add {selectedTier.qty} to Bag <Package className="w-4 h-4" /></>
                    ) : (
                        <>Add to Bag <ArrowRight className="w-4 h-4" /></>
                    )}
                </button>
            </div>
        </div>
    );
}