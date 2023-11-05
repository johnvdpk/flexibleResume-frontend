// eslint-disable-next-line no-unused-vars
import './AuthContext.css'
import {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState({

        isAuthenticated: false,
        user: null,
        // status: 'pending',

    });

    // useEffect(()=> {
    //
    //     const token = localStorage.getItem('token');
    //
    //     if(token) {
    //         void login(token);
    //     } else {
    //         toggleIsAuth({
    //             ...isAuth,
    //             status: 'done'
    //         })
    //     }
    //
    // },[]);

    const navigate = useNavigate();

async function login(token) {

    localStorage.setItem(token);

    const userInfo = jwtDecode(token);
    const userId = userInfo.sub;

    try {
        const response = await axios.get('http://localhost:8080/api/v1/auth/authenticate')
        console.log(response.data);

    } catch (e) {
        console.error(e);
        toggleIsAuth({
            ...isAuth,
            // status: 'done'
        })
    }

}

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        toggleIsAuth({
            isAuthenticated: false,
            user: null,
            // status: 'done',
        });
        navigate('/');
    }

    const contextData = {
        isAuth: isAuth.isAuthenticated,
        user: isAuth.user,
        login: login,
        logout: logout,
    };


    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    );
}
// === 'done' ? children : <p className='p-loading'>loading...</p>
export default AuthContextProvider;