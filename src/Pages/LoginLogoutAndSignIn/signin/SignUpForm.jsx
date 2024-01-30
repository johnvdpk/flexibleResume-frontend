import './SignUpForm.css'
import axios from "axios";
import {useState} from "react";
import SwitchSignin from "../../../Components/Switch/SwitchSignin.jsx";


function SignUpForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [addSucces, toggleAddSucces] = useState('');
    const [role, setRole] = useState('USER')

    const [errorMessage, setErrorMessage] = useState(''); // New state for error messages

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
            toggleAddSucces(true);


        } catch (e) {
            console.error("Er is een fout opgetreden bij het aanmelden", e);
            toggleAddSucces(false);
            setErrorMessage(e.response?.data?.message || 'Er is een fout opgetreden');
        }


    }


    return (
        <>
        <form onSubmit={HandleSubmit} className="inlog-form">

            {addSucces === true && <p className='p-addSucces'>Aanmelden is gelukt</p>}
            {addSucces === false && <p className='p-addSucces'>Het kan zijn dat hetzelfde email al bestaat</p>}

            <SwitchSignin

            option1="werkzoekende"
            option2="werkgever"
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