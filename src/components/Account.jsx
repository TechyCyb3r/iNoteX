import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const Account = () => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);

    const [nameData, setNameData] = useState({ name: '', password: '' });
    const [emailData, setEmailData] = useState({ email: '', password: '' });
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteConfirmText, setDeleteConfirmText] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/auth/getuser', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    }
                });

                const json = await res.json();
                if (res.ok && json.success) {
                    setUser({ name: json.user.name, email: json.user.email });
                    setNameData(prev => ({ ...prev, name: json.user.name }));
                    setEmailData(prev => ({ ...prev, email: json.user.email }));
                } else {
                    console.error("Failed to load user", json.error);
                }
            } catch (error) {
                console.error("Error fetching user:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Update Name
    const handleNameUpdate = async () => {
        if (!nameData.name || !nameData.password) {
            alert("Please provide both name and password.");
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/auth/update-name', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(nameData)
            });

            const json = await res.json();
            if (res.ok) {
                setUser(prev => ({ ...prev, name: nameData.name }));
                alert("Name updated successfully");
            } else {
                alert(json.error || "Failed to update name");
            }
        } catch (err) {
            console.error(err);
            alert("Network error");
        }
    };

    // Update Email
    const handleEmailUpdate = async () => {
        if (!emailData.email || !emailData.password) {
            alert("Please provide both email and password.");
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/auth/update-email', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(emailData)
            });

            const json = await res.json();
            if (res.ok) {
                setUser(prev => ({ ...prev, email: emailData.email }));
                alert("Email updated successfully");
            } else {
                alert(json.error || "Failed to update email");
            }
        } catch (err) {
            console.error(err);
            alert("Network error");
        }
    };

    // Update Password
    const handlePasswordUpdate = async () => {
        const { currentPassword, newPassword } = passwordData;

        if (!currentPassword || !newPassword) {
            alert("Please fill in both current and new passwords.");
            return;
        }

        if (currentPassword === newPassword) {
            alert("New password must be different from the current password.");
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/auth/update-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(passwordData)
            });

            const json = await res.json();
            if (res.ok) {
                alert("Password updated successfully");
                setPasswordData({ currentPassword: '', newPassword: '' });
            } else {
                alert(json.error || "Failed to update password");
            }
        } catch (err) {
            console.error(err);
            alert("Network error");
        }
    };
    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("This will permanently delete your account. Are you sure?");
        if (!confirmed) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_ACCDELETE}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ password: deletePassword })
            });

            const json = await res.json();

            if (res.ok && json.success) {
                alert("Account deleted successfully");
                localStorage.removeItem('token');
                window.location.href = "/login"; // redirect to login
            } else {
                alert(json.error || "Failed to delete account");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("Network error");
        }
    };
    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Paper sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 3 }}>
            <Typography variant="h5" gutterBottom>👤 Account Settings</Typography>
            <Typography sx={{ mb: 2 }}>
                <strong>Current Name:</strong> {user.name}<br />
                <strong>Current Email:</strong> {user.email}
            </Typography>

            {/* Update Name */}
            <TextField fullWidth label="New Name" margin="normal"
                value={nameData.name}
                onChange={(e) => setNameData({ ...nameData, name: e.target.value })} />
            <TextField fullWidth label="Password" type="password" margin="normal"
                value={nameData.password}
                onChange={(e) => setNameData({ ...nameData, password: e.target.value })} />
            <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handleNameUpdate}>Update Name</Button>

            {/* Update Email */}
            <TextField fullWidth label="New Email" margin="normal"
                value={emailData.email}
                onChange={(e) => setEmailData({ ...emailData, email: e.target.value })} />
            <TextField fullWidth label="Password" type="password" margin="normal"
                value={emailData.password}
                onChange={(e) => setEmailData({ ...emailData, password: e.target.value })} />
            <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handleEmailUpdate}>Update Email</Button>

            {/* Update Password */}
            <TextField fullWidth label="Current Password" type="password" margin="normal"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} />
            <TextField fullWidth label="New Password" type="password" margin="normal"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} />
            <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handlePasswordUpdate}>Update Password</Button>

            <Typography variant="h6" sx={{ mt: 4, color: 'error.main' }}>❌ Delete Account</Typography>

            <TextField fullWidth label="Type DELETE to confirm" margin="normal" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} />

            <TextField fullWidth label="Enter Password" type="password" margin="normal" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)}
            />

            <Button variant="contained" color="error" fullWidth sx={{ mt: 1 }} onClick={handleDeleteAccount} disabled={deleteConfirmText !== 'DELETE' || !deletePassword}>
                Delete Account
            </Button>
        </Paper>
    );
};

export default Account;
