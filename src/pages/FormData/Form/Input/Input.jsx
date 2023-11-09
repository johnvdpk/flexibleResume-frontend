import './Input.css'
import {useState} from "react";

// eslint-disable-next-line react/prop-types
function Input({label,dataName,type,dataForm,placeholder,handleFunction}) {

// textarea en input verschil moet nog gemaakt worden. Wellicht met een useContext

    return (

        <>

            <label className="global-label" htmlFor={`field${label}`}>
               {label}:
            </label>

                    <input
                        className="global-input"
                        name={dataName}
                        type={type}
                        value={dataForm}
                        placeholder={placeholder}
                        onChange={handleFunction}
                    />


        </>

    );
}

export default Input
