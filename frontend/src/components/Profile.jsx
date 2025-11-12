import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Avatar,
  Stack,
  Alert,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import NoteIcon from '@mui/icons-material/NoteAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { API } from '../config/apiconfig'; // ✅ Centralized API import

const Profile = () => {
  const [user, setUser] = useState(null);
  const [noteCount, setNoteCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const fetchProfileData = async () => {
      try {
        // ✅ Fetch User
        const userRes = await fetch(API.GET_USER, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        });

        if (!userRes.ok) throw new Error('Failed to fetch user data');

        const userData = await userRes.json();

        if (userData.success) {
          setUser(userData.user);
        } else {
          throw new Error(userData.error || 'User not found');
        }

        // ✅ Fetch Notes
        const notesRes = await fetch(API.GET_NOTES, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        });

        const contentType = notesRes.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid JSON response from notes endpoint');
        }

        const notesData = await notesRes.json();
        setNoteCount(Array.isArray(notesData) ? notesData.length : 0);
      } catch (err) {
        console.error('❌ Error fetching profile data:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // ✅ Loading UI
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress color="info" />
      </Box>
    );
  }

  // ✅ Error UI
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Alert
          severity="error"
          icon={<ErrorOutlineIcon />}
          sx={{ maxWidth: 400, width: '100%', borderRadius: 2 }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  // ✅ No user found
  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Alert severity="info" sx={{ maxWidth: 400, width: '100%', borderRadius: 2 }}>
          User not found
        </Alert>
      </Box>
    );
  }

  // ✅ Main Profile UI
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, px: 2 }}>
      <Card
        sx={{
          maxWidth: 500,
          width: '100%',
          boxShadow: 10,
          borderRadius: 4,
          backdropFilter: 'blur(12px)',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'white',
        }}
      >
        <CardContent>
          {/* Avatar + Welcome */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Avatar sx={{ bgcolor: '#070a1a', width: 80, height: 80 }}>
              <PersonIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="cyan">
              Welcome back 👋
            </Typography>
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />

          {/* User Info */}
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon color="primary" />
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NoteIcon color="info" />
              <Typography variant="body1">
                <strong>Created Notes:</strong> {noteCount}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
