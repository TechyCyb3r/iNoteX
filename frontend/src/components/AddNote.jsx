import React, { useState, useContext } from 'react';
import noteContext from './Context/notes/NoteContext';
import { TextField, Button, Box, Paper, Typography, Alert, Collapse, IconButton } from '@mui/material';
import { AddCircleOutline, Close } from '@mui/icons-material';

const AddNote = (props) => {
    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({ title: '', description: '', tag: '' });
    const [error, setError] = useState({ show: false, message: '', severity: 'warning' });

    const handleClick = (e) => {
        e.preventDefault();

        const trimmedTitle = note.title.trim();
        const trimmedDescription = note.description.trim();
        const trimmedTag = note.tag.trim() || 'default';

        if (!trimmedDescription)
            return showError('✏️ Description cannot be empty', 'warning');

        if (trimmedDescription.length < 5)
            return showError('📝 Description must be at least 5 characters', 'error');

        if (!trimmedTitle || trimmedTitle.length < 5)
            return showError('📌 Title must be at least 5 characters', 'error');

        addNote(trimmedTitle, trimmedDescription, trimmedTag);
        props.showAlert('✅ Note added successfully!', 'success');
        setNote({ title: '', description: '', tag: '' });
        setError({ show: false, message: '', severity: 'warning' });
    };

    const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });
    const showError = (msg, severity) => setError({ show: true, message: msg, severity });

    return (
        <>
            <Paper elevation={10} sx={{
                mx: "auto", p: 4, my: 2, maxWidth: 600, width: '100%', borderRadius: 4,
                backgroundColor: 'rgba(176, 224, 230, 0.1)', backdropFilter: 'blur(12px)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff',
            }}>

                <Typography variant="h5" gutterBottom sx={{
                    display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#00d4ff',
                }}>
                    <AddCircleOutline sx={{ mr: 1 }} /> Add a New Note
                </Typography>

                <Collapse in={error.show}>
                    <Alert severity={error.severity} action={
                        <IconButton color="inherit" size="small" onClick={() => setError({ ...error, show: false })}>
                            <Close fontSize="inherit" />
                        </IconButton>
                    } sx={{ mb: 2 }}>
                        {error.message}
                    </Alert>
                </Collapse>

                <Box component="form" noValidate autoComplete="off">
                    <TextField fullWidth label="Title" variant="outlined" margin="normal" name="title"
                        value={note.title} onChange={onChange} placeholder="Enter a title"
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />

                    <TextField fullWidth label="Description" multiline rows={4} variant="outlined" margin="normal"
                        name="description" value={note.description} onChange={onChange}
                        placeholder="Write your note here" required
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />

                    <TextField fullWidth label="Tag (optional)" variant="outlined" margin="normal"
                        name="tag" value={note.tag} onChange={onChange} placeholder="e.g. Work, Personal"
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    />

                    <Button variant="contained" fullWidth sx={{
                        mt: 3, background: 'linear-gradient(to right, #00c6ff, #0072ff)', color: '#fff', fontWeight: 'bold',
                        '&:hover': { background: 'linear-gradient(to right, #0072ff, #00c6ff)' },
                    }} onClick={handleClick}>Add Note</Button>
                </Box>
            </Paper>

            <Typography variant="h4" sx={{ mt: 2, mb: -5, color: '#ffffff', fontWeight: 600 }}>
                🗂️ Your Notes: -
            </Typography>
        </>
    );
};

export default AddNote;