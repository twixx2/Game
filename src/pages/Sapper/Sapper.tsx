import { BalanceTitle, ErrorMessage, Loader, Page, SapperCoeffs, SapperButtons, Bet, SapperCells, LoginRequired } from "@shared/ui";

import { useHelperSapper } from './model';

import s from "./sapper.module.scss";

export const SapperPage = () => {

    const { cells, bet, error, win, step, isPlay, isAuth, loading, balance, explodedCoins, explodedMines, mineOptions, betError, mineCount, coeffs, startGame, handleClick, autoClick, setMineCount, typeBet } = useHelperSapper();

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <Page title="sapper" subtitle='when to stop?'>
            <BalanceTitle balance={balance} />
            <div className={s.sapper}>
                <SapperCells cells={cells} explodedMines={explodedMines} explodedCoins={explodedCoins} handleClick={handleClick} />

                <SapperCoeffs coeffs={coeffs} step={step} />

                {isAuth ?
                    <>
                        <Bet error={betError} value={bet} readOnly={isPlay} onChange={typeBet} />
                        <SapperButtons bet={bet} count={mineCount} step={step} win={win} options={mineOptions} isPlay={isPlay} actions={{ autoClick: autoClick, setOpt: setMineCount, startGame: startGame }} />
                    </>
                    : <LoginRequired />}

            </div>
        </Page>
    );
};