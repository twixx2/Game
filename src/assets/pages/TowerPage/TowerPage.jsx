import './tower.scss'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TowerPage = () => {
    const url = import.meta.env.VITE_USER_API_URL;
    const userToken = localStorage.getItem("token");
    const [balance, setBalance] = useState(0);
    const [bet, setBet] = useState("");
    const [win, setWin] = useState(0);
    const [step, setStep] = useState(-1);
    const [isPlay, setIsPlay] = useState(false);
    const [tower, setTower] = useState([]);
    const [correctPicks, setCorrectPicks] = useState([]);
    const [loseStep, setLoseStep] = useState(null);
    const [betError, setBetError] = useState("");
    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();
    const STORAGE_KEY = "tower-game-state";
    const coeffs = [1.9, 3.8, 7.6, 15.2, 30.4, 60.8, 121.6, 243.2]
    const totalSteps = 8;
    const navigate = useNavigate();

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const s = JSON.parse(saved);
                setIsPlay(s.isPlay);
                setBet(s.bet);
                setTower(s.tower);
                setCorrectPicks(s.correctPicks);
                setStep(s.step);
                setWin(s.win);
            } catch {
                localStorage.removeItem(STORAGE_KEY);
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
                navigate("/register");
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        if (!username) return;
        const getDate = () => {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${day}.${month}.2025, ${hours}:${minutes}:${seconds} on /tower`;
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
    }, [username]);


    const editBalance = async (newBalance) => {
        try {
            const res = await axios.patch(`${url}/users/${userId}`, {
                balance: newBalance
            });
            void res;
        } catch (error) {
            void error;
        }
    };

    const clearAll = () => {
        setWin(0);
        setStep(-1);
        setCorrectPicks([]);
        setLoseStep(null);
    };

    const finishGame = async (payout) => {
        const newBalance = Math.round((balance + payout) * 100) / 100;
        await editBalance(newBalance);
        setBalance(newBalance);
        setIsPlay(false);
        localStorage.removeItem(STORAGE_KEY);
        clearAll();
    };

    const startGame = async () => {
        if (!isPlay) {
            // Если игра не начата проверка ставки
            if (!bet) return setBetError("Введите ставку");
            const numericBet = Number(bet);
            if (isNaN(numericBet) || bet.startsWith('+')) return setBetError("Ставка неккоректная");
            if (numericBet < 1) return setBetError("Ставка не может быть меньше одного");
            if (numericBet > 2000) return setBetError("Макс ставка - 2000")
            if (numericBet > balance) return toast.error("Недостаточный баланс");
            // Начало игры 
            await editBalance(Math.round((balance - numericBet) * 100) / 100);
            setBalance(prev => Math.round((prev - numericBet) * 100) / 100);
            const newTower = Array.from({ length: totalSteps }, () =>
                Math.random() < 0.5 ? "left" : "right"
            );
            setTower(newTower);
            console.log(newTower);
            setWin(0);
            setStep(0);
            setIsPlay(true);
            setBetError("");
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                isPlay: true,
                bet,
                tower: newTower,
                correctPicks,
                step: 0,
                win: 0
            })); // Сохраняем в локалку
        } else {
            if (step === -1) return toast.error("Подождите");
            if (step === 0) return toast.error("Сделайте хотя бы 1 ход"); // если игра начата но не сделан первый ход
            // Предварительно забрать выигрыш 
            setBalance(prev => Math.round((prev + win) * 100) / 100);
            await editBalance(Math.round((balance + win) * 100) / 100);
            setIsPlay(false);
            setCorrectPicks([]);
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handlePick = async (idx, choise) => {
        if (!isPlay || idx !== step) return;
        const safeSide = tower[idx];
        await delay(65);

        if (choise === safeSide) {
            setCorrectPicks(prev => {
                const next = [...prev, idx];
                const nextStep = step + 1;
                const newWin = Number(bet) * coeffs[nextStep - 1];
                setStep(nextStep);
                setWin(newWin);
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    isPlay: true,
                    bet,
                    tower,
                    correctPicks: next,
                    step: nextStep,
                    win: newWin
                })); // Обновление состояния

                if (nextStep === totalSteps) {
                    finishGame(newWin); // Полный проход игры
                }
                return next;
            });

        } else {
            // Если выбрана неправильная сторона
            setLoseStep(idx);
            setWin(0);
            setStep(-1);
            setTimeout(() => {
                setCorrectPicks([]);
                setLoseStep(null);
                setIsPlay(false);
            }, 850);
            localStorage.removeItem(STORAGE_KEY);
        }

    };

    const autoPick = () => {
        const r = Math.random();
        const side = r > 0.5 ? "left" : "right";
        handlePick(step, side);
    };

    return (
        <div className="tower_overlay">
            <nav className="nav">
                <div className="nav_content container">
                    <div className="nav_back" onClick={() => navigate("/")}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19L8 12L15 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <a href="#" className="nav_content_logo">Tower</a>
                    <div className="balance_info">
                        <div className="balance_user">
                            <span className="balance_user_coins">
                                {balance} w$
                            </span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="tower_overlay_main">

                <div className="tower_cells">
                    {Array.from({ length: totalSteps }).map((_, idx) => {
                        const safeSide = tower[idx];
                        const isPassed = correctPicks.includes(idx);
                        const isLostHere = idx === loseStep;
                        const isActive = idx === step && isPlay;

                        return (
                            <div key={idx} className="tower_row">
                                {["left", "right"].map(side => {
                                    const isSafeHere = isPassed && side === safeSide;
                                    return (
                                        <button
                                            key={side}
                                            className={[
                                                "tower_cell",
                                                isPassed ? "cell_passed" : "",
                                                isSafeHere ? "cell_safe" : "",
                                                isLostHere && side !== safeSide ? "cell_error" : "",
                                                !isActive ? "cell_disabled" : ""
                                            ].join(" ")}
                                            disabled={!isActive}
                                            onClick={() => handlePick(idx, side)}
                                        >
                                            +{isPlay ? (Number(bet) * coeffs[idx]).toFixed(2) : 0} w$
                                        </button>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

                <div className={`tower_options ${betError ? "options_center" : "options_end"}`}>
                    <div className="tower_bet">
                        <span className="tower_bet_info">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#33f049" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M9 14c0 1.657 2.686 3 6 3s6-1.343 6-3s-2.686-3-6-3s-6 1.343-6 3" /><path d="M9 14v4c0 1.656 2.686 3 6 3s6-1.344 6-3v-4M3 6c0 1.072 1.144 2.062 3 2.598s4.144.536 6 0c1.856-.536 3-1.526 3-2.598c0-1.072-1.144-2.062-3-2.598s-4.144-.536-6 0C4.144 3.938 3 4.928 3 6" /><path d="M3 6v10c0 .888.772 1.45 2 2" /><path d="M3 11c0 .888.772 1.45 2 2" /></g></svg>
                            Сумма ставки
                        </span>

                        <input
                            type="text"
                            className='tower_bet_input'
                            value={bet}
                            onChange={(e) => setBet(e.target.value)}
                            readOnly={isPlay}
                        />

                        <span className={`error ${betError ? "active" : ""}`}>
                            {betError}
                        </span>

                    </div>

                    <button className="autoclick_btn"
                        disabled={!isPlay}
                        onClick={autoPick}
                    >
                        Автоход
                    </button>
                </div>

                <button className="tower_start_game" onClick={startGame}>
                    {isPlay
                        ? `Забрать ${step > 0 ? win.toFixed(2) : bet}`
                        : "Начать игру"}
                </button>

            </main>
        </div>
    );
};

export default TowerPage;