import React, { useState } from 'react';
import { Box, TextField, Typography, Grid, Button, Card, CardContent, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const EmployeeList = ({ employees }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    fullName: employees[0]?.fullName || '',
    gender: employees[0]?.gender || '',
    personalEmail: employees[0]?.personalEmail || '',
    mobile: employees[0]?.mobile || '',
    city: employees[0]?.city || '',
    state: employees[0]?.state || '',
    role: employees[0]?.role || '',
    id: employees[0]?.id || '',
  });

  // Handle changes in input fields when editing
  const handleChange = (event) => {
    setEmployeeData({
      ...employeeData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box
      sx={{
        padding: { xs: '20px', sm: '40px' }, // Reduced padding for smaller height
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#3f51b5',
          marginBottom: '20px', // Reduced margin
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
        }}
      >
        Employee Details
      </Typography>
      {employees.map((employee) => (
        <Card
          key={employee.id}
          sx={{
            backgroundColor: '#ffffff',
            marginBottom: '15px', // Reduced margin
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '900px', // Set a maximum width for the card
          }}
        >
          <CardContent>
            <Grid container spacing={2}> {/* Reduced spacing */}
              {/* Full Name Field */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#757575' }}>
                  Full Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="fullName"
                  value={employeeData.fullName}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: !isEditing,
                    sx: { color: 'black', backgroundColor: '#f9f9f9' }, // Added background color
                  }}
                  InputLabelProps={{ style: { color: '#757575' } }}
                />
              </Grid>

              {/* Gender Field */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#757575' }}>
                  Gender
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="gender"
                  value={employeeData.gender}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: !isEditing,
                    sx: { color: 'black', backgroundColor: '#f9f9f9' },
                  }}
                  InputLabelProps={{ style: { color: '#757575' } }}
                />
              </Grid>

              {/* Personal Email Field */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#757575' }}>
                  Personal Email
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="personalEmail"
                  value={employeeData.personalEmail}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: !isEditing,
                    sx: { color: 'black', backgroundColor: '#f9f9f9' },
                  }}
                  InputLabelProps={{ style: { color: '#757575' } }}
                />
              </Grid>

              {/* Mobile Field */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#757575' }}>
                  Mobile
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="mobile"
                  value={employeeData.mobile}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: !isEditing,
                    sx: { color: 'black', backgroundColor: '#f9f9f9' },
                  }}
                  InputLabelProps={{ style: { color: '#757575' } }}
                />
              </Grid>

              {/* City Field */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#757575' }}>
                  City
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  value={employeeData.city}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: !isEditing,
                    sx: { color: 'black', backgroundColor: '#f9f9f9' },
                  }}
                  InputLabelProps={{ style: { color: '#757575' } }}
                />
              </Grid>

              {/* State Field */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#757575' }}>
                  State
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="state"
                  value={employeeData.state}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: !isEditing,
                    sx: { color: 'black', backgroundColor: '#f9f9f9' },
                  }}
                  InputLabelProps={{ style: { color: '#757575' } }}
                />
              </Grid>

              {/* Role Field */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#757575' }}>
                  Role
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="role"
                  value={employeeData.role}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: !isEditing,
                    sx: { color: 'black', backgroundColor: '#f9f9f9' },
                  }}
                  InputLabelProps={{ style: { color: '#757575' } }}
                />
              </Grid>

              {/* ID Field */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#757575' }}>
                  ID
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="id"
                  value={employeeData.id}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: !isEditing,
                    sx: { color: 'black', backgroundColor: '#f9f9f9' },
                  }}
                  InputLabelProps={{ style: { color: '#757575' } }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      {/* Edit Button */}
      <Box textAlign="center" mt={4}>
        <RouterLink to="/add-employee" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: { xs: '10px 20px', sm: '12px 30px' },
              fontSize: { xs: '14px', sm: '16px' },
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              textTransform: 'none',
              backgroundColor:'#6c757d' ,
            }}
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </RouterLink>
      </Box>
    </Box>
  );
};

// Mock Data Example
const employees = [
  {
    id: 1,
    fullName: 'John Doe',
    gender: 'Male',
    personalEmail: 'john.doe@example.com',
    mobile: '1234567890',
    city: 'Delhi',
    state: 'Delhi',
    role: 'Screener',
  },
];

const App = () => {
  return <EmployeeList employees={employees} />;
};

export default App;
