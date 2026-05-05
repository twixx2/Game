import { HomeGames, HomeBonuses, HomeRedirect, HomeStats, HomeAbout } from './ui';
import { useHelperHome } from './model';

import { ROUTES } from '@/core/conf';
import { Page } from '@shared/ui';

import { Link } from 'react-router-dom';

import s from './home.module.scss';
import clsx from 'clsx';

export const HomePage = () => {

    const { isAuth } = useHelperHome();


    return (
        <Page title='chncd' subtitle='brutal'>
            <div className={s.home}>

                {isAuth === false && (
                    <section className={s.authorize}>
                        <Link to={ROUTES.REGISTER} className={clsx(s.authorize_btn, s.btn_register)}>
                            register
                        </Link>

                        <Link to={ROUTES.LOGIN} className={clsx(s.authorize_btn, s.btn_login)}>
                            login
                        </Link>
                    </section>
                )}
                <HomeGames />
                <HomeBonuses />
                <HomeRedirect />
                <HomeStats />
                <HomeAbout />

            </div>
        </Page >

    );
};