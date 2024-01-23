import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.jsx";
import {useState} from "react";



function Nav() {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    }

    return (
        <>
            <div className="navigation">
                {/*<ul style={{ display: hamburgerOpen ? 'inline' : 'none' }}>*/}
                <div className="menu-links">
                    <p className='p-link'>About</p>
                    <p className='p-link'>Registeren</p>
                    <p className='p-link'>Inloggen</p>
                    <p className='p-link'>Contact</p>
                </div>

                <div className="hamburger" onClick={toggleHamburger}>
                    <HamburgerMenu />
                </div>
            </div>
        </>
    );
}

export default Nav