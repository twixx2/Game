import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { InvItemInterface, MeResponse } from "@shared/types";
import { API_CONFIG } from "@/core/conf";
import toast from "react-hot-toast";
import axios from "axios";

interface AuthContextInterface {
    balance: number;
    username: string;
    avatar: string | null;
    isAuth: boolean | null;
    isLoading: boolean;
    userId: number | null;
    token: string | null;
    headers: any;
    logout: () => void;
    editBalance: (newBalance: number) => void;
    userItems: InvItemInterface[];


    setBalance: React.Dispatch<React.SetStateAction<number>>;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setAvatar: React.Dispatch<React.SetStateAction<string | null>>;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;

}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<number | null>(null);
    const [balance, setBalance] = useState<number>(0);
    const [avatar, setAvatar] = useState<string | null>("");
    const [username, setUsername] = useState<string>('');
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [userItems, setUserItems] = useState<InvItemInterface[]>([]);
    const headers = useMemo(() => ({
        Authorization: `Bearer ${token}`
    }), [token]);


    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        if (!token) {
            setIsLoading(false);
            setIsAuth(false);
            return;
        };
        axios
            .get<MeResponse>(`${API_CONFIG.BASE_URL}/auth_me`, { headers, cancelToken: source.token })
            .then(res => {
                setIsAuth(true);
                setUserId(res.data.id);
                setBalance(res.data.balance);
                setUsername(res.data.fullName);
                setUserItems(res.data.items || []);
                const avatar = localStorage.getItem(`${res.data.fullName}-avatar`);
                setAvatar(avatar || null);
            })
            .catch((err) => {
                if (axios.isCancel(err)) return;
                setIsAuth(false);
                logout();
            })
            .finally(() => setIsLoading(false))

        return () => {
            source.cancel();
        };

    }, [token]);

    useEffect(() => {
        if (avatar && username) {
            localStorage.setItem(`${username}-avatar`, avatar);
        }
    }, [avatar, username]);

    const logout = (): void => {
        localStorage.removeItem("token");
        setIsAuth(false);
        setToken(null);
        setUserId(null);
        setBalance(0);
        setAvatar(null);
        setUsername('');
    };

    const editBalance = (newBalance: number): void => {
        const oldBalance = balance;
        setBalance(newBalance);
        axios
            .patch(`${API_CONFIG.BASE_URL}/users/${userId}`, {
                balance: newBalance
            })
            .catch(() => {
                setTimeout(() => {
                    toast.error("Ошибка баланса. Средства возвращены");
                    setBalance(oldBalance);
                }, 100);
            })
    };

    return (
        <AuthContext.Provider value={{
            balance, setBalance,
            username, setUsername,
            avatar, setAvatar,
            isAuth,
            isLoading,
            userId,
            token, setToken,
            headers,
            logout,
            editBalance,
            userItems
        }}>
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