import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [noteCount, setNoteCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = '/login';
            return;
        }

        const fetchUserData = async () => {
            try {
                // --- Fetch user info ---
                const getUserUrl = import.meta.env.VITE_GETUSER;
                console.log("GETUSER URL:", getUserUrl);

                const userRes = await fetch(getUserUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    },
                });

                if (!userRes.ok) throw new Error("Failed to fetch user");

                const userData = await userRes.json();
                if (userData.success) {
                    setUser(userData.user);
                } else {
                    throw new Error(userData.error || "User not found");
                }

                // --- Fetch user notes ---
                const getNotesUrl = import.meta.env.VITE_GETNOTES;
                console.log("GETNOTES URL:", getNotesUrl);

                const notesRes = await fetch(getNotesUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    },
                });

                const contentType = notesRes.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Invalid JSON response from notes endpoint");
                }

                const notesData = await notesRes.json();
                setNoteCount(Array.isArray(notesData) ? notesData.length : 0);
            } catch (err) {
                console.error("Error fetching profile data:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p style={{ color: 'white' }}>Loading profile...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    if (!user) return <p style={{ color: 'white' }}>User not found</p>;

    return (
        <div style={{ color: 'white', padding: '2rem' }}>
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Created Notes:</strong> {noteCount}</p>
        </div>
    );
};

export default Profile;
