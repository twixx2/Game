import { useState } from "react";

import { useAuth } from "@context";
import { fetcherLogin } from "../api";

import { SHA256 } from "crypto-js";

import { useNavigate } from "react-router-dom";

export const useHelperLogin = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [shown, setShown] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [fail, setFail] = useState<string>('');
    const { isAuth, setToken } = useAuth();
    const navigate = useNavigate();

    const getText = (): string => {
        const hour = new Date().getHours();
        if (hour < 5) return 'Still awake?';
        else if (hour < 12) return 'Wassup';
        else if (hour < 18) return "Hola de nuevo!";
        else return "Time to rest..";
    };

    const typeLogin = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9._-]{0,20}$/;

        if (regex.test(value) || value === '') {
            setLogin(value);
        }
    };

    const typePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const regex = /^[a-zA-Z0-9!._#-]*$/;
        const value = e.target.value;
        if (regex.test(value)) {
            setPassword(value);
        };
    };

    const handleShown = (): void => {
        setShown(!shown);
    };

    const signIn = (): void => {
        if (login && password) {
            setLoading(true);
            const hashed: string = SHA256(password).toString();

            const user = {
                password: hashed,
                email: `${login}@example.com`
            }
            fetcherLogin(user)
                .then(res => {
                    localStorage.setItem("token", res.data.token);
                    setToken(res.data.token);
                    navigate("/");
                })
                .catch(err => {
                    if (err.response?.status === 401) setFail("the user has not been found");
                    else if (err.response?.status === 400) setFail("seems like data is missing");
                    else setFail("something went wrong. try again");
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setFail("please fill in all fields");
        }
    };

    return { isAuth, fail, loading, shown, login, password, signIn, handleShown, typePassword, typeLogin, getText }

};