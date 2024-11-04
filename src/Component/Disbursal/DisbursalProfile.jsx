import React, { useState } from 'react';
import { Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import BarButtons from '../BarButtons';

const barButtonOptions = ['Application', 'Documents', 'Personal', 'Banking', 'Verification', 'Cam', 'Disbursal'];

const DisbursalProfile = () => {
  const [currentPage, setCurrentPage] = useState('Disbursal');

  return (
    <>
      <BarButtons
        barButtonOptions={barButtonOptions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Box 
        sx={{
          maxWidth: '1200px',
          margin: '20px 40px', // Added margin on the sides
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          fontSize: '12px',
          lineHeight: '1.5',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box 
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '0',
            borderCollapse: 'collapse',
          }}
        >
          {/* First Row of Headers */}
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Loan No.</label>
            <span>NFPLRUP00000000316</span>
          </Box>
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Customer Name</label>
            <span>TEST 4 4</span>
          </Box>
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Processed By</label>
            <span>AYUSH DIXIT</span>
          </Box>
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Processed On</label>
            <span>02-11-2024 15:39:38</span>
          </Box>
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Sanctioned By</label>
            <span>AYUSH DIXIT</span>
          </Box>
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Sanctioned On</label>
            <span>02-11-2024 15:47:55</span>
          </Box>
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Loan Approved (Rs.)</label>
            <span>5000</span>
          </Box>
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>ROI % (p.d.) Approved</label>
            <span>1.00</span>
          </Box>

          {/* Second Row of Headers */}
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Net Admin Fee (Rs.) Approved</label>
            <span>550</span>
          </Box>
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Tenure Approved</label>
            <span>28</span>
          </Box>
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Disbursal Email Sent On</label>
            <span>2024-11-02 15:47:55</span>
          </Box>
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Disbursal Email Sent To</label>
            <span>ADAYUSH11581@GMAIL.COM</span>
          </Box>
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Disbursal Email Delivery Status</label>
            <span>SENT</span>
          </Box>
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Disbursal Email Response Status</label>
            <span>ACCEPTED</span>
          </Box>
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Disbursal Email Response IP</label>
            <span>223.177.184.87</span>
          </Box>
          <Box sx={{ gridColumn: 'span 8', display: 'flex', alignItems: 'center', padding: '10px' }}>
            <label style={{ fontWeight: 'bold', width: '50%' }}>Acceptance Email</label>
            <span>ADAYUSH11581@GMAIL.COM</span>
          </Box>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button 
          variant="contained" 
          sx={{
            backgroundColor: '#d9534f',
            color: '#fff',
            padding: '10px 20px',
            margin: '10px 10px 20px 0',
            borderRadius: '5px',
            '&:hover': {
              backgroundColor: '#c9302c' // Darker shade on hover
            }
          }}
        >
          Reject
        </Button>

        <Button 
          variant="contained" 
          sx={{
            backgroundColor: '#f0ad4e',
            color: '#fff',
            padding: '10px 20px',
            margin: '10px 10px 20px 0',
            borderRadius: '5px',
            '&:hover': {
              backgroundColor: '#ec971f' // Darker shade on hover
            }
          }}
        >
          Hold
        </Button>

        <Button 
          variant="contained" 
          sx={{
            backgroundColor: '#5cb85c',
            color: '#fff',
            padding: '10px 20px',
            margin: '10px 0 20px 0',
            borderRadius: '5px',
            '&:hover': {
              backgroundColor: '#4cae4c' // Darker shade on hover
            }
          }}
        >
          Recommend
        </Button>
      </Box>
    </>
  );
};

export default DisbursalProfile;
