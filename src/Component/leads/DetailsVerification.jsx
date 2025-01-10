// import React, { useEffect, useState } from 'react';
// import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, CircularProgress } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Swal from 'sweetalert2';
// import { useGetEmailOtpMutation, useLazyAadhaarOtpQuery, useLazyCheckDetailsQuery, useLazyGenerateAadhaarLinkQuery, useLazyGetPanDetailsQuery } from '../../Service/Query';
// import { useNavigate, useParams } from 'react-router-dom';
// import EmailVerification from './OtpVerification';
// import PanCompare from './PanCompare';
// import useAuthStore from '../store/authStore';
// import AadhaarCompare from './AadhaarCompare';

// const VerifyContactDetails = ({ isMobileVerified, isEmailVerified, isAadhaarVerified,isAadhaarDetailsSaved, isPanVerified }) => {
//   const { id } = useParams()
//   const {setCodeVerifier,setFwdp,activeRole} = useAuthStore()
//   const navigate = useNavigate()
//   const [otp, setOtp] = useState(false)
//   const [openAadhaarCompare,setOpenAadhaarCompare] = useState(false)
//   const [aadhaarData,setAadhaarData] = useState()
//   const [otpAadhaar, setOtpAadhaar] = useState(false)
//   const [panModal, setPanModal] = useState(false)
//   const [otpPan, setOtpPan] = useState(false)
//   const [mobileVerified, setMobileVerified] = useState(false);

//   const [getEmailOtp, { data: emailOtp, isSuccess: emailOtpSuccess, isError: isEmailError, error: emailError }] = useGetEmailOtpMutation()
//   const [checkDetails, { data: aadhaarDetails, isSuccess: aadhaarDetailsSuccess,isLoading:aadhaarDetailsLoading, isError: isAadhaarDetailError, error: aadhaarDetailsError,isFetching:isAadhaarDetailFetching }] = useLazyCheckDetailsQuery()
//   const [getPanDetails, panRes] = useLazyGetPanDetailsQuery()
//   const [sendAadhaarLink, aadhaarRes] = useLazyGenerateAadhaarLinkQuery()

//   const handleMobileVerification = () => {
//     // Logic for mobile verification
//     setMobileVerified(true);
//     Swal.fire({
//       title: 'Mobile Verified!',
//       icon: 'success',
//     });
//   };


//   const handleEmailVerification = () => {
//     getEmailOtp(id)
//   };
//   const handlePanVerification = () => {
//     getPanDetails(id)
//   }
//   const handleSendAadhaarLink = () => {
//     sendAadhaarLink(id)
//   }

//   const handleAadhaarVerification = () => {
//     checkDetails(id)

//   }

//   useEffect(() => {
//     if (panRes?.isSuccess && panRes?.data && !panRes?.isFetching) {
//       setPanModal(true)

//     }
//   }, [panRes?.data, panRes?.isSuccess, panRes?.isFetching])

//   useEffect(() => {
//     if (emailOtpSuccess) {
//       setOtp(true)
//     }
//   }, [emailOtp, emailOtpSuccess])
//   useEffect(() => {
//     if (aadhaarRes?.isSuccess && aadhaarRes?.data && aadhaarRes?.isFetching) {
//       navigate(`/lead-process`)
//     }
//     if (aadhaarDetails && aadhaarDetailsSuccess && !isAadhaarDetailFetching) {
//       setOpenAadhaarCompare(true)
//       setAadhaarData(aadhaarDetails?.data?.details)

//     }
//   }, [aadhaarRes,aadhaarDetails,aadhaarDetailsSuccess,isAadhaarDetailFetching])






