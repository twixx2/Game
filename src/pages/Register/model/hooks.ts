import { useAuth } from '@context';
import { fetcherRegister } from '../api';

import { useNavigate } from 'react-router-dom';
import { useState } from "react";

import { SHA256 } from 'crypto-js';


export const useHelperRegister = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [step, setStep] = useState<number>(0);
    const [direction, setDirection] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [fail, setFail] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();
    const { isAuth, setToken } = useAuth();

    const nextStep = (): void => {
        setDirection(1);
        setStep((prev) => prev + 1);
    };

    const prevStep = (): void => {
        setDirection(-1);
        setStep((prev) => prev - 1);
    };

    const register = (): void => {
        setLoading(true);
        nextStep();
        const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9._-]{1,20}$/;
        if (login && password && loginRegex.test(login)) {
            const user = {
                fullName: login,
                password: SHA256(password).toString(),
                email: `${login}@example.com`,
                balance: 67000,
                registeredAt: new Date().toISOString().slice(0, 16),
                items: []
            }
            fetcherRegister(user)
                .then(res => {
                    localStorage.setItem("token", res.data.token);
                    setToken(res.data.token);
                    setSuccess(true);
                })
                .catch(err => {
                    console.error(err);
                    setFail(true);
                })
                .finally(() => {
                    setLoading(false);
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                });
        } else {
            setFail(true);
            setLoading(false);
        };
    };

    const variants = {
        enter: (direction: number) => ({
            y: direction > 0 ? "100%" : "-100%",
        }),
        center: {
            y: 0,
        },
        exit: (direction: number) => ({
            y: direction > 0 ? "-100%" : "100%",
        }),
    };

    return { login, password, step, direction, loading, fail, success, isAuth, setLogin, setPassword, nextStep, prevStep, register, variants };
};