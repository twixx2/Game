import s from "./loginUsername.module.scss";
interface LoginUsernameProps {
    login: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const LoginUsername = ({ login, onChange }: LoginUsernameProps) => (
    <input value={login} type="text" onChange={(e) => onChange(e)} maxLength={20} className={s.usernameInput} placeholder='username' />
);