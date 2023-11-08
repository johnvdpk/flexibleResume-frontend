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
            console.log(response.data);
            toggleAddSucces(true);
            console.log('aanmelden user is gelukt');

            console.log(response.data.sub);
            try {
                const jobSeekerResponse = await axios.post('http://localhost:8080/werkzoekende', {
                    firstName: firstName,
                })
            console.log(jobSeekerResponse.data);

            } catch (error) {
                console.error("Niet gelukt een jobseeker aan te maken", error);
                toggleAddSucces(false);
            }
        } catch (error) {
            console.error("Er is een fout opgetreden bij het aanmelden", error);
            toggleAddSucces(false);
        }
    }


    // async function addJobSeeker(e) {
    //     e.preventDefault();
    //
    //     try {
    //         const response = await axios.post('http://localhost:8080/werkzoekende', {
    //
    //                 firstName:firstName,
    //
    //             }, {
    //                 params: {userId}
    //             }
    //
    //         )
    //         console.log(response.data);
    //
    //
    //     } catch (e) {
    //         console.error("niet gelukt een (jobseeker) aan te maken");
    //     }
    //
    // }


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
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                type="text"
                placeholder="Mogen wij jouw voornaam?"
                className="input-password-icon"
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

        {/*<form onSubmit={addJobSeeker}>*/}
        {/*<input*/}
        {/*    id="firstName"*/}
        {/*    value={firstName}*/}
        {/*    onChange={(e) => setFirstName(e.target.value)}*/}
        {/*    required*/}
        {/*    type="text"*/}
        {/*    placeholder="Hoe heet je"*/}
        {/*    className="input-password-icon"*/}
        {/*/>*/}
        {/*    <button type='submit'>test</button>*/}

        {/*</form>*/}

    </>
    )


}

export default SignUpForm