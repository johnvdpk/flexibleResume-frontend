import './DataPageJobSeeker.css'
import Form from "../../FormData/Form/Form.jsx"
import defaultProfilePhoto from "../../../assets/profilefoto.png"
import formConfigJobSeeker from "../../FormData/Form/JsonDataForm/formProfileJobseeker.json"
import formConfigWorkInfo from "../../FormData/Form/JsonDataForm/formProfileWorkInfo.json"
import formConfigPersonalInfo from "../../FormData/Form/JsonDataForm/formProfilePersonalInfo.json"
import formConfigStudyInfo from "../../FormData/Form/JsonDataForm/formProfileStudyInfo.json"
import formConfigCV from "../../FormData/Form/JsonDataForm/formProfileCV.json"
import {useContext, useEffect, useState} from "react"
import ButtonForm from "../../globalcomponents/Buttons/ButtonForm.jsx"
import { AuthContext} from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ButtonPlusMin from "../../globalcomponents/Buttons/ButtonPlusMin.jsx";
import TemplateOne from "./Templates/TemplateOne/TemplateOne.jsx";
import TemplateTwo from "./Templates/TemplateTwo/TemplateTwo.jsx";
import TemplateThree from "./Templates/TemplateThree/TemplateThree.jsx";
import FileUpload from "./FileUpload/FileUpload.jsx";
import Button from "../../globalcomponents/Buttons/Button.jsx";



