import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Typography, TextField, Button, Snackbar, Alert, InputAdornment, Paper
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { API } from '../config/apiconfig';  // ✅ Import API endpoints

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const navigate = useNavigate();

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    if (!email || !password) {
      setSnackbar({ open: true, message: 'Please fill all fields.', severity: 'warning' });
      return;
    }

    try {
      console.log("📡 Sending login payload:", { email, password });
      // console.log("🌐 API endpoint:", API.LOGIN);

      const response = await fetch(API.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const text = await response.text();
      // console.log("📦 Login raw response:", text);

      let json;
      try {
        json = JSON.parse(text);
      } catch (err) {
        throw new Error(`Invalid JSON response: ${text.slice(0, 100)}`);
      }

      if (json.success) {
        localStorage.setItem("token", json.authToken);

        // ✅ Fetch user details
        const userRes = await fetch(API.GET_USER, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': json.authToken,
          },
        });

        const userData = await userRes.json();
        // console.log("👤 Logged-in user:", userData);

        setSnackbar({ open: true, message: 'Login successful! Redirecting...', severity: 'success' });
        setTimeout(() => navigate("/"), 2000);
      } else {
        setSnackbar({
          open: true,
          message: json.error || 'Invalid credentials. Please try again.',
          severity: 'error'
        });
      }

    } catch (error) {
      console.error("❌ Error during login:", error);
      setSnackbar({
        open: true,
        message: 'Network or server error. Please try again later.',
        severity: 'error'
      });
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Paper
      elevation={10}
      sx={{
        p: 4,
        my: 2,
        mx: 'auto',
        maxWidth: 600,
        width: '90%',
        borderRadius: 4,
        backgroundColor: 'rgba(176, 224, 230, 0.1)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#fff'
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Login <LoginIcon fontSize="large" sx={{ verticalAlign: 'middle', color: '#00e5ff' }} />
      </Typography>

      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: '#00e5ff' }} />
              </InputAdornment>
            )
          }}
          sx={{ input: { color: 'white' }, label: { color: 'white' } }}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: '#00e5ff' }} />
              </InputAdornment>
            )
          }}
          sx={{ input: { color: 'white' }, label: { color: 'white' } }}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: '#00e5ff',
            color: '#000',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#00bcd4' }
          }}
          endIcon={<LoginIcon />}
        >
          Login
        </Button>

        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          Don’t have an account?
          <Button
            component={Link}
            to="/signup"
            variant="text"
            sx={{ color: '#00e5ff', textTransform: 'none', ml: 1 }}
            endIcon={<PersonAddAlt1Icon />}
          >
            Sign Up
          </Button>
        </Typography>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Login;
