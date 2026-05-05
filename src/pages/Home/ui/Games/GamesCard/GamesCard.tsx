import { Link } from "react-router-dom";
import s from "./gamesCard.module.scss";
import clsx from "clsx";

export const GamesCard = ({ game, index }: { game: { name: string; link: string }; index: number }) => (
    <Link to={game.link}>
        <div className={clsx(s.card, s[`card${index + 1}`])}>

            <div className={s.content}>
                <div className={s.info}>
                    <h3 className={s.title}>
                        {game.name}
                    </h3>

                    <div className={s.volume}>
                        <span>gambled</span>
                        <span>$2.6T</span>
                    </div>

                </div>

                <button className={s.playBtn}>Play now</button>

            </div>

        </div>

    </Link>
);