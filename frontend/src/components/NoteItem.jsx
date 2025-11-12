import React, { useContext, useState } from 'react';
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiPencilOutline } from '@mdi/js';
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
    Button,
    Tooltip
} from '@mui/material';

const NoteItem = (props) => {
    const { deleteNote } = useContext(noteContext);
    const { note, updateNote, showAlert } = props;
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleDeleteNote = () => {
        deleteNote(note._id);
        showAlert('🗑️ Note deleted successfully', 'danger');
        setOpenConfirm(false);
    };

    const handleUpdateNote = () => {
        if (!note.title || note.title.trim().length < 5) {
            return showAlert("⚠️ Title must be at least 5 characters long", "danger");
        }
        if (!note.description || note.description.trim().length < 5) {
            return showAlert("⚠️ Description must be at least 5 characters long", "danger");
        }

        updateNote(note);
        showAlert('✏️ Note updated successfully', 'primary');
    };

    return (
        <>
            <Box sx={{ minWidth: 200, maxWidth: 360, m: 2}}>
                <Card
                    variant="outlined"
                    sx={{
                        borderRadius: 4,
                        boxShadow: 3,
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        p: 1,
                    }}
                >
                    <CardContent>
                        <Typography component="div" gutterBottom sx={{ fontSize: 14, color: 'cyan' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <span>{new Date(note.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                <span>{new Date(note.date).toLocaleDateString()}</span>
                            </Box>
                        </Typography>

                        <Typography variant="h5" component="div" sx={{ fontWeight: 600, color: 'white' }}>
                            {note.title}
                        </Typography>

                        <Typography sx={{ mb: 1.5 }}>
                            {Array.isArray(note.tag)
                                ? note.tag.map((t, idx) => (
                                    <span key={idx} className="badge text-bg-success mx-1">{t}</span>
                                ))
                                : <span className="badge text-bg-success">{note.tag}</span>
                            }
                        </Typography>

                        <Typography variant="body2" color="White">
                            {note.description}
                        </Typography>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Tooltip title="Delete note">
                            <Box
                                className={styles.icon}
                                sx={{ cursor: 'pointer', '&:hover': { color: 'red' } }}
                                onClick={() => setOpenConfirm(true)}
                            >
                                <Icon path={mdiTrashCanOutline} width={24} height={24} />
                            </Box>
                        </Tooltip>

                        <Tooltip title="Edit note">
                            <Box
                                className={styles.icon}
                                sx={{ cursor: 'pointer', mx: 1, '&:hover': { color: '#1976d2' } }}
                                onClick={handleUpdateNote}
                            >
                                <Icon path={mdiPencilOutline} width={24} height={24} />
                            </Box>
                        </Tooltip>
                    </CardActions>
                </Card>
            </Box>

            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this note?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
                    <Button onClick={handleDeleteNote} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NoteItem;
