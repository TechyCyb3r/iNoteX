import React, { useState } from 'react'
import './App.css'
import NoteState from './components/Context/notes/NoteState'
import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Alert from './components/Alert'

function App() {
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (message) => {
    setAlertMessage(message);
    
    // setTimeout(() => {
    //   setAlertMessage(message);
    // }, 4000);
  };

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message={alertMessage} />

          <div className="container">
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert} />} />
        
              <Route path='/about' element={<About />} />
            </Routes>
          </div>

        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App
