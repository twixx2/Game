import { CaseAsset, CaseDetailInterface } from "@shared/types";
import { toast } from "@shared/ui";
import { usePlayer } from "@shared/hooks";

import { useState, useEffect, useRef, type RefObject } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAxiosError } from "axios";

import { fetcherCase, fetcherOpenCase } from "../api";
import { ANIM_MS, buildQueue, getSlotOffset } from "./lottery";

const REF_WAIT_MAX_FRAMES = 60;

const waitForRefs = (
    frameRef: RefObject<HTMLDivElement | null>,
    trackRef: RefObject<HTMLDivElement | null>,
): Promise<boolean> =>
    new Promise(resolve => {
        let attempts = 0;

        const tick = (): void => {
            if (frameRef.current && trackRef.current) return resolve(true);
            if (++attempts >= REF_WAIT_MAX_FRAMES) return resolve(false);
            requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    });

export const useHelperCase = () => {
    const frameRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [c, setCase] = useState<CaseDetailInterface | null>(null);
    const [queue, setQueue] = useState<CaseAsset[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [rolling, setRolling] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [received, setReceived] = useState<CaseAsset | null>(null);
    const [openedHash, setOpenedHash] = useState<string | null>(null);

    const { caseHash } = useParams<{ caseHash: string }>();
    const navigate = useNavigate();
    const { syncWallet } = usePlayer();

    useEffect(() => {
        if (!caseHash) return;
        setLoading(true);
        fetcherCase(caseHash)
            .then(r => setCase(r))
            .catch(err => {
                if (!isAxiosError(err)) return toast("Failed loading case");
                toast(err.response?.data?.detail ?? "Failed loading case");
            })
            .finally(() => setLoading(false));
    }, [caseHash]);

    const clearAnimTimer = (): void => {
        if (animTimerRef.current) {
            clearTimeout(animTimerRef.current);
            animTimerRef.current = null;
        }
    };

    const finishRoll = (): void => {
        clearAnimTimer();
        setRolling(false);
        setIsOpen(true);
    };

    const onTransitionEnd = (e: TransitionEvent): void => {
        if (e.propertyName !== "transform") return;
        finishRoll();
    };

    const resetTrackStyles = (): void => {
        const trackEl = trackRef.current;
        if (!trackEl) return;

        trackEl.removeEventListener("transitionend", onTransitionEnd);
        trackEl.style.transition = "none";
        trackEl.style.transform = "translateX(0px)";
    };

    const clearAnim = (): void => {
        clearAnimTimer();
        resetTrackStyles();
        setQueue([]);
    };

    const runAnimation = (): Promise<boolean> => {
        const frameEl = frameRef.current;
        const trackEl = trackRef.current;

        if (!frameEl || !trackEl) return Promise.resolve(false);

        const offset = getSlotOffset(frameEl.clientWidth);

        trackEl.removeEventListener("transitionend", onTransitionEnd);
        trackEl.style.transition = "none";
        trackEl.style.transform = "translateX(0px)";

        void trackEl.offsetWidth;

        return new Promise<void>(r => requestAnimationFrame(() => r()))
            .then(() => {
                trackEl.addEventListener("transitionend", onTransitionEnd);
                trackEl.style.transition = `transform ${ANIM_MS}ms ease-out`;
                trackEl.style.transform = `translateX(-${offset}px)`;
                animTimerRef.current = setTimeout(finishRoll, ANIM_MS + 150);
                return true;
            });
    };

    const showResultWithoutAnimation = (): void => {
        clearAnimTimer();
        setRolling(false);
        setIsOpen(true);
    };

    const resetResult = (): void => {
        clearAnim();
        setRolling(false);
        setIsOpen(false);
        setReceived(null);
        setOpenedHash(null);
    };

    const openCase = (): void => {
        if (rolling || !c || !caseHash || !c.assets.length) return;

        setIsOpen(false);
        setRolling(true);
        clearAnimTimer();
        resetTrackStyles();

        fetcherOpenCase(caseHash)
            .then(r => {
                syncWallet("balance", r.updated_balance);
                setReceived(r.asset);
                setOpenedHash(r.hash);
                setQueue(buildQueue(c, r.asset));

                return waitForRefs(frameRef, trackRef);
            })
            .then(refsReady => {
                if (!refsReady) {
                    showResultWithoutAnimation();
                    return;
                }

                return runAnimation()
                    .then(started => {
                        if (!started) showResultWithoutAnimation();
                    });
            })
            .catch(err => {
                setRolling(false);

                if (received) setIsOpen(true);

                if (!isAxiosError(err)) return toast("Failed to open case");

                const statusCode = err.response?.status;
                const code = err.response?.data?.code;

                switch (true) {
                    case statusCode === 402 && code === "not_enough_funds":
                        return toast("Insufficient balance", { text: "see our bonuses", onClick: () => navigate("/#bonuses") });
                    default:
                        return toast(err.response?.data?.detail ?? "Failed to open case");
                }
            });
    };

    const openAgain = (): void => {
        openCase();
    };

    const sellReceived = (): void => {
        // inventory / instant sell not wired yet
    };

    const receive = (): void => {
        resetResult();
    };

    useEffect(() => () => {
        clearAnimTimer();
        resetTrackStyles();
    }, []);

    return { frameRef, trackRef, c, rolling, queue, loading, isOpen, received, openedHash, openAgain, openCase, sellReceived, receive };
};

export type UseHelperCaseReturn = ReturnType<typeof useHelperCase>;