import s from "./bet.module.scss";
interface BetProps {
    value: Big;
    readOnly: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Bet = ({ value, onChange, readOnly }: BetProps) => (
    <div className={s.bet}>
        <span className={s.text}>
            Bet amount
        </span>

        <input type="text" className={s.input} value={new Intl.NumberFormat('fr').format(value.toString() as any)} onChange={(e) => onChange(e)} readOnly={readOnly} />
    </div>
);