import { Outlet, Link, useLocation } from "react-router-dom";
import { Navigation, Icon } from "@shared/ui";
import { ROUTES } from "@/core/conf";

import s from "./layout.module.scss";
import clsx from "clsx";

export const MainLayout = () => {
    const location = useLocation();

    return (
        <div className={s.layout}>
            <Navigation />

            <div className={s.outlet}>
                <Outlet />
            </div>

            <div className={s.bar}>
                <div className={s.barItems}>

                    {
                        location.pathname === ROUTES.HOME ?
                            <Link to={ROUTES.HOME} className={clsx(s.item, s.current)}>
                                <Icon name="games_on" size={34} />
                                <span className={s.name}>hub</span>
                            </Link>
                            :
                            <Link to={ROUTES.HOME} className={clsx(s.item)}>
                                <Icon name="games_off" size={34} />
                                <span className={s.name}>hub</span>
                            </Link>
                    }

                    {
                        location.pathname.includes(ROUTES.MRKT) ?
                            <Link to={ROUTES.MRKT} className={clsx(s.item, s.current)}>
                                <Icon name="store_on" size={34} />
                                <span className={s.name}>mrkt</span>
                            </Link>
                            :
                            <Link to={ROUTES.MRKT} className={clsx(s.item)}>

                                <Icon name="store_off" size={34} />
                                <span className={s.name}>mrkt</span>
                            </Link>
                    }

                    {
                        location.pathname.includes(ROUTES.NVNT) ?
                            <Link to={ROUTES.NVNT} className={clsx(s.item, s.current)}>
                                <Icon name="inv_on" size={34} />
                                <span className={s.name}>nvnt</span>
                            </Link>
                            :
                            <Link to={ROUTES.NVNT} className={clsx(s.item)}>
                                <Icon name="inv_off" size={34} />
                                <span className={s.name}>nvnt</span>
                            </Link>
                    }

                    {
                        location.pathname.includes(ROUTES.PROFILE) ?
                            <Link to={ROUTES.PROFILE} className={clsx(s.item, s.current)}>
                                <Icon name="me_on" size={34} />
                                <span className={s.name}>me</span>
                            </Link>
                            :
                            <Link to={ROUTES.PROFILE} className={clsx(s.item)}>
                                <Icon name="me_off" size={34} />
                                <span className={s.name}>me</span>
                            </Link>
                    }



                </div>
            </div>
        </div>
    );
};