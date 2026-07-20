import type { AllowedNvntModelNames, NvntResponse } from "@shared/types"

import s from "./nvntTypes.module.scss";
import clsx from "clsx";

interface NvntTypesProps {
    NAMES_MAP: Record<AllowedNvntModelNames, string>;
    nvntData: NvntResponse | undefined;
    tab: AllowedNvntModelNames;
    onChange: (val: AllowedNvntModelNames) => void;
}

export const NvntTypes = ({ nvntData, tab, NAMES_MAP, onChange }: NvntTypesProps) => {
    if (!nvntData) return null;
    const allTabs = Object.keys(nvntData) as AllowedNvntModelNames[];


    return (
        <div className={s.tabs}>
            {allTabs.map((key) => {
                const label = NAMES_MAP[key] || key;
                return (
                    <button key={key} className={clsx(s.tab, tab === key && s.current)} onClick={() => onChange(key)}>{label}</button>
                );
            })}
        </div>
    );
};