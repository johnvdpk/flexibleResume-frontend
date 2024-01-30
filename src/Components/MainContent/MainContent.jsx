import './MainContent.css'
import mainimage from '../../Assets/mainpageimage.png'

function MainContent() {


    return (
        <>
            <div className="main-wrapper">
                <div className="main-container">
                    <div className="main-container-child">
                        <img src={mainimage} alt="Main image" className="main-image"/>
                    </div>

                    <div className="main-container-child">
                        <h2>Waarom?</h2>
                        <p>Flexible Resume is voornamelijk bedoeld voor werkzoekenden. Het is al mogelijk voor bedrijven om zich aan te melden, hoewel de mogelijkheden momenteel nog beperkt zijn. Er wordt hard gewerkt om het voor werkgevers makkelijker te maken om te zoeken naar de kwaliteiten die zij nodig hebben voor hun bedrijf.</p><p>Als werkzoekende maak je een account aan bij ons op Flexible Resume. Eenmaal ingelogd kun je jouw kwaliteiten benoemen. Alles wordt overzichtelijk gehouden, zodat je het op elk moment naar eigen inzicht kunt aanpassen. Voeg nieuwe ervaringen toe of verwijder die je niet meer wilt laten zien. Ook voor werkzoekenden wordt nog hard aan de weg getimmerd. Wij zorgen ervoor dat je binnenkort meerdere cv's kunt maken. Misschien wil je voor elke werkgever een persoonlijk cv maken, zeker als er meerdere templates beschikbaar zijn.</p>

                    </div>

                </div>



            </div>

        </>
    )
}

export default MainContent
