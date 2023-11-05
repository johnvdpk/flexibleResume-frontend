import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from "./pages/Home/Home.jsx";
import Navigation from "./pages/Navigation/Navigation.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signin from "./assets/loginLogoutAndSignIn/signin/Signin.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Footer from "./pages/Footer/Footer.jsx";
import DataPage from "./pages/DataPages/DataPageJobSeeker/DataPage.jsx";
import AuthContextProvider from "./assets/context/AuthContext.jsx";
import Login from "./assets/loginLogoutAndSignIn/Login/Login.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>

        <BrowserRouter>

            <AuthContextProvider>

                <Navigation />
                <Routes>
                    <Route path="/" element={ <Home /> } exact />
                    <Route path="/signin" element={ <Signin /> } />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/jobapplicantprofile" element={<DataPage />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
                <Footer />

            </AuthContextProvider>

        </BrowserRouter>

    </React.StrictMode>

)
