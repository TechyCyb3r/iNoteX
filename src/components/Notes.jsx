import React, { useContext, useEffect } from 'react'
import noteContext from './Context/notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

function Notes(props) {
    const { notes, getNotes } = useContext(noteContext);
    const { showAlert } = props;

    useEffect(() => {
        getNotes();
    }, []);

    const updateNote = (currentNote) => {
        console.log("Editing note:", currentNote);
        // Add logic to open modal or edit form
    };
    return (
        <>
            <AddNote showAlert={showAlert} />
            <div className="row my-3">
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} showAlert={showAlert} updateNote={updateNote}  />;
                })}
            </div>
        </>
    )
}

export default Notes