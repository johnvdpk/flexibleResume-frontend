import './SignUpForm.css'
import axios from "axios";
import {useState} from "react";
import Button from "../Buttons/Button.jsx";

function SignUpForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function HandleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', {

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

            <button type='submit'>Echt aanmelden</button>
            <Button
                type="submit"
                // link="/jobapplicantprofile"
                text="Aanmelden"
            />
        </form>
    )


}

export default SignUpForm