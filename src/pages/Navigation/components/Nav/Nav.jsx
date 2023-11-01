import './Nav.css';
import HamburgerMenu from "../hamburger-menu/HamburgerMenu.jsx";

function Nav({props}) {
console.log(props)

    return(

        <>
            <div className="navigation">
                <ul>
                    <li>{props.pageone}</li>
                    <li>{props.pagetwo}</li>
                    <li>{props.pagethree}</li>
                    <li>{props.pagefour}</li>
                </ul>

                <div className="hamburge">
                <HamburgerMenu />
                </div>
            </div>


        </>
    )

}

export default Nav
