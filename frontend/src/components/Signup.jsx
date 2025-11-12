import React, { useState } from 'react';
import {
  TextField, Button, Typography, Snackbar, Alert,
  InputAdornment, Card, CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { API } from '../config/apiconfig'; // ✅ Import centralized API config

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    // ✅ Basic validation before hitting backend
    if (!name || !email || !password) {
      setSnackbar({ open: true, message: 'Please fill all fields.', severity: 'warning' });
      return;
    }

    console.log("📤 Sending signup payload:", { name, email, password });
    console.log("🌐 API endpoint:", API.SIGNUP);

    try {
      const response = await fetch(API.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password
        }),
      });

      const text = await response.text(); // Read raw response (for debugging)
      console.log("📦 Signup raw response:", text);

      let json;
      try {
        json = JSON.parse(text); // ✅ Safe JSON parse
      } catch (err) {
        throw new Error(`Invalid JSON response: ${text.slice(0, 100)}`);
      }

      // ✅ Use 'authToken' key (your backend sends authToken, not token)
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        setSnackbar({ open: true, message: 'Signup successful! Redirecting...', severity: 'success' });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setSnackbar({
          open: true,
          message: json.error || 'Signup failed. Please try again.',
          severity: 'error'
        });
      }

    } catch (error) {
      console.error("❌ Error during signup:", error);
      setSnackbar({
        open: true,
        message: 'Network error. Please check your connection.',
        severity: 'error'
      });
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Card sx={{
        maxWidth: 450,
        width: '100%',
        p: 3,
        boxShadow: 10,
        borderRadius: 4,
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        mx: 'auto',
        mt: 5
      }}>
        <CardContent>
          {/* Signup Icon */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <HowToRegIcon sx={{ fontSize: 60, color: 'white' }} />
          </div>

          <Typography
            variant="h5"
            gutterBottom
            align="center"
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(to right, #00ffff, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Create Your Account
          </Typography>

          <form noValidate onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              name="name"
              value={credentials.name}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: 'white' }} />
                  </InputAdornment>
                ),
                style: { color: 'white' }
              }}
              InputLabelProps={{ style: { color: 'white' } }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: 'white' }} />
                  </InputAdornment>
                ),
                style: { color: 'white' }
              }}
              InputLabelProps={{ style: { color: 'white' } }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              type="password"
              inputProps={{ minLength: 8 }}
              helperText="Minimum 8 characters"
              FormHelperTextProps={{ style: { color: 'white' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: 'white' }} />
                  </InputAdornment>
                ),
                style: { color: 'white' }
              }}
              InputLabelProps={{ style: { color: 'white' } }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: 'bold',
                borderRadius: 2,
                backgroundColor: '#2260ff',
                color: 'white',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#000080' }
              }}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>

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
    </>
  );
};

export default Signup;
