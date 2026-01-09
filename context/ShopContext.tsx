'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
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
    // 1. Initialize empty to match Server (avoids Hydration Mismatch)
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    // We use a ref to track if the initial load has happened so we don't overwrite with empty []
    const isLoaded = React.useRef(false);

    // 2. Load from LocalStorage (Runs only once on client)
    useEffect(() => {
        const savedCart = localStorage.getItem('o3d_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
        isLoaded.current = true;
    }, []);

    // 3. Save to LocalStorage (Runs whenever cart changes)
    useEffect(() => {
        // Only save if we have finished the initial load
        if (isLoaded.current) {
            localStorage.setItem('o3d_cart', JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
        setCart((prev) => {
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