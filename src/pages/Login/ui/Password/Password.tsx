import s from "./loginPassword.module.scss";
import { Icon } from "@shared/ui";
interface LoginPasswordInterface {
    password: string;
    shown: boolean

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleShown: () => void;
}

export const LoginPassword = ({ password, shown, handleShown, onChange }: LoginPasswordInterface) => (
    <div className={s.flexCont}>
        <input value={password} onChange={(e) => onChange(e)} type={shown ? "text" : "password"} className={s.passwordInput} placeholder='password' />

        <button onClick={handleShown} className={s.showBtn}>
            {shown ? <Icon name="eye_on" /> : <Icon name="eye_off" />}
        </button>
    </div>

);