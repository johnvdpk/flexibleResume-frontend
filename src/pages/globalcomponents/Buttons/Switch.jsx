import './Switch.css'
import {Link} from "react-router-dom";

function Switch({link, rectangleIndex,text}) {



return (

    <Link to={link}><button>

            <view className={`rectangle ${rectangleIndex === 1 ? 'brandcolor' : ''}`}></view>
            <view className={`rectangle ${rectangleIndex === 2 ? 'brandcolor' : ''}`}></view>
        {text}


        </button></Link>


)


}

export default Switch