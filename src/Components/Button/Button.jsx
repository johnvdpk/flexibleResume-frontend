import './Button.css'
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Button({link,buttonstyle,text,onClick,isFormButton}) {

    if (isFormButton) {
        return (
            <button className='button-left-menu' onClick={onClick} type='button'>
                <view className='object'></view>
                {text}
            </button>
        );
    }

    return (
        <Link to={link}><button className={buttonstyle} onClick={onClick} type='button'>{text}</button></Link>
    )

}

export default Button