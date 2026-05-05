import { LoginPage, CaseDetail, CasesPage, RatePage, IdeaPage, HomePage, NvntPage, TopsPage, ProfilePage, RegisterPage, SapperPage, MrktPage, CarePage, TowerPage, SwapPage, MinehuntPage } from "@pages";
import { MainLayout } from "@layouts/MainLayout";

import { ErrorMessage, Loader } from "@shared/ui";
import { Toaster } from "react-hot-toast";

import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/core/conf";
import { useAuth } from "@context";


const App = () => {
    const { isLoading } = useAuth();

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
            <Toaster position="top-right" reverseOrder={false} />
        </>
    );
};

export default App;