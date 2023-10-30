import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from "./pages/Home/Home.jsx";
import Navigation from "./pages/Navigation/Navigation.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Inlog from "./pages/Inlog/Inlog.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Footer from "./pages/Footer/Footer.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={ <Home /> } exact />
                <Route path="/inlog" element={ <Inlog /> } />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </React.StrictMode>
)
