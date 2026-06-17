import s from "./loginUsername.module.scss";
import { MAX_USERNAME_LENGTH } from "@shared/constants";

interface LoginUsernameProps {
    username: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const LoginUsername = ({ username, onChange }: LoginUsernameProps) => (
    <input value={username} type="text" onChange={(e) => onChange(e)} maxLength={MAX_USERNAME_LENGTH} className={s.usernameInput} placeholder='username' />
);