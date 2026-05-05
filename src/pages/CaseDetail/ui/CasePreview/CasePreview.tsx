import { CaseDetailInterface } from "@shared/types";
import s from "./casePreview.module.scss";

export const CasePreview = ({ c }: { c: CaseDetailInterface }) => {
    return (
        <div className={s.case}>
            <div className={s.image}>
                <img src={c.image} alt="" />
            </div>
        </div>
    );
}