import { useState } from 'react';
import './RegisterPassword.scss';


const RegisterPassword = ({ onNext, onBack, password, setPassword }) => {
    const [status, setStatus] = useState('');
    const [shown, setShown] = useState(false);

    const checkPasswordStrength = (password) => {
        if (!password) return '';
        let score = 0;

        if (password.length >= 8) score++;
        if (password.length >= 12) score++;

        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        if (score <= 2) return 'weak';
        if (score <= 4) return 'medium';
        return 'strong';
    };

    const typePassword = (e) => {
        const regex = /^[a-zA-Z0-9!._#-]*$/;
        const value = e.target.value;
        if (regex.test(value)) {
            setPassword(value);
            setStatus(checkPasswordStrength(value));
        };
    };

    const confirmPassword = () => {
        const regex = /^[a-zA-Z0-9!._#-]+$/;
        if (regex.test(password) && password) {
            onNext();
        };
    };

    const handleShown = () => {
        setShown((prev) => !prev);
    };
    return (
        <>
            <div className='register_password'>
                <span className='register_step'>Step 2 / 3</span>

                <div className="register_password_content">
                    <h2 className='register_password_title'>
                        Make it secure
                    </h2>
                    <p className='register_password_text'>we never store your password in plain text</p>
                    <div className="register_password_input_block">
                        <input type={shown ? "text" : "password"} value={password} onChange={(e) => typePassword(e)} className='register_password_input' placeholder='password' />

                        <button
                            onClick={handleShown}
                            className='register_password_input_block_btn'>
                            {
                                !shown ?
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4d4d4d"><path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z" /></svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4d4d4d"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg>
                            }


                        </button>
                    </div>
                    <div className='register_password_input_status_block'>
                        <span className={`register_password_input_status ${status === "weak" ? "weak" : ""}`}>simple</span>
                        /
                        <span className={`register_password_input_status ${status === "medium" ? "medium" : ""}`}>better</span>
                        /
                        <span className={`register_password_input_status ${status === "strong" ? "strong" : ""}`}>best</span>
                    </div>


                    <button disabled={!password} onClick={confirmPassword} className='register_password_btn'>
                        Proceed
                    </button>
                    <button onClick={onBack} className='register_password_btn_back'>
                        Back
                    </button>
                </div>


            </div>
        </>
    );



};

export default RegisterPassword;