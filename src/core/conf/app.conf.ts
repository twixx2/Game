export const APP_CONFIG = {
    isActive: true,
    isMockMode: false,
    version: "1.1.2-stable",
    maintenanceMessage: "do we hope the project didnt die?",
    currency: {
        balance: "$",
        credits: "C",
    }

} as const;

type CurrencyConfig = typeof APP_CONFIG.currency;
export type CurrencyType = keyof CurrencyConfig;
export type CurrencySymbol = typeof APP_CONFIG.currency[keyof typeof APP_CONFIG.currency];