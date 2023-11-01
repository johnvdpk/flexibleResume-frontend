
import './Home.css'
import Header from "./components/Header/Header.jsx";
import MainContent from "./components/MainContent/MainContent.jsx";
import FAQ from "./components/FAQ/FAQ.jsx";
import Nav from "../Navigation/components/Nav/Nav.jsx";

function Home() {


  return (
    <>
        <body>
        <Nav />
            <Header/>
            <MainContent/>
            <FAQ/>
        </body>
    </>
  )
}

export default Home
