import { useCallback, useEffect, useMemo, useState } from "react";

import { verifyMinehuntCoins, verifySapperMines, verifyTowerPath } from "@shared/lib";
import type { ProvablyFairData, VerifyStatus } from "@shared/types";

export const useProvablyFairVerify = (data: ProvablyFairData | null) => {
    const [hasRun, setHasRun] = useState(false);

    useEffect(() => {
        setHasRun(false);
    }, [data?.hash, data?.salt, data?.clientSeed]);

    const canVerify = useMemo(() => {
        if (!data || data.saltStatus !== 'revealed' || !data.revealedPositions?.length) {
            return false;
        }

        if (data.gameType === 'tower') return true;

        return !!data.count;
    }, [data]);

    const result = useMemo(() => {
        if (!data || !canVerify || !hasRun) {
            return { computed: [] as number[], status: 'idle' as VerifyStatus };
        }

        if (data.gameType === 'sapper') {
            return verifySapperMines(data);
        }

        if (data.gameType === 'minehunt') {
            return verifyMinehuntCoins(data);
        }

        if (data.gameType === 'tower') {
            return verifyTowerPath(data);
        }

        return { computed: [] as number[], status: 'idle' as VerifyStatus };
    }, [data, canVerify, hasRun]);

    const runVerify = useCallback(() => {
        if (!canVerify) return;
        setHasRun(true);
    }, [canVerify]);

    const resetVerify = useCallback(() => {
        setHasRun(false);
    }, []);

    return {
        computedPositions: result.computed,
        verifyStatus: result.status,
        canVerify,
        hasRun,
        runVerify,
        resetVerify,
    };
};