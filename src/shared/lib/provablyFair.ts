// FRONTEND_PROVABLY_FAIR_TS_CRYPTO_JS
import HmacSHA256 from "crypto-js/hmac-sha256";

import type { ProvablyFairData, VerifyStatus } from "@shared/types";

const SAPPER_FIELD_SIZE = 25;
const TOWER_STEPS = 8;


function wordArrayToBytes(words: { words: number[]; sigBytes: number }): number[] {
    const { words: w, sigBytes } = words;
    const bytes: number[] = [];
    for (let i = 0; i < sigBytes; i++) {
        const word = w[i >>> 2] ?? 0;
        bytes.push((word >>> (24 - (i % 4) * 8)) & 0xff);
    }
    return bytes;
}

function hmacSha256(key: string, message: string): number[] {
    return wordArrayToBytes(HmacSHA256(message, key));
}

function* minesByteStream(salt: string, clientSeed: string): Generator<number> {
    let index = 1;
    while (true) {
        const digest = hmacSha256(salt, `${clientSeed}_${index}`);
        yield* digest;
        index += 1;
    }
}

export function trueMines(salt: string, clientSeed: string, count: number): number[] {
    if (!(count >= 3 && count <= 24)) {
        throw new Error("count must be between 3 nd 24");
    }

    const pool = Array.from({ length: SAPPER_FIELD_SIZE }, (_, i) => i + 1);
    const byteStream = minesByteStream(salt, clientSeed);

    for (let i = pool.length - 1; i > 0; i--) {
        const numChoices = i + 1;
        const limit = Math.floor(256 / numChoices) * numChoices;
        while (true) {
            const { value: byte } = byteStream.next();
            if (byte === undefined) {
                continue;
            }
            if (byte < limit) {
                const j = byte % numChoices;
                const atI = pool[i];
                const atJ = pool[j];
                if (atI === undefined || atJ === undefined) {
                    throw new Error("invalid pool state");
                }
                pool[i] = atJ;
                pool[j] = atI;
                break;
            }
        }
    }

    return pool.slice(0, count);
}

export function trueTower(salt: string, clientSeed: string): number[] {
    const digest = hmacSha256(salt, clientSeed);
    const firstByte = digest[0];
    if (firstByte === undefined) {
        throw new Error("empty digest");
    }
    const binaryArray = Array.from({ length: TOWER_STEPS }, (_, i) => (firstByte >> i) & 1);
    return binaryArray;
}

export function sortPositions(nums: number[]): number[] {
    return [...nums].sort((a, b) => a - b);
}

export function positionsMatch(a: number[], b: number[]): boolean {
    if (a.length !== b.length) return false;
    const sortedA = sortPositions(a);
    const sortedB = sortPositions(b);
    return sortedA.every((value, index) => value === sortedB[index]);
}

export function arraysMatchOrdered(a: number[], b: number[]): boolean {
    return a.length === b.length && a.every((value, index) => value === b[index]);
}

function verifyPositions(data: ProvablyFairData): { computed: number[]; status: VerifyStatus } {
    const { salt, clientSeed, count, revealedPositions, saltStatus } = data;

    if (saltStatus !== 'revealed') {
        return { computed: [], status: 'idle' };
    }

    if (!count || !revealedPositions?.length) {
        return { computed: [], status: 'idle' };
    }

    try {
        const computed = trueMines(salt, clientSeed, count);
        const status = positionsMatch(computed, revealedPositions) ? 'verified' : 'mismatch';
        return { computed, status };
    } catch {
        return { computed: [], status: 'error' };
    }
}

export function verifySapperMines(data: ProvablyFairData): { computed: number[]; status: VerifyStatus } {
    return verifyPositions(data);
}

export function verifyMinehuntCoins(data: ProvablyFairData): { computed: number[]; status: VerifyStatus } {
    return verifyPositions(data);
}

export function verifyTowerPath(data: ProvablyFairData): { computed: number[]; status: VerifyStatus } {
    const { salt, clientSeed, revealedPositions, saltStatus } = data;

    if (saltStatus !== 'revealed') {
        return { computed: [], status: 'idle' };
    }

    if (!revealedPositions?.length) {
        return { computed: [], status: 'idle' };
    }

    try {
        const computed = trueTower(salt, clientSeed);
        const status = arraysMatchOrdered(computed, revealedPositions) ? 'verified' : 'mismatch';
        return { computed, status };
    } catch {
        return { computed: [], status: 'error' };
    }
}
