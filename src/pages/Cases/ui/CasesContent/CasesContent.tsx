import { CasesListResponse } from "@shared/types";
import { CasesSection } from "../CasesSection/CasesSection";

import s from "./casesContent.module.scss";

export const CasesContent = ({ casesData }: { casesData: CasesListResponse | null }) => {
    if (casesData === null || Object.keys(casesData).length === 0) return <h2 className={s.no_title}>nothing to roll, come back later</h2>

    return (
        <div className={s.cases_cont}>
            <div className={s.cases_types}>
                {Object.keys(casesData).map((type) => (
                    <a href={`#${type.toLowerCase().replace(/\s+/g, '-')}`} className={s.cases_type}>{type}</a>
                ))}
            </div>

            <div className={s.cases_section_container}>
                {Object.entries(casesData).map(([type, cases]) =>
                    <CasesSection key={type} type={type} cases={cases} />
                )}
            </div>
        </div>
    );
};