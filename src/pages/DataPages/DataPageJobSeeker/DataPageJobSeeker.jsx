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


        // Persoonlijke gegevens form
        function handleInputChangeProfileFormData(e) {
            const { name, value } = e.target;
            setProfileFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        }

        // Werk informatie form
        function handleInputChangeWorkInfoFormData(e) {
            const { name, value } = e.target;
            setWorkInfoFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        }

        // Studie informatie form
        function handleInputChangeStudyInfoFormData(e) {
            const { name, value } = e.target;
            setStudyInfoFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        }

        // Persoonlijke informatie (hobbys) form
        function handleInputChangePersonalInfoFormData(e) {
            const { name, value } = e.target;
            setPersonalInfoFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        }


        // wissel tussen de verschillende formulieren
    const toggleForm = (profileConfig) => {
        setActiveProfile(current => current === profileConfig ? null : profileConfig);
    }


    const jwtToken = localStorage.getItem('token');
    const payload = JSON.parse(atob(jwtToken.split('.')[1]));
    const jobSeekerEmail = payload.sub;
    const cvId = localStorage.getItem('cvId')



    // Er is bij het registeren al een jobseeker aangemaakt. Het is niet nodig om een nieuwe aan te maken. Enkel updaten.

    async function putProfileForm(e) {
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

    // aanmaken van werk informatie
    async function createWorkInfoForm(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/werkzoekende/werkinfo/${cvId}`, workInfoFormData)
            setWorkInfoFormData(response.data)
            getWorkInfoForm(response.data)
            console.log("post work")
            console.log(response.data)
        } catch (e) {
            console.log("create work info niet gelukt")
        }
    }

    // aanmaken van persoonlijke informatie
    async function createPersonalInfoForm(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/werkzoekende/persoonlijkeinfo/${cvId}`, personalInfoFormData)
            setPersonalInfoFormData(response.data)
            getPersonalInfoForm(response.data)
            console.log("post personal")
            console.log(response.data)
        } catch (e) {
            console.log("create personal info niet gelukt")
        }
    }

    // aanmaken van studie informatie
    async function createStudyInfoForm(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/werkzoekende/studieinfo/${cvId}`, studyInfoFormData)
            setStudyInfoFormData(response.data)
            getStudyInfoForm(response.data)
            console.log("post study")
            console.log(response.data)
        } catch (e) {
            console.log("create study info niet gelukt")
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

    // Axios voor werk info

    async function getWorkInfoForm() {
        try{
            const response = await axios.get(`http://localhost:8080/werkzoekende/werkinfo/${cvId}`)
            setWorkInfoData(response.data);
            console.log("get werkinfo werkt")
            console.log(response.data)
        } catch(e) {
            console.error('Krijg niks uit werkinfo')
        }
    }
    // Axios voor studie info
    async function getStudyInfoForm() {
        try {
            const response = await axios.get(`http://localhost:8080/werkzoekende/studieinfo/${cvId}`)
            setStudyInfoData(response.data);
            console.log("get studyinfo werkt")
            console.log(response.data)
        }catch (e) {
            console.error("Krijg niks uit de studieinfo")
        }
    }
    // Axios voor persoonlijke info
    async function getPersonalInfoForm() {
        try {
            const response = await axios.get(`http://localhost:8080/werkzoekende/persoonlijkeinfo/${cvId}`)
            setPersonalInfoData(response.data);
            console.log("get hobbyinfo werkt")
            console.log(response.data)
        }catch (e) {
            console.error("Krijg niks uit de hobbyinfo")
        }
    }



    useEffect(()=> {

        const cvId = localStorage.getItem('cvId');
        getProfileForm(cvId);
        getWorkInfoForm(cvId);
        getStudyInfoForm(cvId);
        getPersonalInfoForm(cvId);



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
                       formOnSubmit={putProfileForm}
                   />
               )}

               {activeProfile === formConfigWorkInfo && (
               <Form
                   formConfig={activeProfile}
                   jobSeekerData={workInfoData}
                   FormData={workInfoFormData}
                   handleInputChange={handleInputChangeWorkInfoFormData}
                   formOnSubmit={createWorkInfoForm}
               />

               )}

               {activeProfile === formConfigPersonalInfo && (
                   <Form
                       formConfig={activeProfile}
                       jobSeekerData={personalInfoData}
                       FormData={personalInfoFormData}
                       handleInputChange={handleInputChangePersonalInfoFormData}
                       formOnSubmit={createPersonalInfoForm}
                   />

               )}

               {activeProfile === formConfigStudyInfo && (
                   <Form
                       formConfig={activeProfile}
                       jobSeekerData={studyInfoData}
                       FormData={studyInfoFormData}
                       handleInputChange={handleInputChangeStudyInfoFormData}
                       formOnSubmit={createStudyInfoForm}
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