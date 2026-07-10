import { CaseAsset, CaseDetailInterface, CaseRarityName } from "@shared/types";

export const WIN_INDEX = 20;
export const BUFFER_AFTER = 5;
export const SLOT_WIDTH = 195;
export const SLOT_MARGIN = 4;
export const ANIM_MS = 3000;

export const pickRarity = (weights: Partial<Record<CaseRarityName, number>>): CaseRarityName => {
    const entries = Object.entries(weights).filter(([, v]) => v && v > 0) as [CaseRarityName, number][];

    if (!entries.length) throw new Error("Empty rarity weights");

    const total = entries.reduce((sum, [, v]) => sum + v, 0);
    const roll = Math.floor(Math.random() * total) + 1;

    let current = 0;
    for (const [rarity, weight] of entries) {
        current += weight;
        if (roll <= current) return rarity;
    }

    throw new Error("Lottery loop failed with no matches");
};

export const pickRandomAsset = (c: CaseDetailInterface): CaseAsset => {
    const rarity = pickRarity(c.rarity_weights);
    const pool = c.assets.filter(a => a.rarity === rarity);

    if (!pool.length) throw new Error(`No assets found for rarity: ${rarity}`);

    return pool[Math.floor(Math.random() * pool.length)]!;
};

export const buildQueue = (c: CaseDetailInterface, winAsset: CaseAsset): CaseAsset[] => {
    const before = Array.from({ length: WIN_INDEX }, () => pickRandomAsset(c));
    const after = Array.from({ length: BUFFER_AFTER }, () => pickRandomAsset(c));

    return [...before, winAsset, ...after];
};

export const getAssetChance = (c: CaseDetailInterface, asset: CaseAsset): number => {
    const total = Object.values(c.rarity_weights).reduce<number>((sum, w) => sum + (w ?? 0), 0);
    const rarityWeight = c.rarity_weights[asset.rarity] ?? 0;
    const sameRarityCount = c.assets.filter(a => a.rarity === asset.rarity).length;

    if (!total || !sameRarityCount || !rarityWeight) return 0;

    return (rarityWeight / total / sameRarityCount) * 100;
};

export const formatChance = (chance: number): string => {
    const rounded = chance.toFixed(2);
    return `%${rounded.replace(/\.?0+$/, "")}`;
};

export const getSlotOffset = (frameWidth: number): number => {
    const slotCenter = WIN_INDEX * (SLOT_WIDTH + SLOT_MARGIN * 2) + SLOT_MARGIN + SLOT_WIDTH / 2;
    return slotCenter - frameWidth / 2;
};