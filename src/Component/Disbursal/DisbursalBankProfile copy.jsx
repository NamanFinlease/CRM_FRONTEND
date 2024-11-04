// DisbursalBankProfile.js
import React, { useState } from 'react';
import { Button, Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import DisbursalProfile from './DisbursalProfile'; // Adjust the path if needed

const DisbursalBankProfile = () => {
  const [payableAccount, setPayableAccount] = useState('');
  const [channel, setChannel] = useState('');
  const [mop, setMop] = useState('');
  const [disbursalReferenceNo, setDisbursalReferenceNo] = useState('');

  return (
    <>
      {/* Render DisbursalProfile component */}
      <DisbursalProfile />

        {/* <Box 
          sx={{
            maxWidth: '1200px',
            margin: '20px auto',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            fontSize: '12px',
            lineHeight: '1.5',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '16px' }}>
            <Box sx={{ gridColumn: 'span 4' }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Payable Account *</InputLabel>
                <Select
                  value={payableAccount}
                  onChange={(e) => setPayableAccount(e.target.value)}
                  label="Payable Account *"
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="account1">Account 1</MenuItem>
                  <MenuItem value="account2">Account 2</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ gridColumn: 'span 4' }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Channel *</InputLabel>
                <Select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  label="Channel *"
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="Channel 1">Channel 1</MenuItem>
                  <MenuItem value="Channel 2">Channel 2</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ gridColumn: 'span 4' }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>MOP *</InputLabel>
                <Select
                  value={mop}
                  onChange={(e) => setMop(e.target.value)}
                  label="MOP *"
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="method1">Method 1</MenuItem>
                  <MenuItem value="method2">Method 2</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ gridColumn: 'span 4' }}>
              <TextField
                label="Disbursal Reference No."
                variant="outlined"
                fullWidth
                value={disbursalReferenceNo}
                onChange={(e) => setDisbursalReferenceNo(e.target.value)}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box> */}
    </>
  );
};

export default DisbursalBankProfile;
