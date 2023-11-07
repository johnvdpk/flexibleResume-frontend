import './DataPageCompany.css'
import Form from "../../FormData/Form/Form.jsx"
import ButtonForm from "../../globalcomponents/Buttons/ButtonForm.jsx";
import formConfigEmployer from "../../FormData/Form/JsonDataForm/formEmployer.json";
import formConfigJobInfo from "../../FormData/Form/JsonDataForm/formEmployerJobInfo.json";
import profilefoto from "../../../assets/profilefoto.png"
import {useState} from "react"




function DataPageJobSeeker() {

    const [activeProfile, setActiveProfile] = useState(null);

    const handleProfileClick = (profileConfig) => {

        setActiveProfile(current => current === profileConfig ? null : profileConfig);
    }


    return (

        <>

            <div className="data-page-wrapper">

                <div className="div-data-page-menu">
                    <div className="div-profile-foto">
                        <img src={profilefoto} className="img-profile-foto" alt="profile foto" />
                    </div>

                    <div className="div-data-page-menu-child">

                        <ButtonForm
                            text="Bedrijfsgegevens"
                            onClick={() => handleProfileClick(formConfigEmployer)}
                        />
                        <ButtonForm
                            text="Vacature Informatie"
                            onClick={() => handleProfileClick(formConfigJobInfo)}
                        />
                        <ButtonForm
                            text="Berichten"
                            onClick={() => handleProfileClick()}
                        />
                        <ButtonForm
                            text="Zoek op CV"
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
                    {activeProfile && <Form formConfig={activeProfile} />}

                </div>



            </div>

        </>
    )
}

export default DataPageJobSeeker