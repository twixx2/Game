import { BalanceTitle, ErrorMessage, Loader, Page, SapperCoeffs, SapperButtons, Bet, SapperCells, LoginRequired } from "@shared/ui";

import { useHelperMinehunt } from './model';

import s from './minehunt.module.scss';

export const MinehuntPage = () => {

    const { step, win, balance, bet, betError, cellCount, cells, coeffs, coinsOptions, error, explodedCoins, explodedMines, isPlay, isAuth, loading, handleClick, startGame, autoClick, typeBet, setCellCount } = useHelperMinehunt();

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <Page title="minehunt" subtitle="?/3" >
            <BalanceTitle balance={balance} />
            <div className={s.minehunt}>

                <SapperCells cells={cells} explodedMines={explodedCoins} explodedCoins={explodedMines} handleClick={handleClick} />

                <SapperCoeffs coeffs={coeffs} step={step} />


                {isAuth ?
                    <>
                        <Bet error={betError} value={bet} readOnly={isPlay} onChange={typeBet} />
                        <SapperButtons bet={bet} count={cellCount} step={step} win={win} options={coinsOptions} isPlay={isPlay} actions={{ autoClick: autoClick, setOpt: setCellCount, startGame: startGame }} />
                    </>
                    : <LoginRequired />}

            </div>
        </Page>
    );
};