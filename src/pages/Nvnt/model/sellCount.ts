/** Digits only for free typing (no clamp). */
export function sanitizeSellCountInput(raw: string): string {
    return raw.replace(/\D/g, "");
}

/** Clamp sell quantity to [1, max] (digits-only if string). Use on blur / sell. */
export function clampSellCount(raw: string | number, max: unsigned): unsigned {
    const n = typeof raw === "string" ? parseInt(raw.replace(/\D/g, ""), 10) : raw;
    if (!Number.isFinite(n) || n < 1) return 1;
    return Math.min(Math.floor(n), Math.max(1, max)) as unsigned;
}
