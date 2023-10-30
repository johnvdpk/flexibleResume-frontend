import { useState } from 'react'
import flexibleResumeLogo from './assets/flexible resume.svg'

import './App.css'
import Header from "./components/Header/Header.jsx";
import Menu from "./components/Menu/Menu.jsx";
import Main from "./components/Main/Main.jsx";
import FAQ from "./components/FAQ/FAQ.jsx";

function App() {


  return (
    <>
        <body>
        <Menu/>
        <Header/>
        <Main/>
        <FAQ/>
        </body>
    </>
  )
}

export default App
