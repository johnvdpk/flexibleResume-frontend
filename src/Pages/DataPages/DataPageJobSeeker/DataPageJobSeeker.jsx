import './DataPageJobSeeker.css'
import Form from "../../FormData/Form/Form.jsx"
import defaultProfilePhoto from "../../../Assets/profilefoto.png"
import formConfigJobSeeker from "../../FormData/Form/JsonDataForm/formProfileJobseeker.json"
import formConfigWorkInfo from "../../FormData/Form/JsonDataForm/formProfileWorkInfo.json"
import formConfigPersonalInfo from "../../FormData/Form/JsonDataForm/formProfilePersonalInfo.json"
import formConfigStudyInfo from "../../FormData/Form/JsonDataForm/formProfileStudyInfo.json"
import formConfigCV from "../../FormData/Form/JsonDataForm/formProfileCV.json"
import {useContext, useEffect, useState} from "react"
import { AuthContext} from "../../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import TemplateOne from "./Templates/TemplateOne/TemplateOne.jsx";
import TemplateTwo from "./Templates/TemplateTwo/TemplateTwo.jsx";
import TemplateThree from "./Templates/TemplateThree/TemplateThree.jsx";
import FileUpload from "./FileUpload/FileUpload.jsx";
import Button from "../../../Components/Button/Button.jsx";
import {apiRequest} from "../../../Helpers/API/ApiHelper.jsx";
import log from "eslint-plugin-react/lib/util/log.js";



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
            const updatedData = await apiRequest(`http://localhost:8080/jobseeker/email/${jobSeekerEmail}`, 'PUT', profileFormData);
            setJobSeekerData(updatedData); // Bijwerken van de staat

            // Optioneel: als je direct na de update de nieuwste data wilt ophalen
            await getProfileForm(); // Zorg dat deze functie ook de apiRequest gebruikt
        } catch (error) {
            console.error("Fout bij het bijwerken van het profiel:", error);
        }
    }


    // async function putProfileForm(e) {
    //     e.preventDefault();
    //
    //     try {
    //         const response = await axios.put(`http://localhost:8080/jobseeker/email/${jobSeekerEmail}`, profileFormData)
    //         console.log(response.data)
    //         setJobSeekerData(response.data) // bijwerken van de staat, met refreshen zie je ook de nieuwe data.
    //         await getProfileForm(response.data); // alles ophalen om te zorgen dat alles up to date is
    //
    //
    //     } catch (e) {
    //         console.error("axios put error", e);
    //         console.log(e.response)
    //
    //
    //     }
    //
    // }


    async function putCVForm(e) {
        e.preventDefault();

        try{
            const updatedData = await apiRequest(`http://localhost:8080/jobseeker/cv/cv/${cvId}`, 'PUT', cvFormData);
            setCVData(updatedData);
            await getCVForm();

        } catch (error) {
            console.error("Fout bij het bijwerken van de CV data:", error);
        }
    }


    // async function putCVForm(e) {
    //     e.preventDefault();
    //
    //     try {
    //         const response = await axios.put(`http://localhost:8080/jobseeker/cv/cv/${cvId}`, cvFormData)
    //
    //         setCVData(response.data) // bijwerken van de staat, met refreshen zie je ook de nieuwe data.
    //         await getCVForm(response.data); // alles ophalen om te zorgen dat alles up to date is
    //
    //
    //     } catch (e) {
    //         console.error("put axios error", e);
    //
    //
    //     }
    //
    // }



    // aanmaken van werk informatie

    async function createWorkInfoForm(e) {
        e.preventDefault()
        try {
            const updatedData = await apiRequest(`http://localhost:8080/jobseeker/workinfo/${cvId}`, 'POST', workInfoFormData);
            setWorkInfoData(updatedData);
            await getWorkInfoForm();


        } catch (error) {
            console.error("Fout bij het aanmaken van de werk info:", error);
        }
    }


    // aanmaken van persoonlijke informatie

    async function createPersonalInfoForm(e) {
        e.preventDefault()
        try {
            const updatedData = await apiRequest(`http://localhost:8080/jobseeker/personalinfo/${cvId}`, 'POST', personalInfoFormData);
            setPersonalInfoData(updatedData);
            await getPersonalInfoForm();
        } catch (error) {
            console.error("Fout bij het aanmaken van de persoonlijke info:", error);
        }
    }


    // aanmaken van studie informatie

   async function createStudyInfoForm(e) {
        e.preventDefault()
       try {
           const updatedData = await apiRequest(`http://localhost:8080/jobseeker/studyinfo/${cvId}`, 'POST', studyInfoFormData);
           setStudyInfoData(updatedData);
           await getStudyInfoForm();
       } catch (error) {
           console.error("Fout bij het aanmaken van de studie info:", error);
       }
   }



    // Data vanuit jobseeker entity gefilterd op email

