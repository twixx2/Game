export type SaltStatus = 'unavailable' | 'hashed' | 'revealed';
export type VerifyStatus = 'idle' | 'pending' | 'verified' | 'mismatch' | 'error';

export type ProvablyFairGameType = 'sapper' | 'minehunt' | 'tower';

export interface ProvablyFairData {
    gameType: ProvablyFairGameType;
    hash: string;
    clientSeed: string;
    salt: string;
    saltStatus: SaltStatus;
    count?: number;
    revealedPositions?: number[];
    finished: boolean;
}