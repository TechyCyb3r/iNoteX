import NoteContext from "./NoteContext";
import React, { useState } from 'react';

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "687e2168dab9f15fa1011e41",
            "user": "687b392ebd65f38f26bb3590",
            "title": "My title",
            "description": "This is my first note.",
            "tag": "general",
            "date": "2025-07-21T11:15:52.870Z",
            "__v": 0
        },
        {
            "_id": "687e216fdab9f15fa1011e44",
            "user": "687b392ebd65f38f26bb3590",
            "title": "My title",
            "description": "This is my first note.",
            "tag": "general",
            "date": "2025-07-21T11:15:59.688Z",
            "__v": 0
        },
        {
            "_id": "687e2170dab9f15fa1011e46",
            "user": "687b392ebd65f38f26bb3590",
            "title": "My title",
            "description": "This is my first note.",
            "tag": "general",
            "date": "2025-07-21T11:16:00.781Z",
            "__v": 0
        },
        {
            "_id": "687e216fdab9f15fa1011e44",
            "user": "687b392ebd65f38f26bb3590",
            "title": "My title",
            "description": "This is my first note.",
            "tag": "general",
            "date": "2025-07-21T11:15:59.688Z",
            "__v": 0
        },
        {
            "_id": "687e2170dab9f15fa1011e46",
            "user": "687b392ebd65f38f26bb3590",
            "title": "My title",
            "description": "This is my first note.",
            "tag": "general",
            "date": "2025-07-21T11:16:00.781Z",
            "__v": 0
        },
        {
            "_id": "687e2170dab9f15fa1011e46",
            "user": "687b392ebd65f38f26bb3590",
            "title": "My title",
            "description": "This is my first note.",
            "tag": "general",
            "date": "2025-07-21T11:16:00.781Z",
            "__v": 0
        },
        {
            "_id": "687e216fdab9f15fa1011e44",
            "user": "687b392ebd65f38f26bb3590",
            "title": "My title",
            "description": "This is my first note.",
            "tag": "general",
            "date": "2025-07-21T11:15:59.688Z",
            "__v": 0
        },
        {
            "_id": "687e2170dab9f15fa1011e46",
            "user": "687b392ebd65f38f26bb3590",
            "title": "My title",
            "description": "This is my first note.",
            "tag": "general",
            "date": "2025-07-21T11:16:00.781Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)
    
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;