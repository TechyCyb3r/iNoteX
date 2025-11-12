import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import { Person, Email, Lock, Delete, Settings } from '@mui/icons-material';
import { API } from '../config/apiconfig'; // ✅ centralized config

const textFieldStyles = {
  input: { color: 'white' },
  label: { color: 'white' },
  '& label.Mui-focused': { color: '#42a5f5' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'white' },
    '&:hover fieldset': { borderColor: '#90caf9' },
    '&.Mui-focused fieldset': { borderColor: '#42a5f5' },
  },
};

const Account = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [nameData, setNameData] = useState({ name: '', password: '' });
  const [emailData, setEmailData] = useState({ email: '', password: '' });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // ✅ Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(API.GET_USER, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        });

        const json = await res.json();
        if (res.ok && json.success) {
          setUser({ name: json.user.name, email: json.user.email });
          setNameData({ name: json.user.name, password: '' });
          setEmailData({ email: json.user.email, password: '' });
        } else {
          alert(json.error || 'Failed to load user');
        }
      } catch (error) {
        console.error('Error fetching user:', error.message);
        alert('Network error while fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Update Name
  const handleNameUpdate = async () => {
    if (!nameData.name || !nameData.password) {
      alert('Please provide both name and password.');
      return;
    }

    try {
      const res = await fetch(API.UPDATE_NAME, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(nameData),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setUser((prev) => ({ ...prev, name: nameData.name }));
        alert('✅ Name updated successfully');
        setNameData({ ...nameData, password: '' });
      } else {
        alert(json.error || 'Failed to update name');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while updating name');
    }
  };

  // ✅ Update Email
  const handleEmailUpdate = async () => {
    if (!emailData.email || !emailData.password) {
      alert('Please provide both email and password.');
      return;
    }

    try {
      const res = await fetch(API.UPDATE_EMAIL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(emailData),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setUser((prev) => ({ ...prev, email: emailData.email }));
        alert('✅ Email updated successfully');
        setEmailData({ ...emailData, password: '' });
      } else {
        alert(json.error || 'Failed to update email');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while updating email');
    }
  };

  // ✅ Update Password
  const handlePasswordUpdate = async () => {
    const { currentPassword, newPassword } = passwordData;

    if (!currentPassword || !newPassword) {
      alert('Please fill in both current and new passwords.');
      return;
    }

    if (currentPassword === newPassword) {
      alert('New password must be different from the current password.');
      return;
    }

    try {
      const res = await fetch(API.UPDATE_PASSWORD, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(passwordData),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        alert('✅ Password updated successfully');
        setPasswordData({ currentPassword: '', newPassword: '' });
      } else {
        alert(json.error || 'Failed to update password');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while updating password');
    }
  };

  // ✅ Delete Account
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      alert('Please type DELETE to confirm.');
      return;
    }

    const confirmed = window.confirm(
      'This will permanently delete your account. Are you sure?'
    );
    if (!confirmed) return;

    try {
      const res = await fetch(API.ACC_DELETE, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ password: deletePassword }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        alert('✅ Account deleted successfully');
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        alert(json.error || 'Failed to delete account');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network error while deleting account');
    }
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress color="info" />
      </Box>
    );

  return (
    <Paper
      elevation={10}
      sx={{
        p: 4,
        my: 4,
        mx: 'auto',
        maxWidth: 600,
        width: '100%',
        borderRadius: 4,
        backgroundColor: 'rgba(176, 224, 230, 0.1)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#fff',
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <Settings sx={{ mr: 1 }} /> Account Settings
      </Typography>

      <Typography sx={{ mb: 3 }}>
        <Person sx={{ verticalAlign: 'middle' }} /> <strong>Name:</strong> {user.name}
        <br />
        <Email sx={{ verticalAlign: 'middle' }} /> <strong>Email:</strong> {user.email}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* ✅ Update Name */}
      <Typography variant="subtitle1" gutterBottom>
        <Person /> Update Name
      </Typography>
      <TextField
        fullWidth
        label="New Name"
        margin="dense"
        value={nameData.name}
        onChange={(e) => setNameData({ ...nameData, name: e.target.value })}
        sx={textFieldStyles}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="dense"
        value={nameData.password}
        onChange={(e) => setNameData({ ...nameData, password: e.target.value })}
        sx={textFieldStyles}
      />
      <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handleNameUpdate}>
        Update Name
      </Button>

      <Divider sx={{ my: 3 }} />

      {/* ✅ Update Email */}
      <Typography variant="subtitle1" gutterBottom>
        <Email /> Update Email
      </Typography>
      <TextField
        fullWidth
        label="New Email"
        margin="dense"
        value={emailData.email}
        onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
        sx={textFieldStyles}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="dense"
        value={emailData.password}
        onChange={(e) => setEmailData({ ...emailData, password: e.target.value })}
        sx={textFieldStyles}
      />
      <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handleEmailUpdate}>
        Update Email
      </Button>

      <Divider sx={{ my: 3 }} />

      {/* ✅ Update Password */}
      <Typography variant="subtitle1" gutterBottom>
        <Lock /> Update Password
      </Typography>
      <TextField
        fullWidth
        label="Current Password"
        type="password"
        margin="dense"
        value={passwordData.currentPassword}
        onChange={(e) =>
          setPasswordData({ ...passwordData, currentPassword: e.target.value })
        }
        sx={textFieldStyles}
      />
      <TextField
        fullWidth
        label="New Password"
        type="password"
        margin="dense"
        value={passwordData.newPassword}
        onChange={(e) =>
          setPasswordData({ ...passwordData, newPassword: e.target.value })
        }
        sx={textFieldStyles}
      />
      <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handlePasswordUpdate}>
        Update Password
      </Button>

      <Divider sx={{ my: 3 }} />

      {/* ✅ Delete Account */}
      <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
        <Delete /> Delete Account
      </Typography>
      <TextField
        fullWidth
        label="Type DELETE to confirm"
        margin="dense"
        value={deleteConfirmText}
        onChange={(e) => setDeleteConfirmText(e.target.value)}
        sx={textFieldStyles}
      />
      <TextField
        fullWidth
        label="Enter Password"
        type="password"
        margin="dense"
        value={deletePassword}
        onChange={(e) => setDeletePassword(e.target.value)}
        sx={textFieldStyles}
      />
      <Button
        variant="contained"
        color="error"
        fullWidth
        sx={{ mt: 1 }}
        onClick={handleDeleteAccount}
        disabled={deleteConfirmText !== 'DELETE' || !deletePassword}
      >
        Delete Account
      </Button>
    </Paper>
  );
};

export default Account;
