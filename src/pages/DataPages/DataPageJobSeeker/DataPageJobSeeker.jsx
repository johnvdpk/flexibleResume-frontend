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

    const jwtToken = localStorage.getItem('token');
    const payload = JSON.parse(atob(jwtToken.split('.')[1]));
    const jobSeekerEmail = payload.sub;


    async function PersonalForm(e) {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8080/werkzoekende/email/${jobSeekerEmail}`, personalFormData)

            toggleAddSucces(true);
            setJobSeekerData(response.data) // bijwerken van de staat, met refreshen zie je ook de nieuwe data.
            getPersonalForm(response.data); // alles ophalen om te zorgen dat alles up to date is

        } catch (e) {
            console.error("Niet lekker bezig met info sturen naar de database", e);
            toggleAddSucces(false); // Stel deze in op false als de aanvraag mislukt.

        }

    }

    async function getPersonalForm() {


        try {
            const response = await axios.get(`http://localhost:8080/werkzoekende/email/${jobSeekerEmail}`)
            setJobSeekerData(response.data);
            console.log("hoi ik heb data");
        } catch (e) {
            console.error("krijg geen info uit de database")
        }

    }

    useEffect(()=> {
        getPersonalForm();
    },[]);


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


               {activeProfile && (
                   <Form
                       formConfig={activeProfile}
                       jobSeekerData={jobSeekerData}
                       personalFormData={personalFormData}
                       handleInputChange={handleInputChange}
                   />
               )}

               <form onSubmit={PersonalForm}>
                   {addSucces === true && <p>die gay info is ontvangen</p>}
                   {/*<label> Voornaam: </label>*/}
                   {/*<input*/}
                   {/*    name="firstName"*/}
                   {/*    type="text"*/}
                   {/*    value={personalFormData.firstName}*/}
                   {/*    onChange={handleInputChange}*/}
                   {/*/>*/}
                   {/*<label> Achternaam: </label>*/}
                   {/*<input*/}
                   {/*    name="surName"*/}
                   {/*    type="text"*/}
                   {/*    value={personalFormData.surName}*/}
                   {/*    onChange={handleInputChange}*/}

                   {/*/>*/}
                   {/*<label> Geboortedatum: </label>*/}
                   {/*<input*/}
                   {/*    name="dateOfBirth"*/}
                   {/*    type="text"*/}
                   {/*    value={personalFormData.dateOfBirth}*/}
                   {/*    onChange={handleInputChange}*/}

                   {/*/>*/}
                   {/*<label> email: </label>*/}
                   {/*<input*/}
                   {/*    name="email"*/}
                   {/*    type="text"*/}
                   {/*    value={personalFormData.email}*/}
                   {/*    onChange={handleInputChange}*/}

                   {/*/>*/}
                   {/*<label> Telefoon nummer: </label>*/}
                   {/*<input*/}
                   {/*    name="phoneNumber"*/}
                   {/*    type="text"*/}
                   {/*    value={personalFormData.phoneNumber}*/}
                   {/*    onChange={handleInputChange}*/}

                   {/*/>*/}
                   {/*<label> Geboorteplaats:</label>*/}
                   {/*<input*/}
                   {/*    name="homeTown"*/}
                   {/*    type="text"*/}
                   {/*    value={personalFormData.homeTown}*/}
                   {/*    onChange={handleInputChange}*/}

                   {/*/>*/}
                   {/*<label>Postcode:</label>*/}
                   {/*<input*/}
                   {/*    name="zipCode"*/}
                   {/*    type="text"*/}
                   {/*    value={personalFormData.zipCode}*/}
                   {/*    onChange={handleInputChange}*/}
                   {/*/>*/}
                   {/* <label>Adres:</label>*/}
                   {/*<input*/}
                   {/*    name="homeAddress"*/}
                   {/*    type="text"*/}
                   {/*    value={personalFormData.homeAddress}*/}
                   {/*    onChange={handleInputChange}*/}


                   {/*/>*/}
                   {/*<label> Huisnummer: </label>*/}
                   {/*<input*/}
                   {/*    name="houseNumber"*/}
                   {/*    type="text"*/}
                   {/*    value={personalFormData.houseNumber}*/}
                   {/*    onChange={handleInputChange}*/}

                   {/*/>*/}

                   <button type='submit'>verstuur</button>

               </form>







           </div>

           <div className="div-personal-form-data">


                <div className='div-jobseekerdata'>
                   {jobSeekerData && (
                       <table className='table-data'>
                           <thead>
                           <tr><td>Naam:</td><td>{jobSeekerData.firstName}</td></tr>
                           <tr><td>Achternaam:</td><td>{jobSeekerData.surName}</td></tr>
                           <tr><td>GeboorteDatum:</td><td>{jobSeekerData.dateOfBirth}</td></tr>
                           <tr><td>TelefoonNummer:</td><td>{jobSeekerData.phoneNumber}</td></tr>
                           <tr><td>Geboorteplaats:</td><td>{jobSeekerData.homeTown}</td></tr>
                           <tr><td>Postcode:</td><td>{jobSeekerData.zipCode}</td></tr>
                           <tr><td>Adres:</td><td>{jobSeekerData.address}</td></tr>
                           <tr><td>Huisnummer:</td><td>{jobSeekerData.houseNumber}</td></tr>
                           </thead>
                       </table>
                   )}

                </div>
           </div>



       </div>

            :

               <p className="p-no-inlog"> Je bent niet inlogt</p>
           }
        </>
    )
}

export default DataPageJobSeeker