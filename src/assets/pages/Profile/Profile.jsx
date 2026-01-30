import './profile.scss';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useInv } from '../../context/InvContext';
import toast from 'react-hot-toast';
import upload from '../../img/upload-avatar.png';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { FiltersModal } from '../../components/FiltersModal/FiltersModal';
import ProfileStats from '../../components/Profile/ProfileStats';

const Profile = () => {
    const inputRef = useRef();
    const [animatedBalance, setAnimatedBalance] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [min, setMin] = useState(false);
    const [openSelected, setOpenSelected] = useState(false);
    const [searchController, setSearchController] = useState('');
    const { balance, username, avatar, setAvatar, isAuth } = useAuth();
    const { items, selected, isSelecting, handleSelection, handleSelectItem, decSelectedItem, incSelectedItem, minSelectItem, maxSelectItem, selectedArr, totalPrice, selectAllItems, clearAllItems, sellItems } = useInv();
    const navigate = useNavigate();
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const API = import.meta.env.VITE_USER_API_URL;
    const tabs = [
        { id: "profile", label: "Профиль" },
        { id: "shop", label: "Магазин" },
        { id: "settings", label: "Настройки" }
    ]

    let filteredItems = searchController.length > 0 ? items.filter(item => item.name.includes(searchController)) : items

    const handleMin = () => {
        setMin(prev => !prev);
    }

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) return toast.error("Можно загружать только фото");
        if (file.size > MAX_FILE_SIZE) return toast.error("Размер файла слишком большой");
        const reader = new FileReader();
        reader.onload = (ev) => setAvatar(ev.target.result);
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        document.body.style.overflow = openModal ? 'hidden' : '';
    }, [openModal]);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const stepTime = 20;
        const step = Math.ceil(balance / (duration / stepTime));

        const interval = setInterval(() => {
            start += step;
            if (start >= balance) {
                start = balance;
                clearInterval(interval);
            }
            setAnimatedBalance(start);
        }, stepTime);

        return () => clearInterval(interval);
    }, [balance]);


    if (isAuth === false) {
        return <ErrorMessage message={'401 Unauthorized'} />
    }

    return (
        <>
            {openModal && <FiltersModal onClose={() => setOpenModal(false)} />}

            <div className="profile">
                <div className="profle_overlay">
                    <nav className="pr_nav">
                        <div className="pr_nav_content container">
                            <div className="pr_nav_back" onClick={() => navigate("/")}>
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 19L8 12L15 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <h2 className="pr_nav_title">
                                Is that you?
                            </h2>
                        </div>
                    </nav>

                    <main className="pr_main">
                        <div className="pr_main_card">
                            <div className="pr_main_card_content">
                                <div className="pr_main_card_avatar">
                                    <img
                                        src={avatar || upload}
                                        alt="avatar"
                                        onClick={() => inputRef.current.click()}
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={inputRef}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="pr_main_card_info">
                                    <header className="pr_main_card_info_header">
                                        <h2 className="pr_main_card_username">
                                            {username}
                                        </h2>
                                    </header>

                                    <div className="pr_main_card_balance_block">

                                        <p className="pr_main_card_balance">
                                            {
                                                new Intl.NumberFormat('ru', {
                                                    notation: min ? 'compact' : 'standard',
                                                }).format(animatedBalance)
                                            } w$
                                        </p>


                                        <button className="pr_main_card_bal_btn" onClick={handleMin}>
                                            {
                                                !min ?
                                                    (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                                                        <path fill="white" fill-rule="evenodd" d="M14.78 2.28a.75.75 0 0 0-1.06-1.06L10.5 4.44V2.75a.75.75 0 0 0-1.5 0V7h4.25a.75.75 0 0 0 0-1.5h-1.69l3.22-3.22ZM5.5 11.56v1.69a.75.75 0 0 0 1.5 0V9H2.75a.75.75 0 0 0 0 1.5h1.69l-3.22 3.22a.75.75 0 1 0 1.06 1.06l3.22-3.22Z" clip-rule="evenodd" />
                                                    </svg>)
                                                    : (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                                                        <path fill="white" fill-rule="evenodd" d="M15 5.25a.75.75 0 0 1-1.5 0V3.56l-3.22 3.22a.75.75 0 1 1-1.06-1.06l3.22-3.22h-1.69a.75.75 0 0 1 0-1.5H15v4.25ZM3.81 13.5l2.97-2.97a.75.75 0 1 0-1.06-1.06L2.5 12.69v-1.94a.75.75 0 0 0-1.5 0V15h4.25a.75.75 0 0 0 0-1.5H3.81Z" clip-rule="evenodd" />
                                                    </svg>)

                                            }
                                        </button>



                                    </div>


                                </div>
                            </div>
                        </div>


                        <div className="pr_tabs_container">

                            <div className="pr_tabs_header">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={tab.id}
                                        className={`pr_tab_btn ${activeIndex == index ? "active" : ""}`}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                                <span
                                    className='pr_tab_underline'
                                    style={{
                                        width: `${100 / tabs.length}%`,
                                        transform: `translateX(${activeIndex * 100}%)`,
                                    }}
                                ></span>
                            </div>


                            <div className="pr_tabs_main">
                                <div className="pr_tabs_content">
                                    {activeIndex === 0 && <ProfileStats
                                        searchController={searchController}
                                        setSearchController={setSearchController}
                                        handleSelectItem={handleSelectItem}
                                        isSelecting={isSelecting}
                                        handleSelection={handleSelection}
                                        setOpenModal={setOpenModal}
                                        openSelected={openSelected}
                                        setOpenSelected={setOpenSelected}
                                        selectAllItems={selectAllItems}
                                        clearAllItems={clearAllItems}
                                        selectedArr={selectedArr}
                                        sellItems={sellItems}
                                        totalPrice={totalPrice}
                                        filteredItems={filteredItems}
                                        selected={selected}
                                        minSelectItem={minSelectItem}
                                        maxSelectItem={maxSelectItem}
                                        decSelectedItem={decSelectedItem}
                                        incSelectedItem={incSelectedItem}
                                    />}
                                    {activeIndex === 1 &&
                                        <p style={{ color: "white", fontFamily: 'Rubik', fontSize: '16px', textAlign: "center" }}>
                                            Функционал магазина будет внедрён в рамках перехода проекта на собственное API. До завершения этого перехода появление значимых обновлений является невозможным. Автор проекта просит отнестись к ситуации с пониманием и проявить терпение.
                                        </p>}
                                    {activeIndex === 2 &&
                                        <p style={{ color: "white", fontFamily: 'Rubik', fontSize: '16px', textAlign: "center" }}>
                                            Изменение данных профиля будет реализовано в рамках перехода проекта на собственное API. До завершения этого перехода появление значимых обновлений является невозможным. Автор проекта просит отнестись к ситуации с пониманием и проявить терпение.
                                        </p>}


                                </div>
                            </div>
                        </div>
                    </main>
                </div >
            </div >
        </>

    );
}

export default Profile;