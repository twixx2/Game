import { CaseInterface } from "@shared/types"
import { formatCurrency } from "@shared/lib"

import { Link } from "react-router-dom";

import s from "./case.module.scss";

export const Case = ({ c, to }: { c: CaseInterface; to: string }) => (
    <Link to={to} className={s.case}>
        <div className={s.bg}></div>
        <div className={s.content}>
            <div className={s.image}>
                <img src={c.image} alt={c.title} />
            </div>

            <h2 className={s.name}>
                {c.title}
            </h2>

            <span className={s.price}>
                {formatCurrency(c.price)}
            </span>
        </div>
    </Link>
);