/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [userId, setUserId] = useState(null);
    const [balance, setBalance] = useState(0);
    const [avatar, setAvatar] = useState("");
    const [username, setUsername] = useState('');
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userItems, setUserItems] = useState([]);
    const headers = { Authorization: `Bearer ${token}` };
    const url = import.meta.env.VITE_USER_API_URL;


    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        const fetchUser = () => {
            if (!token) return;
            axios
                .get(`${url}/auth_me`, { headers })
                .then(res => {
                    setIsAuth(true);
                    setUserId(res.data.id);
                    setBalance(res.data.balance);
                    setUsername(res.data.fullName);
                    setUserItems(res.data.items || []);
                    const avatar = localStorage.getItem(`${res.data.fullName}-avatar`);
                    setAvatar(avatar || null);
                })
                .catch(() => {
                    setIsAuth(false);
                    logout();
                })
        };

        fetchUser();

        return () => {
            source.cancel();
        };

    }, [token]);

    useEffect(() => {
        if (avatar && username) {
            localStorage.setItem(`${username}-avatar`, avatar);
        }
    }, [avatar, username]);

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
        setToken(null);
        setUserId(null);
        setBalance(0);
        setAvatar(null);
        setUsername('');
    };

    const editBalance = async (newBalance) => {
        const oldBalance = balance;
        setBalance(newBalance);
        axios
            .patch(`${url}/users/${userId}`, {
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
            userId,
            token, setToken,
            headers,
            logout,
            editBalance,
            userItems,
        }}>
            {children}
        </AuthContext.Provider>
    );
};