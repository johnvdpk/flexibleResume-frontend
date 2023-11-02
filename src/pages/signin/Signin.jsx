import './Signin.css'
import logo from '../../assets/flexible resume.svg'
import signinImage from '../../assets/signinimage.png'
import Button from "../globalcomponents/Buttons/Button.jsx";
import Switch from "../globalcomponents/Buttons/Switch.jsx";
import LoginForm from "../globalcomponents/input/LoginForm.jsx";
function Signin() {


    return (
        <>
           <div className="signin-wrapper">

               <div className="div-signin">
                   <img src={logo} className="signin-logo-image" alt="logo" />
                    <h2 className="titel-signin">Aanmelden</h2>
                   <Switch
                        rectangleIndex={1}
                        text="werkzoekende"

                   />
                   <div className="div-space"></div>
                   <LoginForm />
                   <div className="div-space"></div>
                   <Button

                       link="/jobapplicantprofile"
                       text="Login"
                   />
               </div>

               <div className="div-signin-image">
                   <img src={signinImage} className="signin-image" alt="signin image" />
               </div>

           </div>
        </>
    )
}

export default Signin
