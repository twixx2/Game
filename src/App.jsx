import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Auth from "./assets/pages/AuthPage/AuthPage.jsx";
import RegisterPage from "./assets/pages/RegisterPage/RegisterPage.jsx";
import SapperPage from "./assets/pages/SapperPage/SapperPage.jsx";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";


const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Auth />} />
                <Route path="/sapper" element={<SapperPage />} />
                <Route path="/" element={<RegisterPage />} />
            </Routes>
            <Toaster position="top-right" reverseOrder={false} />
        </BrowserRouter>
    );
}

export default App;