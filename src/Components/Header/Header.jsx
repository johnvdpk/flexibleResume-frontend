import './Header.css'
import logo from '../../Assets/flexible resume.svg'
import headerimage from '../../Assets/man-and-woman-shake-hands.svg'
import Button from "../Button/Button.jsx";
function Header() {


    return (
        <>
            <div className="header-wrapper">

                <div className='heaader-image-container'>
                    <img src={headerimage} className='headerimage' alt='man and woman shake hands'/>
                </div>

                <div className="header-container">
                    <img src={logo} className='header-logo' alt='logo flexible resume'/>
                    <p>Welkom bij Flexible Resume. Zin in een nieuwe baan, maar geen idee waar je moet beginnen met het maken van jouw Curriculum Vitae? Zoek niet verder. Registreer je hier gratis en begin direct met het bouwen van jouw cv. Geef jouw ervaring op, kies een template en bedank ons later.F </p>

                    <div className="header-container-buttons">

                        <Button
                            link="/signin"

                            text="Getting Started"
                        />
                        <Button
                            link="/login"
                            buttonstyle="secondary-button"
                            text="inloggen"
                        />



                    </div>
                </div>




            </div>
            </>
    )
}

export default Header
