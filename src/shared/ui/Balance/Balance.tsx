import { formatCurrency } from "@shared/lib";
import { CurrencyType } from "@/core/conf";
import Big from "big.js";
interface BalanceProps {
    balance: Big;
    type?: CurrencyType;
    isCompact?: boolean
};

export const BalanceTitle = ({ balance, type = "balance", isCompact = false }: BalanceProps) => (
    <h2 className="balance">
        {formatCurrency(balance, { type: type, isCompact: isCompact })}
    </h2>
);