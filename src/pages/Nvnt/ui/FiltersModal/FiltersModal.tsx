import { useDragControls, type PanInfo } from "framer-motion";
import { motion } from "@shared/motion";
import type { NvntFilters, NvntFilterToggle } from "@shared/types";
import clsx from "clsx";

import s from "./filtersmodal.module.scss";

interface FiltersModalProps {
    filters: NvntFilters;
    updateFilters: <K extends keyof NvntFilters>(key: K, value: NvntFilters[K]) => void;
    onClose: () => void;
    onReset: () => void;
}

type SortOption = NvntFilters["sortBy"];

const SORT_OPTIONS: { value: SortOption; label: string; hint: string }[] = [
    { value: "date_desc", label: "Newest", hint: "Latest first" },
    { value: "date_asc", label: "Oldest", hint: "First obtained" },
    { value: "price_desc", label: "Price ↓", hint: "High to low" },
    { value: "price_asc", label: "Price ↑", hint: "Low to high" },
];

const TOGGLE_OPTIONS: { value: NvntFilterToggle; label: string }[] = [
    { value: "all", label: "All" },
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
];

const TOGGLE_SECTIONS: {
    key: "tradeLocked" | "saleable" | "stackable";
    title: string;
    yesLabel: string;
    noLabel: string;
}[] = [
    {
        key: "tradeLocked",
        title: "Trade lock",
        yesLabel: "Locked",
        noLabel: "Free",
    },
    {
        key: "saleable",
        title: "Saleable",
        yesLabel: "Can sell",
        noLabel: "Can't sell",
    },
    {
        key: "stackable",
        title: "Stackable",
        yesLabel: "Stack",
        noLabel: "Unique",
    },
];

const toggleLabel = (
    section: (typeof TOGGLE_SECTIONS)[number],
    value: NvntFilterToggle,
): string => {
    if (value === "all") return "All";
    if (value === "yes") return section.yesLabel;
    return section.noLabel;
};

export const FiltersModal = ({ filters, updateFilters, onClose, onReset }: FiltersModalProps) => {
    const dragControls = useDragControls();

    const handleDragEnd = (
        _event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo,
    ): void => {
        if (info.offset.y > 120 || info.velocity.y > 500) {
            onClose();
        }
    };

    const hasDrawerFilters =
        filters.tradeLocked !== "all"
        || filters.saleable !== "all"
        || filters.stackable !== "all"
        || filters.sortBy !== "date_desc";

    return (
        <>
            <motion.div
                className={s.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.55 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            <motion.div
                className={s.overlay}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.28 }}
                drag="y"
                dragControls={dragControls}
                dragListener={false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.45 }}
                onDragEnd={handleDragEnd}
            >
                <div
                    className={s.dragZone}
                    onPointerDown={(e) => dragControls.start(e)}
                >
                    <div className={s.dragHandle} />
                    <header className={s.header}>
                        <h2 className={s.title}>Filters</h2>
                        <button type="button" className={s.doneBtn} onClick={onClose}>
                            Done
                        </button>
                    </header>
                </div>

                <div className={s.body}>
                    <section className={s.section}>
                        <h3 className={s.sectionTitle}>Sort by</h3>
                        <div className={s.sortGrid}>
                            {SORT_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    className={clsx(s.sortCard, filters.sortBy === opt.value && s.active)}
                                    onClick={() => updateFilters("sortBy", opt.value)}
                                >
                                    <span className={s.sortLabel}>{opt.label}</span>
                                    <span className={s.sortHint}>{opt.hint}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {TOGGLE_SECTIONS.map((section) => (
                        <section key={section.key} className={s.section}>
                            <h3 className={s.sectionTitle}>{section.title}</h3>
                            <div className={s.segment}>
                                {TOGGLE_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        className={clsx(
                                            s.segmentBtn,
                                            filters[section.key] === opt.value && s.active,
                                        )}
                                        onClick={() => updateFilters(section.key, opt.value)}
                                    >
                                        {toggleLabel(section, opt.value)}
                                    </button>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <footer className={s.footer}>
                    <button
                        type="button"
                        className={clsx(s.resetBtn, !hasDrawerFilters && s.muted)}
                        onClick={onReset}
                        disabled={!hasDrawerFilters}
                    >
                        Reset
                    </button>
                    <button type="button" className={s.applyBtn} onClick={onClose}>
                        Show results
                    </button>
                </footer>
            </motion.div>
        </>
    );
};
