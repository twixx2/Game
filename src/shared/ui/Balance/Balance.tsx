import { formatCurrency } from "@shared/lib";
interface BalanceProps {
    balance: number;
    type?: "default" | "credits";
    isCompact?: boolean
};

export const BalanceTitle = ({ balance, type = "default", isCompact = false }: BalanceProps) => (
    <h2 className="balance">
        {formatCurrency(balance, { type: type, isCompact: isCompact })}
    </h2>
);