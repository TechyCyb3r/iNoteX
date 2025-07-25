import React, { useContext, useState } from 'react';
import Icon from '@mdi/react';
import { mdiTrashCan, mdiPencil } from '@mdi/js';
import styles from '../Css/NoteItem.module.css';
import noteContext from './Context/notes/NoteContext';

import {
    Box,
    Card,
    CardActions,
    CardContent,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;

    const [openConfirm, setOpenConfirm] = useState(false); // 🔧 Added for dialog state

    const handleDeleteNote = () => {
        deleteNote(note._id);
        showAlert('Note deleted successfully', 'danger');
        setOpenConfirm(false); // 🔧 Close dialog after delete
    };

    const handleUpdateNote = () => {
       
        if (note.description.length < 5) {
            return props.showAlert("Description must be at least 5 characters long", "danger");
        }
        if (note.title.length < 5) {
            return props.showAlert("Title must be at least 5 characters long", "danger");
        }else if(!note.title){
            note.title="Undefined";
        }
        showAlert('Note updated successfully', 'primary');
        updateNote(note);
    };

    const card = (
        <>
            <CardContent>
                {/* ✅ FIXED: added component="div" to avoid hydration issue */}
                <Typography component="div" gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <span>{new Date(note.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span>{new Date(note.date).toLocaleDateString()}</span>
                    </Box>
                </Typography>

                <Typography variant="h5" component="div">
                    {note.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    {Array.isArray(note.tag)
                        ? note.tag.map((t, idx) => (
                            <span key={idx} className="badge text-bg-success mx-1">{t}</span>
                        ))
                        : <span className="badge text-bg-success">{note.tag}</span>
                    }
                </Typography>
                <Typography variant="body2">{note.description}</Typography>
            </CardContent>

            <CardActions>
                <Icon
                    className={`${styles.icon} mx-1`}
                    path={mdiTrashCan}
                    size={1}
                    onClick={() => setOpenConfirm(true)}
                />
                <Icon
                    className={`${styles.icon} mx-2`}
                    path={mdiPencil}
                    onClick={handleUpdateNote}
                    size={1}
                />
            </CardActions>
        </>
    );

    return (
        <>
            <Box sx={{ minWidth: 100, maxWidth: 345, margin: '1rem' }}>
                <Card variant="outlined">{card}</Card>
            </Box>

            {/* 🔧 MUI Dialog for delete confirmation */}
            <Dialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                aria-labelledby="confirm-dialog-title"
            >
                <DialogTitle id="confirm-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this note?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
                    <Button onClick={handleDeleteNote} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NoteItem;
