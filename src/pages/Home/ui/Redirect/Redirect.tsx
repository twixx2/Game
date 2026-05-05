import { motion } from "@shared/motion";
import { ROUTES } from "@/core/conf";
import { RedirectCard } from "./RedirectCard/RedirectCard";

import s from "./redirect.module.scss";
export const HomeRedirect = () => {
    interface pageObj {
        name: string;
        link: string;
        number: string;
    }

    const pages: pageObj[] = [
        {
            "name": ROUTES.SWAP.replace("/", ""),
            "link": ROUTES.SWAP,
            "number": "01"
        },
        {
            "name": ROUTES.TOPS.replace("/", ""),
            "link": ROUTES.TOPS,
            "number": "02"
        },
        {
            "name": ROUTES.CARE.replace("/", ""),
            "link": ROUTES.CARE,
            "number": "03"
        },
        {
            "name": ROUTES.RATE.replace("/", ""),
            "link": ROUTES.RATE,
            "number": "04"
        },
        {
            "name": ROUTES.IDEA.replace("/", ""),
            "link": ROUTES.IDEA,
            "number": "05"
        }
    ]
    return (
        <section className={s.redirect}>
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.3 }}
                viewport={{ once: true, amount: 'some' }}
                className="tag_container">
                <h2 className="section_title">take a peek</h2>
                <span className="new">new</span>
            </motion.div>

            <div className={s.items}>
                {pages.map((page, index) => (<RedirectCard page={page} key={index} />))}
            </div>
        </section>
    );
};