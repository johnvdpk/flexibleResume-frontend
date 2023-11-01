import './Signin.css'
import logo from '../../assets/flexible resume.svg'
import signinImage from '../../assets/signinimage.png'
import Button from "../globalcomponents/Buttons/Button.jsx";
import Switch from "../globalcomponents/Buttons/Switch.jsx";
function Signin() {


    return (
        <>
           <div className="signin-wrapper">

               <div className="div-signin">
                   <img src={logo} className="signin-logo-image" alt="logo" />
                    <h6>Aanmelden</h6>
                   <Switch
                        rectangleIndex={1}
                        text="werkzoekende"

                   />
                   {/*<Input />*/}
                   <Button

                       link="/"
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
