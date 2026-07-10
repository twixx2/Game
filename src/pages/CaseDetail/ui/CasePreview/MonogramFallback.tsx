import { CaseDetailInterface } from "@shared/types";
import s from "./casePreview.module.scss";

const getMonogramLetter = (name: string): string => {
    const letter = name.trim().charAt(0);
    return letter ? letter.toUpperCase() : "?";
};

export const MonogramFallback = ({ c }: { c: CaseDetailInterface }) => (
    <div className={s.fallback}>
        <span className={s.letter} aria-hidden="true">{getMonogramLetter(c.name)}</span>
        <span className={s.name}>{c.name}</span>
    </div>
);