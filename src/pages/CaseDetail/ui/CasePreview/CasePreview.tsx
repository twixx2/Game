import { useEffect, useState } from "react";

import { CaseDetailInterface } from "@shared/types";
import { MonogramFallback } from "./MonogramFallback";
import s from "./casePreview.module.scss";

export const CasePreview = ({ c }: { c: CaseDetailInterface }) => {
    const [hasError, setHasError] = useState(false);

    const showFallback = hasError || !c.image;

    useEffect(() => {
        setHasError(false);
    }, [c.image]);

    return (
        <div className={s.case}>
            <div className={s.image}>
                {showFallback ? (
                    <MonogramFallback c={c} />
                ) : (
                    <img src={c.image} alt="" onError={() => setHasError(true)} />
                )}
            </div>
        </div>
    );
};