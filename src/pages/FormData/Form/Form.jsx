import './Form.css'
import formData from './JsonDataForm/formProfileJobseeker.json';
import Input from "./Input/Input.jsx";
import Button from "../../globalcomponents/Buttons/Button.jsx";
import React from "react";


// eslint-disable-next-line react/prop-types
function Form({ formConfig, handleInputChange, PersonalForm, personalFormData }) {

    const mainTitle = formConfig[0].maintitel;
    const inputFields = formConfig.slice(1);


    return (

        <form className="global-form-style" onSubmit={PersonalForm}>

            <h3 className='h-maintitel'>{mainTitle}:</h3>
            {inputFields.map((inputConfig) => {

                const value = personalFormData[inputConfig.name];

                return (

                    <Input
                        key={inputConfig.name}
                        label={inputConfig.label}
                        name={inputConfig.name}
                        type={inputConfig.type}
                        value={value}
                        placeholder={inputConfig.placeholder}
                        onChange={handleInputChange}
                    />
                );
            })}
            {/*<button type="submit">verzenden</button>*/}
        </form>


     //    <form className="global-form-style" onSubmit={Form}>
     //
     //        <h3 className='h-maintitel'>{mainTitle}</h3>
     //
     //
     //        {inputFields.map((formData, index) => (
     //
     //            <Input
     //            key={index}
     //            label={formData.label}
     //            placeholder={formData.placeholder}
     //            />
     //            ))}
     //        <Button text="verzenden"></Button>
     //
     // </form>



    )
}

export default Form