import { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiTrashCan, mdiPencil } from '@mdi/js';
import styles from '../Css/NoteItem.module.css';
import noteContext from './Context/notes/NoteContext';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{new Date(note.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span>{new Date(note.date).toLocaleDateString()}</span>
                    </Box>
                </Typography>
                <Typography variant="h5" component="div">
                    {note.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}><span className="badge text-bg-success">{note.tag}</span></Typography>
                <Typography variant="body2">
                    {note.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Icon className={`${styles.icon} mx-1`} path={mdiTrashCan} size={1} onClick={handleDeleteNote} />
                <Icon className={`${styles.icon} mx-2`} note={note} path={mdiPencil} onClick={handleUpdateNote} size={1} />
            </CardActions>
        </React.Fragment>
    );

    return (
        <Box sx={{ minWidth: 100, maxWidth: 345, margin: '1rem' }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    )
}
export default NoteItem;