function DataPageJobSeeker() {

    //useContext
        const {isAuth, user, logout} = useContext(AuthContext);




    //useState
        const [activeProfile, setActiveProfile] = useState(null);
        const [switchButton, setSwitchButton] = useState(null);
        const navigate = useNavigate();

        const [fileUrl, setFileUrl] = useState(null);
        const [jobSeekerData, setJobSeekerData] = useState(null);
        const [cvData, setCVData] = useState(null);
        const [workInfoData, setWorkInfoData] = useState(null);
        const [studyInfoData, setStudyInfoData] = useState(null);
        const [personalInfoData, setPersonalInfoData] = useState(null);


        const buttonConfig = {
            inSide: 'template',
            deleteAcount: 'deleteAcount',
        }


        const [cvFormData, setCVFormData] = useState( {
            aboutMe: '',
        })
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

            id:'',
            cvId: '',
            company:'',
            jobTitle:'',
            periodOfEmployment:'',
            jobInfo:'',
        });


        // Studie info
        const [studyInfoFormData, setStudyInfoFormData] = useState( {

            id:'',
            cvId:'',
            educationalInstitute: '',
            education: '',
            periodOfStudy: '',
            studyInfo: '',

        })

        // Hobby info

        const [personalInfoFormData, setPersonalInfoFormData] = useState( {

            id:'',
            cvId:'',
            hobby: '',
            periodOfHobby: '',
            hobbyInfo: '',

        })

    // CV gegevens. Nu alleen een About me, maar dit is zo gemaakt om het makkelijker uit te breiden.
    function handleInputChangeCVFormData(e) {
        const { name, value } = e.target;
        setCVFormData(prevCVData => ({
            ...prevCVData,
            [name]: value,
        }));
    }


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

    const toggleButton = (buttonConfig)=> {
            setSwitchButton(current => current === buttonConfig ? null : buttonConfig);

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
            await getProfileForm(response.data); // alles ophalen om te zorgen dat alles up to date is
            console.log("put")
            console.log(response.data)

        } catch (e) {
            console.error("Niet lekker bezig met info sturen naar de database", e);


        }

    }

    async function putCVForm(e) {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8080/werkzoekende/cv/cv/${cvId}`, cvFormData)

            setCVData(response.data) // bijwerken van de staat, met refreshen zie je ook de nieuwe data.
            await getCVForm(response.data); // alles ophalen om te zorgen dat alles up to date is
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

    async function getCVForm() {

        try {
            const response = await axios.get(`http://localhost:8080/werkzoekende/cv/${cvId}`)
            setCVData(response.data);
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
        } catch(e) {
            console.error('Axios error:', e);
            if (e.response) {
                // Het serverantwoord op het verzoek
                console.error('Response:', e.response);
            }
            console.error('Krijg niks uit werkinfo', e)
        }
    }
    // Axios voor studie info
    async function getStudyInfoForm() {
        try {
            const response = await axios.get(`http://localhost:8080/werkzoekende/studieinfo/${cvId}`)
            setStudyInfoData(response.data);
            console.log("get studyinfo werkt")
        }catch (e) {
            console.error("Krijg niks uit de studieinfo", e)
        }
    }
    // Axios voor persoonlijke info
    async function getPersonalInfoForm() {
        try {
            const response = await axios.get(`http://localhost:8080/werkzoekende/persoonlijkeinfo/${cvId}`)
            setPersonalInfoData(response.data);
            console.log("get hobbyinfo werkt")
        }catch (e) {
            console.error("Krijg niks uit de hobbyinfo", e)
        }
    }


    // DELETE verzoeken

        // delete van de workinfo
        async function deleteWorkInfo(id) {

            if (id === null) {
                console.error("Kan item niet verwijderen zonder ID");
                return;
            }
            try {
                await axios.delete(`http://localhost:8080/werkzoekende/werkinfo/${id}`);
                const newWorkInfoData = workInfoData.filter(item => item.id !== id);
                setWorkInfoData(newWorkInfoData);
                console.log("Item workinfo verwijderd");
            } catch (error) {
                console.error("Error bij het verwijderen van item", error);
            }
        }

    // delete van de studyinfo
    async function deleteStudyInfo(id) {

        if (id === null) {
            console.error("Kan item niet verwijderen zonder ID");
            return;
        }
        try {
            await axios.delete(`http://localhost:8080/werkzoekende/studieinfo/${id}`);
            const newStudyInfoData = studyInfoData.filter(item => item.id !== id);
            setStudyInfoData(newStudyInfoData);
            console.log("Item studyinfo verwijderd");
        } catch (error) {
            console.error("Error bij het verwijderen van item", error);
        }
    }

    // delete van de personalinfo
    async function deletePersonalInfo(id) {

        if (id === null) {
            console.error("Kan item niet verwijderen zonder ID");
            return;
        }
        try {
            await axios.delete(`http://localhost:8080/werkzoekende/persoonlijkeinfo/${id}`);
            const newPersonalInfoData = workInfoData.filter(item => item.id !== id);
            setPersonalInfoData(newPersonalInfoData);
            console.log("Item personal info verwijderd");
        } catch (error) {
            console.error("Error bij het verwijderen van item", error);
        }
    }

    async function deleteAccount() {
        const jwtToken = localStorage.getItem('token');
        const email = JSON.parse(atob(jwtToken.split('.')[1])).sub;

        if (window.confirm("Weet je zeker dat je je account wilt verwijderen? Dit kan niet ongedaan worden gemaakt!")) {
            try {
                await axios.delete(`http://localhost:8080/auth/user/${email}`);
                // Logica om gebruiker uit te loggen en de UI bij te werken
                console.log("Account succesvol verwijderd");
                logout();
                navigate("/");
            } catch (error) {
                console.error("Er is een fout opgetreden bij het verwijderen van het account", error);
                // Toon foutmelding
            }
        }
    }



    useEffect(()=> {


        const cvId = localStorage.getItem('cvId')


            if (cvId) {
                getProfileForm(cvId);
                getCVForm(cvId);
                getWorkInfoForm(cvId);
                getStudyInfoForm(cvId);
                getPersonalInfoForm(cvId);
                console.log("dit is het cv_Id=", +cvId)
            } else {
                const cvId = 1;
                console.log(cvId +' cvId niet gevonden in de localstorage')
            }


    },[]);


    if (!isAuth || (user && user.role !== "USER" && user.role !== "ADMIN")) {
        return <p className="p-no-inlog">Toegang geweigerd. Je bent niet ingelogd of je hebt niet de juiste rechten.</p>;
    }
    return (

        <>
            {/*{isAuth ?*/}

       <div className="data-page-wrapper">


           <div className="div-data-page-menu">
                <div className="div-profile-foto">
                   <img src={fileUrl || defaultProfilePhoto} className="img-profile-foto"/>
                    <FileUpload setFileUrl={setFileUrl} />
                </div>

                    {/*buttons*/}
                   <div className="div-data-page-menu-child">


                       <ButtonForm
                           text="Profielgegevens"
                           onClick={() => toggleForm(formConfigJobSeeker)}
                       />
                       <ButtonForm
                           text="Introductie tekst"
                           onClick={() => toggleForm(formConfigCV)}
                       />
                       <ButtonForm
                           text="Werkgegevens"
                           onClick={() => toggleForm(formConfigWorkInfo)}
                       />

                       <ButtonForm
                           text="Studiegegevens"
                           onClick={() => toggleForm(formConfigStudyInfo)}
                       />

                       <ButtonForm
                           text="Persoonlijke gegevens"
                           onClick={() => toggleForm(formConfigPersonalInfo)}
                       />

                       <ButtonForm
                           text="Kies een template"
                           onClick={()=> toggleButton(buttonConfig.inSide)}

                       />
                       <ButtonForm
                           text="Account verwijderen"
                           onClick={()=>toggleButton(buttonConfig.deleteAcount)}

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

               {activeProfile === formConfigCV && (

               <Form
                   formConfig={activeProfile}
                   jobSeekerData={cvData}
                   FormData={cvFormData}
                   handleInputChange={handleInputChangeCVFormData}
                   formOnSubmit={putCVForm}


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


               {activeProfile === formConfigStudyInfo && (
                   <Form
                       formConfig={activeProfile}
                       jobSeekerData={studyInfoData}
                       FormData={studyInfoFormData}
                       handleInputChange={handleInputChangeStudyInfoFormData}
                       formOnSubmit={createStudyInfoForm}
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

               {switchButton === buttonConfig.inSide && (
                <div className='div-template-wrapper'>

                    <TemplateOne
                        fileUrl={fileUrl}
                        profileData={jobSeekerData}
                        aboutMe={cvData.aboutMe}
                        workData={workInfoData}
                        studyData={studyInfoData}
                        personalData={personalInfoData}
                    />

                    <TemplateTwo
                        fileUrl={fileUrl}
                        profileData={jobSeekerData}
                        aboutMe={cvData.aboutMe}
                        workData={workInfoData}
                        studyData={studyInfoData}
                        personalData={personalInfoData}
                    />

                    <TemplateThree
                        fileUrl={fileUrl}
                        profileData={jobSeekerData}
                        aboutMe={cvData.aboutMe}
                        workData={workInfoData}
                        studyData={studyInfoData}
                        personalData={personalInfoData}
                    />

                </div>

               )}



               {switchButton === buttonConfig.deleteAcount && (
                   <div className='delete-acount-wrapper'>
                       <Button text='Acount verwijderen' onClick={deleteAccount}/>
                   </div>

                   )}







           </div>

           <div className="div-personal-form-data">
               <h3 className='h-infotitel'>Profielgegevens</h3>

                <div className='div-jobseekerdata'>
                   {jobSeekerData && (
                       <table className='table-persoonlijkegegevenstabel'>

                               <tr><td>Naam:</td><td>{jobSeekerData.firstName}</td></tr>
                               <tr><td>Achternaam:</td><td>{jobSeekerData.surName}</td></tr>
                               <tr><td>GeboorteDatum:</td><td>{jobSeekerData.dateOfBirth}</td></tr>
                               <tr><td>TelefoonNummer:</td><td>{jobSeekerData.phoneNumber}</td></tr>
                               <tr><td>Email:</td><td>{jobSeekerData.email}</td></tr>
                               <tr><td>Woonplaats:</td><td>{jobSeekerData.residence}</td></tr>
                               <tr><td>Postcode:</td><td>{jobSeekerData.zipCode}</td></tr>
                               <tr><td>Adres:</td><td>{jobSeekerData.homeAddress}</td></tr>
                               <tr><td>Huisnummer:</td><td>{jobSeekerData.houseNumber}</td></tr>

                       </table>
                   )}

                </div>

               <div className='div-cvdata'>

                   {cvData && (
                       <div className='div-cvdata-child'>
                           <p>{cvData.aboutMe}</p>
                       </div>

                   )}
               </div>

               {/*Dit kan nog een component worden*/}
                <div className='div-workinfodata' >
                    <h3 className='h-infotitel'>Werkgegevens</h3>
                    {workInfoData && Array.isArray(workInfoData) && workInfoData.length > 0 && (
                        <div className='div-cvid-info-data-wrapper'>

                            {workInfoData.map((item, index) => (
                            <div className='div-cvid-info-data' key={index}>
                                <div className= 'div-cvid-button'><ButtonPlusMin text="-" onClick={()=>deleteWorkInfo(item.id)}/></div>
                                <div className= 'div-cvid-info-data-child'>
                                    <div className='div-cvid-info-data-main'>
                                        <p className='p-cvid-title'>{item.company}</p>
                                        <p className='p-cvid-period'>{item.periodOfEmployment}</p></div>
                                    <div className='div-cvid-info-data-second'><p className='p-cvid-info-data-second'>{item.jobTitle}</p></div>
                                    <div className='div-cvid-info-data-info'><p className='p-cvid-info-data-info'>{item.jobInfo}</p></div>
                                </div>
                            </div>
                            ))}
                        </div>
                    )}

                </div>
               <div className='div-studyinfodata' >
                   <h3 className='h-infotitel'>Studiegegevens</h3>
                   {studyInfoData && Array.isArray(studyInfoData) && (
                       <div className='div-cvid-info-data-wrapper'>

                           {studyInfoData.map((item, index) => (
                               <div className='div-cvid-info-data' key={index}>

                                   <div className= 'div-cvid-button'><ButtonPlusMin text="-" onClick={()=>deleteStudyInfo(item.id)}/></div>
                                   <div className= 'div-cvid-info-data-child'>
                                       <div className='div-cvid-info-data-main'>
                                           <p className='p-cvid-title'>{item.educationalInstitute}</p>
                                           <p className='p-cvid-period'>{item.periodOfStudy}</p></div>
                                       <div className='div-cvid-info-data-second'><p className='p-cvid-info-data-second'>{item.periodOfStudy}</p></div>
                                       <div className='div-cvid-info-data-info'><p className='p-cvid-info-data-info'>{item.studyInfo}</p></div>
                                   </div>
                               </div>
                           ))}
                       </div>
                   )}
               </div>

               <div className='div-personalinfodata' >
                   <h3 className='h-infotitel'>Persoonlijke gegevens</h3>
                   {personalInfoData && Array.isArray(personalInfoData) && (
                       <div className='div-cvid-info-data-wrapper'>

                           {personalInfoData.map((item, index) => (
                               <div className='div-cvid-info-data' key={index}>
                                   <div className= 'div-cvid-button'><ButtonPlusMin text="-" onClick={()=>deletePersonalInfo(item.id)}/></div>
                                   <div className= 'div-cvid-info-data-child'>
                                       <div className='div-cvid-info-data-main'>
                                           <p className='p-cvid-title'>{item.hobby}</p>
                                           <p className='p-cvid-period'>{item.periodOfHobby}</p></div>
                                       <div className='div-cvid-info-data-second'><p className='p-cvid-info-data-second'>{item.hobbyInfo}</p></div>
                                   </div>
                               </div>
                           ))}
                       </div>
                   )}

               </div>
           </div>



       </div>

           {/* :*/}

           {/*    <p className="p-no-inlog"> Je bent niet inlogt</p>*/}
           {/*}*/}
        </>
    )
}

export default DataPageJobSeeker