import './Button.css'
import {Link} from "react-router-dom";

function Button({link,buttonstyle,text}) {

    return (
        <Link to={link}><button className={buttonstyle}>{text}</button></Link>
    )

}

export default Button