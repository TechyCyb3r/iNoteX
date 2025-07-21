import './App.css'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>

        <Routes>
          <Route path='/about' element={<About />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