//   return (
//     <>
//     {openAadhaarCompare && <AadhaarCompare open={openAadhaarCompare} setOpen={setOpenAadhaarCompare} aadhaarDetails={aadhaarData} lead={lead} />}
//     {/* {otp && <EmailVerification open={otp} setOpen={setOtp} />} */}
//       {<PanCompare open={panModal} setOpen={setPanModal} panDetails={panRes?.data?.data} />}
//       <Box sx={{ maxWidth: 700, margin: '0 auto', mt: 4 }}>
//         {/* Single Accordion for Mobile and Email Verification */}
//         <Accordion sx={{ borderRadius: '15px', boxShadow: 3 }}>
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel1-content"
//             id="panel1-header"
//             sx={{
//               backgroundColor: '#0366fc',
//               borderRadius: '5px',
//               color: '#fff',
//               fontWeight: 'bold',
//               '&:hover': { backgroundColor: '#0056b3' }
//             }}
//           >
//             <Typography variant="h6">Documents Verification</Typography>
//           </AccordionSummary>
//           <AccordionDetails sx={{ backgroundColor: '#f5f5f5', borderRadius: '15px' }}>
//             <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
//               {/* Mobile Verification Section */}
//               {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="body1" sx={{ color: '#898b8c' }}>


//                   Mobile:<span style={{ color: isMobileVerified ? 'green' : 'red' }}> {isMobileVerified ? 'Verified' : 'Not Verified'}
//                   </span>
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   onClick={handleMobileVerification}
//                   sx={{
//                     backgroundColor: isMobileVerified ? '#ccc' : '#4caf50',
//                     '&:hover': { backgroundColor: isMobileVerified ? '#ccc' : '#388e3c' },
//                     transition: 'background-color 0.3s'
//                   }}
//                   disabled={isMobileVerified}
//                 >
//                   Verify Mobile
//                 </Button>
//               </Box> */}

//               {/* Email Verification Section */}
//               {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="body1" sx={{ color: '#898b8c', }}>
//                   Email:
//                   <span style={{ color: isEmailVerified ? 'green' : 'red' }}>
//                     {isEmailVerified ? ' Verified' : ' Not Verified'}
//                   </span>
//                 </Typography>

//                 <Button
//                   variant="contained"
//                   onClick={handleEmailVerification}
//                   sx={{
//                     backgroundColor: isEmailVerified ? '#ccc' : '#4caf50',
//                     '&:hover': { backgroundColor: isEmailVerified ? '#ccc' : '#388e3c' },
//                     transition: 'background-color 0.3s'
//                   }}
//                   disabled={isEmailVerified} // Disable button if already verified
//                 >
//                   Verify Email
//                 </Button>
//               </Box> */}
//               {/* Aadhaar Verification Section */}
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="body1" sx={{ color: '#898b8c' }}>
//                   Aadhaar:
//                   <span style={{ color: isAadhaarVerified ? 'green' : 'red' }}>
//                     {isAadhaarVerified ? ' Verified' : ' Not Verified'}
//                   </span>
//                 </Typography>

//                 {(activeRole === "screener" && !isAadhaarVerified ) && 
//                 <>
//                 {
//                   isAadhaarDetailsSaved ? 
//                 <Button
//                   // variant="contained" 
//                   onClick={handleAadhaarVerification}
//                   sx={{
//                     backgroundColor: (aadhaarDetailsLoading || isAadhaarDetailFetching) ? "#ccc" : "#1F2A40",
//                     color: (aadhaarDetailsLoading || isAadhaarDetailFetching) ? "#666" : "white",
//                     cursor: (aadhaarDetailsLoading || isAadhaarDetailFetching) ? "not-allowed" : "pointer",
//                     "&:hover": {
//                         backgroundColor: (aadhaarDetailsLoading || isAadhaarDetailFetching) ? "#ccc" : "#3F4E64",
//                     },
//                 }}
//                   disabled={isAadhaarVerified}
//                 >
//                   {(aadhaarDetailsLoading || isAadhaarDetailFetching) ? <CircularProgress size={20} color="inherit" /> : `Verify Aadhaar`}
//                 </Button>
//                 :
//                 <Button
//                   // variant="contained" 
//                   onClick={handleSendAadhaarLink}
//                   sx={{
//                     backgroundColor: (aadhaarRes.isLoading || aadhaarRes?.isFetching) ? "#ccc" : "#1F2A40",
//                     color: (aadhaarRes.isLoading || aadhaarRes?.isFetching) ? "#666" : "white",
//                     cursor: (aadhaarRes.isLoading || aadhaarRes?.isFetching) ? "not-allowed" : "pointer",
//                     "&:hover": {
//                         backgroundColor: (aadhaarRes.isLoading || aadhaarRes?.isFetching) ? "#ccc" : "#3F4E64",
//                     },
//                 }}
//                   disabled={isAadhaarVerified}
//                 >
//                   {(aadhaarRes.isLoading || aadhaarRes?.isFetching) ? <CircularProgress size={20} color="inherit" /> : `Send Link`}
//                 </Button>
//                 }
//                 </>
//                 }
//               </Box>


