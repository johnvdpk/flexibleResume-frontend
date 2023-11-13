import './LoginForm.css'
import axios from "axios";
import {useContext, useState} from "react";
import { AuthContext} from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function LoginForm({whichDataPage}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [addSucces, toggleAddSucces] = useState(false);

    async function HandleSubmit(e) {
        e.preventDefault();


        try {
            const response = await axios.post('http://localhost:8080/auth/authenticate', {

                email:email,
                password:password,

            })
            toggleAddSucces(true);
            console.log(response.data);
            console.log("login bij loginform gelukt")
            login(response.data.token);
            navigate(`/${whichDataPage}`);

        } catch (e) {
            console.error("Loginform inlog niet gelukt");
            toggleAddSucces(false);

        }


    }


    return (

        <form onSubmit={HandleSubmit} className="inlog-form">
            {addSucces === true && <p>inloggen is gelukt</p>}
            {addSucces === false && <p>Misschien een verkeerd wachtwoord?</p>}
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