import './filtersmodal.scss';
import { motion, AnimatePresence } from "framer-motion";


export const FiltersModal = ({ onClose }) => {

    return (

        <AnimatePresence>
            <motion.div className="f_modal_overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}>

                <motion.div className="f_modal"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}>

                    <h2 onClick={onClose} style={{ color: "white" }}>
                        Позже тут будут фильтры...
                        нажмите сюда, чтобы закрыть
                    </h2>

                </motion.div>

            </motion.div>
        </AnimatePresence>


    );




}

