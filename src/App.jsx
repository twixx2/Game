import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import RegisterPage from "./assets/pages/RegisterPage/RegisterPage.jsx";
import SapperPage from "./assets/pages/SapperPage/SapperPage.jsx";
import HomePage from "./assets/pages/HomePage/HomePage.jsx";
import AuthPage from "./assets/pages/AuthPage/AuthPage.jsx";
import TowerPage from "./assets/pages/TowerPage/TowerPage.jsx";
import CasesPage from "./assets/pages/CasesPage/CasesPage.jsx";
import CaseDetail from "./assets/pages/CaseDetail/CaseDetail.jsx";
import ErrorMessage from "./assets/components/ErrorMessage/ErrorMessage.jsx";
import Profile from "./assets/pages/Profile/Profile.jsx";


const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/sapper" element={<SapperPage />} />
                <Route path="/tower" element={<TowerPage />} />
                <Route path="/cases" element={<CasesPage />} />
                <Route path="/cases/:caseId" element={<CaseDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<ErrorMessage message="404 Not Found" />} />
            </Routes>
            <Toaster position="top-right" reverseOrder={false} />
        </>
    );
}

export default App;