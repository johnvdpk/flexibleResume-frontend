// eslint-disable-next-line no-unused-vars
import React from 'react';
import {createContext, useEffect, useState} from 'react';
import { jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState({

        isAuthenticated: false,
        user: null,
        status: 'pending',

    });

    const isTokenExpired = token => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Convert to seconds
            return decoded.exp < currentTime;
        } catch (e) {
            // If token is invalid or decoding fails
            return true;
        }
    };


    useEffect(()=> {

        const token = localStorage.getItem('token');


        if(token && !isTokenExpired(token)) {
            void login(token);
        } else {
            localStorage.removeItem('token');
            toggleIsAuth({
                isAuthenticated: false,
                user: null,
                status: 'done'
            })
        }

    },[]);


async function login(token) {

    if (isTokenExpired(token)) {
        logout();
        return;
    }

    localStorage.setItem('token',token);

    const userInfo = jwtDecode(token);
    const userEmail = userInfo.sub;
    const userRole = userInfo.role;


    try {

        toggleIsAuth({
            isAuthenticated: true,
            user: {
                email: userEmail,
                role: userRole

            },
            status: 'done',
        });


    } catch (e) {
        console.error("De gebruiker kan niet inloggen AuthContext");
        toggleIsAuth({
            isAuthenticated: false,
            user: null,
            status: 'done'
        })
    }


}

    function logout() {

        localStorage.clear();

        toggleIsAuth({
            isAuthenticated: false,
            user: null,
            status: 'done',
        });

    }

    const contextData = {
        isAuth: isAuth.isAuthenticated,
        user: isAuth.user,
        login: login,
        logout: logout,
    };


    return (
        <AuthContext.Provider value={contextData} >
            {isAuth.status === 'done' ? children : <p className='p-loading'>loading...</p> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;