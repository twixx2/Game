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
    const [username, setUsername] = useState();
    const [mineCount, setMineCount] = useState(3);
    const mineOptions = [3, 5, 7, 13, 19, 24]
    const coeffsMap = {
        3: [1.07, 1.22, 1.4, 1.62, 1.89, 2.22, 2.63, 3.15, 3.82, 4.7, 5.87, 7.47, 9.71, 12.94, 17.79, 25.41, 38.11, 60.97, 106.69, 213.38, 533.45, 2133.8],
        5: [1.18, 1.49, 1.9, 2.45, 3.21, 4.28, 5.8, 8.03, 11.37, 16.53, 24.79, 38.56, 62.66, 107.41, 196.91, 393.82, 886.09, 2362.9, 8270.15, 49620.9],
        7: [1.31, 1.84, 2.64, 3.87, 5.8, 8.92, 14.12, 23.1, 39.27, 69.81, 130.89, 261.78, 567.19, 1361.25, 3743.43, 12478.1, 56151.45, 449211.6],
        13: [1.97, 4.29, 9.86, 24.1, 63.26, 180.74, 572.34, 2060.42, 8756.78, 46_702.82, 350_271.15, 4_903_796.1],
        19: [3.95, 18.96, 109.02, 799.48, 8394.54, 167_890.8],
        24: [23.75]
    };
    const coeffs = coeffsMap[mineCount];
    const STORAGE_KEY = "sapper-game-state";

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const s = JSON.parse(saved);
                setIsPlay(s.isPlay);
                setMineCount(s.mineCount);
                setBet(s.bet);
                setMines(s.mines);
                setExplodedCoins(s.explodedCoins);
                setStep(s.step);
                setWin(s.win);
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }

        const fetchMines = async () => {
            try {
                const res = await axios.get(`${url}/cells`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setCells(res.data)

            } catch (err) {
                void err;
                navigate("/register")
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
                setUserId(res.data.id);
                setUsername(res.data.fullName);
            } catch (err) {
                void err;
                navigate("/register")
            }
        }

        fetchMines();
        fetchUser();
    }, [])

    useEffect(() => {
        if (!username) return;
        const getDate = () => {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${day}.${month}.2025, ${hours}:${minutes}:${seconds} on /sapper`;
        }
        const lastCeen = async () => {
            try {
                const lastceen = getDate();
                const res = await axios.post(`${url}/lastceens`, {
                    lastceen: lastceen,
                    name: username
                });
                void res;
            } catch (err) {
                void err;
            }
        }
        lastCeen();
    }, [username])

    const generateMines = () => {
        const mines = new Set();
        while (mines.size < mineCount) {
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
            void res;
        } catch (error) {
            void error;
        }
    }

    const startGame = async () => {
        if (!isPlay) {
            if (!bet) return setBetError("Введите ставку");
            const numericBet = Number(bet);
            if (isNaN(numericBet) || bet.startsWith('+') || bet.startsWith("-")) return setBetError("Ставка неккоректная");
            if (numericBet < 1) return setBetError(`Ставка не может быть меньше 1`);
            if (numericBet > 10000) return setBetError("Макс ставка - 10.000");
            if (numericBet > balance) return toast.error("Недостаточный баланс");
            // Начало игры 
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
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                isPlay: true,
                mineCount,
                bet,
                mines: newMines,
                explodedCoins: [],
                step: 0,
                win: 0
            }));
        } else {
            if (step === -1) return toast.error("Игра еще не начата");
            if (step === 0) return toast.error("Сделайте хотя бы 1 ход"); // если игра начата но не сделан первый ход
            // Предварительно забрать выигрыш 
            setBalance(prev => Math.round((prev + win) * 100) / 100);
            await editBalance(Math.round((balance + win) * 100) / 100);
            localStorage.removeItem(STORAGE_KEY);
            setIsPlay(false);
            clearAll();
        }
    }

    const clearAll = () => {
        setWin(0);
        setStep(-1);
        setExplodedCoins([]);
        setExplodedMines([]);
    }

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleClick = async (cellId) => {
        if (!isPlay) return;
        if (explodedCoins.includes(cellId)) return;
        await delay(65);
        if (mines.includes(cellId)) {
            // Если была выбрата мина - игра заканчивается 
            setExplodedMines(mines);
            setIsPlay(false);
            setWin(0);
            setStep(-1);
            setTimeout(() => {
                setExplodedCoins([]);
                setExplodedMines([]);
            }, 850);
            localStorage.removeItem(STORAGE_KEY);  // Удаление игры полностью
        } else {
            // Если выбрана не мина 
            setExplodedCoins(prev => {
                const next = [...prev, cellId];
                const newStep = step + 1;
                const newWin = Number(bet) * coeffs[newStep - 1];
                setStep(newStep);
                setWin(newWin);
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    isPlay: true,
                    mineCount,
                    bet,
                    mines,
                    explodedCoins: next,
                    step: newStep,
                    win: newWin
                }));  // Обновление состояния

                // Если игрок прошел игру 
                if (next.length === cells.length - mines.length) {
                    finishGame(newWin);
                }
                return next;
            });
        }
    }

    const finishGame = async (payout) => {
        const newBalance = Math.round((balance + payout) * 100) / 100;
        await editBalance(newBalance);
        setBalance(newBalance);
        setIsPlay(false);
        localStorage.removeItem(STORAGE_KEY);
        clearAll();
    }

    const autoClick = () => {
        let id;
        do {
            id = Math.floor(Math.random() * cells.length) + 1;
        } while (explodedCoins.includes(id) || explodedMines.includes(id));
        handleClick(id)
    }


    return (
        <div className="sapper_overlay">
            <nav className="nav">
                <div className="nav_content container">
                    <div className="nav_back" onClick={() => navigate("/")}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19L8 12L15 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <a href="#" className="nav_content_logo">Sapper</a>

                    <div className="balance_info">
                        <div className="balance_user">
                            <span className="balance_user_coins">
                                {balance} w$
                            </span>
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
                                    {cells.length - mineCount}
                                </span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ff3838" d="M8.65 22.8q-3.125 0-5.312-2.212T1.15 15.25t2.163-5.288T8.6 7.8h.325L9.6 6.625q.3-.55.9-.712t1.15.162l.75.425l.125-.2q.575-1.075 1.8-1.4t2.3.3l.875.5l-1 1.725l-.875-.5q-.35-.2-.763-.088t-.612.463l-.125.2l1 .575q.525.3.688.9t-.138 1.125L15 11.3q.575.9.863 1.913t.287 2.087q0 3.125-2.187 5.313T8.65 22.8M20 8.8v-2h3v2zm-5.5-5.5v-3h2v3zm4.875 2.025l-1.4-1.4L20.1 1.8l1.4 1.4z" /></svg>
                                    {mineCount}
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
                                        readOnly={isPlay}
                                    />

                                    <span className={`error ${betError ? "active" : ""}`}>
                                        {betError}
                                    </span>

                                </div>

                                <div className="mines_options">
                                    {mineOptions.map(n => (
                                        <button
                                            key={n}
                                            className={n === mineCount ? "opt opt--active" : "opt"}
                                            onClick={() => {
                                                if (!isPlay) setMineCount(n);
                                            }}
                                        >
                                            {n}
                                        </button>
                                    ))}

                                </div>
                            </div>

                            <button className='autoclick_btn'
                                disabled={!isPlay}
                                onClick={autoClick}
                            >
                                Автоход
                            </button>

                            <button className="sapper_start_game" onClick={startGame}>
                                {isPlay
                                    ? `Забрать ${step > 0 ? win.toFixed(2) : bet}`
                                    : "Начать игру"}
                            </button>

                            <span className="tg_channel">@verybutterfly tgk</span>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default SapperPage;