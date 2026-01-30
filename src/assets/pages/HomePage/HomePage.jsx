import './home.scss';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from '../../context/AuthContext';
const HomePage = () => {
    const navigate = useNavigate();
    const { isAuth } = useAuth();

    return (
        <div className="home">
            <nav className="home_nav">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="home_nav_content container">
                    <a href="#" className="home_nav_content_logo">H3ll0, fr13nd</a>
                </motion.div>
            </nav>

            <main className="home_main">

                {isAuth ?
                    <section className="home_all_content">

                        <section className="home_games">
                            <motion.h2 className='home_games_title'
                                initial={{ opacity: 0, x: -120 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.2, delay: 0.3 }}>
                                Entertainment
                            </motion.h2>

                            <div className="home_games_content">

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="home_game_card home_card_one" onClick={() => navigate("/sapper")}>
                                    Sapper
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                    className="home_game_card home_card_two" onClick={() => navigate("/cases")}>
                                    Cases
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                    className="home_game_card home_card_three" onClick={() => navigate("/tower")}>
                                    Tower
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </motion.div>


                            </div>
                        </section>

                        <section className="home_games">
                            <motion.h2 className='home_games_title'
                                initial={{ opacity: 0, x: -120 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.2, delay: 0.3 }}>
                                User
                            </motion.h2>

                            <div className="home_games_content">

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="home_game_card home_card_four" onClick={() => navigate("/profile")}>
                                    Profile
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </motion.div>


                            </div>
                        </section>

                    </section>

                    :
                    <section className="home_auth">
                        <motion.h2
                            initial={{ opacity: 0, x: -120 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                            className='home_games_title'>Who are you?</motion.h2>
                        <div className="home_auth_content">

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="home_auth_card home_auth_one" onClick={() => navigate("/register")}>
                                Registration
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="home_auth_card home_auth_two" onClick={() => navigate("/login")}>
                                Authorization
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
                        made with love by enbanana.psl
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