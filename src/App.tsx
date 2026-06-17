import { LoginPage, CaseDetail, CasesPage, RatePage, IdeaPage, HomePage, NvntPage, TopsPage, ProfilePage, RegisterPage, SapperPage, MrktPage, CarePage, TowerPage, SwapPage, MinehuntPage } from "@pages";
import { MainLayout } from "@layouts/MainLayout";

import { ErrorMessage, Loader, ToastContainer } from "@shared/ui";
import { usePlayer } from "@shared/hooks";
import { useAuth } from "@context";
import { ROUTES } from "@/core/conf";

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";


const App = () => {
    const { isLoading, isError, error } = usePlayer();
    const { logout } = useAuth();

    useEffect(() => {
        if (!isError || !error) return;
        if (!axios.isAxiosError(error)) return;
        if (error.response?.status === 401) logout();
    }, [isError, error])

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <Routes>
                <Route path={ROUTES.HOME} element={<MainLayout />}>
                    <Route index element={<HomePage />} />

                    <Route path={ROUTES.SAPPER} element={<SapperPage />} />
                    <Route path={ROUTES.MINEHUNT} element={<MinehuntPage />} />
                    <Route path={ROUTES.CASES} element={<CasesPage />} />
                    <Route path={ROUTES.TOWER} element={<TowerPage />} />
                    <Route path={ROUTES.PATHS.CASE} element={<CaseDetail />} />


                    <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                    <Route path={ROUTES.SWAP} element={<SwapPage />} />
                    <Route path={ROUTES.MRKT} element={<MrktPage />} />

                    <Route path={ROUTES.NVNT} element={<NvntPage />} />

                    <Route path={ROUTES.CARE} element={<CarePage />} />
                    <Route path={ROUTES.TOPS} element={<TopsPage />} />
                    <Route path={ROUTES.IDEA} element={<IdeaPage />} />
                    <Route path={ROUTES.RATE} element={<RatePage />} />
                    <Route path="*" element={<ErrorMessage message="404 Not Found" />} />
                </Route>

                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            </Routes>
            <ToastContainer />
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontWeight: "800",
                        color: "#fff",
                        background: "#0f0f0f",
                    }
                }} />
        </>
    );
};

export default App;