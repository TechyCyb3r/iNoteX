import React, { useState } from 'react'
import './App.css'
import NoteState from './components/Context/notes/NoteState'
import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Alert from './components/Alert'
import BackGround from './components/Background'

function App() {
  const [alertMessage, setAlertMessage] = useState(null);
  const showAlert = (msg, type) => {
    setAlertMessage({ msg, type });

    setTimeout(() => {
      setAlertMessage(null);
    }, 4000);
  };

  return (
    <>
      <NoteState>
        <BrowserRouter>

          <BackGround id="tsparticles" />
          <div style={{ position: 'relative' }}>
          <Navbar />

          {/* Alert component to show messages */}
          <div className="times-new-roman-text">
            <Alert message={alertMessage?.msg} type={alertMessage?.type} />

            <div className="container">
              <Routes>
                <Route path='/' element={<Home showAlert={showAlert} />} />
                <Route path='/about' element={<About />} />
              </Routes>
              </div>
            </div>
          </div>

        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App
