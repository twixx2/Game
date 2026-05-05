import clsx from "clsx";
import s from "./sappercoeffs.module.scss";

export const SapperCoeffs = ({ coeffs, step }: { coeffs: number[]; step: number }) => (
    <div className={s.coeffs}>
        {coeffs.map((coef, i) => {
            const isPrev = step >= 1 && i < step;
            const isCurrent = step >= 0 && i === step;
            return (
                <div key={i} className={clsx(s.coeff, isPrev && s.prev, isCurrent && s.current)}>
                    x{coef}
                </div>
            );
        })}
    </div>
);