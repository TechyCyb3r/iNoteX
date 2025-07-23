import { set } from "mongoose";
import NoteContext from "./NoteContext";
import React, { useState } from 'react';


const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)


    // Get all notes
    const getNotes = async () => {

        // Calling API to get all notes
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3YjM5MmViZDY1ZjM4ZjI2YmIzNTkwIn0sImlhdCI6MTc1MzE5NDY1M30.seVLTWkrZw0BLWr1AvIO8bY00gQomANgV2Ex3HlN8MA"
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    // addNotes all notes
    const addNote = async (title, description, tag) => {

        // Calling API to add a note
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3YjM5MmViZDY1ZjM4ZjI2YmIzNTkwIn0sImlhdCI6MTc1MzE5NDY1M30.seVLTWkrZw0BLWr1AvIO8bY00gQomANgV2Ex3HlN8MA"
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        setNotes(notes.concat(json));

    }


    // Delete a note
    const deleteNote = async (id) => {
        // Calling API to delete a note
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3YjM5MmViZDY1ZjM4ZjI2YmIzNTkwIn0sImlhdCI6MTc1MzE5NDY1M30.seVLTWkrZw0BLWr1AvIO8bY00gQomANgV2Ex3HlN8MA"
            }
        });
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
        console.log("Deleting note with id: " + id);
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API call to update the note
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3YjM5MmViZDY1ZjM4ZjI2YmIzNTkwIn0sImlhdCI6MTc1MzE5NDY1M30.seVLTWkrZw0BLWr1AvIO8bY00gQomANgV2Ex3HlN8MA"
            },
            body: JSON.stringify({title, description, tag})
        });

        // const json = response.json();
        const updateNotes = notes.map((note) => {
            if (note._id === id) {
                return { ...note, title, description, tag };
            }
            return note;
        });
        setNotes(updateNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;