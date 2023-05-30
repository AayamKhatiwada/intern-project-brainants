import { createContext, useState } from "react";
import { Data } from "../firebase";

export interface ShopStateInterface {
    shop: Data[] | null | undefined;
    loading: boolean;
}

const initialState: ShopStateInterface = {
    shop: null,
    loading: false,
};

export interface ShopContextInterface {
    shopState: ShopStateInterface;
    // setUserState: React.Dispatch<React.SetStateAction<UserStateInterface>>;
    setShopData: (data: Data[]) => void
}

// creating user context
export const ShopContext = createContext<ShopContextInterface>({
    shopState: initialState,
    // setUserState: () => { },
    setShopData: () => { }
});

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [shopState, setShopState] = useState<ShopStateInterface>(initialState);

    const setShopData = (data: Data[]) => {
        setShopState((prev) => ({ ...prev, shop: data }))
    }

    return (
        <ShopContext.Provider value={{ shopState, setShopData }}>
            {children}
        </ShopContext.Provider>
    );
};
