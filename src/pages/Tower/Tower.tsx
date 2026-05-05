import { BalanceTitle, ErrorMessage, Page, Bet, LoginRequired } from '@shared/ui';

import { useHelperTower } from './model';
import { TowerButtons, TowerCells } from "./ui"

import s from './tower.module.scss';

export const TowerPage = () => {
    const { coeffsTower, totalTowerSteps, bet, win, step, isPlay, tower, correctPicks, loseStep, betError, balance, isAuth, startGame, handlePick, autoPick, typeBet } = useHelperTower();

    return (
        <Page title="tower" subtitle='higher means riskier'>
            <BalanceTitle balance={balance} />

            <div className={s.tower}>
                <TowerCells bet={bet} coeffs={coeffsTower} correctPicks={correctPicks} totalSteps={totalTowerSteps} tower={tower} isPlay={isPlay} step={step} loseStep={loseStep} handlePick={handlePick} />

                {isAuth ?
                    <>
                        <Bet error={betError} onChange={typeBet} readOnly={isPlay} value={bet} />
                        <TowerButtons bet={bet} isPlay={isPlay} step={step} win={win} startGame={startGame} autoPick={autoPick} />
                    </>
                    : <LoginRequired />}

            </div>
        </Page>
    );
};