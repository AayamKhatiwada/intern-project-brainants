import React, { createContext, useState } from "react";
import { CartItem } from "../Home/Items";
import { AddCurrentCart, DeleteCurrentCart, UpdateCurrentCart } from "../firebase";

// Cart interface
export interface CartStateInterface {
    name: string | undefined;
    email: string | undefined;
    cart: CartItemNumber[];
}

export interface CartItemNumber {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    number: number;
}

export interface CartContextInterface {
    cartState: CartStateInterface;
    // setCartState: React.Dispatch<SetStateAction<CartStateInterface>>;
    setCart: (cart: CartStateInterface | null) => void;
    addCart: (cart: CartItem) => void;
    setName: (name: string | undefined) => void;
    setEmail: (email: string | undefined) => void;
    increaseCount: (name: string) => void;
    decreaseCount: (name: string) => void;
    removeItemFromCart: (name: string) => void;
    clearCart: () => void;
}

// Cart initial state
const initialState: CartStateInterface = {
    name: undefined,
    email: undefined,
    cart: [],
};

// creating Cart context
export const CartContext = createContext<CartContextInterface>({
    cartState: initialState,
    // setCartState: () => { },
    setCart: () => { },
    addCart: () => { },
    setEmail: () => { },
    setName: () => { },
    increaseCount: () => { },
    decreaseCount: () => { },
    removeItemFromCart: () => { },
    clearCart: () => { },
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartState, setCartState] = useState<CartStateInterface>(initialState);

    const setCart = (cart: CartStateInterface | null) => {
        setCartState(() => ({
            name: cart?.name,
            email: cart?.email,
            cart: cart ? cart.cart : []
        }))
    }

    const addCart = (product: CartItem) => {
        let found = false
        let newCart = cartState.cart.map((cartItem) => {
            if (cartItem.name === product.name) {
                found = true;
                cartItem.number++;
            }
            return cartItem;
        });
        setCartState((prev) => ({ ...prev, cart: newCart }))

        if (!found) {
            let changed = [...cartState.cart, { ...product, number: 1 }];
            setCartState((prev) => ({ ...prev, cart: changed }))
        }

        AddCurrentCart(cartState, cartState.email);
    }

    const setEmail = (email: string | undefined) => {
        setCartState((prev) => ({ ...prev, email: email }))
        UpdateCurrentCart(cartState, cartState.email);
    }

    const setName = (name: string | undefined) => {
        setCartState((prev) => ({ ...prev, name: name }))
        UpdateCurrentCart(cartState, cartState.email);
    }

    const increaseCount = (name: string) => {
        let newCart = cartState.cart.map((cartItem) => {
            if (cartItem.name === name) {
                cartItem.number++;
            }
            return cartItem;
        });

        setCartState((prev) => ({ ...prev, cart: newCart }))
        UpdateCurrentCart(cartState, cartState.email);
    }

    const decreaseCount = (name: string) => {
        let newCart = cartState.cart.map((cartItem) => {
            if (cartItem.name === name) {
                cartItem.number--;
            }
            return cartItem;
        });

        setCartState((prev) => ({ ...prev, cart: newCart }))
        UpdateCurrentCart(cartState, cartState.email);
    }

    const removeItemFromCart = (name: string) => {
        let newCart = cartState.cart.filter((cartItem) => {
            return cartItem.name !== name;
        });

        setCartState((prev) => ({ ...prev, cart: newCart }))
        UpdateCurrentCart(cartState, cartState.email);
    }

    const clearCart = () => {
        setCartState((prev) => ({ ...prev, cart: [] }))
        DeleteCurrentCart(cartState.email);
    }

    return (
        <CartContext.Provider value={{ cartState, setCart, addCart, setEmail, setName, increaseCount, decreaseCount, removeItemFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};