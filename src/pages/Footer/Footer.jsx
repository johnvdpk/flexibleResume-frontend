import './Footer.css'
import navlogo from "../Navigation/assets/FlexibleResume-menu-logo.png";

function Footer() {


    return (
        <>
            <div className='extra-footer-space'></div>
            <div className="footer-wrapper">
                <div className="footerbar">
                    <img src={navlogo} className="nav-logo-image" alt='Logo Flexible Resume'/>
                    <h4>All rights given ;-)</h4>
                </div>



            </div>
        </>
    )
}

export default Footer
