// src/pages/CaseDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import './caseDetail.scss';
import toast from 'react-hot-toast';

function weightedRandom(items) {
  const total = items.reduce((sum, i) => sum + (i.weight || 0), 0);
  let r = Math.random() * total;
  for (let it of items) {
    if (r < (it.weight || 0)) return it;
    r -= (it.weight || 0);
  }
  return items[0];
}

export default function CaseDetail() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const frameRef = useRef(null);
  const trackRef = useRef(null);
  const url = import.meta.env.VITE_USER_API_URL;
  const [c, setCase] = useState(null);
  const [items, setItems] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [win, setWin] = useState();
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${url}/auth_me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBalance(res.data.balance);
        setUserId(res.data.id);
      } catch (err) {
        void err;
        navigate("/register")
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    setLoading(true);
    let timer;
    Promise.all([
      axios.get(`${url}/cases/${caseId}`, { headers }).then(r => setCase(r.data)),
      axios.get(`${url}/caseItems?caseId=${caseId}`, { headers }).then(r => setItems(r.data || []))
    ])
      .finally(() => {
        timer = setTimeout(() => setLoading(false), 500); // минимум 0.5 сек лоадер
      });
    return () => clearTimeout(timer);
  }, [caseId]);

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

  const clearAnim = () => {
    setQueue([]);
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform = 'translateX(0px)';
    }
  }

  const openAgain = (payout) => {
    if (!payout) return toast.error("Ошибка продажи предмета");
    setBalance(prev => prev + payout);
    editBalance(balance + payout);
    openCase();
  }

  const openCase = async () => {
    if (rolling || !c || !items.length) return;
    if (c.price > balance) return toast.error("Недостаточный баланс");
    setBalance(prev => prev - c.price)
    editBalance(balance - c.price);
    setIsOpen(false);
    setRolling(true);
    clearAnim();
    // выбираем выигрыш
    const winItem = weightedRandom(items);
    // собираем очередь: baseRounds случайных + winItem + buffer
    const baseRounds = 20;
    const bufferAfter = 5;
    const rnds = Array.from({ length: baseRounds }, () =>
      items[Math.floor(Math.random() * items.length)]
    );
    const buf = Array.from({ length: bufferAfter }, () =>
      items[Math.floor(Math.random() * items.length)]
    );
    const arr = [...rnds, winItem, ...buf];
    setQueue(arr);

    // ждём, пока React вмонтирует все .slot
    await new Promise(r => requestAnimationFrame(r));

    // измеряем, где именно окажется нужный слот
    const frameEl = frameRef.current;
    const trackEl = trackRef.current;
    const slotEls = trackEl.querySelectorAll('.slot');
    const winIndex = baseRounds;
    const target = slotEls[winIndex];
    if (!target) {
      console.error('Не нашли слот', winIndex);
      setRolling(false);
      return;
    }

    const frameRect = frameEl.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const slotW = targetRect.width;
    // смещение: чтобы центр target совпал с центром frame
    const offset = (targetRect.left - frameRect.left) - (frameRect.width - slotW) / 2;

    // сбрасываем и анимируем
    trackEl.style.transition = 'none';
    trackEl.style.transform = 'translateX(0px)';
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        trackEl.style.transition = 'transform 3s ease-out';
        trackEl.style.transform = `translateX(-${offset}px)`;
      })
    );

    // когда закончится — выдаём результат
    setTimeout(() => {
      setRolling(false);
      setIsOpen(true);
      setWin(winItem.value);
    }, 3200);
  };


  if (loading) return <Loader />;
  if (!c) return null;
  return (
    <div className="case_detail">
      <nav className="nav">
        <div className="nav_content container">
          <div className="nav_back" onClick={() => {
            if (rolling) return toast.error("Дождитесь прокрутки кейса");
            if (isOpen) return toast.error("Выберите опцию");
            navigate(-1);
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <a href="#" className="nav_content_logo">{c.title}</a>

          <div className="balance_info">
            <div className="balance_user">
              <span className="balance_user_coins">
                {balance} w$
              </span>
            </div>
          </div>

        </div>
      </nav>

      <main className="case_detail_main">

        {
          queue.length > 0 ?
            (<div className="roulette_frame" ref={frameRef}>
              <div className="roulette_track" ref={trackRef}>
                {queue.map((it, i) => {
                  return (
                    <div key={i}
                      className={[
                        'slot',
                        it.rarity
                      ].join(' ')}
                    >
                      <div className="slot_image">
                        <img src={it.image} alt={it.name} />
                      </div>
                      <div className="slot_info">
                        <span>{it.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>)
            :
            (
              <div className="case_detail_info">
                <div className="case_detail_info_image">
                  <img src={c.image} alt="" />
                </div>
              </div>
            )
        }

        <div className="case_detail_options">
          {
            !rolling && !isOpen ?
              <button
                className="open_btn"
                onClick={openCase}
                disabled={rolling}
              >
                Открыть кейс за {c.price} w$
              </button>
              : rolling ?
                <p className="loading_text">
                  Открытие...
                </p>
                : isOpen ?
                  <div className="case_detail_options_result">
                    <button className="sell_btn"
                      onClick={() => {
                        setBalance(prev => prev + win);
                        editBalance(balance + win);
                        clearAnim();
                        setRolling(false);
                        setIsOpen(false);
                        setWin();
                      }}>
                      Продать за {win} w$
                    </button>
                    <button
                      className="open_btn"
                      onClick={() => {
                        openAgain(win);
                      }}
                      disabled={rolling}
                    >
                      Открыть кейс ещё раз
                    </button>
                  </div>
                  : null
          }
        </div>

        <div className="case_detail_drop">
          <h2 className="case_drop_title">
            Содержимое кейса {c.title}
          </h2>
          <div className="case_drop_items">
            {
              items.map((it, i) => {
                return (
                  <div className={[
                    'case_drop_item',
                    it.rarity
                  ].join(' ')}
                    key={i}
                  >
                    <div className="case_drop_item_content">
                      <div className="case_drop_item_content_info">
                        <div className="case_drop_item_content_info_image">
                          <img src={it.image} alt={it.name} />
                        </div>
                        <h3 className="case_drop_item_content_info_name">
                          {it.name}
                        </h3>
                      </div>

                      <div className="case_drop_item_content_overlay">
                        <p className="case_drop_item_content_overlay_price">
                          {it.value} w$
                        </p>
                        <p className="case_drop_item_content_overlay_chance">
                          %{it.weight}
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>

      </main>

    </div >
  );
}
