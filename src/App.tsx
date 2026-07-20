// import { LoginPage, CaseDetail, CasesPage, RatePage, IdeaPage, HomePage, NvntPage, TopsPage, ProfilePage, RegisterPage, SapperPage, MrktPage, CarePage, TowerPage, SwapPage, MinehuntPage } from "@pages";
import { HomePage } from "@pages/Home";

import { LoginPage } from "@pages/Login";
import { RegisterPage } from "@pages/Register";

import { SapperPage } from "@pages/Sapper";
import { TowerPage } from "@pages/Tower";
import { MinehuntPage } from "@pages/Minehunt";

import { CasesPage } from "@pages/Cases";
import { CaseDetail } from "@pages/CaseDetail";

import { SwapPage } from "@pages/Swap";
import { MrktPage } from "@pages/Mrkt";
import { CarePage } from "@pages/Care";
import { TopsPage } from "@pages/Tops";
import { IdeaPage } from "@pages/Idea";
import { RatePage } from "@pages/Rate";

import { NvntPage } from "@pages/Nvnt";

import { MainLayout } from "@layouts/MainLayout";

import { Loader, NotFound, ToastContainer } from "@shared/ui";
import { usePlayer } from "@shared/hooks";
import { useAuth } from "@context";
import { ROUTES } from "@/core/conf";

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
                    <Route path={ROUTES.TOWER} element={<TowerPage />} />

                    <Route path={ROUTES.CASES} element={<CasesPage />} />
                    <Route path={ROUTES.PATHS.CASE} element={<CaseDetail />} />

                    <Route path={ROUTES.SWAP} element={<SwapPage />} />
                    <Route path={ROUTES.MRKT} element={<MrktPage />} />
                    <Route path={ROUTES.CARE} element={<CarePage />} />
                    <Route path={ROUTES.TOPS} element={<TopsPage />} />
                    <Route path={ROUTES.IDEA} element={<IdeaPage />} />
                    <Route path={ROUTES.RATE} element={<RatePage />} />

                    {/* <Route path={ROUTES.PROFILE} element={<ProfilePage />} /> */}


                    <Route path={ROUTES.NVNT} element={<NvntPage />} />

                </Route>

                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer />
        </>
    );
};

export default App;