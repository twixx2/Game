import './RegisterIntro.scss';
import { motion } from "framer-motion";
const RegisterIntro = ({ onNext }) => {

    return (
        <>
            <div className='register_intro'>

                <motion.h2
                    className='register_intro_text'
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    hey
                </motion.h2>

                <motion.h2
                    className='register_intro_text'
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    we should get to know you
                </motion.h2>

                <motion.h2
                    className='register_intro_text'
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                >
                    it won't take much time
                </motion.h2>

                <motion.button
                    onClick={onNext}
                    className='register_intro_btn'
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 3 }}
                >
                    Let's go
                </motion.button>

            </div>
        </>
    );



};

export default RegisterIntro;