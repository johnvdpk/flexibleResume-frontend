
<img src="https://github.com/johnvdpk/flexibleResume-frontend/blob/main/src/assets/mainpageimage.png" width="800" alt="2 mensen die naast elkaar zitten">




# README: Flexible Resume Project #


**Benodigde Software**
IntelliJ IDEA: Een geavanceerde IDE voor Java-ontwikkeling. 
PostgreSQL (Postgres): Een krachtig, open-source databasesysteem. 
PGAdmin: Een open-source platform voor PostgreSQL beheer. 
Postman: Voor API-ontwikkeling en testen. 
WebStorm: IDE voor moderne JavaScript-ontwikkeling. 
React: Een JavaScript-bibliotheek voor gebruikersinterfaces.
JavaScript, CSS, HTML: Essentiële talen voor front-end webontwikkeling.

## Installatie ##


**Postgres** Voer het gedownloade installatiebestand uit en volg de instructies.
Kies de gewenste componenten, met de PostgreSQL Server en command-line tools als basis.
Stel een wachtwoord in voor de superuser (bijv. 'postgres').
Behoud de standaardpoort 5432, tenzij anders vereist.
Voltooi de installatie.

**PGAdmin**
Na installatie, log in met de gegevens ingesteld tijdens de Postgres-installatie.
Verbind met de PostgreSQL Server en maak een nieuwe database, bijvoorbeeld 'FlexibleResume'.
Bij het opstarten van de Spring Boot-applicatie, vernieuw de database in PGAdmin.

**Postman**
Maak een nieuwe werkruimte en importeer vooraf gedefinieerde collecties uit de 'postman' map van het project.
Verstuur en analyseer API-verzoeken, beginnend met de 'Security' map voor registratie en authenticatie.

## Opstarten van de backend en de frontend ##


**Backend Opstarten**
Open de projectmap in IntelliJ.
Navigeer naar src/main/resources en open application.properties.
Zorg dat de database-instellingen overeenkomen met de PGAdmin-configuratie.
Start de applicatie via src/main/java/FlexibleResumeApplication.

**Frontend Opstarten**
Open de frontend map in WebStorm.
Installeer dependencies via npm install in de terminal.
Gebruik npm run dev om de frontend te starten, standaard op http://localhost:5173/.

## Gebruik van Flexible Resume ##


**Inloggen**
Werkzoekende: johndoe@email.com (Wachtwoord: "1234")
Werkgever: bedrijf@email.com (Wachtwoord: "1234")
Admin: admin@email.com (Wachtwoord: "admin")

**Functionaliteiten**
Als Werkzoekende: Voeg profielgegevens toe, beheer werk-, studie-, en persoonlijke informatie, en download je cv in PDF-formaat.
Als Werkgever: Pas bedrijfsgegevens aan en zoek naar werkzoekenden.
Als Admin: Beheer zowel werkgever- als werkzoekendenpagina's.

**Verdere Ontwikkeling**
De applicatie staat open voor verdere ontwikkeling en uitbreiding. Voel je vrij om bij te dragen en de mogelijkheden van Flexible Resume verder te verkennen.

Opmerkingen
De database wordt bij elke opstart van de Spring Boot-applicatie opnieuw gevuld.
Veel succes met het opzetten en gebruiken van de Flexible Resume applicatie!
<p></p>
<img src="https://github.com/johnvdpk/flexibleResume-frontend/blob/main/src/assets/flexible%20resume.svg" width="100" alt="Logo van Flexible Resume">
