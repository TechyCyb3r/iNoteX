import React, { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiTrashCan, mdiPencil } from '@mdi/js';
import styles from '../Css/NoteItem.module.css';
import noteContext from './Context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    const handleDeleteNote = () => {
        deleteNote(note._id);
        showAlert("Note deleted successfully");
    }
    const handleUpdateNote = () => {
        updateNote(note);
        showAlert("Note Update successfully");
    }
    return (
        <div className="col-md-3">
            <div className="card my-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description.substring(0, 20)} ...</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{new Date(note.date).toLocaleDateString()}</li>

                    <li className="list-group-item">{new Date(note.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                </ul>

                {/* // Using icons for delete and edit actions */}
                <div className="card-body">
                    <span className="badge rounded-pill text-bg-success">{note.tag}</span>
                    <Icon className={`${styles.icon} mx-1`} path={mdiTrashCan} size={1} onClick={handleDeleteNote} />
                    <Icon className={`${styles.icon} mx-2`} note={note} path={mdiPencil} onClick={handleUpdateNote} size={1} />
                </div>
            </div>
        </div>
    )
}

export default NoteItem;