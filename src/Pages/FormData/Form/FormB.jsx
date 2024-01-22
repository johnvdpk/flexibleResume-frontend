import './Form.css'
import React from "react";


// eslint-disable-next-line react/prop-types
function FormB({formConfig,addSucces, PersonalForm, personalFormData, setJobSeekerData, handleInputChange}) {

    return (

        <form onSubmit={PersonalForm}>
            {addSucces === true && <p>die gay info is ontvangen</p>}
            <label> Voornaam: </label>
            <input
                name="firstName"
                type="text"
                value={setJobSeekerData.firstName}
                onChange={handleInputChange}
            />
            <label> Achternaam: </label>
            <input
                name="surName"
                type="text"
                value={personalFormData.surName}
                onChange={handleInputChange}

            />
            <label> Geboortedatum: </label>
            <input
                name="dateOfBirth"
                type="text"
                value={personalFormData.dateOfBirth}
                onChange={handleInputChange}

            />
            <label> email: </label>
            <input
                name="email"
                type="text"
                value={personalFormData.email}
                onChange={handleInputChange}

            />
            <label> Telefoon nummer: </label>
            <input
                name="phoneNumber"
                type="text"
                value={personalFormData.phoneNumber}
                onChange={handleInputChange}

            />
            <label> Geboorteplaats:</label>
            <input
                name="homeTown"
                type="text"
                value={personalFormData.homeTown}
                onChange={handleInputChange}

            />
            <label>Postcode:</label>
            <input
                name="zipCode"
                type="text"
                value={personalFormData.zipCode}
                onChange={handleInputChange}
            />
            <label>Adres:</label>
            <input
                name="homeAddress"
                type="text"
                value={personalFormData.homeAddress}
                onChange={handleInputChange}


            />
            <label> Huisnummer: </label>
            <input
                name="houseNumber"
                type="text"
                value={personalFormData.houseNumber}
                onChange={handleInputChange}

            />

            <button type='submit'>verstuur</button>

        </form>


        // <form className="global-form-style" onSubmit={Form}>
        //
        //     <h3 className='h-maintitel'>{mainTitle}</h3>
        //
        //
        //     {inputFields.map((formData, index) => (
        //
        //         <Input
        //             key={index}
        //             label={formData.label}
        //             placeholder={formData.placeholder}
        //         />
        //     ))}
        //     <Button text="verzenden"></Button>
        //
        // </form>



    )
}

export default FormB