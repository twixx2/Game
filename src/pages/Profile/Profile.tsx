import { ROUTES } from '@/core/conf';
import { LoginRequired, Page } from '@shared/ui';
import { formatCurrency } from '@shared/lib';

import upload from "@shared/assets/icons/png/upload-avatar.png";

import { useHelperProfile } from './model';

import { Link } from 'react-router-dom';
import s from './profile.module.scss';
import clsx from 'clsx';

export const ProfilePage = () => {
    const { inputRef, animatedBalance, activeIndex, username, avatar, isAuth, tabs, handleChangeAvatar, setActiveIndex } = useHelperProfile();

    return (
        <Page title="me" subtitle='you'>
            {(() => {
                if (!isAuth) {
                    return <LoginRequired />
                }

                return (
                    <div className={s.profile}>

                        <div className={s.card}>
                            <div className={s.cardCont}>

                                <div className={s.avatar}>
                                    <img src={avatar || upload} alt="avatar" onClick={() => inputRef.current?.click()} />
                                    <input type="file" accept="image/*" ref={inputRef} onChange={handleChangeAvatar} />
                                </div>

                                <div className={s.information}>
                                    <h2 className={s.username}>
                                        {username}
                                    </h2>

                                    <span className={s.balance}>
                                        {formatCurrency(animatedBalance, { isCompact: true })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={s.mainCont}>

                            <div className={s.tabs}>
                                {tabs.map((tab, index) => (
                                    <button key={tab.id} className={clsx(s.tab, activeIndex === index && s.current)} onClick={() => setActiveIndex(index)} >
                                        {tab.label}
                                    </button>
                                ))}
                                <span className={s.underline}
                                    style={{
                                        width: `${100 / tabs.length}%`,
                                        transform: `translateX(${activeIndex * 100}%)`,
                                    }}
                                ></span>
                            </div>


                            <div className={s.content}>
                                {activeIndex === 0 &&
                                    <p className={s.title}>
                                        Inventory has been moved to the <Link to={ROUTES.NVNT}>nvnt</Link> page
                                    </p>
                                }
                                {activeIndex === 1 &&
                                    <p className={s.title}>
                                        Mrkt will drop when the project switches over to its own API. Until that’s done, there won’t be any major updates. The dev asks you to stay chill and be patient.
                                    </p>}
                                {activeIndex === 2 && (
                                    <p className={s.title}>
                                        Profile editing feature will drop when the project switches over to its own API. Until that’s done, there won’t be any major updates. The dev asks you to stay chill and be patient.
                                    </p>
                                )}


                            </div>
                        </div>
                    </div>
                );
            })()}
        </Page>
    );
};