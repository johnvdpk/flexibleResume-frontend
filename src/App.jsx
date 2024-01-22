
import './Global.css'
import Header from "./Components/Header/Header.jsx";
import MainContent from "./Components/MainContent/MainContent.jsx";
import FAQ from "./Components/FAQ/FAQ.jsx";

function App() {


  return (

            <div className='div-body'>
                <header>
                    <Header/>
                </header>
                <main>
                    <MainContent/>
                    <FAQ/>
                </main>
            </div>


  )
}

export default App
