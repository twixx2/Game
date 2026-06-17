import { useAuth } from '@context';
import { MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH } from '@shared/constants';
import { fetcherRegister } from '../api';

import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export const useHelperRegister = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [step, setStep] = useState<number>(0);
    const [direction, setDirection] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [fail, setFail] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();
    const { login } = useAuth();

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
        const regexPattern = `^(?=.*[a-zA-Z])[a-zA-Z0-9._-]{${MIN_USERNAME_LENGTH},${MAX_USERNAME_LENGTH}}$`;

        const regex = new RegExp(regexPattern);
        if (username && password && regex.test(username)) {
            const user = { username, password }
            fetcherRegister(user)
                .then(res => {
                    login(res.token)
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

    return { username, password, step, direction, loading, fail, success, setUsername, setPassword, nextStep, prevStep, register, variants };
};