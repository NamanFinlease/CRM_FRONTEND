import React, { useState } from 'react';
import { Button, Box, FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DisbursalProfile from './DisburseLoan'; // Ensure the path is correct
import useAuthStore from '../store/authStore';
import useStore from '../../Store';

const DisburseInfo = ({ disburse }) => {
  const [showForm, setShowForm] = useState(false);
  const {activeRole} = useAuthStore()
  const {applicationProfile} = useStore()
  const [payableAccount, setPayableAccount] = useState('');
  const [netDisbursalAmount, setNetDisbursalAmount] = useState(27520); // Default value
  const [paymentMode, setPaymentMode] = useState('');
  const [channel, setChannel] = useState('');
  const [disbursalDate, setDisbursalDate] = useState('2024-11-01'); // Default date
  const [remarks, setRemarks] = useState('');

  const handleToggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm); // Toggle form visibility
  };

  return (
    <Box
      sx={{
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      {/* Render DisbursalProfile component before the dropdown header */}
      <DisbursalProfile disburse={disburse} />

      {/* Clickable Header for Disbursal Bank with Background */}
      {activeRole === "disbursalHead" && 
      <>
        <Box
          onClick={handleToggleForm}
          sx={{
            backgroundColor: '#3f51b5', // Background color for header
            borderRadius: '8px',
            padding: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ffffff', // Text color
            marginTop: '20px',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
            Disbursal Bank
          </Typography>
          <ExpandMoreIcon
            sx={{
              marginLeft: '8px',
              color: '#ffffff',
              transform: showForm ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}
          />
        </Box>

        {/* Form that appears when the header is clicked */}
        {showForm && (
          <Box
            sx={{
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              fontSize: '12px',
              lineHeight: '1.5',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginTop: '10px',
            }}
          >
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel sx={{ color: '#9e9e9e' }}>Payable Account *</InputLabel>
                <Select
                  value={payableAccount}
                  onChange={(e) => setPayableAccount(e.target.value)}
                  label="Payable Account *"
                  sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px', color: '#363535' }}
                >
                  <MenuItem value="">
                    <em>Select Account</em>
                  </MenuItem>
                  {
                    applica
                  }
                  <MenuItem value="account1">Account 1</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Net Disbursal Amount (Rs) *"
                variant="outlined"
                fullWidth
                type="number"
                value={netDisbursalAmount}
                onChange={(e) => setNetDisbursalAmount(e.target.value)}
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  color: '#5a5a5a',
                  '& .MuiInputBase-input::placeholder': {
                    color: '#363535', // Placeholder color
                  },
                  '& .MuiInputLabel-root': {
                    color: '#9e9e9e', // Label color
                  },
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ccc', // Border color
                  },
                  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3f51b5', // Border color on hover
                  },
                  '&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3f51b5', // Border color on focus
                  },
                }}
                inputProps={{
                  placeholder: "Enter amount", // Placeholder text
                  style: { color: '#363535' }, // Text color
                }}
              />

              <FormControl fullWidth variant="outlined">
                <InputLabel sx={{ color: '#9e9e9e' }}>Payment Mode *</InputLabel>
                <Select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  label="Payment Mode *"
                  sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px', color: '#363535' }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="method1">Method 1</MenuItem>
                  <MenuItem value="method2">Method 2</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined">
                <InputLabel sx={{ color: '#9e9e9e' }}>Channel *</InputLabel>
                <Select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  label="Channel *"
                  sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px', color: '#363535' }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="Channel 1">Channel 1</MenuItem>
                  <MenuItem value="Channel 2">Channel 2</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Disbursal Date *"
                variant="outlined"
                fullWidth
                type="date"
                value={disbursalDate}
                onChange={(e) => setDisbursalDate(e.target.value)}
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  color: '#5a5a5a',
                  '& .MuiInputBase-input::placeholder': {
                    color: '#363535', // Placeholder color
                  },
                  '& .MuiInputLabel-root': {
                    color: '#9e9e9e', // Label color
                  },
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ccc', // Border color
                  },
                  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3f51b5', // Border color on hover
                  },
                  '&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#363535', // Border color on focus
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  placeholder: "Select date", // Placeholder text
                  style: { color: '#363535' }, // Text color
                }}
              />

              <TextField
                label="Remarks *"
                variant="outlined"
                fullWidth
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  color: '#5a5a5a',
                  '& .MuiInputBase-input::placeholder': {
                    color: '#363535', // Placeholder color
                  },
                  '& .MuiInputLabel-root': {
                    color: '#9e9e9e', // Label color
                  },
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ccc', // Border color
                  },
                  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3f51b5', // Border color on hover
                  },
                  '&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3f51b5', // Border color on focus
                  },
                }}
                inputProps={{
                  placeholder: 'Enter any remarks here', // Placeholder text
                  style: { color: '#363535' }, // Text color
                }}
              />
            </Box>

            {/* Submit button */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: '20px',
                width: '100%',
                backgroundColor: '#3f51b5', // Custom button color
                '&:hover': {
                  backgroundColor: '#1e88e5', // Hover effect
                },
              }}
            >
              Disburse
            </Button>
          </Box>
        )}
      </>}
    </Box>
  );
};

export default DisburseInfo;
