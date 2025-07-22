import './App.css'
import NoteState from './components/Context/notes/NoteState'
import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Alert from './components/Alert'

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message="todo"/>
          
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
        
              <Route path='/about' element={<About />} />
            </Routes>
          </div>

        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App
