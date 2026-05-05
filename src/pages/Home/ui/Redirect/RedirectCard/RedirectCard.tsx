import { Link } from "react-router-dom";
import s from "./redirectCard.module.scss";
export const RedirectCard = ({ page }: { page: { name: string; link: string; number: string } }) => (

    <Link to={page.link} className={s.item}>
        <h4 className={s.title}>
            {`> ${page.name}`}
        </h4>
        <span>{page.number}</span>
    </Link>

)