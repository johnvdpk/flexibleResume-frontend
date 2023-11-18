import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from "./Home/Home.jsx";
import Navigation from "./pages/Navigation/Navigation.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/loginLogoutAndSignIn/signin/SignUpPage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Footer from "./pages/Footer/Footer.jsx";
import DataPageJobSeeker from "./pages/DataPages/DataPageJobSeeker/DataPageJobSeeker.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import Login from "./pages/loginLogoutAndSignIn/Login/LoginPage.jsx";
import DataPageCompany from "./pages/DataPages/DataPageJobSeeker/DataPageCompany.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(

    // <React.StrictMode>

        <BrowserRouter>

            <AuthContextProvider>

                <Navigation />
                <Routes>
                    <Route path="/" element={ <Home /> } exact />
                    <Route path="/signin" element={ <SignUpPage /> } />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/werkzoekende" element={<DataPageJobSeeker />} />
                    <Route path="/bedrijf" element={<DataPageCompany />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
                <Footer />

            </AuthContextProvider>

        </BrowserRouter>

    // </React.StrictMode>

)
