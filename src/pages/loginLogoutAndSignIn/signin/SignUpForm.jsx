import './SignUpForm.css'
import axios from "axios";
import {useState} from "react";

function SignUpForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [addSucces, toggleAddSucces] = useState(false);


    async function HandleSubmit(e) {
        e.preventDefault();
        console.log(email, password);

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', {

                email:email,
                password:password,
            })

            console.log(response.data);
            toggleAddSucces(true);
        } catch (e) {
            console.error("Er is een fout opgetreden bij het aanmelden");
        }

    }


    return (

        <form onSubmit={HandleSubmit} className="inlog-form">

            {addSucces === true && <p>Aanmelden is gelukt</p>}

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

            <button type='submit'>Registeren</button>


        </form>
    )


}

export default SignUpForm