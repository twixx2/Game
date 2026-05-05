import { motion } from "@shared/motion";
import s from "./homeStats.module.scss";

export const HomeStats = () => (
    <section className={s.stats}>
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3 }}
            viewport={{ once: true, amount: 'some' }}
            className="tag_container">
            <h2 className="section_title">
                chncd's stats
            </h2>
            <span className='preview'>preview</span>
        </motion.div>


        <div className={s.items}>

            <div className={s.item}>
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: true, amount: "some" }}
                    className={s.left}>
                    cases opened
                </motion.span>

                <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: true, amount: "some" }}
                    className={s.right}>
                    8.2M
                </motion.span>

            </div>

            <div className={s.item}>
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    viewport={{ once: true, amount: "some" }}
                    className={s.left}>
                    sapper played
                </motion.span>

                <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    viewport={{ once: true, amount: "some" }}
                    className={s.right}>
                    9k
                </motion.span>

            </div>

            <div className={s.item}>
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    viewport={{ once: true, amount: "some" }}
                    className={s.left}>
                    minehunt played
                </motion.span>

                <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    viewport={{ once: true, amount: "some" }}
                    className={s.right}>
                    3k
                </motion.span>

            </div>

            <div className={s.item}>

                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                    viewport={{ once: true, amount: "some" }}
                    className={s.left}>
                    tower played
                </motion.span>

                <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                    viewport={{ once: true, amount: "some" }}
                    className={s.right}>
                    2k
                </motion.span>


            </div>

            <div className={s.item}>
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    viewport={{ once: true, amount: "some" }}
                    className={s.left}>
                    highest bet
                </motion.span>

                <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    viewport={{ once: true, amount: "some" }}
                    className={s.right}>
                    $1.2M
                </motion.span>


            </div>

            <div className={s.item}>

                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                    viewport={{ once: true, amount: "some" }}
                    className={s.left}>
                    highest win
                </motion.span>

                <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                    viewport={{ once: true, amount: "some" }}
                    className={s.right}>
                    $19.6M
                </motion.span>


            </div>

            <div className={s.item}>
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    viewport={{ once: true, amount: "some" }}
                    className={s.left}>
                    total volume
                </motion.span>

                <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    viewport={{ once: true, amount: "some" }}
                    className={s.right}>
                    $4.1B
                </motion.span>

            </div>

        </div>
    </section>
)