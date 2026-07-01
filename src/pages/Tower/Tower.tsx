import { BalanceTitle, Page, Bet, LoginRequired, RandomHex, ProvablyFairPanel } from '@shared/ui';
import { usePlayer } from '@shared/hooks';
import { useAuth } from '@context/AuthContext';
import { TOWER_COEFFS } from '@shared/constants';

import { TowerButtons, TowerCells } from "./ui"
import { useHelperTower } from './model';

import s from './tower.module.scss';
import Big from 'big.js';

export const TowerPage = () => {
    const { bet, phase, game, isPlay, seed, loseStep, loseChoice, provablyFairData, createGame, openCell, blindShot, typeBet, rollNewSeed, setSeed } = useHelperTower();
    const { data: player } = usePlayer();
    const { isAuth } = useAuth();

    return (
        <Page title="tower" subtitle='higher means riskier'>
            <BalanceTitle balance={player?.wallet.balance ?? new Big("0")} />

            <div className={s.tower}>
                <TowerCells
                    bet={bet}
                    coeffs={TOWER_COEFFS}
                    picks={game?.picks ?? []}
                    step={game?.step ?? 0}
                    loseStep={loseStep}
                    loseChoice={loseChoice}
                    isPlay={isPlay}
                    openCell={openCell}
                />

                {isAuth ?
                    <>
                        <Bet onChange={typeBet} readOnly={isPlay} value={bet} />
                        <RandomHex value={seed} onChange={setSeed} reRoll={rollNewSeed} readOnly={isPlay} />
                        <TowerButtons
                            bet={bet}
                            profit={game?.profit ?? bet}
                            step={game?.step ?? 0}
                            isPlay={isPlay}
                            phase={phase}
                            actions={{ createGame, blindShot }}
                        />
                        <ProvablyFairPanel data={provablyFairData} />
                    </>
                    : <LoginRequired />}

            </div>
        </Page>
    );
};