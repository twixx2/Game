/* eslint-disable no-unused-vars */
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from "framer-motion";
import './home.scss';

const HomePage = () => {
    const navigate = useNavigate();
    const { isAuth } = useAuth();

    const games = [
        {
            "name": "sapper",
            "link": "/sapper"
        },
        {
            "name": "tower",
            "link": "/tower"
        },
        {
            "name": "cases",
            "link": "/cases"
        },
        {
            "name": "minehunt",
            "link": "/minehunt"
        }
    ]

    return (
        <div className="home">

            <main className="home_main">

                {isAuth === false && (
                    <section className="authorize">
                        <Link to="/register" className="authorize_btn btn_register">
                            register
                        </Link>

                        <Link to="/login" className="authorize_btn btn_login">
                            login
                        </Link>
                    </section>
                )}

                <section className="games">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.3 }}
                        className="games_title main_section_title">
                        entertainment
                    </motion.h2>

                    <div className="games_cards">

                        {
                            games.map((game, index) => {
                                const d = 0.4 * (index + 1);
                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1, delay: d }}
                                        className={`games_card game_card${index + 1}`} key={index} onClick={() => navigate(game.link)}>

                                        <div className="game_card_content">
                                            <div className="game_card_content_info">
                                                <h3 className="game_card_title">
                                                    {game.name}
                                                </h3>

                                                <div className="game_card_volume">
                                                    <span>gambled</span>
                                                    <span>$1.8T</span>
                                                </div>

                                            </div>

                                            <Link className='game_card_btn'>Play now</Link>


                                        </div>

                                    </motion.div>
                                );

                            })
                        }


                    </div>
                </section>

                <section className="bonuses">

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.3 }}
                        viewport={{ once: true, amount: 'some' }}
                        className="tag_container">
                        <h2 className="bonuses_title main_section_title">
                            free bonuses
                        </h2>
                        <span className="beta">soon</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true, amount: "some" }}
                        className="bonuses_card">
                        <div className="bonuses_card_content disabled">

                            <h4 className="bonuses_card_title">
                                up to $25 000 once a day
                            </h4>

                            <button className='bonuses_card_btn'>
                                claim
                            </button>

                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true, amount: "some" }}
                        className="bonuses_card">
                        <div className="bonuses_card_content disabled">

                            <h4 className="bonuses_card_title">
                                up to 1 token once a fortnight
                            </h4>

                            <button className='bonuses_card_btn'>
                                not available yet
                            </button>

                        </div>
                    </motion.div>

                </section>

                <section className="redirect">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.3 }}
                        viewport={{ once: true, amount: 'some' }}
                        className="tag_container">
                        <h2 className="redirect_title main_section_title">take a peek</h2>
                        <span className="new">new</span>
                    </motion.div>

                    <div className="redirect_items">

                        <div
                            className="redirect_item" onClick={() => navigate("/trade")}>
                            <h4 className="redirect_item_title">
                                {">"} trade
                            </h4>
                            <span>01</span>
                        </div>

                        <div
                            className="redirect_item" onClick={() => navigate("/leaderboard")}>
                            <h4 className="redirect_item_title">
                                {">"} leaderboard
                            </h4>
                            <span>02</span>
                        </div>

                        <div
                            className="redirect_item" onClick={() => navigate("/support")}>
                            <h4 className="redirect_item_title">
                                {">"} support
                            </h4>
                            <span>03</span>
                        </div>

                        <div
                            className="redirect_item" onClick={() => navigate("/cheers")}>
                            <h4 className="redirect_item_title">
                                {">"} cheers
                            </h4>
                            <span>04</span>
                        </div>

                        <div
                            className="redirect_item" onClick={() => navigate("/haveanidea")}>
                            <h4 className="redirect_item_title">
                                {">"} have an idea?
                            </h4>
                            <span>05</span>
                        </div>

                    </div>
                </section>

                <section className="stats">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.3 }}
                        viewport={{ once: true, amount: 'some' }}
                        className="tag_container">
                        <h2 className="stats_title main_section_title">
                            vanilla's stats
                        </h2>
                        <span className='preview'>preview</span>
                    </motion.div>


                    <div className="stats_items">

                        <div className="stats_item">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5 }}
                                viewport={{ once: true, amount: "some" }}
                                className="stats_item_left">
                                cases opened
                            </motion.span>

                            <motion.span
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5 }}
                                viewport={{ once: true, amount: "some" }}
                                className="stats_item_right">
                                8.2M
                            </motion.span>

                        </div>

                        <div className="stats_item">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5, delay: 0.2 }}
                                viewport={{ once: true, amount: "some" }}
                                className="stats_item_left">
                                sapper played
                            </motion.span>

                            <motion.span
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5, delay: 0.2 }}
                                viewport={{ once: true, amount: "some" }}
                                className="stats_item_right">
                                9k
                            </motion.span>

                        </div>

                        <div className="stats_item">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5, delay: 0.3 }}
                                viewport={{ once: true, amount: "some" }}
                                className="stats_item_left">
                                minehunt played
                            </motion.span>

                            <motion.span
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5, delay: 0.3 }}
                                viewport={{ once: true, amount: "some" }}
                                className="stats_item_right">
                                3k
                            </motion.span>

                        </div>

                        <div className="stats_item">

                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5, delay: 0.4 }}
                                viewport={{ once: true, amount: "some" }}
                                className="stats_item_left">
                                tower played
                            </motion.span>

                            <motion.span
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5, delay: 0.4 }}
                                viewport={{ once: true, amount: "some" }}
                                className="stats_item_right">
                                2k
                            </motion.span>


                        </div>

                        <div className="stats_item">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                viewport={{ once: true, amount: "some" }}
                                className="stats_item_left">
                                highest bet
                            </motion.span>

                            <motion.span
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                viewport={{ once: true, amount: "some" }}
                                className="stats_item_right">
                                $1.2M
                            </motion.span>


                        </div>

                        <div className="stats_item">

                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5, delay: 0.6 }}
                                viewport={{ once: true, amount: "some" }}
                                className="stats_item_left">
                                highest win
                            </motion.span>

                            <motion.span
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5, delay: 0.6 }}
                                viewport={{ once: true, amount: "some" }}
                                className="stats_item_right">
                                $19.6M
                            </motion.span>


                        </div>

                        <div className="stats_item">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5, delay: 0.7 }}
                                viewport={{ once: true, amount: "some" }}
                                className="stats_item_left">
                                total volume
                            </motion.span>

                            <motion.span
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5, delay: 0.7 }}
                                viewport={{ once: true, amount: "some" }}
                                className="stats_item_right">
                                $4.1B
                            </motion.span>

                        </div>

                    </div>
                </section>

                <section className="about">
                    <h2 className="about_title main_section_title">
                        what is this?
                    </h2>
                    <div className="about_content">
                        <p className="about_main_text">
                            vanilla is a personal project, almost a mini-game platform, that was built only for fun.
                            created on july 5th, 2025.
                            here, you can place bets, open cases, exchange your items and more.
                            all in-game currencies, stakes, gameplay elements and balances are entirely fictitious.
                            vanilla's creator condemns activities such as illegal gambling. love yall
                        </p>
                        <span className='about_main_made'>
                            made with love by enbanana
                        </span>
                    </div>
                </section>

            </main>

        </div>
    );
}

export default HomePage;