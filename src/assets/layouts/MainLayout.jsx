import { Outlet, Link, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import gamesInactive from '../img/games_inactive.svg';
import shopInactive from '../img/shop_inactive.svg';
import gamesActive from '../img/games_active.svg';
import invInactive from '../img/inv_inactive.svg';
import meInactive from '../img/me_inactive.svg';
import shopActive from '../img/shop_active.svg';
import invActive from '../img/inv_active.svg';
import meActive from '../img/me_active.svg';

export default function MainLayout() {
    const location = useLocation();


    return (
        <div className="main_layout">
            <Navigation />

            <main className="main_layout_content">
                <Outlet />
            </main>

            <div className="bottom_bar_container">
                <div className="bottom_bar_items">

                    {
                        location.pathname === "/" ?
                            <Link to="/" className="bottom_bar_item current">
                                <img src={gamesActive} alt="" />
                                <span className="bottom_bar_name">games</span>
                            </Link>
                            :
                            <Link to="/" className="bottom_bar_item">
                                <img src={gamesInactive} alt="" />
                                <span className="bottom_bar_name">games</span>
                            </Link>
                    }

                    {
                        location.pathname.includes("/store") ?
                            <Link to="/store" className="bottom_bar_item current">
                                <img src={shopActive} alt="" />
                                <span className="bottom_bar_name">store</span>
                            </Link>
                            :
                            <Link to="/store" className="bottom_bar_item">
                                <img src={shopInactive} alt="" />
                                <span className="bottom_bar_name">store</span>
                            </Link>
                    }

                    {
                        location.pathname.includes("/inv") ?
                            <Link to="/inv" className="bottom_bar_item current">
                                <img src={invActive} alt="" />
                                <span className="bottom_bar_name">inv</span>
                            </Link>
                            :
                            <Link to="/inv" className="bottom_bar_item">
                                <img src={invInactive} alt="" />
                                <span className="bottom_bar_name">inv</span>
                            </Link>
                    }

                    {
                        location.pathname.includes("/profile") ?
                            <Link to="/profile" className="bottom_bar_item current">
                                <img src={meActive} alt="" />
                                <span className="bottom_bar_name">me</span>
                            </Link>
                            :
                            <Link to="/profile" className="bottom_bar_item">
                                <img src={meInactive} alt="" />
                                <span className="bottom_bar_name">me</span>
                            </Link>
                    }



                </div>



            </div>
        </div>
    );

}