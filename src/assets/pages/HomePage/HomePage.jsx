import { useEffect, useState } from 'react';
import './home.scss';
import { motion } from "framer-motion";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const HomePage = () => {
    const url = import.meta.env.VITE_USER_API_URL;
    const [isAuth, setIsAuth] = useState(false);
    const userToken = localStorage.getItem("token")
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (!userToken) return;
            try {
                const res = await axios.get(`${url}/auth_me`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setIsAuth(true);
                void res;
            } catch (error) {
                void error;
            }
        }
        fetchUser();
    }, []);

    return (
        <div className="home">
            <nav className="home_nav">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="home_nav_content container">
                    <a href="#" className="home_nav_content_logo">H3ll0, fr1end</a>
                </motion.div>
            </nav>

            <main className="home_main">

                {isAuth ? <section className="home_games">
                    <motion.h2
                        initial={{ opacity: 0, x: -120 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        className='home_games_title'>Развлечение</motion.h2>

                    <div className="home_games_content">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="home_game_card home_card_one" onClick={() => navigate("/sapper")}>
                            Сапер
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="home_game_card home_card_two" onClick={() => {
                                const tostLoading = toast.loading("В разработке");
                                setTimeout(() => {
                                    toast.dismiss(tostLoading);
                                }, 1500)
                            }}>
                            Кейсы
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="home_game_card home_card_three" onClick={() => {
                                const tostLoading = toast.loading("В разработке");
                                setTimeout(() => {
                                    toast.dismiss(tostLoading);
                                }, 1500)
                            }}>
                            Башня
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </motion.div>


                    </div>
                </section>
                    :
                    <section className="home_auth">
                        <motion.h2
                            initial={{ opacity: 0, x: -120 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                            className='home_games_title'>Авторизация</motion.h2>
                        <div className="home_auth_content">

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="home_auth_card home_auth_one" onClick={() => navigate("/register")}>
                                Регистрация
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="home_auth_card home_auth_two" onClick={() => navigate("/login")}>
                                Вход
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </motion.div>

                        </div>
                    </section>}

                <section className="home_title_section">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1 }}
                        class="home_title">
                        made with love by enbanana
                        <div class="aurora">
                            <div class="aurora__item"></div>
                            <div class="aurora__item"></div>
                            <div class="aurora__item"></div>
                            <div class="aurora__item"></div>
                        </div>
                    </motion.h2>
                </section>

            </main>

        </div>
    );
}

export default HomePage;