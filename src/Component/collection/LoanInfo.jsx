import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, TextField, Alert, useTheme, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tokens } from '../../theme';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useStore from '../../Store';
import useAuthStore from '../store/authStore';
import { useRecommendLoanMutation } from '../../Service/applicationQueries';
import { formatDate } from '../../utils/helper';
import CommonTable from '../CommonTable';
import { useAllocateLeadMutation, useFetchAllLeadsQuery } from '../../Service/Query';

const LoanInfo = ({ disburse }) => {
  const { applicationProfile } = useStore()
  const { activeRole } = useAuthStore()
  const [remarks, setRemarks] = useState(null);
  const [openRemark, setOpenRemark] = useState(false)
  const navigate = useNavigate()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { data: allLeads, refetch } = useFetchAllLeadsQuery({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
  });

  console.log('profile',applicationProfile)

  const { 
    sanction: { 
      application: { 
        cam, 
        lead: { fName, mName, lName } = {} 
      } = {} 
    } = {} 
  } = applicationProfile || {};


  const handleCancel = () => {
    // Reset all states to go back to initial state
    setRemarks('');
    setOpenRemark(false)
  };

  // Color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const info = [
    { label: "Loan No.", value: applicationProfile?.loanNo },
    { label: "Customer Name", value: `${fName}${mName ? ` ${mName}` : ``} ${lName}` },
    { label: "Principle Amount", value: cam?.details?.loanRecommended },
    { label: "Repayment Date", value: cam?.details?.repaymentDate && formatDate(cam?.details?.repaymentDate) },
    { label: "Repayment Amount", value: cam?.details?.repaymentAmount },
    { label: "Actual Repayment Amount", value: cam?.details?.repaymentAmount },
    { label: "ROI % (p.d.) Approved", value: cam?.details?.roi },
    { label: "Processing Fee", value: cam?.details?.netAdminFeeAmount },
    { label: "Tenure", value: cam?.details?.eligibleTenure },
    { label: "DPD", value: cam?.details?.eligibleTenure },
    // ...(applicationProfile.isDisbursed ? [
    //   { label: "Disbursed From", value: applicationProfile?.payableAccount },
    //   { label: "Disbursed On", value: applicationProfile?.disbursedBy && formatDate(applicationProfile?.disbursedAt) },
    //   { label: "Disbursed By", value: `${applicationProfile?.disbursedBy?.fName}${applicationProfile?.disbursedBy?.mName ? ` ${applicationProfile?.disbursedBy?.mName}` : ``} ${applicationProfile?.disbursedBy?.lName}` },
    //   { label: "Disbursed Amount", value: applicationProfile?.amount },
    // ] : [])
  ];

  const columns = [
    { field: 'name', headerName: 'Collection ID', width: 120 },
    { field: 'mobile', headerName: 'Collection By', width: 180 },
    { field: 'aadhaar', headerName: 'Date Initiated', width: 150 },
    { field: 'pan', headerName: 'Followup Type', width: 150 },
    { field: 'city', headerName: 'Status', width: 150 },
    { field: 'state', headerName: 'Remarks', width: 150 },
  ];

  // const rows = allLeads?.leads?.map((lead) => ({
  //   id: lead?._id,
  //   name: `${lead?.fName} ${lead?.mName} ${lead?.lName}`,
  //   mobile: lead?.mobile,
  //   aadhaar: lead?.aadhaar,
  //   pan: lead?.pan,
  //   city: lead?.city,
  //   state: lead?.state,
  //   loanAmount: lead?.loanAmount,
  //   salary: lead?.salary,
  //   source: lead?.source,
  // })) || [];


  return (
    <>
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '10px',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          background: colors.white["whiteshade"],
          fontSize: '12px',
          lineHeight: '1.5',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr', // Two columns
            gap: '0',
            borderCollapse: 'collapse',
          }}
        >
          {/* Map over the data array to create each field in a row */}
          {info.map((field, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}
            >
              <label style={{ fontWeight: 'bold', width: '50%' }}>{field.label}</label>
              <span>{field.value} {field.label === "ROI % (p.d.) Approved" && "%" }</span>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ maxWidth: '1200px', margin: '0 auto', mt: 3, borderRadius: '5px', background:"#fff" }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color:colors.black["blackshade"]}} />}
                    aria-controls="followup-content"
                    id="followup-content-header"
                    sx={{
                        backgroundColor: colors.white["whiteshade"],
                        color: colors.primary["primaryshade"],
                        fontWeight: '600',
                        fontSize:'16px !important',
                        borderRadius: '5px',
                        boxShadow: '0px 0px 10px #d1d5db, -5px -5px 10px #ffffff'
                    }}
                >
                    <Typography>Follow Ups</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ height: 500, width: '100%',background: colors.white["whiteshade"],}}>
                    <CommonTable
                        columns={columns}
                        // rows={rows}
                        // totalRows={totalLeads}
                        paginationModel={paginationModel}
                        // onPageChange={handlePageChange}
                        // onRowClick={handleRowClick}  
                        // actionButton={true}
                        // onAllocateButtonClick={handleAllocate}
                        // onActionButtonClick={handleActionButtonClick}
                      />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
      {/* {openRemark &&
        <>
          <Box
            sx={{
              marginTop: 3,
              padding: 4,
              backgroundColor: '#f9f9f9', // Light background for the entire form
              borderRadius: 2,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >

            <Typography variant="h6" gutterBottom>
              Remarks
            </Typography>
            <TextField
              label="Add your remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              fullWidth
              multiline
              rows={3}
              sx={{
                marginBottom: 3,
                color: '#363535',                // Ensure text is black or dark
                backgroundColor: '#ebebeb',   // Light background for text area
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#c4c4c4',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
          </Box>
          {isError &&
              <Alert severity="error" style={{ marginTop: "10px" }}>
                {error?.data?.message}
              </Alert>
            }

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              sx={{
                padding: '10px 20px',
                borderRadius: 2,
                fontWeight: 'bold',
                backgroundColor: '#f5f5f5',
                ':hover': { backgroundColor: '#e0e0e0' },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                padding: '10px 20px',
                borderRadius: 2,
                fontWeight: 'bold',
                backgroundColor: '#1976d2',
                ':hover': { backgroundColor: '#1565c0' },
              }}
            >
              Submit
            </Button>
          </Box>
        </>

      } */}

    </>
  );
};

export default LoanInfo;
