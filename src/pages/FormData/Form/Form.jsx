import './Form.css'
import Input from "./Input/Input.jsx";
// eslint-disable-next-line no-unused-vars
import React from "react";


// eslint-disable-next-line react/prop-types
function Form({ formConfig, handleInputChange, formOnSubmit, FormData }) {

    // eslint-disable-next-line react/prop-types
    const mainTitle = formConfig[0].maintitel;
    // eslint-disable-next-line react/prop-types
    const inputFields = formConfig.slice(1);


    return (

        <form className="global-form-style" onSubmit={formOnSubmit}>

            <h3 className='h-maintitel'>{mainTitle}:</h3>
            {inputFields.map((inputConfig) => {

                const value = FormData[inputConfig.name];

                 return (

                    <Input
                        key={inputConfig.name}
                        label={inputConfig.label}
                        name={inputConfig.name}
                        type={inputConfig.type}
                        value={value}
                        placeholder={inputConfig.placeholder}
                        onChange={handleInputChange}
                        inputType={inputConfig.inputType}
                    />
                );
            })}
           <button type="submit">Opslaan</button>
        </form>


    )
}

export default Form