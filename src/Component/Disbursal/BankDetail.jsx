import React from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Grid, Divider } from '@mui/material';

const BankDetailForm = () => {
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
          Add Bank Details
        </Typography>

        <CardContent>
          <Grid container spacing={2}>
            {[
              { label: 'Account Holder', placeholder: 'Enter Account Holder Name' },
              { label: 'IFSC', placeholder: 'Enter IFSC Code' },
              { label: 'Account Number', placeholder: 'Enter Account Number' },
              { label: 'Bank Name', placeholder: 'Enter Bank Name' },
            ].map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box 
                  sx={{
                    padding: '8px', 
                    borderRadius: '8px', 
                    backgroundColor: '#f9f9f9', 
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
                    '&:hover': { boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)' } 
                  }}
                >
                  <Typography sx={{ fontWeight: '500', color: '#42a5f5', mb: 1 }}>
                    {field.label}
                  </Typography>
                  <TextField
                    variant="outlined"
                    placeholder={field.placeholder}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                        '& fieldset': { borderColor: '#42a5f5' },
                        '&:hover fieldset': { borderColor: '#1e88e5' },
                        '& input': { color: '#000' }, // Set input text color to black
                      },
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
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
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BankDetailForm;
