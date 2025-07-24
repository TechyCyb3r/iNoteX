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
        const confirm = window.confirm("Are you sure you want to delete this note?");
        if (!confirm) return;
        deleteNote(note._id);
        showAlert("Note deleted successfully", "danger");
    }
    const handleUpdateNote = () => {
        updateNote(note);
        showAlert("Note Update successfully", "primary");
    }
    return (
        <div className=" col-md-3" style={{ width: "25rem" }}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span>{new Date(note.date).toLocaleDateString()}</span>
                        <span>{new Date(note.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </li>
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