import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RegisterUsername.scss';

interface RegisterUsernameProps {
    onNext: () => void;
    login: string;
    setLogin: React.Dispatch<React.SetStateAction<string>>;
}


export const RegisterUsername = ({ onNext, login, setLogin }: RegisterUsernameProps) => {
    const [status, setStatus] = useState<string>('');
    const url = import.meta.env.VITE_USER_API_URL;

    const typeLogin = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9._-]{0,20}$/;

        if (regex.test(value) || value === '') {
            setLogin(value);
        }
    };

    const confirmLogin = (): void => {
        const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9._-]{1,20}$/;
        if (loginRegex.test(login) && login) {
            onNext();
        } else {
            setStatus('invalid');
        };
    };

    useEffect(() => {
        if (!login) {
            setStatus('');
            return;
        }

        const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9._-]{1,20}$/;

        if (!regex.test(login)) {
            setStatus('invalid');
            return;
        }

        setStatus('checking...');

        const timeout = setTimeout(() => {
            axios
                .get(`${url}/users?fullName=${login}`)
                .then(res => {
                    if (res?.data?.length === 0) {
                        setStatus("available");
                    } else {
                        setStatus("taken");
                    }
                })
                .catch(() => setStatus('error. try again'))
        }, 500);

        return () => clearTimeout(timeout);
    }, [login]);

    return (
        <>
            <div className='register_username'>

                <span className='register_step'>Step 1 / 3</span>



                <div className="register_username_content">
                    <h2 className='register_username_title'>
                        Pick a <span>name</span>
                    </h2>
                    <p className='register_username_text'>something people will remember you by</p>
                    <div className="register_username_input_block">
                        <span className={`register_input_count ${login.length === 20 ? "danger" : login.length >= 16 ? "warning" : ""}`}>{login.length} / 20</span>
                        <input onChange={(e) => typeLogin(e)} value={login} type="text" maxLength={20} className='register_username_input' placeholder='username' />
                        <span className={`register_username_input_status ${status}`}>{status ? status : null}</span>
                    </div>


                    <p className='register_username_hint'>you can always change it later</p>
                    <button disabled={status !== "available"} onClick={confirmLogin} className='register_username_btn'>
                        proceed
                    </button>
                    <Link className='register_username_btn_back' to="/">main</Link>

                </div>


            </div>
        </>
    );



};