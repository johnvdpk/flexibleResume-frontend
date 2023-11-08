import './DataPageJobSeeker.css'
import Form from "../../FormData/Form/Form.jsx"
import profilefoto from "../../../assets/profilefoto.png"
import formConfigJobSeeker from "../../FormData/Form/JsonDataForm/formProfileJobseeker.json"
import formConfigJobInfo from "../../FormData/Form/JsonDataForm/formProfileJobInfo.json"
import formConfigPersonalInfo from "../../FormData/Form/JsonDataForm/formProfilePersonalInfo.json"
import formConfigStudyInfo from "../../FormData/Form/JsonDataForm/formProfileStudyInfo.json"
import {useContext, useEffect, useState} from "react"
import ButtonForm from "../../globalcomponents/Buttons/ButtonForm.jsx"
import { AuthContext} from "../../../context/AuthContext.jsx";

import axios from 'axios';



function DataPageJobSeeker() {

    const [activeProfile, setActiveProfile] = useState(null);
    const [jobSeekerData, setJobSeekerData] = useState(null);
    const [addSucces, toggleAddSucces] = useState(false);


    // Persoonlijke gegevens formulier
    const [personalFormData, setPersonalFormData] = useState({
        firstName: '',
        surName: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
        homeTown: '',
        zipCode: '',
        homeAddress: '',
        houseNumber: '',

    });


    function handleInputChange(e) {
        const { name, value } = e.target;
        setPersonalFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    }


    const {isAuth} = useContext(AuthContext);

    const handleProfileClick = (profileConfig) => {
        setActiveProfile(current => current === profileConfig ? null : profileConfig);
    }

    const jobSeekerId = 1;
    async function PersonalForm(e) {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8080/werkzoekende/${jobSeekerId}`, personalFormData)

            toggleAddSucces(true);
            console.log(response.data);

        } catch (e) {
            console.error("Niet lekker bezig met info sturen naar de database", e);
            toggleAddSucces(false); // Stel deze in op false als de aanvraag mislukt.

        }

    }



    return (

        <>
            {isAuth ?

       <div className="data-page-wrapper">



           <div className="div-data-page-menu">
                <div className="div-profile-foto">
                    <img src={profilefoto} className="img-profile-foto" alt="profile foto" />
                </div>

                    {/*buttons*/}
                   <div className="div-data-page-menu-child">


                       <ButtonForm
                           text="Profiel gegevens"
                           onClick={() => handleProfileClick(formConfigJobSeeker)}
                       />
                       <ButtonForm
                           text="Werk Info"
                           onClick={() => handleProfileClick(formConfigJobInfo)}
                       />
                       <ButtonForm
                           text="Persoonlijke Info"
                           onClick={() => handleProfileClick(formConfigPersonalInfo)}
                       />
                       <ButtonForm
                           text="Studie Info"
                           onClick={() => handleProfileClick(formConfigStudyInfo)}
                       />
                       <ButtonForm
                           text="Kies een template"
                           onClick={() => handleProfileClick()}
                       />
                       <ButtonForm
                           text="Zoek op werkgever"
                           onClick={() => handleProfileClick()}
                       />
                       <ButtonForm
                           text="Berichten"
                           onClick={() => handleProfileClick()}
                       />
                       <ButtonForm
                           text="Account verwijderen"
                           onClick={() => handleProfileClick()}
                       />


                   </div>


           </div>

           <div className="div-personal-form">

               <form onSubmit={PersonalForm}>
                   {addSucces === true && <p>die gay info is ontvangen</p>}
                   <label> Voornaam: </label>
                   <input
                       name="firstName"
                       type="text"
                       value={personalFormData.firstName}
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



               {activeProfile && <Form formConfig={activeProfile} />}



           </div>

           <div className="div-personal-form-data">



               {jobSeekerData && (
                   <>
                       <p>Naam: {jobSeekerData.firstName} {jobSeekerData.surName}</p>
                       <p>Email: {jobSeekerData.email}</p>

                   </>
               )}

           </div>



       </div>

            :

               <p className="p-no-inlog"> Je bent niet inlogt</p>
           }
        </>
    )
}

export default DataPageJobSeeker