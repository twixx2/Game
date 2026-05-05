import { Link } from "react-router-dom";
import { ROUTES } from "@/core/conf";
import s from "./loginRequired.module.scss";
export const LoginRequired = () => (
    <div className={s.content}>
        <h3>to continue, join chncd first.</h3>
        <Link to={ROUTES.REGISTER}>join</Link>
    </div>
);