import React from 'react';
import ReactDOM from 'react-dom/client';
import './Index.css';
import Home from "./App.jsx";
import Navigation from "./Pages/Navigation/Navigation.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignUpPage from "./Pages/LoginLogoutAndSignIn/signin/SignUpPage.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";
import Footer from "./Pages/Footer/Footer.jsx";
import DataPageJobSeeker from "./Pages/DataPages/DataPageJobSeeker/DataPageJobSeeker.jsx";
import AuthContextProvider from "./Context/AuthContext.jsx";
import Login from "./Pages/LoginLogoutAndSignIn/Login/LoginPage.jsx";
import DataPageCompany from "./Pages/DataPages/DataPageJobSeeker/DataPageCompany.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(

    // <React.StrictMode>

        <BrowserRouter>

            <AuthContextProvider>

                <Navigation />
                <Routes>
                    <Route path="/" element={ <Home /> } exact />
                    <Route path="/signin" element={ <SignUpPage /> } />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/jobseeker" element={<DataPageJobSeeker />} />
                    <Route path="/company" element={<DataPageCompany />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
                <Footer />

            </AuthContextProvider>

        </BrowserRouter>

    // </React.StrictMode>

)
