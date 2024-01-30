import '../DataPageJobSeeker/DataPageJobSeeker.css' // Dezelfde CCS styling als DataPageJobseeker.
import './DataPageCompany.css' // Hier staat de extra CSS in voor de company pagina
import Form from "../../FormData/Form/Form.jsx"
import companyLogo from "../../../Assets/companylogo.png"
import formConfigEmployer from "../../FormData/Form/JsonDataForm/formEmployer.json"
import {useContext, useEffect, useState} from "react"
import { AuthContext} from "../../../Hooks/AuthContext/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../../Helpers/API/ApiHelper.jsx";
import { useFormData } from "../../../Hooks/UseFormData/UseFormData.jsx";
import axios from 'axios';
import Button from "../../../Components/Button/Button.jsx";



function DataPageCompany() {

    //useContext
    const {isAuth, user, logout} = useContext(AuthContext);

    //useState
    const [activeProfile, setActiveProfile] = useState(null);
    const [switchButton, setSwitchButton] = useState(null);
    const [employerData, setEmployerData] = useState({});
    const [searchJobSeekerBySurname, setSearchJobSeekerBySurname] = useState(null);
    const [workInfoData, setWorkInfoData] = useState(null);
    const navigate = useNavigate();


    const buttonConfig = {
        deleteAcount: 'deleteAcount',
        SearchJobSeekerSurName: 'SearchJobSeekerSurName',
    }

    const [employerDataForm, handleEmployerDataForm] = useFormData({

        company: '',
        industry: '',
        officeAdress: '',
        officeAdressNumber: '',
        officeZipcode: '',
        officeCityLocation: '',
        kvk: '',
        mission: '',
        vision: '',
        numberOfEmployees: '',


    })

    const [jobSeekerDataForm, setJobSeekerDataForm] = useState({

        firstName: '',
        surName: '',
        email: '',
        residence: '',

    })

    const [workInfoDataForm, setWorkInfoDataForm] = useState({
        company: '',
        jobTitle: '',
        periodOfEmployment: '',
        jobInfo: '',
    })


    // wissel tussen de verschillende formulieren
    const toggleForm = (profileConfig) => {
        setActiveProfile(current => current === profileConfig ? null : profileConfig);
    }


    const toggleButton = (buttonConfig) => {
        setSwitchButton(current => current === buttonConfig ? null : buttonConfig);

    }


    const jwtToken = localStorage.getItem('token');
    const payload = JSON.parse(atob(jwtToken.split('.')[1]));
    const employerEmail = payload.sub;


    // Er is bij het registeren al een jobseeker aangemaakt. Het is niet nodig om een nieuwe aan te maken. Enkel updaten.

    async function putProfileForm(e) {
        e.preventDefault();

        try {
            const updatedData = await apiRequest(`http://localhost:8080/employer/email/${employerEmail}`, 'PUT', employerDataForm);
            setEmployerData(updatedData);
            await setEmployerData(updatedData);
        } catch (error) {
            console.error('Er is een fout opgetreden bij het updaten van de gegevens', error);
        }
    }



        // Data vanuit jobseeker entity gefilterd op email

        async function getEmployerForm() {

            try {
                const updatedData = await apiRequest(`http://localhost:8080/employer/email/${employerEmail}`, 'GET');
                setEmployerData(updatedData);
                await setEmployerData(updatedData);
            } catch (error) {
                console.error('Er is een fout opgetreden bij het ophalen van de gegevens', error);
            }
        }



        async function getJobSeekerInfo() {

            try {
                const updatedData = await apiRequest(`http://localhost:8080/jobseeker/name`, 'GET');
                setJobSeekerDataForm(updatedData);
                await setJobSeekerDataForm(updatedData);
            } catch (error) {
                console.error('Er is een fout opgetreden bij het ophalen van de gegevens', error);
            }
        }

        // async function getWorkInfo() {
        //     try {
        //         const updatedData = await apiRequest(`http://localhost:8080/jobseeker/workinfo/`, 'GET');
        //         setWorkInfoData(updatedData);
        //         await setWorkInfoData(updatedData);
        //     } catch (error) {
        //         console.error('Er is een fout opgetreden bij het ophalen van de gegevens', error);
        //     }
        // }


    async function deleteAccount() {
        const jwtToken = localStorage.getItem('token');
        const email = JSON.parse(atob(jwtToken.split('.')[1])).sub;

        if (window.confirm("Weet je zeker dat je je account wilt verwijderen? Dit kan niet ongedaan worden gemaakt!")) {
            try {
                await apiRequest(`http://localhost:8080/auth/user/${email}`, 'DELETE');
                // Logica om gebruiker uit te loggen en de UI bij te werken

                logout();
                navigate("/");
            } catch (e) {
                console.error("Er is een fout opgetreden bij het verwijderen van het account", e);

            }
        }
    }



    useEffect(() => {
        const source = axios.CancelToken.source();


        const getEmployerForm = async () =>{
            try {
                const updatedData = await apiRequest(`http://localhost:8080/employer/email/${employerEmail}`, 'GET');
                setEmployerData(updatedData);
                await setEmployerData(updatedData);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error("axios get error", error);
                }
            }
        };


        const getJobSeekerInfo = async () =>{
            try {
                const updatedData = await apiRequest(`http://localhost:8080/jobseeker/name`, 'GET');
                setJobSeekerDataForm(updatedData);
                await setJobSeekerDataForm(updatedData);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error("axios get error", error);
                }
            }
        };


        getEmployerForm();
        getJobSeekerInfo();

        // Cleanup-functie
        return () => {
            source.cancel('Component DataPageCompany is unmounted');
        };
    }, []);



        if (!isAuth || (user && user.role !== "COMPANY" && user.role !== "ADMIN")) {
            return <p className="p-no-inlog">Toegang geweigerd. Je bent niet ingelogd of je hebt niet de juiste
                rechten.</p>;
        }

        return (

            <>

                <div className="data-page-wrapper">


                    <div className="div-data-page-menu">
                        <div className="div-profile-foto">

                            <img src={companyLogo} className="img-profile-foto" alt="company-logo"/>

                        </div>

                        {/*buttons*/}
                        <div className="div-data-page-menu-child">

                            <Button
                                isFormButton={true}
                                text="Bedrijfsgegevens"
                                onClick={() => toggleForm(formConfigEmployer)}
                            />

                            <Button
                                isFormButton={true}
                                text="Zoek op werkgever"
                                onClick={() => toggleButton(buttonConfig.SearchJobSeekerSurName)}


                            />
                            <Button
                                isFormButton={true}
                                text="Account verwijderen"
                                onClick={() => toggleButton(buttonConfig.deleteAcount)}

                            />

                        </div>


                    </div>

                    <div className="div-personal-form">

                        <div className='div-dashboard-intro'>
                            <h3>Dashboard</h3>
                            <div className='horizontal-line'></div>
                            <p>Welkom bij het dashboard van Flexible Resume. Vul hier je bedrijfsgegevens in. Momenteel
                                kun je zoeken naar werkzoekenden en hier vacatures plaatsen. Binnenkort volgt een nieuwe
                                update.</p>
                        </div>

                        {activeProfile === formConfigEmployer && (
                            <Form
                                formConfig={activeProfile}
                                jobSeekerData={employerData}
                                FormData={employerDataForm}
                                handleInputChange={handleEmployerDataForm}
                                formOnSubmit={putProfileForm}
                            />

                        )}

                        {switchButton === buttonConfig.SearchJobSeekerSurName && (
                            <div>


                                <table className='table-jobseeker-info'>
                                    <thead>
                                    <tr>
                                        <th>Voornaam</th>
                                        <th>Achternaam</th>
                                        <th>Email</th>
                                        <th>Woonplaats</th>
                                    </tr>
                                    </thead>
                                    {jobSeekerDataForm.map((item, index) => (
                                        <tbody key={index}>
                                        <tr>
                                            <td>{item.firstName}</td>
                                            <td>{item.surName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.residence}</td>
                                        </tr>
                                        </tbody>
                                    ))}
                                </table>

                            </div>

                        )}

                        {searchJobSeekerBySurname && searchJobSeekerBySurname.map(jobSeeker => (
                            <div key={jobSeeker.id}>
                                <p>Voornaam: {jobSeeker.firstName}</p>
                                <p>Achternaam: {jobSeeker.surName}</p>
                                <p>Email: {jobSeeker.email}</p>
                                <p>Geboortedatum: {jobSeeker.dateOfBirth}</p>
                                <p>Telefoonnummer: {jobSeeker.phoneNumber}</p>
                                <p>Woonplaats: {jobSeeker.residence}</p>
                                <p>Adres: {jobSeeker.homeAddress}</p>
                                <p>Huisnummer: {jobSeeker.houseNumber}</p>
                                <p>Postcode: {jobSeeker.zipCode}</p>
                            </div>
                        ))}


                        {switchButton === buttonConfig.deleteAcount && (
                            <div className='delete-acount-wrapper'>
                                <Button text='Acount verwijderen' onClick={deleteAccount}/>
                            </div>

                        )}


                    </div>

                    <div className="div-personal-form-data">
                        <h3 className='h-infotitel'>Profielgegevens</h3>

                        <div className='div-jobseekerdata'>
                            {employerData && (
                                <table className='table-persoonlijkegegevenstabel'>
                                    <tbody>
                                    <tr>
                                        <td>Bedrijf:</td>
                                        <td>{employerData.company}</td>
                                    </tr>
                                    <tr>
                                        <td>Branche:</td>
                                        <td>{employerData.industry}</td>
                                    </tr>
                                    <tr>
                                        <td>Kantooradres:</td>
                                        <td>{employerData.officeAdress}</td>
                                    </tr>
                                    <tr>
                                        <td>Kantoornummer:</td>
                                        <td>{employerData.officeAdressNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>Postcode:</td>
                                        <td>{employerData.officeZipcode}</td>
                                    </tr>
                                    <tr>
                                        <td>Plaats vestiging:</td>
                                        <td>{employerData.officeCityLocation}</td>
                                    </tr>
                                    <tr>
                                        <td>Kvk:</td>
                                        <td>{employerData.kvk}</td>
                                    </tr>
                                    <tr>
                                        <td>Aantal werknemers:</td>
                                        <td>{employerData.numberOfEmployees}</td>
                                    </tr>

                                    </tbody>
                                </table>
                            )}

                        </div>

                        <div className='div-cvdata'>

                            {employerData && (
                                <>
                                    <h3 className='h-infotitel'>Visie</h3>
                                    <div className='div-cvdata-child'>

                                        <p>{employerData.vision}</p>
                                    </div>
                                    <h3 className='h-infotitel'>Missie</h3>
                                    <div className='div-cvdata-child'>
                                        <p>{employerData.mission}</p>
                                    </div>
                                </>
                            )}
                        </div>

                    </div>

                </div>

            </>
        )
    }


export default DataPageCompany