'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Updated Type Definition
type CartItem = {
    id: string;
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    selectedColor?: string;
};

type ShopContextType = {
    cart: CartItem[];
    isCartOpen: boolean;
    toggleCart: () => void;
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    cartTotal: number;
    clearCart: () => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Use state instead of ref to track loading status (Fixes ESLint warning)
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Load from LocalStorage (Runs only once on mount)
    useEffect(() => {
        const savedCart = localStorage.getItem('o3d_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
        setIsLoaded(true); // Mark as loaded
    }, []);

    // 2. Save to LocalStorage (Runs only when cart changes AND we have finished loading)
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('o3d_cart', JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
        setCart((prev) => {
            // Check if this specific variant (ID + Color) exists
            const existing = prev.find((item) => item.id === newItem.id);

            if (existing) {
                return prev.map((item) =>
                    item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...newItem, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => setCart([]);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <ShopContext.Provider value={{ cart, isCartOpen, toggleCart, addToCart, removeFromCart, cartTotal, clearCart }}>
            {children}
        </ShopContext.Provider>
    );
}

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) throw new Error('useShop must be used within a ShopProvider');
    return context;
};