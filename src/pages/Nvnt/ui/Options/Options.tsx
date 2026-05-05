import { Icon } from "@shared/ui";
import { useHelperInv } from "../../model/hooks";
import s from "./nvntOptions.module.scss";

export const NvntOptions = ({ onOpen }: { onOpen: () => void; }) => {
    const { searchController, isSelecting, handleSelection, setSearchController } = useHelperInv();

    return (
        <div className={s.options}>
            <div className={s.search}>
                <Icon name="search" size={24} />
                <input type="text" placeholder="Whatcha lookin' for?" value={searchController} onChange={(e) => setSearchController(e.target.value)} />
            </div>

            <button className={s.optBtn} onClick={onOpen}>
                <Icon name="filter" size={30} />
            </button>

            <button className={s.optBtn} onClick={handleSelection}>
                {isSelecting ? <Icon name="selectOn" size={30} /> : <Icon name="selectOff" size={30} />}
            </button>
        </div>
    );
};