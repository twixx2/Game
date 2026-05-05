import clsx from "clsx";
import s from "./bet.module.scss";
interface BetProps {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readOnly: boolean;
    error: string;
}

export const Bet = ({ value, onChange, readOnly, error }: BetProps) => (
    <div className={s.bet}>
        <span className={s.text}>
            Bet amount
        </span>

        <input type="text" className={s.input} value={new Intl.NumberFormat('en').format(value)} onChange={(e) => onChange(e)} readOnly={readOnly} />

        <span className={clsx(s.error, error && s.active)}>
            {error}
        </span>

    </div>
);