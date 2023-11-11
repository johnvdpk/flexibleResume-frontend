import './DataPageJobSeeker.css'
import Form from "../../FormData/Form/Form.jsx"
import profilefoto from "../../../assets/profilefoto.png"
import formConfigJobSeeker from "../../FormData/Form/JsonDataForm/formProfileJobseeker.json"
import formConfigWorkInfo from "../../FormData/Form/JsonDataForm/formProfileWorkInfo.json"
import formConfigPersonalInfo from "../../FormData/Form/JsonDataForm/formProfilePersonalInfo.json"
import formConfigStudyInfo from "../../FormData/Form/JsonDataForm/formProfileStudyInfo.json"
import {useContext, useEffect, useState} from "react"
import ButtonForm from "../../globalcomponents/Buttons/ButtonForm.jsx"
import { AuthContext} from "../../../context/AuthContext.jsx";
import axios from 'axios';


function DataPageJobSeeker() {

    //useContext
        const {isAuth} = useContext(AuthContext);


    //useState
        const [activeProfile, setActiveProfile] = useState(null);
        const [jobSeekerData, setJobSeekerData] = useState(null);
        const [workInfoData, setWorkInfoData] = useState(null);
        const [studyInfoData, setStudyInfoData] = useState(null);
        const [personalInfoData, setPersonalInfoData] = useState(null);

        // Profiel gegegevens
        const [profileFormData, setProfileFormData] = useState({
            firstName: '',
            surName: '',
            dateOfBirth: '',
            email: '',
            phoneNumber: '',
            residence: '',
            zipCode: '',
            homeAddress: '',
            houseNumber: '',

        });

        // Werk info
        const [workInfoFormData, setWorkInfoFormData] = useState({

            company:'',
            jobTitle:'',
            periodOfEmployment:'',
            jobInfo:'',
        });


        // Studie info
        const [studyInfoFormData, setStudyInfoFormData] = useState( {

            educationalInstitute: '',
            education: '',
            periodOfStudy: '',
            studyInfo: '',

        })

        // Hobby info

        const [personalInfoFormData, setPersonalInfoFormData] = useState( {

            hobby: '',
            periodOfHobby: '',
            hobbyInfo: '',

        })



        function handleInputChangeProfileFormData(e) {
            const { name, value } = e.target;
            setProfileFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        }

        function handleInputChangeWorkInfoFormData(e) {
            const { name, value } = e.target;
            setWorkInfoFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        }

        function handleInputChangeStudyInfoFormData(e) {
            const { name, value } = e.target;
            setStudyInfoFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        }

        function handleInputChangePersonalInfoFormData(e) {
            const { name, value } = e.target;
            setPersonalInfoFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        }


    const toggleForm = (profileConfig) => {
        setActiveProfile(current => current === profileConfig ? null : profileConfig);
    }

    const jwtToken = localStorage.getItem('token');
    const payload = JSON.parse(atob(jwtToken.split('.')[1]));
    const jobSeekerEmail = payload.sub;
    const cvId = localStorage.getItem('cvId')



    // axios voor profiel gegevens

        async function ProfileForm(e) {
            e.preventDefault();

            try {
                const response = await axios.put(`http://localhost:8080/werkzoekende/email/${jobSeekerEmail}`, profileFormData)

                setJobSeekerData(response.data) // bijwerken van de staat, met refreshen zie je ook de nieuwe data.
                getProfileForm(response.data); // alles ophalen om te zorgen dat alles up to date is
                console.log("put")
                console.log(response.data)

            } catch (e) {
                console.error("Niet lekker bezig met info sturen naar de database", e);


            }

        }

        // Data vanuit jobseeker entity gefilterd op email
        async function getProfileForm() {

            try {
                const response = await axios.get(`http://localhost:8080/werkzoekende/email/${jobSeekerEmail}`)
                setJobSeekerData(response.data);
                console.log("get")
                console.log(response.data)

            } catch (e) {
                console.error("krijg geen info uit de database")
            }

        }

    // Axios voor werkinfo



    async function getWorkInfoForm() {


            try{
                const response = await axios.get(`http://localhost:8080/werkzoekende/werkinfo/${cvId}`)
                setWorkInfoData(response.data);
                console.log("get werkinfo werkt")



            } catch(e) {
                console.error('Krijg niks uit werkinfo')

            }
    }


    useEffect(()=> {
        getProfileForm();

        const cvId = localStorage.getItem('cvId');
        if (cvId) {
            getWorkInfoForm(cvId);
        } else {
            console.log('cvId is niet gevonden in localStorage');
        }

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
                           onClick={() => toggleForm(formConfigJobSeeker)}
                       />
                       <ButtonForm
                           text="Werk Info"
                           onClick={() => toggleForm(formConfigWorkInfo)}
                       />
                       <ButtonForm
                           text="Persoonlijke Info"
                           onClick={() => toggleForm(formConfigPersonalInfo)}
                       />
                       <ButtonForm
                           text="Studie Info"
                           onClick={() => toggleForm(formConfigStudyInfo)}
                       />
                       <ButtonForm
                           text="Kies een template"

                       />
                       <ButtonForm
                           text="Zoek op werkgever"

                       />
                       <ButtonForm
                           text="Berichten"

                       />
                       <ButtonForm
                           text="Account verwijderen"

                       />


                   </div>


           </div>

           <div className="div-personal-form">


               {activeProfile === formConfigJobSeeker && (
                   <Form
                       formConfig={activeProfile}
                       jobSeekerData={jobSeekerData}
                       FormData={profileFormData}
                       handleInputChange={handleInputChangeProfileFormData}
                       formOnSubmit={ProfileForm}
                   />
               )}

               {activeProfile === formConfigWorkInfo && (
               <Form
                   formConfig={activeProfile}
                   jobSeekerData={workInfoData}
                   FormData={workInfoFormData}
                   handleInputChange={handleInputChangeWorkInfoFormData}
                   formOnSubmit={ProfileForm}
               />

               )}

               {activeProfile === formConfigPersonalInfo && (
                   <Form
                       formConfig={activeProfile}
                       jobSeekerData={personalInfoData}
                       FormData={personalInfoFormData}
                       handleInputChange={handleInputChangePersonalInfoFormData}
                       formOnSubmit={ProfileForm}
                   />

               )}

               {activeProfile === formConfigStudyInfo && (
                   <Form
                       formConfig={activeProfile}
                       jobSeekerData={studyInfoData}
                       FormData={studyInfoFormData}
                       handleInputChange={handleInputChangeStudyInfoFormData}
                       formOnSubmit={ProfileForm}
                   />

               )}








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
                           <tr><td>Woonplaats:</td><td>{jobSeekerData.residence}</td></tr>
                           <tr><td>Postcode:</td><td>{jobSeekerData.zipCode}</td></tr>
                           <tr><td>Adres:</td><td>{jobSeekerData.homeAddress}</td></tr>
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