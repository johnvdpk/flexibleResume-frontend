import './SignUpPage.css'
import logo from '../../../Assets/flexible resume.svg'
import signinImage from '../../../Assets/signinimage.png'
import SignUpForm from "./SignUpForm.jsx";
function SignUpPage() {


    return (
        <>
           <div className="signin-wrapper">

               <div className="div-signin">
                   <img src={logo} className="signin-logo-image" alt="logo" />
                    <h2 className="titel-signin">Aanmelden</h2>

                   <div className="div-space"></div>
                   <SignUpForm />
                   <div className="div-space"></div>

               </div>

               <div className="div-signin-image">
                   <img src={signinImage} className="signin-image" alt="signin image" />
               </div>

           </div>
        </>
    )
}

export default SignUpPage
