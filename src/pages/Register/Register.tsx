import { RegisterConfirm, RegisterIntro, RegisterLoading, RegisterPassword, RegisterUsername } from "./ui"
import { useHelperRegister } from './model';

import { AnimatePresence, motion } from '@shared/motion';
import { RegisterAlready } from '@shared/ui';
import { useAuth } from "@context";

import './register.scss';

export const RegisterPage = () => {
    const { isAuth } = useAuth();
    const { variants, username, password, step, direction, loading, fail, success, setUsername, setPassword, nextStep, prevStep, register } = useHelperRegister();

    const getStepComponent = (step: number): React.ReactNode | null => {
        switch (step) {
            case 0: return <RegisterIntro onNext={nextStep} />;
            case 1: return <RegisterUsername onNext={nextStep} username={username} setUsername={setUsername} />;
            case 2: return <RegisterPassword onNext={nextStep} onBack={prevStep} password={password} setPassword={setPassword} />;
            case 3: return <RegisterConfirm onNext={register} onBack={prevStep} username={username} password={".".repeat(password.length)} />;
            default: return null;
        }
    };

    if (loading || fail || success) return <RegisterLoading loading={loading} fail={fail} success={success} />
    if (isAuth) return <RegisterAlready />

    return (
        <>
            <div className="register_container">
                <AnimatePresence custom={direction}>
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial={"enter"}
                        animate={"center"}
                        exit={"exit"}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        {getStepComponent(step)}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
};
