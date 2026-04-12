import ErrorMessage from "./assets/components/ErrorMessage/ErrorMessage.jsx";
import RegisterPage from "./assets/pages/RegisterPage/RegisterPage.jsx";
import Leaderboard from "./assets/pages/Leaderboard/Leaderboard.jsx";
import SapperPage from "./assets/pages/SapperPage/SapperPage.jsx";
import CaseDetail from "./assets/pages/CaseDetail/CaseDetail.jsx";
import Haveanidea from "./assets/pages/Haveanidea/Haveanidea.jsx";
import TowerPage from "./assets/pages/TowerPage/TowerPage.jsx";
import CasesPage from "./assets/pages/CasesPage/CasesPage.jsx";
import AuthPage from "./assets/pages/AuthPage/AuthPage.jsx";
import HomePage from "./assets/pages/HomePage/HomePage.jsx";
import Minehunt from "./assets/pages/Minehunt/Minehunt.jsx";
import Profile from "./assets/pages/Profile/Profile.jsx";
import MainLayout from "./assets/layouts/MainLayout.jsx";
import Support from "./assets/pages/Support/Support.jsx";
import Cheers from "./assets/pages/Cheers/Cheers.jsx";
import Store from "./assets/pages/Store/Store.jsx";
import Trade from "./assets/pages/Trade/Trade.jsx";
import { Routes, Route } from "react-router-dom"
import Inv from "./assets/pages/Inv/Inv.jsx";
import { Toaster } from "react-hot-toast";


const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="trade" element={<Trade />} />
                    <Route path="store" element={<Store />} />
                    <Route path="inv" element={<Inv />} />
                    <Route path="support" element={<Support />} />
                    <Route path="minehunt" element={<Minehunt />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                    <Route path="haveanidea" element={<Haveanidea />} />
                    <Route path="cheers" element={<Cheers />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="sapper" element={<SapperPage />} />
                    <Route path="tower" element={<TowerPage />} />
                    <Route path="cases" element={<CasesPage />} />
                    <Route path="cases/:caseId" element={<CaseDetail />} />
                    <Route path="*" element={<ErrorMessage message="404 Not Found" />} />
                </Route>


                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<AuthPage />} />
            </Routes>
            <Toaster position="top-right" reverseOrder={false} />
        </>
    );
}

export default App;