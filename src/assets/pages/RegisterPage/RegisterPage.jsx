/* eslint-disable no-unused-vars */
import RegisterIntro from '../../components/RegisterIntro/RegisterIntro';
import RegisterAlready from '../../components/RegisterAlready/RegisterAlready';
import RegisterUsername from '../../components/RegisterUsername/RegisterUsername';
import RegisterPassword from '../../components/RegisterPassword/RegisterPassword';
import RegisterConfirm from '../../components/RegisterConfirm/RegisterConfirm';
import RegisterLoading from '../../components/RegisterLoading/RegisterLoading';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SHA256 } from 'crypto-js';
import { useState } from "react";
import axios from "axios";
import './register.scss';



const RegisterPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1); // -1 back, 1 next
    const [loading, setLoading] = useState(false);
    const [fail, setFail] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const url = import.meta.env.VITE_USER_API_URL;
    const { isAuth, setToken } = useAuth();

    const nextStep = () => {
        setDirection(1);
        setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setDirection(-1);
        setStep((prev) => prev - 1);
    };

    const register = () => {
        setLoading(true);
        nextStep();
        const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9._-]{1,20}$/;
        if (login && password && loginRegex.test(login)) {
            const registrationDateISO = new Date().toISOString().slice(0, 16);
            const emailUser = `${login}@example.com`;
            const hashedPassword = SHA256(password).toString();
            axios
                .post(`${url}/register`, {
                    fullName: login,
                    password: hashedPassword,
                    email: emailUser,
                    balance: 67000,
                    registeredAt: registrationDateISO,
                    items: [],
                })
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

    const getStepComponent = (step) => {
        switch (step) {
            case 0: return <RegisterIntro onNext={nextStep} />;
            case 1: return <RegisterUsername onNext={nextStep} login={login} setLogin={setLogin} />;
            case 2: return <RegisterPassword onNext={nextStep} onBack={prevStep} password={password} setPassword={setPassword} />;
            case 3: return <RegisterConfirm onNext={register} onBack={prevStep} login={login} password={"*".repeat(password.length)} />;
            default: return null;
        }
    };

    const variants = {
        enter: (direction) => ({
            y: direction > 0 ? "100%" : "-100%", // если вперед, вход снизу; назад — сверху
        }),
        center: {
            y: 0,
        },
        exit: (direction) => ({
            y: direction > 0 ? "-100%" : "100%", // если вперед — уходит вверх; назад — вниз
        }),
    };


    if (loading || fail || success) return <RegisterLoading loading={loading} fail={fail} success={success} />
    if (isAuth) return <RegisterAlready />


    return (
        <>

            <div className="register_container">
                <AnimatePresence custom={direction}>

                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial={"enter"}
                        animate={"center"}
                        exit={"exit"}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        {getStepComponent(step)}
                    </motion.div>

                </AnimatePresence>
            </div>


        </>

    );
};

export default RegisterPage;