import './SignUpForm.css'
import axios from "axios";
import {useState} from "react";
import SwitchSignin from "../../globalcomponents/Buttons/SwitchSignin.jsx";


function SignUpForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [firstName, setFirstName] = useState('')

    const [addSucces, toggleAddSucces] = useState(false);
    const [role, setRole] = useState('USER')




    async function HandleSubmit(e) {
        e.preventDefault();


        try {
            const response = await axios.post('http://localhost:8080/auth/register', {
                email: email,
                password: password,
                role: role,
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('cvId', response.data.cvId);
            console.log(response.data);
            toggleAddSucces(true);
            console.log('aanmelden user is gelukt');

            console.log(response.data.sub);

        } catch (error) {
            console.error("Er is een fout opgetreden bij het aanmelden", error);
            toggleAddSucces(false);
        }


    }


    return (
        <>
        <form onSubmit={HandleSubmit} className="inlog-form">

            {addSucces === true && <p>Aanmelden is gelukt</p>}

            <SwitchSignin

            option1="werkzoekende"
            option2="bedrijf"
            onToggle={setRole}


            />

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


    </>
    )


}

export default SignUpForm