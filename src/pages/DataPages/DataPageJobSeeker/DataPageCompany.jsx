import './DataPageJobSeeker.css'
import Form from "../../FormData/Form/Form.jsx"
import profilefoto from "../../../assets/profilefoto.png"
import formConfigEmployer from "../../FormData/Form/JsonDataForm/formEmployer.json"
import {useContext, useEffect, useState} from "react"
import ButtonForm from "../../globalcomponents/Buttons/ButtonForm.jsx"
import { AuthContext} from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from "../../globalcomponents/Buttons/Button.jsx";
import FileUpload from "./FileUpload/FileUpload.jsx";



function DataPageJobSeeker() {

    //useContext
    const {isAuth, user, logout} = useContext(AuthContext);




    //useState
    const [activeProfile, setActiveProfile] = useState(null);
    const [switchButton, setSwitchButton] = useState(null);
    const [employerData, setEmployerData] = useState(null);
    const [searchJobSeeker, setSearchJobSeeker] = useState(null);
    const [searchJobSeekerBySurname, setSearchJobSeekerBySurname] = useState('');
    const navigate = useNavigate();


    const buttonConfig = {
        deleteAcount: 'deleteAcount',
        SearchJobSeekerSurName: 'SearchJobSeekerSurName',
    }

    const [employerDataForm, setEmployerDataForm] = useState( {

        company:'',
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


    // CV gegevens. Nu alleen een About me, maar dit is zo gemaakt om het makkelijker uit te breiden.
    function handleInputChangeEmployerFormData(e) {
        const { name, value } = e.target;
        setEmployerDataForm(prevCVData => ({
            ...prevCVData,
            [name]: value,
        }));
    }
    const handleInputSurName = (e) => {
        setSearchJobSeekerBySurname(e.target.value);
    };

    // wissel tussen de verschillende formulieren
    const toggleForm = (profileConfig) => {
        setActiveProfile(current => current === profileConfig ? null : profileConfig);
    }

    const toggleButton = (buttonConfig)=> {
        setSwitchButton(current => current === buttonConfig ? null : buttonConfig);

    }


    const jwtToken = localStorage.getItem('token');
    const payload = JSON.parse(atob(jwtToken.split('.')[1]));
    const employerEmail = payload.sub;



    // Er is bij het registeren al een jobseeker aangemaakt. Het is niet nodig om een nieuwe aan te maken. Enkel updaten.

    async function putProfileForm(e) {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8080/werkgever/email/${employerEmail}`, employerDataForm)

            setEmployerData(response.data) // bijwerken van de staat, met refreshen zie je ook de nieuwe data.
            await setEmployerData(response.data); // alles ophalen om te zorgen dat alles up to date is
            console.log("put")
            console.log(response.data)

        } catch (e) {
            console.error("Niet lekker bezig met info sturen naar de database", e);


        }

    }





    // Data vanuit jobseeker entity gefilterd op email
    async function getEmployerForm() {

        try {
            const response = await axios.get(`http://localhost:8080/werkgever/email/${employerEmail}`)
            setEmployerData(response.data);
            console.log("get")
            console.log(response.data)

        } catch (e) {
            console.error("krijg geen info uit de database")
        }

    }


    async function getJobSeekerInfo() {

        try {
            const response = await axios.get(`http://localhost:8080/werkzoekende/naam`)
            setSearchJobSeeker(response.data);
            console.log("get jobseeker")
            console.log(response.data)

        } catch (e) {
            console.error("krijg geen info uit de database jobseeker")
        }

    }

    async function getJobSeekerBySurNameInfo(e) {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/werkzoekende/achternaam/${searchJobSeekerBySurname}`);
            setSearchJobSeekerBySurname(response.data); // Update de state met de zoekresultaten
            console.log("Zoekresultaten: surname", response.data);
        } catch (e) {
            console.error("Fout bij het ophalen van gegevens: Surnam", e);
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
        getEmployerForm()
        getJobSeekerInfo()
        getJobSeekerBySurNameInfo()



    },[]);


    if (!isAuth || (user && user.role !== "COMPANY" && user.role !== "ADMIN")) {
        return <p className="p-no-inlog">Toegang geweigerd. Je bent niet ingelogd of je hebt niet de juiste rechten.</p>;
    }

    return (

        <>
            {/*{isAuth ?*/}

            <div className="data-page-wrapper">


                <div className="div-data-page-menu">
                    <div className="div-profile-foto">

                        <img src={profilefoto} className="img-profile-foto" alt="profile foto" />
                        <FileUpload />
                    </div>

                    {/*buttons*/}
                    <div className="div-data-page-menu-child">


                        <ButtonForm
                            text="Bedrijfsgegevens"
                            onClick={() => toggleForm(formConfigEmployer)}
                        />

                        <ButtonForm
                            text="Zoek op werkgever"
                            onClick={()=>toggleButton(buttonConfig.SearchJobSeekerSurName)}


                        />
                        <ButtonForm
                            text="Account verwijderen"
                            onClick={()=>toggleButton(buttonConfig.deleteAcount)}

                        />


                    </div>


                </div>

                <div className="div-personal-form">



                    {activeProfile === formConfigEmployer && (
                        <Form
                            formConfig={activeProfile}
                            jobSeekerData={employerData}
                            FormData={employerDataForm}
                            handleInputChange={handleInputChangeEmployerFormData}
                            formOnSubmit={putProfileForm}
                        />

                    )}

                    {switchButton === buttonConfig.SearchJobSeekerSurName && (
                        <form onSubmit={getJobSeekerBySurNameInfo}>
                            <input
                                className='global-input'
                                type='text'
                                value={searchJobSeekerBySurname}
                                onChange={handleInputSurName}
                                placeholder="Wie zoek je?"
                            />
                            <button type='submit'>zoeken</button>
                        </form>
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

                                <tr><td>Bedrijf:</td><td>{employerData.company}</td></tr>
                                <tr><td>Branche:</td><td>{employerData.industry}</td></tr>
                                <tr><td>Kantooradres:</td><td>{employerData.officeAdress}</td></tr>
                                <tr><td>Kantoor nummer:</td><td>{employerData.officeAdressNumber}</td></tr>
                                <tr><td>Postcode:</td><td>{employerData.officeZipcode}</td></tr>
                                <tr><td>Plaats vestiging:</td><td>{employerData.officeCityLocation}</td></tr>
                                <tr><td>Kvk:</td><td>{employerData.kvk}</td></tr>
                                <tr><td>Aantal werknemers:</td><td>{employerData.numberOfEmployees}</td></tr>


                            </table>
                        )}

                    </div>

                    <div className='div-cvdata'>

                        {employerData && (
                            <div className='div-cvdata-child'>
                                <div><p>{employerData.vision}</p></div>
                                <div><p>{employerData.mission}</p></div>
                            </div>

                        )}
                    </div>

                </div>



            </div>


        </>
    )
}

export default DataPageJobSeeker