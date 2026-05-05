import { useNavigate } from 'react-router-dom';
import s from './errorMessage.module.scss';
import { Page } from '../Page/Page';

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message = "unknown error" }: ErrorMessageProps) => {
    const navigate = useNavigate();

    return (
        <Page title="error" subtitle="but that's okay">
            <div className={s.error}>
                <h3 className={s.code}>{message}</h3>
                <p className={s.message}>
                    looks like you got lost
                </p>
                
                <button className={s.btn} onClick={() => navigate("/")}>
                    home
                </button>
            </div>
        </Page>
    );
};