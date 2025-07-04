import './sapper.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

const SapperPage = () => {
    const url = import.meta.env.VITE_USER_API_URL;
    const userToken = localStorage.getItem("token");
    const navigate = useNavigate();
    const [cells, setCells] = useState([]);
    const [balance, setBalance] = useState(0);
    const [bet, setBet] = useState("");
    const [win, setWin] = useState(0);
    const [step, setStep] = useState(-1);
    const [mines, setMines] = useState([]);
    const [isPlay, setIsPlay] = useState(false);
    const [explodedCoins, setExplodedCoins] = useState([]);
    const [explodedMines, setExplodedMines] = useState([]);
    const [betError, setBetError] = useState("");
    const [userId, setUserId] = useState();
    const coeffs = [1.07, 1.22, 1.4, 1.62, 1.89, 2.22, 2.63, 3.15, 3.82, 4.7, 5.87, 7.47, 9.71, 12.94, 17.79, 25.41, 38.11, 60.97, 106.69, 213.38, 533.45, 2133.8]

    useEffect(() => {
        const fetchMines = async () => {
            try {
                const res = await axios.get(`${url}/cells`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setCells(res.data)

            } catch (err) {
                navigate("/")
            }
        }

        const fetchUser = async () => {
            try {
                const res = await axios.get(`${url}/auth_me`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setBalance(res.data.balance);
                setUserId(res.data.id)

            } catch (err) {
                navigate("/")
            }
        }

        fetchMines();
        fetchUser();
    }, [])

    const generateMines = () => {
        const mines = new Set();
        while (mines.size < 3) {
            const randomNum = Math.floor(Math.random() * 25) + 1;
            mines.add(randomNum);
        }
        return Array.from(mines);
    }

    const editBalance = async (newBalance) => {
        try {
            const res = await axios.patch(`${url}/users/${userId}`, {
                balance: newBalance
            });
        } catch (error) {

        }
    }

    const startGame = async () => {
        if (!isPlay) {
            if (bet) {
                const numericBet = Number(bet);
                if (!isNaN(numericBet) && numericBet > 0 && numericBet < 10000) {
                    if (numericBet <= balance) {
                        await editBalance(Math.round((balance - numericBet) * 100) / 100);
                        setBalance(prev => Math.round((prev - numericBet) * 100) / 100);
                        setWin(0);
                        setStep(0);
                        const newMines = generateMines();
                        setMines(newMines);
                        setIsPlay(true);
                        setExplodedCoins([]);
                        setExplodedMines([]);
                        setBetError("");
                    } else {
                        toast.error("Недостаточный баланс");
                    }
                } else {
                    setBetError("Ставка неккоректная");
                }
            } else {
                setBetError("Введите ставку");
            }
        } else {
            if (step !== -1) {
                if (step !== 0) {
                    setBalance(prev => Math.round((prev + win) * 100) / 100);
                    await editBalance(Math.round((balance + win) * 100) / 100);
                    setWin(0);
                    setStep(-1);
                    setBetError("");
                    setExplodedCoins([]);
                    setExplodedMines([]);
                    setIsPlay(false);
                } else {
                    toast.error("Сделайте хотя бы 1 ход");
                }
            } else {
                toast.error("Игра еще не начата");
            }
        }
    }

    const gameOver = () => {
        setExplodedCoins([]);
        setExplodedMines([]);
    }

    const handleClick = (cellId) => {
        if (!isPlay) return;
        if (!explodedCoins.includes(cellId)) {
            if (mines.includes(cellId)) {
                setExplodedMines(mines);
                setIsPlay(false);
                setWin(0);
                setStep(-1);
                setTimeout(() => {
                    gameOver();
                }, 850);
            } else {
                setExplodedCoins(prev => {
                    const next = [...prev, cellId];
                    const newStep = step + 1;
                    const newWin = Number(bet) * coeffs[newStep - 1];
                    setStep(newStep);
                    setWin(newWin);
                    if (next.length === cells.length - mines.length) {
                        finishGame(newWin);
                    }
                    return next;
                });
            }
        } else {
            return;
        }
    }

    const finishGame = async (payout) => {
        const newBalance = Math.round((balance + payout) * 100) / 100;
        await editBalance(newBalance);
        setBalance(newBalance);
        setIsPlay(false);
        setBetError("");
        setWin(0);
        setStep(-1);
        setExplodedCoins([]);
        setExplodedMines([]);
    }


    return (
        <div className="sapper_overlay">
            <nav className="nav">
                <div className="nav_content container">
                    <a href="#" className="nav_content_logo">Sapper</a>
                    <div className="balance_info">
                        <div className="balance_user">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M8 13v4H6v2h3v2h2v-2h2v2h2v-2.051c1.968-.249 3.5-1.915 3.5-3.949c0-1.32-.65-2.484-1.64-3.213A3.982 3.982 0 0 0 18 9c0-1.858-1.279-3.411-3-3.858V3h-2v2h-2V3H9v2H6v2h2zm6.5 4H10v-4h4.5c1.103 0 2 .897 2 2s-.897 2-2 2M10 7h4c1.103 0 2 .897 2 2s-.897 2-2 2h-4z" /></svg>                            <span className="balance_user_coins">{balance}</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="main">
                <section className="sapper_game">
                    <div className="sapper_content">
                        <div className="sapper_mines">
                            <div className="sapper_grid">
                                {cells.map((cell) => (
                                    <div
                                        key={cell.id}
                                        className={`sapper_cell ${explodedMines.includes(cell.id) ? "mine" :
                                            explodedCoins.includes(cell.id) ? "coin" : ""
                                            }`}
                                        onClick={() => handleClick(cell.id)}
                                    >
                                    </div>
                                ))}
                            </div>

                            <div className="sapper_coefs">
                                {coeffs.map((coef, i) => {
                                    const isPrev = step >= 1 && i < step;
                                    const isCurrent = step >= 0 && i === step;
                                    return (
                                        <div
                                            key={i}
                                            className={[
                                                "sapper_coef",
                                                isPrev ? "coef_prev" : "",
                                                isCurrent ? "coef_current" : ""
                                            ].join(" ")}
                                        >
                                            X{coef}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="sapper_mines_info">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#d6e316" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" /><path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1-1.8-1M12 7v10" /></g></svg>
                                    22
                                </span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ff3838" d="M8.65 22.8q-3.125 0-5.312-2.212T1.15 15.25t2.163-5.288T8.6 7.8h.325L9.6 6.625q.3-.55.9-.712t1.15.162l.75.425l.125-.2q.575-1.075 1.8-1.4t2.3.3l.875.5l-1 1.725l-.875-.5q-.35-.2-.763-.088t-.612.463l-.125.2l1 .575q.525.3.688.9t-.138 1.125L15 11.3q.575.9.863 1.913t.287 2.087q0 3.125-2.187 5.313T8.65 22.8M20 8.8v-2h3v2zm-5.5-5.5v-3h2v3zm4.875 2.025l-1.4-1.4L20.1 1.8l1.4 1.4z" /></svg>
                                    3
                                </span>
                            </div>


                            <div className="sapper_options">
                                <div className="sapper_bet">
                                    <span className="sapper_bet_info">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#33f049" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M9 14c0 1.657 2.686 3 6 3s6-1.343 6-3s-2.686-3-6-3s-6 1.343-6 3" /><path d="M9 14v4c0 1.656 2.686 3 6 3s6-1.344 6-3v-4M3 6c0 1.072 1.144 2.062 3 2.598s4.144.536 6 0c1.856-.536 3-1.526 3-2.598c0-1.072-1.144-2.062-3-2.598s-4.144-.536-6 0C4.144 3.938 3 4.928 3 6" /><path d="M3 6v10c0 .888.772 1.45 2 2" /><path d="M3 11c0 .888.772 1.45 2 2" /></g></svg>
                                        Сумма ставки
                                    </span>

                                    <input
                                        type="text"
                                        className='sapper_bet_input'
                                        value={bet}
                                        onChange={(e) => setBet(e.target.value)}
                                    />

                                    <span className={`error ${betError ? "active" : ""}`}>
                                        {betError}
                                    </span>

                                </div>
                            </div>

                            <button className="sapper_start_game" onClick={startGame}>
                                {isPlay
                                    ? `Забрать ${step > 0 ? win.toFixed(2) : bet}`
                                    : "Начать игру"}
                            </button>

                            <span className="tg_channel">@verybutterfly tgk ya znayu vsem poh</span>


                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default SapperPage;