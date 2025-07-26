import './auth.scss';
import { Link } from 'react-router-dom';
import TextField from '../../components/TextField/TextField';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SHA256 } from 'crypto-js';
import toast from 'react-hot-toast';

const AuthPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const navigate = useNavigate();
    const url = import.meta.env.VITE_USER_API_URL;
    const token = localStorage.getItem("token");

    // useEffect(() => {
    //     if (token) {
    //         navigate("/sapper")
    //     }
    // }, [token, navigate])

    const validate = () => {
        let valid = true;
        setLoginError("");
        setPasswordError("");

        if (!login.trim()) {
            setLoginError("Логин обязателен");
            valid = false;
        } else {
            const loginPattern = /^[a-zA-Z0-9_]{4,10}$/;
            if (!loginPattern.test(login)) {
                setLoginError("Логин некорректен");
                valid = false;
            }
        }

        if (!password.trim()) {
            setPasswordError("Пароль обязателен");
            valid = false;
        }

        if (token) {
            toast.error("Вы уже зарегистрированы!")
            valid = false;
        }
        return valid;
    }

    const handleAuth = async () => {
        if (!validate()) {
            return;
        }

        try {
            const emailUser = `${login}@example.com`
            const hashedPassword = SHA256(password).toString();
            const res = await axios.post(`${url}/auth`, {
                password: hashedPassword,
                email: emailUser,
            });
            localStorage.setItem("token", res.data.token)
            setLogin("")
            setPassword("")
            navigate("/sapper")


        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const status = err.response.status;

                if (status === 400) {
                    toast.error("Неверные данные, повторите попытку еще раз");
                } else if (status === 401) {
                    toast.error("Пользователь не найден");
                } else if (status === 403) {
                    toast.error("Аутентификация временно недоступна");
                }

            }
        }
    }




    return (
        <div className="auth-page">
            <div className="auth-page__card">
                <h2 className="auth-page__title">Вход</h2>
                <p className="auth-page__subtitle">Введите данные для входа</p>

                <div className="auth-page__field">
                    <label htmlFor="login">Логин</label>
                    <TextField
                        className="auth-page__input"
                        type="text"
                        value={login}
                        onChange={setLogin}
                        placeholder="Введите логин"
                    />
                    <span className={loginError ? "error active" : "error"}>{loginError}</span>
                </div>

                <div className="auth-page__field">
                    <label htmlFor="password">Пароль</label>
                    <TextField
                        className="auth-page__input"
                        type="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="Введите пароль"
                    />
                    <span className={passwordError ? "error active" : "error"}>{passwordError}</span>
                </div>

                <button className="auth-page__btn" onClick={handleAuth}>Войти</button>

                <div className="auth-page__footer">
                    <p>Нет аккаунта?</p>
                    <Link to="/register">Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
