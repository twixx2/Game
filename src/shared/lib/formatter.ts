import { APP_CONFIG } from "@/core/conf";

interface formatProps {
    type?: "default" | "credits";
    isCompact?: boolean;
}

export const formatCurrency = (
    value: number,
    { type = "default", isCompact = false }: formatProps = {}
): string => {
    const symbol = APP_CONFIG.currency[type];

    const formatter = new Intl.NumberFormat("en", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        notation: isCompact ? "compact" : "standard",
    });
    return `${formatter.format(value)} ${symbol}`;
};