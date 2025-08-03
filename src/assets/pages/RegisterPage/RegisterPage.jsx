import TextField from '../../components/TextField/TextField';
import './register.scss';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SHA256 } from 'crypto-js';
import toast from 'react-hot-toast';
const RegisterPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginError, setLoginError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [matchError, setMatchError] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();
    const url = import.meta.env.VITE_USER_API_URL;
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                const res = await axios.get(`${url}/auth_me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setIsAuth(true);
                void res;
            } catch (err) {
                void err;
            }
        }
        fetchUser();
    }, [])


    const validate = () => {
        let valid = true;
        setLoginError("");
        setPasswordError("");
        setMatchError("");

        if (isAuth) {
            toast.error("Вы уже зарегистрированы");
            navigate("/");
            valid = false;
            return valid;
        }

        if (!login.trim()) {
            setLoginError("Логин обязателен");
            valid = false;
        } else {
            const loginPattern = /^[a-zA-Z0-9_]{4,10}$/;
            if (!loginPattern.test(login)) {
                setLoginError("Логин некорректный");
                valid = false;
            }
        }
        if (!password.trim()) {
            setPasswordError("Пароль обязателен");
            valid = false;
        }
        if (password !== confirmPassword) {
            setMatchError("Пароли не совпадают");
            valid = false;
        }

        return valid;
    }

    const handleRegister = async () => {
        if (!validate()) {
            return;
        }
        try {
            const registrationDateISO = new Date().toISOString().slice(0, 16);
            const emailUser = `${login}@example.com`;
            const hashedPassword = SHA256(password).toString();
            const res = await axios.post(`${url}/register`, {
                fullName: login,
                password: hashedPassword,
                email: emailUser,
                balance: 1000,
                registeredAt: registrationDateISO,
            });
            localStorage.setItem("token", res.data.token);
            setLogin("");
            setPassword("");
            setConfirmPassword("");
            navigate('/');
        } catch (err) {
            toast.error("Возникла ошибка");
            void err;
        }
    }

    return (
        <div className="register-page">
            <div className="register-page__card">
                <h2 className="register-page__title">Регистрация</h2>
                <p className="register-page__subtitle">Введите данные для регистрации</p>
                <div className="register-page__field">
                    <label htmlFor="name">Логин</label>
                    <TextField
                        className="register-page__input"
                        onChange={setLogin}
                        type="text"
                        value={login}
                        placeholder="Введите имя"
                    />
                    <span className={loginError ? "error active" : "error"}>{loginError}</span>
                </div>

                <div className="register-page__field">
                    <label htmlFor="password">Пароль</label>
                    <TextField
                        className="register-page__input"
                        onChange={setPassword}
                        type="password"
                        value={password}
                        placeholder="Введите пароль"
                    />
                    <span className={passwordError ? "error active" : "error"}>{passwordError}</span>
                </div>

                <div className="register-page__field">
                    <label htmlFor="confirmPassword">Повторите пароль</label>
                    <TextField
                        className="register-page__input"
                        onChange={setConfirmPassword}
                        type="password"
                        value={confirmPassword}
                        placeholder="Повторите пароль"
                    />
                    <span className={matchError ? "error active" : "error"}>{matchError}</span>
                </div>

                <button className="register-page__btn" onClick={handleRegister}>Зарегистрироваться</button>

                <div className="register-page__footer">
                    <p>Есть аккаунт?</p>
                    <Link to="/login">Войти</Link>
                    <Link to="/">На главную</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;