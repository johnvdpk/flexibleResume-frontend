import './DataPage.css'
import Form from "../../FormData/Form/Form.jsx";
import profilefoto from "../../../assets/profilefoto.png"
import Button from "../../globalcomponents/Buttons/Button.jsx";
import formConfigJobSeeker from "../../FormData/Form/JsonDataForm/formProfileJobseeker.json"
import formConfigEmployer from "../../FormData/Form/JsonDataForm/formProfileEmployer.json"


function DataPage() {



    return (

        <>

       <div className="data-page-wrapper">

           <div className="div-data-page-menu">
                <div className="div-profile-foto">
                    <img src={profilefoto} className="img-profile-foto" alt="profile foto" />
                </div>
                <div className="div-data-page-menu-child">
                    <Button />
                    <Button />



                </div>

           </div>

           <div className="div-personal-form">
               <Form formConfig={formConfigJobSeeker}/>

           </div>

           <div className="div-personal-form-data">

           </div>



       </div>

        </>
    )
}

export default DataPage