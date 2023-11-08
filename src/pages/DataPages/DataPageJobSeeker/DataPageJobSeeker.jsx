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

    const [PersonalFormData, setPersonalFormData] = useState({
        firstName: '',
        surName: '',
    });


    const {isAuth} = useContext(AuthContext);

    const handleProfileClick = (profileConfig) => {

        setActiveProfile(current => current === profileConfig ? null : profileConfig);
    }

    async function PersonalForm() {
        // e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/werkzoekende', {
                firstName: "Hoi",
                surName: "De boer",
                dateOfBirth: "1996-02-01",
                email: "alexanders@email.com",
                phoneNumber: "0654789545",
                zipCode: "3443ET",
                homeAddress: "kerkstraat",
                houseNumber: "321a"
            });

            toggleAddSucces(true); // Deze zou je moeten aanroepen nadat je zeker weet dat de aanvraag succesvol was.
            console.log(response.data);

        } catch (e) {
            console.error("Niet lekker bezig met info sturen naar de database", e);
            toggleAddSucces(false); // Stel deze in op false als de aanvraag mislukt.
        }
    }

        async function findJobSeeker() {
            try {
                const response = await axios.get('http://localhost:8080/werkzoekende/voornaam/Alex');
                setJobSeekerData(response.data);
                console.log(response.data);
                console.log("Info Alex is gelukt");
            } catch (e) {
                console.error("Alex niet op kunnen halen")
            }


        }



    useEffect(() => {
        findJobSeeker();
        PersonalForm();
    }, []);


    return (

        <>
            {isAuth ?

       <div className="data-page-wrapper">



           <div className="div-data-page-menu">
                <div className="div-profile-foto">
                    <img src={profilefoto} className="img-profile-foto" alt="profile foto" />
                </div>

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
               {activeProfile && <Form formConfig={activeProfile} />}

           </div>

           <div className="div-personal-form-data">

               <form onSubmit={PersonalForm}>
                   {addSucces === true && <p>gelukt lekker flikkertje van mij</p>}
                   <input
                       type="text"
                       value={PersonalFormData.firstName}
                       onChange={(e)=>setPersonalFormData(e.target.value)}

                   />

                   <input
                       type="text"
                       value={PersonalFormData.surName}
                       onChange={(e)=>setPersonalFormData(e.target.value)}

                   />

                   <button type='submit'>verstuur</button>

               </form>


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