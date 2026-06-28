import { useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import { MainLayout } from "@layouts/MainLayout";

import { Loader, NotFound, ToastContainer } from "@shared/ui";
import { usePlayer } from "@shared/hooks";
import { lazyLoad } from "@shared/lib";
import { useAuth } from "@context";
import { ROUTES } from "@/core/conf";

const LoginPage = lazyLoad(() => import('@pages/Login'), 'LoginPage');
const RegisterPage = lazyLoad(() => import('@pages/Register'), 'RegisterPage');

const HomePage = lazyLoad(() => import('@pages/Home'), 'HomePage');

const SapperPage = lazyLoad(() => import('@pages/Sapper'), 'SapperPage');
const MinehuntPage = lazyLoad(() => import("@pages/Minehunt"), "MinehuntPage");
const TowerPage = lazyLoad(() => import('@pages/Tower'), 'TowerPage');

const CasesPage = lazyLoad(() => import('@pages/Cases'), 'CasesPage');
const CaseDetail = lazyLoad(() => import('@pages/CaseDetail'), 'CaseDetail');

const ProfilePage = lazyLoad(() => import('@pages/Profile'), 'ProfilePage');
const SwapPage = lazyLoad(() => import('@pages/Swap'), 'SwapPage');
const MrktPage = lazyLoad(() => import('@pages/Mrkt'), 'MrktPage');

const NvntPage = lazyLoad(() => import('@pages/Nvnt'), 'NvntPage');

const CarePage = lazyLoad(() => import('@pages/Care'), 'CarePage');
const TopsPage = lazyLoad(() => import('@pages/Tops'), 'TopsPage');
const IdeaPage = lazyLoad(() => import('@pages/Idea'), 'IdeaPage');
const RatePage = lazyLoad(() => import('@pages/Rate'), 'RatePage');

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
                <Route path={ROUTES.HOME} element={<Suspense fallback={<Loader />}><MainLayout /></Suspense>}>
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
                </Route>

                <Route path={ROUTES.REGISTER} element={<Suspense fallback={<Loader />}><RegisterPage /></Suspense>} />
                <Route path={ROUTES.LOGIN} element={<Suspense fallback={<Loader />}><LoginPage /></Suspense>} />
                <Route path="*" element={<NotFound />} />
            </Routes >
            <ToastContainer />
        </>
    );
};

export default App;