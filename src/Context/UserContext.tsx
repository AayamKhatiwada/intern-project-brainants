import React, { createContext, useState } from 'react';

// interfaces for user
interface UserInterface {
    displayName: string;
    email: string;
}

export interface UserContextInterface {
    userState: UserStateInterface;
    // setUserState: React.Dispatch<React.SetStateAction<UserStateInterface>>;
    setUser: (user: UserInterface | null) => void;
    setLoading: (user: boolean) => void;
    removeUser: () => void;
}

export interface UserStateInterface {
    user: UserInterface | null | undefined;
    loading: boolean;
}

// initial state for user
const initialUserState: UserStateInterface = {
    user: null,
    loading: false,
};

// creating user context
export const UserContext = createContext<UserContextInterface>({
    userState: initialUserState,
    // setUserState: () => { },
    setUser: () => { },
    setLoading: () => { },
    removeUser: () => { },
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userState, setUserState] = useState<UserStateInterface>(initialUserState);

    const setUser = (user: UserInterface | null) => {
        setUserState((prevState) => ({
            ...prevState,
            user: user
        }));
    }

    const setLoading = (bool: boolean) => {
        setUserState((prevState) => ({
            ...prevState,
            loading: bool
        }));
    }

    const removeUser = () => {
        setUserState((prev) => ({ ...prev, user: null }))
    }
    return (
        <UserContext.Provider value={{ userState, setUser, setLoading, removeUser }}>
            {children}
        </UserContext.Provider>
    );
};
