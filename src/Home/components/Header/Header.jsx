import './Header.css'
import logo from '../../../assets/flexible resume.svg'
import headerimage from '../../../assets/man-and-woman-shake-hands.svg'
import Button from "../../../pages/globalcomponents/Buttons/Button.jsx";
function Header() {


    return (
        <>
            <div className="header-wrapper">

                <div className='heaader-image-container'>
                    <img src={headerimage} className='headerimage' alt='man and woman shake hands'/>
                </div>

                <div className="header-container">
                    <img src={logo} className='header-logo' alt='logo flexible resume'/>
                    <p>Lorem ipsum dolor sit amet consectetur. Morbi etiam lectus fermentum egestas. Et magna ac massa euismod sociis. Et consequat vivamus risus eget. Condimentum magna porttitor pellentesque enim nibh felis sed nulla malesuada.</p>

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