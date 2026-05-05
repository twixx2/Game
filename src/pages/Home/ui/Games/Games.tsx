import { motion } from "@shared/motion";
import { ROUTES } from "@/core/conf";
import { GamesCard } from "./GamesCard/GamesCard";

import s from "./games.module.scss"

export const HomeGames = () => {
    interface gameObj {
        name: string;
        link: string
    }

    const games: gameObj[] = [
        {
            "name": "sapper",
            "link": ROUTES.SAPPER
        },
        {
            "name": "tower",
            "link": ROUTES.TOWER
        },
        {
            "name": "cases",
            "link": ROUTES.CASES
        },
        {
            "name": "minehunt",
            "link": ROUTES.MINEHUNT
        }
    ]

    return (
        <section className={s.games}>
            <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.3 }}
                className="section_title">
                entertainment
            </motion.h2>

            <div className={s.cards}>
                {
                    games.map((game, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 * (index + 1) }}>
                            <GamesCard game={game} index={index} />
                        </motion.div>))
                }
            </div>
        </section>
    );
};