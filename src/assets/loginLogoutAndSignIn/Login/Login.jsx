import './Login.css'
import logo from '../../flexible resume.svg'
import LoginImage from '../../loginimage.png'
import Switch from "../../../pages/globalcomponents/Buttons/Switch.jsx";
import LoginForm from "../login/LoginForm.jsx";
function Login() {


    return (
        <>
           <div className="login-wrapper">

               <div className="div-login">
                   <img src={logo} className="login-logo-image" alt="logo" />
                    <h2 className="titel-login">Inloggen</h2>
                   <Switch
                        rectangleIndex={1}
                        text="werkzoekende"

                   />
                   <div className="div-space"></div>
                   <LoginForm />
                   <div className="div-space"></div>

               </div>

               <div className="div-login-image">
                   <img src={LoginImage} className="login-image" alt="Login image" />
               </div>

           </div>
        </>
    )
}

export default Login
