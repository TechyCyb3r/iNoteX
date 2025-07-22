import './App.css'
import NoteState from './components/Context/notes/NoteState'
import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>

            <Routes>
              <Route path='/about' element={<About />} />
            </Routes>
          </div>

        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App
