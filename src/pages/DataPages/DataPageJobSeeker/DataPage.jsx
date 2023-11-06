import './DataPage.css'
import Form from "../../FormData/Form/Form.jsx";
import profilefoto from "../../../assets/profilefoto.png"
import Button from "../../globalcomponents/Buttons/Button.jsx";
import formConfigJobSeeker from "../../FormData/Form/JsonDataForm/formProfileJobseeker.json"
import formConfigEmployer from "../../FormData/Form/JsonDataForm/formProfileEmployer.json"
import {useState} from "react";
import ButtonForm from "../../globalcomponents/Buttons/ButtonForm.jsx";



function DataPage() {

    const [activeProfile, setActiveProfile] = useState(null);

    const handleProfileClick = (profileConfig) => {

        setActiveProfile(current => current === profileConfig ? null : profileConfig);
    }

    // const [profile, setProfile] = useState(null);
    // const [profile2, setProfile2] = useState(null);


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
                           onClick={() => handleProfileClick(formConfigEmployer)}
                       />
                       <ButtonForm
                           text="Persoonlijke Info"
                           onClick={() => handleProfileClick(formConfigEmployer)}
                       />
                       <ButtonForm
                           text="Studie Info"
                           onClick={() => handleProfileClick(formConfigEmployer)}
                       />
                       <ButtonForm
                           text="Kies een template"
                           onClick={() => handleProfileClick(formConfigEmployer)}
                       />
                       <ButtonForm
                           text="Zoek op werkgever"
                           onClick={() => handleProfileClick(formConfigEmployer)}
                       />
                       <ButtonForm
                           text="Berichten"
                           onClick={() => handleProfileClick(formConfigEmployer)}
                       />
                       <ButtonForm
                           text="Account verwijderen"
                           onClick={() => handleProfileClick(formConfigEmployer)}
                       />


                       {/*<Button buttonstyle="left-menu" text="Werkzoekende" onClick={() => setProfile(formConfigJobSeeker)} />*/}
                       {/*<Button buttonstyle="left-menu" text="Werkzoekende" onClick={() => setProfile2(formConfigJobSeeker)} />*/}

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

export default DataPage