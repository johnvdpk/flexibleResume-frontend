import './Footer.css'
import navlogo from "../Navigation/assets/FlexibleResume-menu-logo.png";

function Footer() {


    return (
        <>
            <div className="footer-wrapper">
                <div className="footerbar">
                    <img src={navlogo} className="nav-logo-image"/>
                    <h4>All rights given ;-)</h4>
                </div>



            </div>
        </>
    )
}

export default Footer
