import './LoginForm.css'
import axios from "axios";
import {useState} from "react";
import Button from "../../../pages/globalcomponents/Buttons/Button.jsx";

function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function HandleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {

                email:email,
                password:password,
            })

            console.log(response);
        } catch (e) {
            console.error("Er is een fout opgetreden bij het inloggen");
        }

    }


    return (

        <form onSubmit={HandleSubmit} className="inlog-form">
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
                placeholder="email@mail.com"
                className="input-email-icon"
            />

            <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                placeholder="********"
                className="input-password-icon"
            />

            <button type='submit'>Login</button>


        </form>
    )


}

export default LoginForm