async function getProfileForm() {
        try {
            const response = await apiRequest(`http://localhost:8080/jobseeker/email/${jobSeekerEmail}`, 'GET');
            setJobSeekerData(response);

        } catch (error) {
            console.error("Fout bij het ophalen van de profiel data:", error);
        }
}

    // async function getProfileForm() {
    //
    //     try {
    //         const response = await axios.get(`http://localhost:8080/jobseeker/email/${jobSeekerEmail}`)
    //         setJobSeekerData(response.data);
    //
    //     } catch (e) {
    //         console.error("axios get error", e)
    //     }
    //
    // }

    async function getCVForm() {

        try {
            const response = await apiRequest(`http://localhost:8080/jobseeker/cv/${cvId}`, 'GET');
            setCVData(response);


        } catch (error) {
            console.error("Fout bij het ophalen van de CV data:", error);
        }
    }

    // async function getCVForm() {
    //
    //     try {
    //         const response = await axios.get(`http://localhost:8080/jobseeker/cv/${cvId}`)
    //         setCVData(response.data);
    //
    //     } catch (e) {
    //         console.error("axios get error", e)
    //     }
    //
    // }


    // Axios voor werk info

    async function getWorkInfoForm() {
        try {
            const response = await apiRequest(`http://localhost:8080/jobseeker/workinfo/${cvId}`, 'GET');
            setWorkInfoData(response);

        } catch (error) {
            console.error("Fout bij het ophalen van de werk info:", error);
        }
    }

    // async function getWorkInfoForm() {
    //     try{
    //         const response = await axios.get(`http://localhost:8080/jobseeker/workinfo/${cvId}`)
    //         setWorkInfoData(response.data);
    //
    //     } catch(e) {
    //         console.error("axios get error", e);
    //         if (e.response) {
    //             console.error('Response:', e.response);
    //         }
    //     }
    // }

    // Axios voor studie info

    async function getStudyInfoForm() {
        try {
            const response = await apiRequest(`http://localhost:8080/jobseeker/studyinfo/${cvId}`, 'GET');
            setStudyInfoData(response);

        } catch (error) {
            console.error("Fout bij het ophalen van de studie info:", error);
        }
    }
    // async function getStudyInfoForm() {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/jobseeker/studyinfo/${cvId}`)
    //         setStudyInfoData(response.data);
    //
    //     }catch (e) {
    //         console.error("axios get error", e)
    //     }
    // }


    // Axios voor persoonlijke info

    async function getPersonalInfoForm() {
        try {
            const response = await apiRequest(`http://localhost:8080/jobseeker/personalinfo/${cvId}`, 'GET');
            setPersonalInfoData(response);


        } catch (error) {
            console.error("Fout bij het ophalen van de persoonlijke info:", error);
        }
    }
    // async function getPersonalInfoForm() {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/jobseeker/personalinfo/${cvId}`)
    //         setPersonalInfoData(response.data);
    //
    //     }catch (e) {
    //         console.error("axios get error", e)
    //     }
    // }


    // DELETE verzoeken

        // delete van de workinfo

        async function deleteWorkInfo(id) {

                if (id === null) {
                    console.error("Kan item niet verwijderen zonder ID");
                    return;
                }
                try {
                    await apiRequest(`http://localhost:8080/jobseeker/workinfo/${id}`, 'DELETE');
                    const newWorkInfoData = workInfoData.filter(item => item.id !== id);
                    setWorkInfoData(newWorkInfoData);
                } catch (e) {
                    console.error("Error bij het verwijderen van item", e);
                }
        }

        // async function deleteWorkInfo(id) {
        //
        //     if (id === null) {
        //         console.error("Kan item niet verwijderen zonder ID");
        //         return;
        //     }
        //     try {
        //         await axios.delete(`http://localhost:8080/jobseeker/workinfo/${id}`);
        //         const newWorkInfoData = workInfoData.filter(item => item.id !== id);
        //         setWorkInfoData(newWorkInfoData);
        //     } catch (e) {
        //         console.error("Error bij het verwijderen van item", e);
        //     }
        // }

    // delete van de studyinfo

    async function deleteStudyInfo(id) {
        if (id === null) {
            console.error("Kan item niet verwijderen zonder ID");
            return;
        }
        try {
            await apiRequest(`http://localhost:8080/jobseeker/studyinfo/${id}`, 'DELETE');
            const newStudyInfoData = studyInfoData.filter(item => item.id !== id);
            setStudyInfoData(newStudyInfoData);
        } catch (error) {
            console.error("Error bij het verwijderen van item", error);
        }
    }

    // async function deleteStudyInfo(id) {
    //
    //     if (id === null) {
    //         console.error("Kan item niet verwijderen zonder ID");
    //         return;
    //     }
    //     try {
    //         await axios.delete(`http://localhost:8080/jobseeker/studyinfo/${id}`);
    //         const newStudyInfoData = studyInfoData.filter(item => item.id !== id);
    //         setStudyInfoData(newStudyInfoData);
    //     } catch (e) {
    //         console.error("Error bij het verwijderen van item", e);
    //     }
    // }

    // delete van de personalinfo

    async function deletePersonalInfo(id) {

        if (id === null) {
            console.error("Kan item niet verwijderen zonder ID");
            return;
        }
        try {
            await apiRequest(`http://localhost:8080/jobseeker/personalinfo/${id}`, 'DELETE');
            const newPersonalInfoData = personalInfoData.filter(item => item.id !== id);
            setPersonalInfoData(newPersonalInfoData);
        }catch (error) {
            console.error("Error bij het verwijderen van item", error);
        }
    }
    // async function deletePersonalInfo(id) {
    //
    //     if (id === null) {
    //         console.error("Kan item niet verwijderen zonder ID");
    //         return;
    //     }
    //     try {
    //         await axios.delete(`http://localhost:8080/jobseeker/personalinfo/${id}`);
    //         const newPersonalInfoData = personalInfoData.filter(item => item.id !== id);
    //         setPersonalInfoData(newPersonalInfoData);
    //     } catch (e) {
    //         console.error("Error bij het verwijderen van item", e);
    //     }
    // }

    async function deleteAccount() {
        const jwtToken = localStorage.getItem('token');
        const email = JSON.parse(atob(jwtToken.split('.')[1])).sub;

        if (window.confirm("Weet je zeker dat je je account wilt verwijderen? Dit kan niet ongedaan worden gemaakt!")) {
            try {
                await apiRequest(`http://localhost:8080/auth/user/${email}`, 'DELETE');
                // gebruiker logt ook direct uit.

                logout();
                navigate("/");
            } catch (error) {
                console.error("Er is een fout opgetreden bij het verwijderen van het account", error);

            }
        }
    }

    // async function deleteAccount() {
    //     const jwtToken = localStorage.getItem('token');
    //     const email = JSON.parse(atob(jwtToken.split('.')[1])).sub;
    //
    //     if (window.confirm("Weet je zeker dat je je account wilt verwijderen? Dit kan niet ongedaan worden gemaakt!")) {
    //         try {
    //             await axios.delete(`http://localhost:8080/auth/user/${email}`);
    //             // gebruiker logt ook direct uit.
    //
    //             logout();
    //             navigate("/");
    //         } catch (e) {
    //             console.error("Er is een fout opgetreden bij het verwijderen van het account", e);
    //
    //         }
    //     }
    // }



    useEffect(() => {
        const source = axios.CancelToken.source();

        const loadData = async () => {
            try {
                const cvId = localStorage.getItem('cvId');
                if (!cvId) {
                    throw new Error('cvId niet gevonden in de localstorage');
                }

                // Voer de asynchrone functies uit met de cancel token
                await getProfileForm(cvId, source.token);
                await getCVForm(cvId, source.token);
                await getWorkInfoForm(cvId, source.token);
                await getStudyInfoForm(cvId, source.token);
                await getPersonalInfoForm(cvId, source.token);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Er is een fout opgetreden:', error);
                    // Bijwerken van een error state kan hier indien nodig
                }
            }
        };

        loadData();

        // Cleanup functie die wordt uitgevoerd bij het unmounten
        return () => {
            source.cancel('Component DataPageJobSeeker is unmounted');
        };
    }, []);

    if (!isAuth || (user && user.role !== "USER" && user.role !== "ADMIN")) {
        return <p className="p-no-inlog">Toegang geweigerd. Je bent niet ingelogd of je hebt niet de juiste rechten.</p>;
    }
    return (

        <>

       <div className="data-page-wrapper">


           <div className="div-data-page-menu">
                <div className="div-profile-foto">
                   <img src={fileUrl || defaultProfilePhoto} className="img-profile-foto" alt='profile photo'/>
                    <FileUpload setFileUrl={setFileUrl} />
                </div>

                    {/*buttons*/}
                   <div className="div-data-page-menu-child">


                       <Button
                           isFormButton={true}
                           text="Profielgegevens"
                           onClick={() => toggleForm(formConfigJobSeeker)}

                       />
                       <Button
                           isFormButton={true}
                           text="Introductietekst"
                           onClick={() => toggleForm(formConfigCV)}
                       />
                       <Button
                           isFormButton={true}
                           text="Werkgegevens"
                           onClick={() => toggleForm(formConfigWorkInfo)}
                       />

                       <Button
                           isFormButton={true}
                           text="Studiegegevens"
                           onClick={() => toggleForm(formConfigStudyInfo)}
                       />

                       <Button
                           isFormButton={true}
                           text="Persoonlijke gegevens"
                           onClick={() => toggleForm(formConfigPersonalInfo)}
                       />

                       <Button
                           isFormButton={true}
                           text="Kies een template"
                           onClick={()=> toggleButton(buttonConfig.inSide)}

                       />
                       <Button
                           isFormButton={true}
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
                               <tr><td>Geboortedatum:</td><td>{jobSeekerData.dateOfBirth}</td></tr>
                               <tr><td>Telefoonnummer:</td><td>{jobSeekerData.phoneNumber}</td></tr>
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
                                <div className= 'div-cvid-button'><Button text="-" onClick={()=>deleteWorkInfo(item.id)}/></div>
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

                                   <div className= 'div-cvid-button'><Button text="-" onClick={()=>deleteStudyInfo(item.id)}/></div>
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
                                   <div className= 'div-cvid-button'><Button text="-" onClick={()=>deletePersonalInfo(item.id)}/></div>
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

        </>
    )
}

export default DataPageJobSeeker