import './LoginPage.css'
import logo from '../../../assets/flexible resume.svg'
import LoginImage from '../../../assets/loginimage.png'
import Switch from "../../globalcomponents/Buttons/Switch/Switch.jsx";
import LoginForm from "./LoginForm.jsx";
import {useState} from "react";
function LoginPage() {


    const [whichDataPage, setWhichDataPage] = useState("jobseeker");

    function handleToggle(value) {
        setWhichDataPage(value);
    }


        return (
        <>
           <div className="login-wrapper">

               <div className="div-login">
                   <img src={logo} className="login-logo-image" alt="logo" />
                    <h2 className="titel-login">Inloggen</h2>
                   <Switch

                   option1="jobseeker"
                   option2="company"
                   onToggle={handleToggle}
                   />
                   <div className="div-space"></div>
                   <LoginForm  whichDataPage={whichDataPage}/>
                   <div className="div-space"></div>

               </div>

               <div className="div-login-image">
                   <img src={LoginImage} className="login-image" alt="Login image" />
               </div>

           </div>
        </>
    )
}

export default LoginPage
