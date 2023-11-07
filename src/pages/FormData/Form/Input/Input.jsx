import './Input.css'
import {useState} from "react";

// eslint-disable-next-line react/prop-types
function Input({label,type,placeholder}) {

// textarea en input verschil moet nog gemaakt worden. Wellicht met een useContext

    return (

        <label className="global-label" htmlFor={`field${label}`}>
            <p className="global-label-p">{label}:</p>



                <input
                    className="global-input"
                    type={type}
                    name={`field${label}`}
                    placeholder={placeholder}
                />



        </label>
    );
}

export default Input
