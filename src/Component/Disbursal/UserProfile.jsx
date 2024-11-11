import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Divider } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import KeyIcon from '@mui/icons-material/Key';

const UserProfile = () => {
  return (
    <Box 
      sx={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '40px',
        backgroundColor: '#f3f4f6', // Light gray background
        minHeight: '100vh',
      }}
    >
      <Card 
        sx={{
          maxWidth: 600,
          width: '100%',
          padding: '24px 32px',
          borderRadius: '12px',
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          '&:hover': {
            boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <Typography 
          variant="h5" 
          sx={{
            fontWeight: '700', 
            color: '#333', // Dark gray for the header
            textAlign: 'center', 
            marginBottom: '24px',
            borderBottom: '3px solid #42a5f5',
            paddingBottom: '6px',
            letterSpacing: '0.5px',
          }}
        >
          User Profile
        </Typography>

        <CardContent>
          <Grid container spacing={2}>
            {[
              { label: 'Name:', value: 'John Doe' },
              { label: 'Email:', value: 'john.doe@example.com' },
              { label: 'Mobile:', value: '123-456-7890' },
              { label: 'User Role:', value: 'Admin' },
              { label: 'User ID:', value: 'E12345' },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card 
                  sx={{
                    padding: '12px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
                    },
                    backgroundColor: '#f9f9f9', // Light background for each field card
                  }}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      <Typography sx={{ fontWeight: '500', color: '#42a5f5' }}>
                        {item.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography sx={{ color: '#4a4a4a' }}> {/* Dark gray text for values */}
                        {item.value}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
                {index < 4 && <Divider sx={{ my: 1, borderColor: '#e0e0e0' }} />}
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<KeyIcon />}
              sx={{
                fontWeight: '600',
                textTransform: 'none',
                padding: '8px 20px',
                borderRadius: '10px',
                color: '#42a5f5',
                borderColor: '#42a5f5',
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                  borderColor: '#42a5f5',
                },
                mr: 2,
              }}
            >
              Change Password
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<LockResetIcon />}
              sx={{
                fontWeight: '600',
                textTransform: 'none',
                padding: '8px 20px',
                borderRadius: '10px',
                backgroundColor: '#42a5f5',
                boxShadow: '0px 4px 10px rgba(66, 165, 245, 0.3)',
                '&:hover': {
                  backgroundColor: '#1e88e5',
                },
              }}
            >
              Reset Password
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
