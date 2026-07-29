import { createContext, useEffect, useState } from "react";
import { storage } from "../utils/storage";
import { getUserFromToken } from "../utils/jwt";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const token = storage.getToken();

        if (token) {

            const user = getUserFromToken(token);

            setUser(user);
        }

    }, []);

    function login(token) {

        storage.setToken(token);

        const user = getUserFromToken(token);

        setUser(user);
    }

    function logout() {

        storage.removeToken();

        setUser(null);
    }

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}