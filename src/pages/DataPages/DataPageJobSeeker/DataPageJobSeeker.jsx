import './DataPageJobSeeker.css'
import Form from "../../FormData/Form/Form.jsx"
import profilefoto from "../../../assets/profilefoto.png"
import formConfigJobSeeker from "../../FormData/Form/JsonDataForm/formProfileJobseeker.json"
import formConfigJobInfo from "../../FormData/Form/JsonDataForm/formProfileJobInfo.json"
import formConfigPersonalInfo from "../../FormData/Form/JsonDataForm/formProfilePersonalInfo.json"
import formConfigStudyInfo from "../../FormData/Form/JsonDataForm/formProfileStudyInfo.json"
import {useEffect, useState} from "react"
import ButtonForm from "../../globalcomponents/Buttons/ButtonForm.jsx"

import axios from 'axios';



function DataPageJobSeeker() {

    const [activeProfile, setActiveProfile] = useState(null);

    const handleProfileClick = (profileConfig) => {

        setActiveProfile(current => current === profileConfig ? null : profileConfig);
    }


    useEffect(()=> {

        async function findJobSeeker() {
            try {
                const response = await axios.get('http://localhost:8080/werkzoekende/voornaam/Alex');
                console.log(response.data);
            } catch (e) {
                console.error("Alex niet op kunnen halen")
            }


        }

            findJobSeeker();
    }, []);

    return (

        <>

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


           </div>



       </div>

        </>
    )
}

export default DataPageJobSeeker