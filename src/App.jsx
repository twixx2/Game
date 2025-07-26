import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Auth from "./assets/pages/AuthPage/AuthPage.jsx";
import RegisterPage from "./assets/pages/RegisterPage/RegisterPage.jsx";
import SapperPage from "./assets/pages/SapperPage/SapperPage.jsx";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import HomePage from "./assets/pages/HomePage/HomePage.jsx";
import AuthPage from "./assets/pages/AuthPage/AuthPage.jsx";


const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/sapper" element={<SapperPage />} />
            </Routes>
            <Toaster position="top-right" reverseOrder={false} />
        </BrowserRouter>
    );
}

export default App;