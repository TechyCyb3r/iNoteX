import React from 'react';
import { Box, Typography, Grid, Paper, Avatar, Tooltip } from '@mui/material';
import { NoteAlt, Security, CloudUpload, Devices, Person } from '@mui/icons-material';
import { VerifiedUser } from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ContactPageIcon from '@mui/icons-material/ContactPage';


const About = () => {
  return (
    <Paper elevation={10} sx={{ p: 4, my: 2, borderRadius: 4, background: 'rgba(255, 255, 255, 0.07)', backdropFilter: 'blur(12px)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', minHeight: '100vh', }} >
      <Typography variant="h3" textAlign="center" gutterBottom fontWeight={700}>
        About <span style={{ color: '#1976d2' }}>iNoteX</span>
      </Typography>

      <Typography variant="h6" textAlign="center" gutterBottom color="cyan" maxWidth="md" mx="auto">
        iNoteX is your secure, personal digital notebook — built to keep your thoughts, tasks, and plans safe and accessible from anywhere.
      </Typography>

      <Grid container spacing={4} mt={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ backgroundColor: '#0d112b', p: 3, color: 'white' }}>
            <Typography variant="h5" gutterBottom>
              <Person sx={{ verticalAlign: 'middle', color: '#1976d2', mr: 1 }} />
              About the Developer
            </Typography>
            <Typography variant="body2" color="cyan">
              Hi! I’m <strong>Himanshu Agarwal</strong>, a passionate developer pursuing MCA from JECRC University.
              iNoteX is a project close to my heart — blending my love for clean UI, secure backend, and smooth user experience.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ backgroundColor: '#0d112b', p: 3, color: 'white' }}>
            <Typography variant="h5" gutterBottom>
              <NoteAlt sx={{ verticalAlign: 'middle', color: '#1976d2', mr: 1 }} />
              What is iNoteX?
            </Typography>
            <Typography variant="body2" color="cyan">
              iNoteX is a full-stack MERN application that allows you to securely store, manage, and edit your personal notes in the cloud.
              It supports real-time updates, tagging, and user authentication for a seamless note-taking experience.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ backgroundColor: '#0d112b', p: 3, color: 'white' }}>
            <CloudUpload sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h5" mt={1}>Cloud-Based</Typography>
            <Typography variant="body2" color="cyan">
              Your notes are stored securely in the cloud and can be accessed from any device, anytime — ensuring seamless accessibility, synchronization, and backup.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ backgroundColor: '#0d112b', p: 3, color: 'white' }}>
            <Security sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h5" mt={1}>JWT Security</Typography>
            <Typography variant="body2" color="cyan">
              Authenticated using JSON Web Tokens to protect your data and privacy.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ backgroundColor: '#0d112b', p: 3, color: 'white' }}>
            <Devices sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h5" mt={1}>Responsive Design</Typography>
            <Typography variant="body2" color="cyan">
              Fully responsive and mobile-friendly — take your notes anywhere!
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ backgroundColor: '#0d112b', p: 3, color: 'white' }}>
            <VerifiedUser sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h6" mt={1}>Why Use iNoteX?</Typography>
            <Typography variant="body2" color="cyan">
              No more scattered notes. Keep everything in one place — safe, searchable, and simple to manage.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box mt={6} pt={4} borderTop="1px solid rgba(255,255,255,0.2)" textAlign="center">
        <Typography variant="h6" gutterBottom>
          Connect with Me
        </Typography>


        <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap" mt={1}>
          <Tooltip title="Follow me on LinkedIn">
            <Typography component="a" href="https://www.linkedin.com/in/himanshuagarwal04/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }} >
              <LinkedInIcon style={{ color: '#fff', }} fontSize="large" />
            </Typography>
          </Tooltip>

          <Tooltip title="View my GitHub">
            <Typography component="a" href="https://github.com/TechyCyb3r" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }} >
              <GitHubIcon style={{ color: '#fff' }} fontSize='large' />
            </Typography>
          </Tooltip>

          <Tooltip title="Email me">
            <Typography component="a" href="mailto:himanshuagarwalskr@gmail.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00FFFF', textDecoration: 'none' }} >
              <EmailIcon style={{ color: '#fff' }} fontSize='large' />
            </Typography>
          </Tooltip>

          <Tooltip title="Contact me">
            <Typography component="a" href="https://docs.google.com/forms/d/e/1FAIpQLSfB-BCduuDYmCWf7WZhzhqViAIt4b90fpZZ_D1V50Slh8HIlw/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" style={{ color: '#00FFFF', textDecoration: 'none' }} >
              <ContactPageIcon style={{ color: '#fff' }} fontSize='large' />
            </Typography>
          </Tooltip>
        </Box>
        <Typography variant="body2" color="#D3D3D3" mt={2}>
          © {new Date().getFullYear()} Himanshu Agarwal. All rights reserved.
        </Typography>
      </Box>
    </Paper>
  );
};

export default About;
