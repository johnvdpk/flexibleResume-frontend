import './Navigation.css'
import navlogo from './assets/FlexibleResume-menu-logo.png'

import {Link} from "react-router-dom";
import Button from "../globalcomponents/Buttons/Button.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import {useContext} from "react";


function Navigation() {

const {isAuth} = useContext(AuthContext);

    return (
        <>
            <div className="menu-wrapper">
                <div className="navigationbar">
                    <Link to="/"> <img src={navlogo} className="nav-logo-image" alt="Home Logo"/> </Link>

                    <div className='div-nav'>

                        {isAuth ?

                            <Button
                                buttonstyle="nav-button"
                                link="/"
                                text="Logout"


                            />

                            :
                            <>                            <Button
                                buttonstyle="nav-button"
                                link="/login"
                                text="Login"
                                o
                            />

                            <Button
                            buttonstyle="nav-button"
                            link="/signin"
                            text="Registeren"


                            />
                            </>

                        }


                    </div>

                </div>



            </div>
        </>
    )
}

export default Navigation
