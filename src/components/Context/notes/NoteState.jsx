import { set } from "mongoose";
import NoteContext from "./NoteContext";
import React, { useState } from 'react';


const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)


    // Get all notes
    const getNotes = async () => {
        // TODO API call
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
        // TODO API call
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


        console.log("Adding a new note");
        const note = {
            "_id": "687f06c0dab9fsdfs15fa1011e5c",
            "user": "687b392ebd65f38f26bb3590",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2025-07-22T03:34:24.970Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }


    // Delete a note
    const deleteNote = (id) => {
        // TODO API call
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
        console.log("Deleting note with id: " + id);
    }

    // Edit a note

    const editNote = async (id, title, des, tag) => {
        // API call to update the note
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
            },
            body: JSON.stringify({title, des, tag})
        });
        // const json = response.json();


        // Logic to edit in client 
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = des;
                element.tag = tag;
                break;
            }
        }
        setNotes([...notes]);
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;