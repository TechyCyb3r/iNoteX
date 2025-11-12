import { useState } from "react";
import NoteContext from "./NoteContext";
import { API } from "../../../config/apiconfig";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);

  // ✅ Fetch all notes (GET)
  const getNotes = async () => {
    try {
      const response = await fetch(API.GET_NOTES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      setNotes(json);
    } catch (err) {
      console.error("❌ Error fetching notes:", err);
    }
  };

  // ✅ Add a new note (POST)
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(API.ADD_NOTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();
      console.log("✅ Note added:", note);

      // Add note to local state
      setNotes(notes.concat(note));
    } catch (err) {
      console.error("❌ Error adding note:", err);
    }
  };

  // ✅ Edit a note (PUT)
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${API.UPDATE_NOTE}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      console.log("✅ Note updated:", json);

      // Update UI instantly
      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      );
      setNotes(updatedNotes);
    } catch (err) {
      console.error("❌ Error updating note:", err);
    }
  };

  // ✅ Delete a note (DELETE)
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${API.DELETE_NOTE}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      console.log("🗑️ Note deleted:", json);

      // Remove from UI instantly
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (err) {
      console.error("❌ Error deleting note:", err);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
