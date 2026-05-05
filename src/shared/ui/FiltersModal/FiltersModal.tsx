import { motion } from "@shared/motion";
import s from './filtersmodal.module.scss';

interface FiltersModalProps {
    onClose: () => void;
}


export const FiltersModal = ({ onClose }: FiltersModalProps) => (
    <motion.div className={s.overlay}
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: "0%" }}
        exit={{ opacity: 0, y: "-100%" }}>

        <div className={s.modal}>
            <h2 onClick={onClose}>
                filters will be there. stay tuned. tap to close 
            </h2>
        </div>
    </motion.div>
);