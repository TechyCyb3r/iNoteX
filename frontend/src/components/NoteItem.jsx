import React, { useContext, useState } from 'react';
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiPencilOutline } from '@mdi/js';
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
  Tooltip,
} from '@mui/material';
import styles from '../Css/NoteItem.module.css';

const NoteItem = ({ note, updateNote, showAlert }) => {
  const { deleteNote } = useContext(noteContext);
  const [openConfirm, setOpenConfirm] = useState(false);

  // ✅ Handle delete note (calls backend via context)
  const handleDeleteNote = async () => {
    try {
      await deleteNote(note._id);
      showAlert('🗑️ Note deleted successfully!', 'success');
    } catch (err) {
      showAlert('Failed to delete note. Please try again.', 'danger');
    } finally {
      setOpenConfirm(false);
    }
  };

  // ✅ Trigger update (handled by parent modal in Notes.jsx)
  const handleEditClick = () => {
    updateNote(note);
  };

  return (
    <>
      <Box sx={{ minWidth: 200, maxWidth: 360, m: 2 }}>
        <Card
          variant="outlined"
          sx={{
            borderRadius: 4,
            boxShadow: 3,
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            overflow: 'hidden',
            WebkitMaskImage: '-webkit-radial-gradient(white, black)',
            border: '1px solid rgba(255,255,255,0.2)',
            p: 1,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)',
            },
          }}
        >
          <CardContent>
            {/* Date & Time */}
            <Typography
              component="div"
              gutterBottom
              sx={{ fontSize: 13, color: 'cyan', fontWeight: 500 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <span>
                  {new Date(note.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <span>{new Date(note.date).toLocaleDateString()}</span>
              </Box>
            </Typography>

            {/* Title */}
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 600, color: 'white', mb: 1 }}
            >
              {note.title}
            </Typography>

            {/* Tags */}
            <Typography sx={{ mb: 1.5 }}>
              {Array.isArray(note.tag)
                ? note.tag.map((t, idx) => (
                    <span
                      key={idx}
                      className="badge text-bg-success mx-1"
                      style={{
                        backgroundColor: '#00bcd4',
                        color: 'white',
                        fontSize: '0.75rem',
                      }}
                    >
                      {t}
                    </span>
                  ))
                : note.tag && (
                    <span
                      className="badge text-bg-success"
                      style={{
                        backgroundColor: '#00bcd4',
                        color: 'white',
                        fontSize: '0.75rem',
                      }}
                    >
                      {note.tag}
                    </span>
                  )}
            </Typography>

            {/* Description */}
            <Typography
              variant="body2"
              color="white"
              sx={{
                wordBreak: 'break-word',
                lineHeight: 1.5,
                opacity: 0.9,
              }}
            >
              {note.description}
            </Typography>
          </CardContent>

          {/* Actions */}
          <CardActions sx={{ justifyContent: 'flex-end', pb: 2 }}>
            <Tooltip title="Delete note" arrow>
              <Box
                className={styles.icon}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: '#ff1744' },
                  transition: 'color 0.2s',
                }}
                onClick={() => setOpenConfirm(true)}
              >
                <Icon path={mdiTrashCanOutline} size={1} />
              </Box>
            </Tooltip>

            <Tooltip title="Edit note" arrow>
              <Box
                className={styles.icon}
                sx={{
                  cursor: 'pointer',
                  mx: 1,
                  '&:hover': { color: '#00e5ff' },
                  transition: 'color 0.2s',
                }}
                onClick={handleEditClick}
              >
                <Icon path={mdiPencilOutline} size={1} />
              </Box>
            </Tooltip>
          </CardActions>
        </Card>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        PaperProps={{
          style: {
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            backdropFilter: 'blur(12px)',
          },
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'white' }}>
            Are you sure you want to delete this note? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteNote} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoteItem;
