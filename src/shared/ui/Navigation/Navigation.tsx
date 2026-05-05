import { motion } from '@shared/motion';
import { usePage } from '@context';

import { APP_CONFIG } from '@/core/conf';

import s from './navigation.module.scss';

export const Navigation = () => {
    const { title, subtitle } = usePage();

    return (
        <nav className={s.navigation}>
            <div className={s.content}>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className={s.text}>

                    <h2 className={s.title}>
                        {title}
                    </h2>
                    <h4 className={s.subtitle}>
                        {subtitle}
                    </h4>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className={s.version}>
                    <span>
                        v{APP_CONFIG.version}
                    </span>

                </motion.div>

            </div>

        </nav>

    );
};