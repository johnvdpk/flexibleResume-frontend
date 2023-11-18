// eslint-disable-next-line no-unused-vars
import './AuthContext.css'
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

    useEffect(()=> {

        const token = localStorage.getItem('token');


        if(token) {
            void login(token);
        } else {
            toggleIsAuth({
                isAuthenticated: false,
                user: null,
                status: 'done'
            })
        }

    },[]);


async function login(token) {

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