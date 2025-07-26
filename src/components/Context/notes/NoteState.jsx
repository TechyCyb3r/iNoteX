// import { set } from "mongoose";
import NoteContext from "./NoteContext";
import { useState } from 'react';


const NoteState = (props) => {
    const host = import.meta.env.VITE_HOST;
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)


    // Get all notes
    const getNotes = async () => {

        // Calling API to get all notes
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
            });
            const json = await response.json();
            if (response.status === 401) {
                console.error("Unauthorized access, please login again.");
                return;
            }
            setNotes(json);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        }
    }
    // addNotes all notes
    const addNote = async (title, description, tag) => {
        try {
            // Calling API to add a note
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, description, tag })
            });
            const json = await response.json();
            if (response.ok) {
                setNotes(notes.concat(json));
            } else {
                console.error("Failed to add note:", json);
            }
        } catch (error) {
            console.error("Error adding note:", error);
        }
    }


    // Delete a note
    const deleteNote = async (id) => {
        // Calling API to delete a note
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
            });
            if (response.ok) {
                const updateNotes = notes.filter((note) => note._id !== id);
                setNotes(updateNotes);
            } else {
                const errorData = await response.json();
                console.error("Failed to delete note:", errorData);
            }
        }
        catch (error) {
            console.error("Error deleting note:", error);
        }
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API call to update the note
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, description, tag, date: new Date().toISOString() })
            });
            if (response.ok) {
                const updateNotes = notes.map((note) => {
                    if (note._id === id) {
                        return { ...note, title, description, tag, date: new Date().toISOString() };
                    }
                    return note;
                });
                setNotes(updateNotes);
            } else {
                const errorData = await response.json();
                console.error("Failed to update note:", errorData);
            }
        } catch (error) {
            console.error("Error updating note:", error);
        }
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;