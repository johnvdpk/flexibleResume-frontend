import './Navigation.css'
import navlogo from './assets/FlexibleResume-menu-logo.png'

import {Link} from "react-router-dom";

function Navigation() {


    return (
        <>
            <div className="menu-wrapper">
                <div className="navigationbar">
                    <Link to="/"> <img src={navlogo} className="nav-logo-image" alt="Home Logo"/> </Link>


                </div>



            </div>
        </>
    )
}

export default Navigation
