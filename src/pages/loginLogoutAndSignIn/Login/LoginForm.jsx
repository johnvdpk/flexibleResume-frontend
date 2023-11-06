import './LoginForm.css'
import axios from "axios";
import {useContext, useState} from "react";
import { AuthContext} from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function LoginForm({whichDataPage}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    async function HandleSubmit(e) {
        e.preventDefault();
        toggleError(false);


        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {

                email:email,
                password:password,

            })

            console.log(response.data);
            login(response.data.token);
            navigate(`/${whichDataPage}`);

        } catch (e) {
            console.error(e);
            toggleError(true);
        }

        navigate(`/${whichDataPage}`); // gaat naar het try blok als de inlog is gelukt.
    }


    return (

        <form onSubmit={HandleSubmit} className="inlog-form">
            <input
                id="email-field"
                type="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="jouw emailadres"
                className="input-email-icon"
            />

            <input
                id="password-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="********"
                className="input-password-icon"
            />

            <button type='submit' >Login</button>



        </form>
    )


}

export default LoginForm