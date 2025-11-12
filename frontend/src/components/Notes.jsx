import { useContext, useEffect, useRef, useState } from 'react';
import noteContext from './Context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

function Notes({ showAlert }) {
  const { notes, getNotes, editNote } = useContext(noteContext);
  const [note, setNote] = useState({ id: '', title: '', description: '', tag: '' });
  const ref = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();

  // ✅ Fetch notes on mount (if logged in)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getNotes();
    } else {
      showAlert('Please login to view your notes', 'danger');
      navigate('/login');
    }
  }, []);

  // ✅ Triggered when edit icon is clicked in NoteItem
  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
    ref.current.click(); // open modal
  };

  // ✅ Update note in backend + UI
  const handleUpdateNote = async () => {
    if (note.title.trim().length < 5 || note.description.trim().length < 5) {
      showAlert('⚠️ Title and description must be at least 5 characters long', 'warning');
      return;
    }

    try {
      await editNote(note.id, note.title, note.description, note.tag);
      showAlert('✅ Note updated successfully', 'success');
      refClose.current.click();
    } catch (err) {
      console.error('❌ Error updating note:', err);
      showAlert('Failed to update note. Please try again.', 'danger');
    }
  };

  const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  return (
    <Box sx={{ mx: 'auto', maxWidth: 1200, width: '100%' }}>
      {/* ✅ Add Note Component */}
      <AddNote showAlert={showAlert} />

      {/* Hidden button to trigger Bootstrap modal programmatically */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      ></button>

      {/* ✅ Edit Note Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              padding: '32px',
              marginTop: '16px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
            }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ filter: 'brightness(0) invert(1)' }}
              ></button>
            </div>

            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="title"
                    value={note.title}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="description"
                    rows="4"
                    onChange={onChange}
                    value={note.description}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="tag"
                    value={note.tag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleUpdateNote}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Notes Display Section */}
      <div className="row my-4">
        <div className="container mx-4" style={{ color: 'white' }}>
          {notes.length === 0 && <h5>No notes to display</h5>}
        </div>

        {notes.map((note) => (
          <NoteItem
            key={note._id}
            note={note}
            showAlert={showAlert}
            updateNote={updateNote}
          />
        ))}
      </div>
    </Box>
  );
}

export default Notes;
