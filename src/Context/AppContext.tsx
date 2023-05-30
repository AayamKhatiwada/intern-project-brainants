import React from 'react';
import { UserProvider } from './UserContext';
import { CartProvider } from './CartContext';
import { ShopProvider } from './ShopContext';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <UserProvider>
            <CartProvider>
                <ShopProvider>
                    {children}
                </ShopProvider>
            </CartProvider>
        </UserProvider>
    );
};

export default AppProvider;
