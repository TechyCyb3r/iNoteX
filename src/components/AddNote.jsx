import React, { useState, useContext} from 'react'
import noteContext from './Context/notes/NoteContext';
// import Notes from './Notes';
const AddNote = () => {

    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({ title: "", desc: "", tag: "default" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.desc, note.tag );
    }

    const onChange = (e) => {
        setNote ({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-3">
            <h2>Add a note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" className="form-control" id="desc" name="desc" onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
            <h1>Your notes</h1>
            {/* <Notes /> */}
        </div>
    )
}

export default AddNote;