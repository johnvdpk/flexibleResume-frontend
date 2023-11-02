import './DataPage.css'
import Form from "../../FormData/Form/Form.jsx";
import profilefoto from "../../../assets/profilefoto.png"
import Button from "../../globalcomponents/Buttons/Button.jsx";
import formConfigJobSeeker from "../../FormData/Form/JsonDataForm/formProfileJobseeker.json"
import formConfigEmployer from "../../FormData/Form/JsonDataForm/formProfileEmployer.json"
import {useState} from "react";



function DataPage() {

    const [profile, setProfile] = useState(null);
    const [profile2, setProfile2] = useState(null);


    return (

        <>

       <div className="data-page-wrapper">

           <div className="div-data-page-menu">
                <div className="div-profile-foto">
                    <img src={profilefoto} className="img-profile-foto" alt="profile foto" />
                </div>
               <div className="div-data-page-menu-child">
                   <Button text="Werkzoekende" onClick={() => setProfile(formConfigJobSeeker)} />
                   <Button text="Werkzoekende" onClick={() => setProfile2(formConfigJobSeeker)} />

               </div>



           </div>

           <div className="div-personal-form">
               {profile && <Form formConfig={formConfigJobSeeker} />}
               {profile2 && <Form formConfig={formConfigEmployer} />}

           </div>

           <div className="div-personal-form-data">

           </div>



       </div>

        </>
    )
}

export default DataPage