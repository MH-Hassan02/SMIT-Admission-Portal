// src/Components/Courses.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Courses = () => {
  const [coursePreference, setCoursePreference] = useState('');
  const [gender, setGender] = useState('');
  const [classPreference, setClassPreference] = useState('');
  const [campusPreference, setCampusPreference] = useState('');
  const [numStudents, setNumStudents] = useState('');
  const [allocatedStudents, setAllocatedStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/allocate`, {
        coursePreference,
        gender,
        classPreference,
        campusPreference,
        numStudents,
      });
      
      if (response.data.length === 0) {
        toast.info("No students found for the given class.", {
          pauseOnHover: false,
          autoClose: 3000,
          style: {
            backgroundColor: "#FFECB3",
          },
        });
      } else {
        setAllocatedStudents(response.data);
        toast.success("Classes allocated successfully!", {
          pauseOnHover: false,
          autoClose: 3000,
          style: {
            backgroundColor: "#E0F7FA",
          },
        });
      }
    } catch (error) {
      console.error('Error allocating classes:', error);
      toast.error("Failed to allocate classes. Please try again.", {
        pauseOnHover: false,
        autoClose: 3000,
        style: {
          backgroundColor: "#FFEBEE",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ width: '80%', marginTop: '20px', marginBottom: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Allocate Classes
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              fullWidth
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Course Preference"
              value={coursePreference}
              onChange={(e) => setCoursePreference(e.target.value)}
              fullWidth
              required
            >
              <MenuItem value="Web and Mobile App">Web and Mobile App</MenuItem>
              <MenuItem value="Flutter">Flutter</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Class Preference"
              value={classPreference}
              onChange={(e) => setClassPreference(e.target.value)}
              fullWidth
              required
            >
              <MenuItem value="Mon - Wed - Fri">Mon - Wed - Fri</MenuItem>
              <MenuItem value="Tue - Thurs - Sat">Tue - Thurs - Sat</MenuItem>
              <MenuItem value="Sunday">Sunday</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Campus Preference"
              value={campusPreference}
              onChange={(e) => setCampusPreference(e.target.value)}
              fullWidth
              required
            >
              <MenuItem value="Bahadurabad Campus">Bahadurabad Campus</MenuItem>
              <MenuItem value="Gulshan Campus">Gulshan Campus</MenuItem>
              <MenuItem value="Korangi Campus">Korangi Campus</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              label="Number of Students"
              value={numStudents}
              onChange={(e) => setNumStudents(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Allocate'}
            </Button>
          </Grid>
        </Grid>
      </form>
      {allocatedStudents.length > 0 && (
        <Paper style={{ marginTop: 30, marginBottom: 30, padding: 20 }}>
          <Typography variant="h6">Allocated Students</Typography>
          <List>
            {allocatedStudents.map((student, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Name: ${student.name} | Roll Number: ${student.rollNumber}`}
                  secondary={`${student.coursePreference} / ${student.classPreference} / ${student.campusPreference}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      <ToastContainer />
    </Container>
  );
};

export default Courses;
