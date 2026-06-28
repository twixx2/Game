import { BalanceTitle, Page, SapperCoeffs, SapperButtons, Bet, RandomHex, SapperCells, LoginRequired } from "@shared/ui";
import { usePlayer } from "@shared/hooks";
import { useAuth } from "@context";

import { useHelperSapper } from './model';
import s from "./sapper.module.scss";

import Big from "big.js";

export const SapperPage = () => {

    const { bet, phase, game, isPlay, mineOptions, minesCount, coeffs, seed, createGame, openCell, blindShot, setMinesCount, typeBet, rollNewSeed, setSeed } = useHelperSapper();
    const { data: player } = usePlayer();
    const { isAuth } = useAuth();

    return (
        <Page title="sapper" subtitle='when to stop?'>
            <BalanceTitle balance={player?.wallet.balance ?? new Big("0")} />
            <div className={s.sapper}>
                <SapperCells openCell={openCell} exploredCoins={game?.exploredCoins ?? []} exploredMines={game?.exploredMines ?? []} />

                <SapperCoeffs coeffs={coeffs} step={game?.step ?? -1} />

                {isAuth ?
                    <>
                        <Bet value={bet} readOnly={isPlay} onChange={typeBet} />
                        <RandomHex value={seed} onChange={setSeed} reRoll={rollNewSeed} readOnly={isPlay} />
                        <SapperButtons phase={phase} bet={bet} count={game?.minesCount ?? minesCount} step={game?.step ?? 0} profit={game?.profit ?? bet} options={mineOptions} isPlay={isPlay} actions={{ blindShot: blindShot, setOpt: setMinesCount, createGame: createGame }} />
                    </>
                    : <LoginRequired />}

            </div>
        </Page>
    );
};