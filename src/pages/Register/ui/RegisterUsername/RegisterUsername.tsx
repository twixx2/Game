import { MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH } from '@/shared/constants';
import { API_CONFIG, ROUTES } from '@/core/conf';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RegisterUsername.scss';

interface RegisterUsernameProps {
    onNext: () => void;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}

type UsernameStatus = "idle" | "taken" | "invalid" | "available"

export const RegisterUsername = ({ onNext, username, setUsername }: RegisterUsernameProps) => {
    const [status, setStatus] = useState<UsernameStatus>("idle");

    const typeUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        const regexPattern = `^[a-zA-Z0-9._-]{0,${MAX_USERNAME_LENGTH}}$`;
        const regex = new RegExp(regexPattern)

        if (regex.test(value) || value === '') {
            setUsername(value);
        }
    };

    const confirmLogin = (): void => {
        const regexPattern = `^(?=.*[a-zA-Z])[a-zA-Z0-9._-]{${MIN_USERNAME_LENGTH},${MAX_USERNAME_LENGTH}}$`;
        const regex = new RegExp(regexPattern);
        if (regex.test(username) && username) {
            onNext();
        } else {
            setStatus('invalid');
        };
    };

    useEffect(() => {
        if (!username) {
            setStatus("idle");
            return;
        }

        const regexPattern = `^(?=.*[a-zA-Z])[a-zA-Z0-9._-]{${MIN_USERNAME_LENGTH},${MAX_USERNAME_LENGTH}}$`;
        const regex = new RegExp(regexPattern);

        if (!regex.test(username)) {
            setStatus('invalid');
            return;
        }

        setStatus('available');

        // const timeout = setTimeout(() => {
        //     axios
        //         .get(`${API_CONFIG.BASE_URL}/users?fullName=${username}`)
        //         .then(res => {
        //             if (res?.data?.length === 0) {
        //                 setStatus("available");
        //             } else {
        //                 setStatus("taken");
        //             }
        //         })
        //         .catch(() => setStatus('error. try again'))
        // }, 500);

        // return () => clearTimeout(timeout);
    }, [username]);

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
                        <span className={`register_input_count ${username.length === MAX_USERNAME_LENGTH ? "danger" : username.length >= 28 ? "warning" : ""}`}>{username.length} / {MAX_USERNAME_LENGTH}</span>
                        <input onChange={(e) => typeUsername(e)} value={username} type="text" maxLength={MAX_USERNAME_LENGTH} className='register_username_input' placeholder='username' />
                        <span className={`register_username_input_status ${status}`}>{status !== "idle" ? status : null}</span>
                    </div>


                    <p className='register_username_hint'>you can always change it later</p>
                    <button disabled={status !== "available"} onClick={confirmLogin} className='register_username_btn'>
                        proceed
                    </button>
                    <Link className='register_username_btn_back' to={ROUTES.HOME}>main</Link>

                </div>
            </div>
        </>
    );
};