//               {/* Pan Verification Section */}
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="body1" sx={{ color: '#898b8c' }}>
//                   Pan:
//                   <span style={{ color: isPanVerified ? 'green' : 'red' }}>
//                     {isPanVerified ? ' Verified' : ' Not Verified'}
//                   </span>
//                 </Typography>


//                 {(activeRole === "screener" && !isPanVerified) && <Button
//                   // variant="contained"
//                   onClick={handlePanVerification}
//                   sx={{
//                     backgroundColor: panRes?.isLoading ? "#ccc" : "#1F2A40",
//                     color: panRes?.isLoading ? "#666" : "white",
//                     cursor: panRes?.isLoading ? "not-allowed" : "pointer",
//                     "&:hover": {
//                         backgroundColor: panRes?.isLoading ? "#ccc" : "#3F4E64",
//                     },
//                 }}
//                   disabled={panRes?.isLoading}
//                 >
//                   {(panRes?.isLoading || panRes?.isFetching) ? <CircularProgress size={20} color="inherit" /> : `Verify Pan`}
//                 </Button>}
//               </Box>
//               {(panRes.isError || aadhaarRes.isError || isEmailError) && <Typography variant="body1">
//                 <span style={{ color: 'red' }}>
//                   {panRes?.error?.data?.message}  {aadhaarRes?.error?.data?.message}  {emailError?.data?.message}
//                 </span>
//               </Typography>}

//             </Box>
//           </AccordionDetails>
//         </Accordion>
//       </Box>
//     </>
//    );
// };

// export default VerifyContactDetails;


import React, { useEffect, useState } from 'react';
import { tokens } from "../../theme";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
  Typography,
  colors,
  useTheme
} from '@mui/material';
import Swal from 'sweetalert2';
import {
  useGetEmailOtpMutation,
  useLazyCheckDetailsQuery,
  useLazyGenerateAadhaarLinkQuery,
  useLazyGetPanDetailsQuery,
} from '../../Service/Query';
import { useNavigate, useParams } from 'react-router-dom';
import EmailVerification from './OtpVerification';
import PanCompare from './PanCompare';
import useAuthStore from '../store/authStore';
import AadhaarCompare from './AadhaarCompare';

