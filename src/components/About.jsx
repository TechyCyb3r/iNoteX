import React, { useContext, useEffect } from 'react'
import NoteContext from './Context/notes/NoteContext'

const About = () => {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.update();
  }, []);
  return (
    <>
      <div style={{ padding: "5px" }}>
        <h3>This is my about page</h3>
      </div>
    </>
  )
}

export default About