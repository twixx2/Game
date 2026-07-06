import { ROUTES } from "@/core/conf";
import { CaseInterface, CaseTypeName } from "@shared/types";

import s from "./casesSection.module.scss";
import { Case } from "../Case/Case";

export const CasesSection = ({ type, cases }: { type: CaseTypeName, cases: CaseInterface[] }) => (
    <div id={type.toLowerCase().replace(/\s+/g, '-')} className={s.cases_section}>
        <h2 className={s.type}>{type}</h2>

        <div className={s.cases_container}>{cases.map((c) => (<Case key={c.hash} c={c} to={ROUTES.CASE(c.hash)} />))}</div>
    </div>
);