import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  Delete,
  Settings,
} from '@mui/icons-material';

const textFieldStyles = {
  input: { color: 'white' },
  label: { color: 'white' },
  '& label.Mui-focused': {
    color: '#42a5f5',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: '#90caf9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#42a5f5',
    },
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/getuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        });

        const json = await res.json();
        if (res.ok && json.success) {
          setUser({ name: json.user.name, email: json.user.email });
          setNameData((prev) => ({ ...prev, name: json.user.name }));
          setEmailData((prev) => ({ ...prev, email: json.user.email }));
        } else {
          console.error('Failed to load user', json.error);
        }
      } catch (error) {
        console.error('Error fetching user:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleNameUpdate = async () => {
    if (!nameData.name || !nameData.password) {
      alert('Please provide both name and password.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/update-name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(nameData),
      });

      const json = await res.json();
      if (res.ok) {
        setUser((prev) => ({ ...prev, name: nameData.name }));
        alert('Name updated successfully');
      } else {
        alert(json.error || 'Failed to update name');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  const handleEmailUpdate = async () => {
    if (!emailData.email || !emailData.password) {
      alert('Please provide both email and password.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/update-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(emailData),
      });

      const json = await res.json();
      if (res.ok) {
        setUser((prev) => ({ ...prev, email: emailData.email }));
        alert('Email updated successfully');
      } else {
        alert(json.error || 'Failed to update email');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

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
      const res = await fetch(
        'http://localhost:5000/api/auth/update-password',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
          body: JSON.stringify(passwordData),
        }
      );

      const json = await res.json();
      if (res.ok) {
        alert('Password updated successfully');
        setPasswordData({ currentPassword: '', newPassword: '' });
      } else {
        alert(json.error || 'Failed to update password');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'This will permanently delete your account. Are you sure?'
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_ACCDELETE}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ password: deletePassword }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        alert('Account deleted successfully');
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        alert(json.error || 'Failed to delete account');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network error');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
     <Paper elevation={10} sx={{ p: 4, my: 2, mt:5, mx: 'auto', maxWidth: 600, width: '100%', borderRadius: 4, backgroundColor: 'rgba(176, 224, 230, 0.1)', backdropFilter: 'blur(12px)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', }} >
      <Typography variant="h5" gutterBottom>
        <Settings sx={{ mr: 1 }} />
        Account Settings
      </Typography>

      <Typography sx={{ mb: 3 }}>
        <Person sx={{ verticalAlign: 'middle' }} /> <strong>Name:</strong>{' '}
        {user.name}
        <br />
        <Email sx={{ verticalAlign: 'middle' }} /> <strong>Email:</strong>{' '}
        {user.email}
      </Typography>

      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle1" gutterBottom>
        <Person /> Update Name
      </Typography>
      <TextField
        fullWidth
        label="New Name"
        margin="dense"
        value={nameData.name}
        onChange={(e) =>
          setNameData({ ...nameData, name: e.target.value })
        }
        sx={textFieldStyles}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="dense"
        value={nameData.password}
        onChange={(e) =>
          setNameData({ ...nameData, password: e.target.value })
        }
        sx={textFieldStyles}
      />
      <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handleNameUpdate}>
        Update Name
      </Button>

      <Divider sx={{ my: 3 }} />
      <Typography variant="subtitle1" gutterBottom>
        <Email /> Update Email
      </Typography>
      <TextField
        fullWidth
        label="New Email"
        margin="dense"
        value={emailData.email}
        onChange={(e) =>
          setEmailData({ ...emailData, email: e.target.value })
        }
        sx={textFieldStyles}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="dense"
        value={emailData.password}
        onChange={(e) =>
          setEmailData({ ...emailData, password: e.target.value })
        }
        sx={textFieldStyles}
      />
      <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handleEmailUpdate}>
        Update Email
      </Button>

      <Divider sx={{ my: 3 }} />
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
