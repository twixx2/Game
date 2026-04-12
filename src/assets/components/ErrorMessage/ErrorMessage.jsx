import { useNavigate } from 'react-router-dom';
import './ErrorMessage.scss';

const ErrorMessage = ({ message }) => {
    const navigate = useNavigate();
    return (
        <div className="error_page">

            <h3 className="error_code">{message}</h3>

            <p className="error_message">
                looks like you got lost
            </p>

            <button className="error_btn" onClick={() => navigate("/")}>
                close this fucking error
            </button>

        </div>
    );
}

export default ErrorMessage;