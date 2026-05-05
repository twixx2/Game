import { Link } from "react-router-dom";

import { RegisterAlready } from '@shared/ui';

import { LoginPassword, LoginUsername } from './ui';
import { useHelperLogin } from './model';

import s from './login.module.scss';

export const LoginPage = () => {
    const { isAuth, login, password, fail, loading, shown, signIn, getText, handleShown, typeLogin, typePassword } = useHelperLogin();

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

                    <LoginUsername login={login} onChange={typeLogin} />

                    <LoginPassword shown={shown} handleShown={handleShown} onChange={typePassword} password={password} />

                </div>

                <button onClick={signIn} disabled={!login || !password} className={s.loginBtn}>
                    proceed
                </button>

                <Link className={s.back} to="/">main</Link>

            </div>
        </>
    );
};