import { motion } from "@shared/motion";
import s from "./bonuses.module.scss";

export const HomeBonuses = () => (

    <section className={s.bonuses}>

        <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3 }}
            viewport={{ once: true, amount: 'some' }}
            className="tag_container">
            <h2 className="section_title">
                free bonuses
            </h2>
            <span className="beta">soon</span>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: "some" }}
            className={s.card}>
            <div className={`${s.content} ${s.disabled}`}>
                <h4 className={s.title}>
                    up to $25 000 once a day
                </h4>

                <button className={s.button}>
                    not available yet
                </button>
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: "some" }}
            className={s.card}>
            <div className={`${s.content} ${s.disabled}`}>

                <h4 className={s.title}>
                    up to one credit once a fortnight
                </h4>

                <button className={s.button}>
                    not available yet
                </button>

            </div>
        </motion.div>

    </section>
)