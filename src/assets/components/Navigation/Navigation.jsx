/* eslint-disable no-unused-vars */
import packageJson from '../../../../package.json';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
    const location = useLocation();
    const pagePhrase = {
        "/": {
            "title": "vanilla",
            "subtitle": "let it roll"
        },
        "/cases": {
            "title": "cases",
            "subtitle": "every inventory starts empty"
        },
        "/sapper": {
            "title": "sapper",
            "subtitle": "when to stop?"
        },
        "/tower": {
            "title": "tower",
            "subtitle": "higher means riskier"
        },
        "/minehunt": {
            "title": "minehunt",
            "subtitle": "?/3"
        },
        "/trade": {
            "title": "trade",
            "subtitle": "everything has a price"
        },
        "/leaderboard": {
            "title": "leaderboard",
            "subtitle": "there is always someone above"
        },
        "/support": {
            "title": "support",
            "subtitle": "got a problem?"
        },
        "/cheers": {
            "title": "cheers",
            "subtitle": "talk bout ur experience"
        },
        "/haveanidea": {
            "title": "have an idea?",
            "subtitle": "share it"
        },
        "/store": {
            "title": "store",
            "subtitle": "money is just a paper"
        },
        "/inv": {
            "title": "inv",
            "subtitle": "collection"
        },
        "/profile": {
            "title": "me",
            "subtitle": "you"
        },
        "/cases/1": {
            "title": "bananas",
            "subtitle": "ba-na-na-na-na-na-na"
        },
        "/cases/2": {
            "title": "gifts",
            "subtitle": "tg"
        },
        "/cases/3": {
            "title": "peps",
            "subtitle": "peps"
        },
        "/cases/4": {
            "title": "ak-47",
            "subtitle": "ak-47"
        },
        "/cases/5": {
            "title": "sniper's nest",
            "subtitle": "no sc0pe"
        },
        "/cases/6": {
            "title": "overdrive",
            "subtitle": "vroom vroom"
        },
        "/cases/7": {
            "title": "overworld",
            "subtitle": "the perfect time"
        },
    }


    return (
        <nav className='navigation'>
            <div className="navigation_content">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="nav_text">

                    <h2 className="nav_title">
                        {pagePhrase[location.pathname].title}
                    </h2>
                    <h4 className="nav_subtitle">
                        {pagePhrase[location.pathname].subtitle}
                    </h4>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="nav_version">
                    <span>
                        v{packageJson.version}
                    </span>

                </motion.div>

            </div>

        </nav>

    );
};

export default Navigation;