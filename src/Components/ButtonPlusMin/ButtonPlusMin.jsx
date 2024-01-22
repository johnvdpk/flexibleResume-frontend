import '../Button/Button.css';

// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
function ButtonPlusMin({text,onClick}) {
    return (
        <button className="button" onClick={onClick} type='button'>{text}</button>
    );
}

export default ButtonPlusMin;