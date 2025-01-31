import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Swal from 'sweetalert2';
import { useGetEmailOtpMutation, useLazyAadhaarOtpQuery, useLazyCheckDetailsQuery, useLazyGenerateAadhaarLinkQuery, useLazyGetPanDetailsQuery } from '../../Service/Query';
import { useNavigate, useParams } from 'react-router-dom';
import EmailVerification from './OtpVerification';
import PanCompare from './PanCompare';
import useAuthStore from '../store/authStore';
import AadhaarCompare from './AadhaarCompare';
import useStore from '../../Store';

const VerifyContactDetails = ({ isMobileVerified, isEmailVerified, isAadhaarVerified,isAadhaarDetailsSaved, isPanVerified }) => {
  const { id } = useParams()
  const {lead} = useStore()
  const {setCodeVerifier,setFwdp,activeRole} = useAuthStore()
  const navigate = useNavigate()
  const [otp, setOtp] = useState(false)
  const [openAadhaarCompare,setOpenAadhaarCompare] = useState(false)
  const [aadhaarData,setAadhaarData] = useState()
  const [otpAadhaar, setOtpAadhaar] = useState(false)
  const [panModal, setPanModal] = useState(false)
  const [otpPan, setOtpPan] = useState(false)
  const [mobileVerified, setMobileVerified] = useState(false);

  const [getEmailOtp, { data: emailOtp, isSuccess: emailOtpSuccess, isError: isEmailError, error: emailError }] = useGetEmailOtpMutation()
  const [checkDetails, { data: aadhaarDetails, isSuccess: aadhaarDetailsSuccess,isLoading:aadhaarDetailsLoading, isError: isAadhaarDetailError, error: aadhaarDetailsError,isFetching:isAadhaarDetailFetching }] = useLazyCheckDetailsQuery()
  const [getPanDetails, panRes] = useLazyGetPanDetailsQuery()
  const [sendAadhaarLink, aadhaarRes] = useLazyGenerateAadhaarLinkQuery()

  const handleMobileVerification = () => {
    // Logic for mobile verification
    setMobileVerified(true);
    Swal.fire({
      title: 'Mobile Verified!',
      icon: 'success',
    });
  };


  const handleEmailVerification = () => {
    getEmailOtp(id)
  };
  const handlePanVerification = () => {
    getPanDetails(id)
  }
  const handleSendAadhaarLink = () => {
    sendAadhaarLink(id)
  }

  const handleAadhaarVerification = () => {
    checkDetails(id)

  }

  useEffect(() => {
    if (panRes?.isSuccess && panRes?.data && !panRes?.isFetching) {
      setPanModal(true)

    }
  }, [panRes?.data, panRes?.isSuccess, panRes?.isFetching])

  useEffect(() => {
    if (emailOtpSuccess) {
      setOtp(true)
    }
  }, [emailOtp, emailOtpSuccess])
  useEffect(() => {
    if (aadhaarRes?.isSuccess && aadhaarRes?.data && !aadhaarRes?.isFetching) {
      navigate(`/lead-process`)
    }
    if (aadhaarDetails && aadhaarDetailsSuccess && !isAadhaarDetailFetching) {
      setOpenAadhaarCompare(true)
      setAadhaarData(aadhaarDetails?.data?.details)

    }
  }, [aadhaarRes,aadhaarDetails,aadhaarDetailsSuccess,isAadhaarDetailFetching])






  return (
    <>
    {openAadhaarCompare && <AadhaarCompare open={openAadhaarCompare} setOpen={setOpenAadhaarCompare} aadhaarDetails={aadhaarData} lead={lead} />}
    {/* {otp && <EmailVerification open={otp} setOpen={setOtp} />} */}
      {panModal && <PanCompare open={panModal} setOpen={setPanModal} panDetails={panRes?.data?.data} />}
      <Box sx={{ maxWidth: 700, margin: '0 auto', mt: 4 }}>
        {/* Single Accordion for Mobile and Email Verification */}
        <Accordion sx={{ borderRadius: '15px', boxShadow: 3 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              backgroundColor: '#0366fc',
              borderRadius: '5px',
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#0056b3' }
            }}
          >
            <Typography variant="h6">Documents Verification</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: '#f5f5f5', borderRadius: '15px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              {/* Mobile Verification Section */}
              {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" sx={{ color: '#898b8c' }}>


                  Mobile:<span style={{ color: isMobileVerified ? 'green' : 'red' }}> {isMobileVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleMobileVerification}
                  sx={{
                    backgroundColor: isMobileVerified ? '#ccc' : '#4caf50',
                    '&:hover': { backgroundColor: isMobileVerified ? '#ccc' : '#388e3c' },
                    transition: 'background-color 0.3s'
                  }}
                  disabled={isMobileVerified}
                >
                  Verify Mobile
                </Button>
              </Box> */}

              {/* Email Verification Section */}
              {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" sx={{ color: '#898b8c', }}>
                  Email:
                  <span style={{ color: isEmailVerified ? 'green' : 'red' }}>
                    {isEmailVerified ? ' Verified' : ' Not Verified'}
                  </span>
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleEmailVerification}
                  sx={{
                    backgroundColor: isEmailVerified ? '#ccc' : '#4caf50',
                    '&:hover': { backgroundColor: isEmailVerified ? '#ccc' : '#388e3c' },
                    transition: 'background-color 0.3s'
                  }}
                  disabled={isEmailVerified} // Disable button if already verified
                >
                  Verify Email
                </Button>
              </Box> */}
              {/* Aadhaar Verification Section */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" sx={{ color: '#898b8c' }}>
                  Adhaar:
                  <span style={{ color: isAadhaarVerified ? 'green' : 'red' }}>
                    {isAadhaarVerified ? ' Verified' : ' Not Verified'}
                  </span>
                </Typography>

                {(activeRole === "screener" && !isAadhaarVerified ) && 
                <>
                {
                  isAadhaarDetailsSaved ? 
                <Button
                  // variant="contained" 
                  onClick={handleAadhaarVerification}
                  sx={{
                    backgroundColor: (aadhaarDetailsLoading || isAadhaarDetailFetching) ? "#ccc" : "#1F2A40",
                    color: (aadhaarDetailsLoading || isAadhaarDetailFetching) ? "#666" : "white",
                    cursor: (aadhaarDetailsLoading || isAadhaarDetailFetching) ? "not-allowed" : "pointer",
                    "&:hover": {
                        backgroundColor: (aadhaarDetailsLoading || isAadhaarDetailFetching) ? "#ccc" : "#3F4E64",
                    },
                }}
                  disabled={isAadhaarVerified}
                >
                  {(aadhaarDetailsLoading || isAadhaarDetailFetching) ? <CircularProgress size={20} color="inherit" /> : `Verify Aadhaar`}
                </Button>
                :
                <Button
                  // variant="contained" 
                  onClick={handleSendAadhaarLink}
                  sx={{
                    backgroundColor: (aadhaarRes.isLoading || aadhaarRes?.isFetching) ? "#ccc" : "#1F2A40",
                    color: (aadhaarRes.isLoading || aadhaarRes?.isFetching) ? "#666" : "white",
                    cursor: (aadhaarRes.isLoading || aadhaarRes?.isFetching) ? "not-allowed" : "pointer",
                    "&:hover": {
                        backgroundColor: (aadhaarRes.isLoading || aadhaarRes?.isFetching) ? "#ccc" : "#3F4E64",
                    },
                }}
                  disabled={isAadhaarVerified}
                >
                  {(aadhaarRes.isLoading || aadhaarRes?.isFetching) ? <CircularProgress size={20} color="inherit" /> : `Send Link`}
                </Button>
                }
                </>
                }
              </Box>


              {/* Pan Verification Section */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" sx={{ color: '#898b8c' }}>
                  Pan:
                  <span style={{ color: isPanVerified ? 'green' : 'red' }}>
                    {isPanVerified ? ' Verified' : ' Not Verified'}
                  </span>
                </Typography>


                {(activeRole === "screener" && !isPanVerified) && <Button
                  // variant="contained"
                  onClick={handlePanVerification}
                  sx={{
                    backgroundColor: panRes?.isLoading ? "#ccc" : "#1F2A40",
                    color: panRes?.isLoading ? "#666" : "white",
                    cursor: panRes?.isLoading ? "not-allowed" : "pointer",
                    "&:hover": {
                        backgroundColor: panRes?.isLoading ? "#ccc" : "#3F4E64",
                    },
                }}
                  disabled={panRes?.isLoading}
                >
                  {(panRes?.isLoading || panRes?.isFetching) ? <CircularProgress size={20} color="inherit" /> : `Verify Pan`}
                </Button>}
              </Box>
              {(panRes.isError || aadhaarRes.isError || isEmailError) && <Typography variant="body1">
                <span style={{ color: 'red' }}>
                  {panRes?.error?.data?.message}  {aadhaarRes?.error?.data?.message}  {emailError?.data?.message}
                </span>
              </Typography>}

            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
   );
};

export default VerifyContactDetails;
