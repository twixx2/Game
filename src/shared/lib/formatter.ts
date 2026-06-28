import { APP_CONFIG, CurrencyType } from "@/core/conf";
import Big from "big.js";

type FormatCurrencyProps = { type?: CurrencyType; isCompact?: boolean };

const cache = new Map<string, Intl.NumberFormat>();

const getFormatter = (isCompact: boolean): Intl.NumberFormat =>
    cache.get(isCompact ? "comp" : "std") ||
    cache.set(isCompact ? "comp" : "std", new Intl.NumberFormat("fr", { minimumFractionDigits: 0, maximumFractionDigits: 2, notation: isCompact ? "compact" : "standard" })).get(isCompact ? "comp" : "std")!;

export const formatCurrency = (value: Big, { type = "balance", isCompact = false }: FormatCurrencyProps = {}): string =>
    `${getFormatter(isCompact).format(value.round(2, Big.roundDown).toString() as any)} ${APP_CONFIG.currency[type]}`;
