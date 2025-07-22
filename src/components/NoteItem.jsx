import React from 'react'
import Icon from '@mdi/react';
import { mdiTrashCan, mdiPencil } from '@mdi/js';
import styles from './Css/NoteItem.module.css';

const NoteItem = (props) => {
    const { note } = props;

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description.substring(0, 21)}...</p>
                    <Icon className={`${styles.icon} mx-1`} path={mdiTrashCan} size={1} />
                    <Icon className={`${styles.icon} mx-2`} path={mdiPencil} size={1} />
                </div>
            </div>
        </div>
    )
}

export default NoteItem