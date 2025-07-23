import React, { useState, useContext } from 'react'
import noteContext from './Context/notes/NoteContext';


const AddNote = (props) => {

    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();

        if (!note.description.trim()) {
            return props.showAlert("Description cannot be empty", "warning");
        }

        const fTitle = note.title.trim() || "Undefined";
        const fTag = note.tag.trim() || "default";
        const fDescription = note.description.trim();

        addNote(fTitle, fDescription, fTag);
        props.showAlert("Note added successfully", "success");
        
        setNote({ title: "", description: "", tag: "" });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-3">
            <h2>Add a note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.title} id="title" name="title" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>

                    <input type="text" className="form-control" value={note.description} id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.tag} id="tag" name="tag" placeholder="Optional to add by defalut it set as default" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
            <h1>Your notes</h1>
            {/* <Notes /> */}
        </div>
    )
}

export default AddNote;