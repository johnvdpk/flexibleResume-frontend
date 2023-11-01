import './Navigation.css'
import navlogo from './assets/FlexibleResume-menu-logo.png'

import Nav from "./components/Nav/Nav.jsx";

function Navigation() {


    return (
        <>
            <div className="menu-wrapper">
                <div className="navigationbar">
                    <img src={navlogo} className="nav-logo-image" alt="Home Logo"/>


                </div>



            </div>
        </>
    )
}

export default Navigation
