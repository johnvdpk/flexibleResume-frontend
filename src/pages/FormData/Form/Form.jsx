import './Form.css'
import formData from './JsonDataForm/formProfileJobseeker.json';
import Input from "./Input/Input.jsx";
import Button from "../../globalcomponents/Buttons/Button.jsx";
import React from "react";


// eslint-disable-next-line react/prop-types
function Form({formConfig}) {

    const mainTitle = formConfig[0].maintitel;
    const inputFields = formConfig.slice(1);


    return (

        <form className="global-form-style" onSubmit={Form}>

            <h3 className='h-maintitel'>{mainTitle}</h3>


            {inputFields.map((formData, index) => (

                <Input
                key={index}
                label={formData.label}
                placeholder={formData.placeholder}
                />
                ))}
            <Button text="verzenden"></Button>

     </form>



    )
}

export default Form