import { Link } from "react-router-dom";

import { RegisterAlready } from '@shared/ui';
import { ROUTES } from "@/core/conf";

import { LoginPassword, LoginUsername } from './ui';
import { useHelperLogin } from './model';

import s from './login.module.scss';
import { useAuth } from "@context";

export const LoginPage = () => {
    const { isAuth } = useAuth();
    const { username, password, fail, loading, shown, signIn, getText, handleShown, typeUsername, typePassword } = useHelperLogin();

    if (isAuth) return <RegisterAlready />;

    return (
        <>
            <div className={s.login}>
                <h2 className={s.title}>
                    {getText()}
                </h2>

                <p className={s.text}>
                    {loading ? "checkin'.." : fail ? fail : 'good to see you again'}
                </p>

                <div className={s.inputContent}>

                    <LoginUsername username={username} onChange={typeUsername} />

                    <LoginPassword shown={shown} handleShown={handleShown} onChange={typePassword} password={password} />

                </div>

                <button onClick={signIn} disabled={!username || !password} className={s.loginBtn}>
                    proceed
                </button>

                <Link className={s.back} to={ROUTES.HOME}>main</Link>

            </div>
        </>
    );
};