import './profilestats.scss';

const ProfileStats = ({ searchController, setSearchController, handleSelectItem, isSelecting, handleSelection, setOpenModal, openSelected, setOpenSelected, selectAllItems, clearAllItems, selectedArr, sellItems, totalPrice, filteredItems, selected, minSelectItem, maxSelectItem, decSelectedItem, incSelectedItem }) => {

    return (
        <>

            <div className="pr_tabs_profile">
                <h2 className="pr_profile_title">
                    Инвентарь
                </h2>
                <div className="pr_inventory">

                    <div className="pr_inventory_header">

                        <div className="pr_inv_header_options">
                            <div className="pr_invenvory_search">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>

                                <input type="text" placeholder="Поиск по названию" value={searchController} onChange={(e) => { setSearchController(e.target.value) }} />
                            </div>

                            <button className='pr_inventory_btn pr_inv_filter_btn' onClick={() => setOpenModal(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" /></svg>
                            </button>

                            <button className='pr_inventory_btn pr_inv_add_btn' onClick={handleSelection}>

                                {
                                    !isSelecting ?
                                        (
                                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M448.67-280h66.66v-164H680v-66.67H515.33V-680h-66.66v169.33H280V-444h168.67v164Zm31.51 200q-82.83 0-155.67-31.5-72.84-31.5-127.18-85.83Q143-251.67 111.5-324.56T80-480.33q0-82.88 31.5-155.78Q143-709 197.33-763q54.34-54 127.23-85.5T480.33-880q82.88 0 155.78 31.5Q709-817 763-763t85.5 127Q880-563 880-480.18q0 82.83-31.5 155.67Q817-251.67 763-197.46q-54 54.21-127 85.84Q563-80 480.18-80Zm.15-66.67q139 0 236-97.33t97-236.33q0-139-96.87-236-96.88-97-236.46-97-138.67 0-236 96.87-97.33 96.88-97.33 236.46 0 138.67 97.33 236 97.33 97.33 236.33 97.33ZM480-480Z" /></svg>
                                        )
                                        :
                                        (
                                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                                        )
                                }


                            </button>
                        </div>

                        {
                            isSelecting ?
                                (
                                    <div className="pr_inv_header_selected">
                                        <div className="pr_inv_selected_top">
                                            <h3 className="pr_inv_selected_top_title">
                                                Выбранные предметы
                                            </h3>

                                            <button className={`pr_inv_selected_top_btn ${openSelected ? 'lower' : ''}`} onClick={() => setOpenSelected(prev => !prev)}>
                                                <svg width="32px" heigth="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF" data-darkreader-inline-stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 15L12 10L7 15" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke=""></path> </g></svg>
                                            </button>

                                        </div>

                                        <div className={`pr_inv_selected_body ${openSelected ? 'open' : ''}`}>

                                            <div className="pr_inv_selected_body_options">
                                                <div className="pr_inv_body_options_btns">
                                                    <button className="pr_inv_body_options_btn_text" onClick={selectAllItems}>
                                                        Выбрать все
                                                    </button>

                                                    {
                                                        selectedArr.length > 0 ?
                                                            (<button className="pr_inv_body_options_btn_text" onClick={clearAllItems}>
                                                                Очистить все
                                                            </button>)
                                                            :
                                                            (null)
                                                    }


                                                </div>

                                                {
                                                    selectedArr.length > 0 ?
                                                        (<div className="pr_inv_body_options_sell">
                                                            <h4>Итого: w$ {new Intl.NumberFormat('ru').format(totalPrice)}</h4>
                                                            <button className='pr_inv_body_options_sell_btn' onClick={sellItems}>
                                                                Продать
                                                            </button>
                                                        </div>)
                                                        :
                                                        (
                                                            null
                                                        )
                                                }

                                            </div>

                                            {
                                                selectedArr.length > 0 ?
                                                    (
                                                        <div className="pr_inv_selected_body_items">
                                                            {
                                                                selectedArr.map(item => (
                                                                    <div className="pr_inv_selected_body_item">
                                                                        <div className="pr_selected_body_item_image">
                                                                            <img src={item.image} alt="" />
                                                                        </div>
                                                                        <h5 className="pr_selected_body_item_name">
                                                                            {item.name}
                                                                        </h5>

                                                                        <span className="pr_selected_body_item_price">
                                                                            w$ {new Intl.NumberFormat('ru').format(item.value * item.count)}
                                                                        </span>


                                                                    </div>
                                                                ))
                                                            }



                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <h3 className='pr_inv_selected_body_title_extra'>
                                                            Выбранных предметов нет
                                                        </h3>
                                                    )
                                            }





                                        </div>

                                    </div>
                                ) :
                                (
                                    null
                                )
                        }


                    </div>

                    {
                        filteredItems.length > 0 ? (
                            <div className="pr_inventory_cards">
                                {
                                    filteredItems.map((item, index) => {
                                        const isSelected = selected[item.id];

                                        return (

                                            <div className={`pr_inv_card ${isSelected ? 'selected' : ''}`} key={index}>
                                                <div className={`pr_inv_card_bg ${item.rarity}`}></div>

                                                <div className="pr_inv_card_content">
                                                    <span className='pr_inv_card_count'>
                                                        {item.count}
                                                    </span>

                                                    <div className="pr_inv_card_header" onClick={() => handleSelectItem(item.id)}>
                                                        <div className="pr_inv_card_image">
                                                            <img src={item.image} alt={item.name} />
                                                        </div>

                                                        <span>
                                                            w$ {new Intl.NumberFormat('ru', {}).format(item.value)}
                                                        </span>

                                                    </div>

                                                    <div className="pr_inv_card_main" onClick={() => handleSelectItem(item.id)}>
                                                        <span>{item.name}</span>
                                                    </div>

                                                    <div className="pr_inv_card_range">

                                                        <div className="pr_inv_card_options">

                                                            <button className="pr_inv_range_btn pr_inv_range_min" onClick={() => minSelectItem(item.id)}>

                                                                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#FFFFFF"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" /></svg>                                                                                </button>

                                                            <button className="pr_inv_range_btn pr_inv_range_dec" onClick={() => decSelectedItem(item.id)}>

                                                                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#FFFFFF"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" /></svg>

                                                            </button>

                                                        </div>

                                                        <span>
                                                            {
                                                                selected[item.id] ?? 0
                                                            }
                                                        </span>

                                                        <div className="pr_inv_card_options">

                                                            <button className="pr_inv_range_btn pr_inv_range_min" onClick={() => incSelectedItem(item.id)}>

                                                                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#FFFFFF"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" /></svg>

                                                            </button>

                                                            <button className="pr_inv_range_btn pr_inv_range_dec" onClick={() => maxSelectItem(item.id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#FFFFFF"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z" /></svg>

                                                            </button>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    })
                                }

                            </div>
                        ) :
                            (
                                <p style={{ color: "white", fontSize: "18px", fontFamily: "Rubik", textAlign: "center" }}>Нет предметов вообще или с такими фильтрами</p>
                            )
                    }



                </div>
            </div>

        </>

    );
}

export default ProfileStats;