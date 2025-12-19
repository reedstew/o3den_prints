import React from 'react';
import { Star, Info, Zap } from 'lucide-react';

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

// Explicitly type the array
const PRODUCTS: Product[] = [
    { id: '1', name: 'Flexible Dragon', price: 24.99, image: '🐉', category: 'Animals', badge: 'New', rating: 5, reviews: 12, isNew: true },
    { id: '2', name: 'Mechanical Gear Box', price: 39.99, image: '⚙️', category: 'Technic', badge: 'Exclusive', rating: 4, reviews: 8, isNew: true },
    { id: '3', name: 'Custom Lithophane', price: 19.99, image: '🖼️', category: 'Decor', badge: null, rating: 5, reviews: 24, isNew: false },
    { id: '4', name: 'Emerald Wyvern', price: 45.99, image: '🐲', category: 'Animals', badge: 'Retiring Soon', rating: 5, reviews: 15, isNew: false },
    { id: '5', name: 'Clockwork Heart', price: 34.99, image: '🫀', category: 'Technic', badge: null, rating: 4, reviews: 6, isNew: false },
    { id: '6', name: 'Space Explorer', price: 12.99, image: '🚀', category: 'Space', badge: 'Popular', rating: 5, reviews: 3, isNew: false },
];

export default function UnifiedShop() {
    const newProducts = PRODUCTS.filter(p => p.isNew);
    const mainCatalog = PRODUCTS.filter(p => !p.isNew);

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-7xl mx-auto px-4 py-12">

                {/* FEATURED SHELF */}
                <section className="mb-16 border-2 border-gray-100 rounded-2xl p-6 bg-gray-50/50">
                    <div className="flex items-center gap-2 mb-6">
                        <Zap className="w-5 h-5 text-[#d0021b] fill-[#d0021b]" />
                        <h2 className="text-sm font-black uppercase tracking-tighter text-gray-900">
                            New Arrivals & Featured Builds
                        </h2>
                        <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {newProducts.map((product) => (
                            <FeaturedProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                {/* MAIN CATALOG */}
                <section>
                    <h2 className="lego-header text-3xl mb-8">Full Catalog</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {mainCatalog.map((product) => (
                            <ShopProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

// Define specific Prop types instead of 'any'
interface ProductProps {
    product: Product;
}

/** * NEW/SPONSORED STYLE CARD (Wide Layout) */
function FeaturedProductCard({ product }: ProductProps) {
    return (
        <div className="brick-card flex flex-col sm:flex-row p-0 overflow-hidden hover:border-[#206db5]">
            <div className="w-full sm:w-48 bg-white flex items-center justify-center text-7xl border-r-2 border-gray-100">
                {product.image}
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <div className="bg-[#ffcf00] text-black text-[10px] font-black px-2 py-0.5 rounded-sm self-start mb-2 uppercase italic">
                    New Release
                </div>
                <h3 className="lego-header text-xl mb-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-[#e6bb00]">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3 h-3 ${i < product.rating ? 'fill-current' : 'text-gray-200'}`}
                            />
                        ))}
                    </div>
                    <span className="text-xs font-bold text-gray-900">{product.reviews} Reviews</span>
                </div>
                <p className="text-2xl font-black text-black mb-4">${product.price}</p>
                <button className="btn-brick mt-auto bg-[#ffcf00] py-2 text-sm text-black w-full sm:w-max px-6">
                    Add to Bag
                </button>
            </div>
        </div>
    );
}

/** * STANDARD CATALOG CARD */
function ShopProductCard({ product }: ProductProps) {
    return (
        <div className="brick-card group p-4 flex flex-col">
            <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl rounded-lg mb-4">
                {product.image}
            </div>
            <p className="text-[10px] font-black uppercase text-[#206db5] mb-1 tracking-widest">{product.category}</p>
            <h3 className="lego-header text-lg mb-2 group-hover:text-[#206db5]">{product.name}</h3>
            <div className="flex items-center gap-1.5 mb-3">
                <div className="flex text-[#e6bb00]">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3 h-3 ${i < product.rating ? 'fill-current' : 'text-gray-200'}`}
                        />
                    ))}
                </div>
                <span className="text-xs font-bold text-gray-900">({product.reviews})</span>
            </div>
            <p className="text-2xl font-black mb-4 text-black">${product.price}</p>
            <button className="btn-brick bg-[#ffcf00] text-black py-3 rounded-md text-xs">
                Add to Bag
            </button>
        </div>
    );
}