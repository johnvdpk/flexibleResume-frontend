import './Navigation.css'
import navlogo from '../../Assets/FlexibleResume-menu-logo.png'

import {Link} from "react-router-dom";
import Button from "../../Components/Button/Button.jsx";
import { AuthContext } from "../../Hooks/AuthContext/AuthContext.jsx";
import {useContext} from "react";


function Navigation() {



const {isAuth, logout} = useContext(AuthContext);

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
                                onClick={logout}

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
