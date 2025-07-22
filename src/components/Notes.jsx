import React, { useContext } from 'react'
import noteContext from './Context/notes/NoteContext'
import NoteItem from './NoteItem';

function Notes() {
    const { notes, setNotes } = useContext(noteContext);
    return (
        <div className="row my-3">
            {notes.map((note) => {
                return <NoteItem key={note._id} note={note}/>;
            })}
        </div>
    )
}

export default Notes