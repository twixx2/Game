import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const RegisterAlready = () => {
    const { username } = useAuth();

    return (
        <>
            <div className="register_already">
                <h2 className="register_already_title">
                    aren't you {username} 
                </h2>

                <Link className='register_already_btn' to="/">yes i am</Link>
            </div>
        </>
    );

};

export default RegisterAlready;