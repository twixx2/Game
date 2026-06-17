import { useState } from "react";

import { useAuth } from "@context";
import { fetcherLogin } from "../api";

import { MAX_USERNAME_LENGTH } from "@shared/constants";
import { useNavigate } from "react-router-dom";

export const useHelperLogin = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [shown, setShown] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [fail, setFail] = useState<string>('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const getText = (): string => {
        const hour = new Date().getHours();
        if (hour < 5) return 'Still awake?';
        else if (hour < 12) return 'Wassup';
        else if (hour < 18) return "Hola de nuevo!";
        else return "Time to rest..";
    };

    const typeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        const regexPattern = `^[a-zA-Z0-9._-]{0,${MAX_USERNAME_LENGTH}}$`;
        const regex = new RegExp(regexPattern);

        if (regex.test(value) || value === '') {
            setUsername(value);
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
        if (username && password) {
            setLoading(true);

            const user = {
                username: username,
                password: password,
            }
            fetcherLogin(user)
                .then(res => {
                    login(res.data.token)
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

    return { fail, loading, shown, username, password, signIn, handleShown, typePassword, typeUsername, getText }

};