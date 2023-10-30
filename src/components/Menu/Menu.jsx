import './Menu.css'
import navlogo from './assets/FlexibleResume-menu-logo.png'
import menuicon from './assets/menu-icon.png'

function Main() {


    return (
        <>
            <div className="menu-wrapper">
                <div className="navigationbar">
                    <img src={navlogo} className="nav-logo-image"/>
                    <img src={menuicon} className="menu-icon" />
                </div>



            </div>
        </>
    )
}

export default Main
