import React, { useState, useContext } from 'react'
import noteContext from './Context/notes/NoteContext';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';



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
        <>

            <Paper elevation={4} sx={{ p: 3, maxWidth: 600, mx: 2, mt: 5 }}>
                <Typography variant="h5" gutterBottom>
                    📝 Add a New Note
                </Typography>
                <Box component="form" noValidate autoComplete="off">
                    <TextField fullWidth label="Title" variant="outlined" margin="normal" name="title" value={note.title} id="title" onChange={onChange} />

                    <TextField fullWidth label="Description" multiline rows={4}
                        variant="outlined" margin="normal" id="edescription" name="description" onChange={onChange} value={note.description} />

                    <TextField
                        fullWidth label="Tag (optional)" variant="outlined" margin="normal" value={note.tag} id="tag" name="tag" onChange={onChange} />

                    <Button variant="contained" color="primary" sx={{ mt: 2 }} fullWidth onClick={handleClick}>Add Note</Button>
                </Box>
            </Paper>
            <Typography variant='h4' sx={{mx: 2, mt: 2,}} color="white">
                Your Notes: -
            </Typography>
        </>
    )
}

export default AddNote;