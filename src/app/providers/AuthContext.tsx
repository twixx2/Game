import { createContext, useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextInterface {
    isAuth: boolean | null;
    token: string | null;
    headers: any;
    logout: () => void;
    login: (newToken: string) => void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const headers = { Authorization: `Bearer ${token}` }
    const isAuth = !!token;
    const queryClient = useQueryClient();

    const logout = (): void => {
        localStorage.removeItem("token");
        setToken(null);
        queryClient.clear()
    };

    const login = (newToken: string): void => {
        if (!newToken) throw new Error("Token required");
        localStorage.setItem("token", newToken)
        setToken(newToken);
    }

    return (
        <AuthContext.Provider value={{ isAuth, token, headers, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Ошибка получения контекста");
    }

    return context;
}