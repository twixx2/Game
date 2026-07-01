import { useCallback, useEffect, useMemo, useState } from "react";

import { verifySapperMines } from "@shared/lib";
import type { ProvablyFairData, VerifyStatus } from "@shared/types";

export const useProvablyFairVerify = (data: ProvablyFairData | null) => {
    const [hasRun, setHasRun] = useState(false);

    useEffect(() => {
        setHasRun(false);
    }, [data?.hash, data?.salt, data?.clientSeed]);

    const canVerify = useMemo(() => {
        if (!data) return false;
        return (
            data.saltStatus === 'revealed' &&
            !!data.count &&
            !!data.revealedPositions?.length
        );
    }, [data]);

    const result = useMemo(() => {
        if (!data || !canVerify || !hasRun) {
            return { computed: [] as number[], status: 'idle' as VerifyStatus };
        }

        if (data.gameType === 'sapper') {
            return verifySapperMines(data);
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