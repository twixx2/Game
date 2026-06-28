import { BalanceTitle, Page, SapperCoeffs, SapperButtons, Bet, RandomHex, SapperCells, LoginRequired } from "@shared/ui";

import { usePlayer } from "@shared/hooks";
import { useAuth } from "@context";

import { useHelperMinehunt } from './model';
import s from './minehunt.module.scss';

import Big from "big.js";

export const MinehuntPage = () => {

    const { bet, phase, game, isPlay, coinsOptions, coinsCount, coeffs, seed, createGame, openCell, blindShot, setCoinsCount, typeBet, rollNewSeed, setSeed } = useHelperMinehunt();
    const { data: player } = usePlayer();
    const { isAuth } = useAuth();

    return (
        <Page title="minehunt" subtitle="?/3" >
            <BalanceTitle balance={player?.wallet.balance ?? new Big("0")} />
            <div className={s.minehunt}>
                <SapperCells openCell={openCell} exploredCoins={game?.exploredCoins ?? []} exploredMines={game?.exploredMines ?? []} />

                <SapperCoeffs coeffs={coeffs} step={game?.step ?? -1} />

                {isAuth ?
                    <>
                        <Bet value={bet} readOnly={isPlay} onChange={typeBet} />
                        <RandomHex value={seed} onChange={setSeed} reRoll={rollNewSeed} readOnly={isPlay} />
                        <SapperButtons phase={phase} bet={bet} count={game?.coinsCount ?? coinsCount} step={game?.step ?? 0} profit={game?.profit ?? bet} options={coinsOptions} isPlay={isPlay} actions={{ blindShot: blindShot, setOpt: setCoinsCount, createGame: createGame }} />
                    </>
                    : <LoginRequired />}

            </div>
        </Page>
    );
};