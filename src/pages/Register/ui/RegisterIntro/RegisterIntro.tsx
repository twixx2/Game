import { useNavigate } from "react-router-dom";
import { motion } from "@shared/motion";
import './RegisterIntro.scss';

interface RegisterIntroProps {
    onNext: () => void;
}


export const RegisterIntro = ({ onNext }: RegisterIntroProps) => {
    const nav = useNavigate();

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
                    let's go
                </motion.button>

                <motion.button
                    onClick={() => nav("/login")}
                    className='register_intro_btn2'
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 3 }}
                >
                    i do have an account
                </motion.button>

            </div>
        </>
    );
};