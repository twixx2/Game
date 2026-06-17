import { motion } from "@shared/motion";
import { ROUTES } from "@/core/conf";
import { Link } from "react-router-dom";

import { useDecrypt404 } from "./useDecrypt";
import s from "./notFound.module.scss";

export const NotFound = () => {
    const { digits, isComplete } = useDecrypt404();

    return (
        <section className={s.page}>
            <motion.div
                className={s.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                {digits.map((digit, index) => (
                    <span key={index} className={s.digit}>
                        {digit}
                    </span>
                ))}
            </motion.div>

            {isComplete && (
                <motion.div
                    className={s.footer}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p>
                        <span className={s.message}>There is absolutely nothing to see here, you might want to head back</span>
                    </p>
                    <Link className={s.btn} to={ROUTES.HOME}>
                        back to fun
                    </Link>
                </motion.div>
            )}
        </section>
    );
};