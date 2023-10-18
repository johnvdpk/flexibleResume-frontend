import { useState } from 'react'
import flexibleResumeLogo from './assets/flexible resume.svg'

import './App.css'
import Header from "./components/Header/Header.jsx";
import Menu from "./components/Menu/Menu.jsx";
import Main from "./components/Main/Main.jsx";

function App() {


  return (
    <>
        <body>
      <Menu/>
      <Header/>
        <Main/>
        </body>
    </>
  )
}

export default App