const VerifyContactDetails = ({
  isMobileVerified,
  isEmailVerified,
  isAadhaarVerified,
  isAadhaarDetailsSaved,
  isPanVerified,
}) => {
  const { id } = useParams();
  const { activeRole } = useAuthStore();
  const navigate = useNavigate();

  // Color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State Management
  const [otp, setOtp] = useState(false);
  const [openAadhaarCompare, setOpenAadhaarCompare] = useState(false);
  const [aadhaarData, setAadhaarData] = useState();
  const [panModal, setPanModal] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  // API Hooks
  const [getEmailOtp, { isSuccess: emailOtpSuccess }] = useGetEmailOtpMutation();
  const [checkDetails, { data: aadhaarDetails, isSuccess: aadhaarDetailsSuccess, isLoading: aadhaarDetailsLoading, isFetching: isAadhaarDetailFetching }] = useLazyCheckDetailsQuery();
  const [getPanDetails, panRes] = useLazyGetPanDetailsQuery();
  const [sendAadhaarLink, aadhaarRes] = useLazyGenerateAadhaarLinkQuery();

  // Handlers
    const handlePanVerification = () => {
    getPanDetails(id);
  };

  const handleSendAadhaarLink = () => {
    sendAadhaarLink(id);
  };

  const handleAadhaarVerification = () => {
    checkDetails(id);
  };

  // Effects
  useEffect(() => {
    if (panRes?.isSuccess && panRes?.data && !panRes?.isFetching) {
      setPanModal(true);
    }
  }, [panRes?.data, panRes?.isSuccess, panRes?.isFetching]);

  useEffect(() => {
    if (emailOtpSuccess) {
      setOtp(true);
    }
  }, [emailOtpSuccess]);

  useEffect(() => {
    if (aadhaarRes?.isSuccess && aadhaarRes?.data && aadhaarRes?.isFetching) {
      navigate(`/lead-process`);
    }
    if (aadhaarDetails && aadhaarDetailsSuccess && !isAadhaarDetailFetching) {
      setOpenAadhaarCompare(true);
      setAadhaarData(aadhaarDetails?.data?.details);
    }
  }, [aadhaarRes, aadhaarDetails, aadhaarDetailsSuccess, isAadhaarDetailFetching, navigate]);

  // Table Data
  const verificationData = [
    {
      type: 'Aadhaar',
      status: isAadhaarVerified ? 'Verified' : 'Not Verified',
      action: (
        <Button
          variant="contained"
          onClick={handleAadhaarVerification}
          disabled={isAadhaarVerified}
          sx={{
            background:colors.white["whiteshade"],
            color: colors.primary["primaryshade"],
            border: colors.primary["primaryshade"],
            ":hover": {
              background: colors.primary["primaryshade"],
              color: colors.white["whiteshade"],
            }
          }}
        >
          Verify Aadhaar
        </Button>
      ),
    },
    {
      type: 'PAN',
      status: isPanVerified ? 'Verified' : 'Not Verified',
      action: (
        <Button
          variant="contained"
          onClick={handlePanVerification}
          disabled={isPanVerified}
          sx={{
            background:colors.white["whiteshade"],
            color: colors.primary["primaryshade"],
            border: colors.primary["primaryshade"],
            ":hover": {
              background: colors.primary["primaryshade"],
              color: colors.white["whiteshade"],
            }
          }}
        >
          Verify PAN
        </Button>
      ),
    },
  ];

  return (
    <Box
      sx={{
        boxShadow:"0px 0px 5px 5px rgba(0,0,0,0.1)",
        width:"100%",
        borderRadius:"5px",
        padding:"20px",
      }}
    >
      <Typography 
        variant="h4"
        sx={{
          display:"flex",
          justifyContent:"center",
          padding:"20px 0px",
          color:colors.primary["primaryshade"]
        }}
      >Verify Details
      </Typography>
      <TableContainer component={Paper} sx={{display:"flex", justifyContent:"center", boxShadow:"0px 0px 5px 1px rgba(0,0,0,0.1)"}} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Document Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {verificationData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.type}</TableCell>
                <TableCell><Typography sx={{color : row.status == 'Verified' ? `green` : 'red'}}>{row.status}</Typography></TableCell>
                <TableCell>{row.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {panModal && <PanCompare open={panModal} setOpen={setPanModal} />}
      {openAadhaarCompare && <AadhaarCompare open={openAadhaarCompare} setOpen={setOpenAadhaarCompare} aadhaarData={aadhaarData} />}
    </Box>
  );
};

export default VerifyContactDetails;