import RegisterAlready from '../../components/RegisterAlready/RegisterAlready';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from "react-router-dom";
import { SHA256 } from 'crypto-js';
import { useState } from "react";
import axios from "axios";
import './auth.scss';

const AuthPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [shown, setShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fail, setFail] = useState('');
    const url = import.meta.env.VITE_USER_API_URL;
    const { isAuth, setToken } = useAuth();
    const navigate = useNavigate();

    const getText = () => {
        const hour = new Date().getHours();
        if (hour < 5) return 'Still awake?';
        else if (hour < 12) return 'Wassup';
        else if (hour < 18) return "Hola de nuevo!";
        else return "Time to rest..";
    };

    const typeLogin = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9._-]{0,20}$/;

        if (regex.test(value) || value === '') {
            setLogin(value);
        }
    };

    const typePassword = (e) => {
        const regex = /^[a-zA-Z0-9!._#-]*$/;
        const value = e.target.value;
        if (regex.test(value)) {
            setPassword(value);
        };
    };

    const handleShown = () => {
        setShown(!shown);
    };

    const signIn = () => {
        if (login && password) {
            setLoading(true);
            const emailUser = `${login}@example.com`
            const hashedPassword = SHA256(password).toString();
            axios
                .post(`${url}/auth`, {
                    password: hashedPassword,
                    email: emailUser,
                })
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

    if (isAuth) return <RegisterAlready />;

    return (
        <>
            <div className='login_container'>

                <div className="login_content">
                    <h2 className='login_title'>
                        {getText()}
                    </h2>

                    <p className='login_text'>
                        {loading ? 'checking..' : fail ? fail : 'good to see you again'}
                    </p>

                    <div className="login_main_input_block">
                        <div className="login_username_input_block">
                            <input value={login} type="text" onChange={(e) => typeLogin(e)} maxLength="20" className='login_username_input' placeholder='username' />
                        </div>

                        <div className="login_password_input_block">
                            <input value={password} onChange={(e) => typePassword(e)} type={shown ? "text" : "password"} className='login_password_input' placeholder='password' />

                            <button
                                onClick={handleShown}
                                className='login_password_input_block_btn'>
                                {
                                    !shown ?
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4d4d4d"><path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z" /></svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4d4d4d"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg>
                                }
                            </button>
                        </div>
                    </div>


                    <button onClick={signIn} disabled={!login || !password} className='login_btn'>
                        proceed
                    </button>

                    <Link className='login_btn_back' to="/">main</Link>

                </div>

            </div>
        </>
    );
};

export default AuthPage;
