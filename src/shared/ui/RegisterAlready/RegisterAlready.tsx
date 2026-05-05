import { useAuth } from '@context/AuthContext';
import { Link } from 'react-router-dom';

export const RegisterAlready = () => {
    const { username } = useAuth();

    return (
        <>
            <div className="register_already">
                <h2 className="register_already_title">
                    aren't you {username}
                </h2>

                <Link className='register_already_btn' to="/">i am indeed</Link>
            </div>
        </>
    );

};