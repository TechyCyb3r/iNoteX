import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from './Context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

function Notes(props) {
    const { notes, getNotes, editNote } = useContext(noteContext);
    // Extract showAlert from props
    const { showAlert } = props;

    const [note, setNote] = useState({ id: '', title: '', description: '', tag: '' });

    const ref = useRef(null);
    const refClose = useRef(null);

    useEffect(() => {
        getNotes();
    }, []);

    const updateNote = (currentNote) => {
        setNote({
            id: currentNote._id,
            title: currentNote.title,
            description: currentNote.description,
            tag: currentNote.tag
        });
        ref.current.click();
    };

    const handleUpdateNote = () => {
        const updateDate = new Date().toISOString();
        editNote(note.id, note.title, note.description, note.tag, updateDate);
        showAlert("Note updated successfully", "success");
        refClose.current.click();
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AddNote showAlert={showAlert} />

            <button
                type="button"
                ref={ref}
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="title" value={note.title} onChange={onChange} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>

                                     <textarea className="form-control"  id="edescription" name="description" onChange={onChange} value={note.description} ></textarea>

                                    {/* <input type="text" className="form-control" id="edescription" name="description" value={note.description} onChange={onChange} /> */}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="tag" value={note.tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdateNote}>Update Note</button> 
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <div className="container mx-4" style={{color: 'white'}}>
                    {notes.length === 0 && <h5>No notes to display</h5>}
                </div>
                {notes.map((note) => {
                    return (
                        <NoteItem key={note._id} note={note} showAlert={showAlert} updateNote={updateNote} />
                    );
                })}
            </div>
        </>
    );
}

export default Notes;
