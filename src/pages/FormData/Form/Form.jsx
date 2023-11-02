import './Form.css'
import formData from './JsonDataForm/formProfileJobseeker.json'
import Input from "./Input/Input.jsx";


function Form() {


    return (

        <form className="global-form-style">

            {formData.map((formData, index) => (

                <Input
                key={index}
                field={formData.field}
                label={formData.label}
                type={formData.type}
                placeholder={formData.placeholder}
                />
                ))}


     </form>

    )
}

export default Form