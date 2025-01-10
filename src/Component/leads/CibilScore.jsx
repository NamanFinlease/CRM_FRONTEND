import React, { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import { styled, ThemeProvider } from '@mui/system';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, Paper, Tooltip, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PreviewIcon from '@mui/icons-material/Preview';
import Swal from 'sweetalert2';
import { useLazyFetchCibilScoreQuery, useLazyGetLeadDocsQuery } from '../../Service/Query';
import { useParams } from 'react-router-dom';

const CibilScore = ({ id }) => {

  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [fetchCibilScore, cibilRes] = useLazyFetchCibilScoreQuery()
  const [getLeadDocs, { data: docsData, isSuccess: docsSuccess, isError: isDocsError, error: docsError }] = useLazyGetLeadDocsQuery();

  // Color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const accordionStyles = {
    borderRadius: '5px',
    background: colors.white["whiteshade"],
    boxShadow: '0px 0px 10px #d1d5db, -5px -5px 10px #ffffff',
    marginBottom: '20px',
    '&:hover': {
      boxShadow: '0px 0px 15px #a1a5ab, -5px -5px 15px #ffffff', // Adjust the shadow for hover effect
      transform: 'scale(1.01)', // Slightly scale up the accordion on hover
      transition: 'all 0.3s ease', // Smooth transition for the hover effect
  },
  };
 
  const paperStyles = {
    padding: '20px',
    borderRadius: '5px',
    border:`1px solid ${colors.primary["primaryshade"]}`,
    backgroundColor: colors.white["whiteshade"],
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0px 0px 15px #a1a5ab, -5px -5px 15px #ffffff', // Adjust the shadow for hover effect
      transform: 'scale(1.01)', // Slightly scale up the accordion on hover
      transition: 'all 0.3s ease', // Smooth transition for the hover effect
  },
  };

  // Placeholder function for fetching CIBIL score
  const submitCibil = async () => {
    // setLoading(true);
    fetchCibilScore(id)
    // setError('');

  };

  const viewFile = (docType) => {
    // setSelectedFileType(docType);
    console.log('cibil report', docType)
    getLeadDocs({ id, docType });
  };

  useEffect(() => {
    console.log('use fect')
    if (docsSuccess) {
      const fileUrl = docsData?.url;
      const mimeType = docsData?.mimeType?.split('/').pop().toLowerCase();

      if (['jpg', 'jpeg', 'png'].includes(mimeType)) {
        Swal.fire({
          title: 'Document retrieved successfully!',
          html: `<img src="${fileUrl}" alt="${docsData?.type}" width="400" />`,
          showCloseButton: true,
        });
      } else if (['pdf'].includes(mimeType)) {
        Swal.fire({
          html: `<iframe src="${fileUrl}" width="100%"  style="border: none; padding:15px; overflow-y:hidden; height: 100vh;"></iframe>`,  // Set iframe to 100vh
          showCloseButton: true,
          showConfirmButton: false,
          width: '100vw',  // Full width (viewport width)
          heightAuto: false,  // Manually handle height to avoid auto height adjustment
          willOpen: () => {
            // Adding inline styles using JS
            const swalContainer = Swal.getPopup();
            swalContainer.style.setProperty('overflow', 'hidden', 'important');
          },
          allowOutsideClick: false,  // Prevent closing by clicking outside the popup
        });


      } else if (['mp4', 'avi', 'mov'].includes(mimeType)) {
        Swal.fire({
          title: 'Document retrieved successfully!',
          html: `<video width="800" controls><source src="${fileUrl}" type="video/${mimeType}">Your browser does not support the video tag.</video>`,
          showCloseButton: true,
        });
      }
    }
  }, [docsData]);



  return (
    <Box sx={{ maxWidth: '700px', margin: '0 auto', mt: 3 }}>
        <Accordion style={accordionStyles}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: colors.black["blackshade"] }} />}>
            <Typography variant="h6" style={{ fontWeight: '600', color: colors.primary["primaryshade"], fontSize:'16px' }}>Fetch Credit Report </Typography>
          </AccordionSummary>
          <AccordionDetails >
            <Paper elevation={3} style={paperStyles}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Button
                  variant="contained"
                  onClick={submitCibil}
                  disabled={loading}
                  sx={{
                      borderRadius: '5px',
                      padding: '10px 20px',
                      fontWeight:'700',
                      background: colors.white["whiteshade"],
                      color: colors.black["blackshade"],
                      '&:hover': {
                        background: colors.primary["primaryshade"],
                        color: colors.white["whiteshade"],
                      }
                  }}
                >
                  {cibilRes?.isLoading ? 'Fetching...' : 'Fetch Credit Score'}
                </Button>

                <Box textAlign="right" display="flex" alignItems="center">
                  {cibilRes?.isError && (
                    <Typography color="error" variant="body1" mt={1}>
                      {cibilRes?.error?.data?.message}
                    </Typography>
                  )}
                  {cibilRes?.data?.value && (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        borderRadius: 2,
                        boxShadow: 3,
                        bgcolor: '#f9f9f9',
                        border: '1px solid #ddd',
                        p: 1
                      }}
                    >
                      {/* CIBIL Score Section */}
                      <Box
                        sx={{
                          background: colors.primary["primaryshade"], // Light green background for CIBIL score
                          borderRadius: 1,
                          px: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 500,
                            fontSize: '18px',
                            color: colors.white["whiteshade"],
                          }}
                        >
                          Credit Score: {cibilRes?.data?.value}
                        </Typography>
                      </Box>

                      {/* Preview Icon Section */}
                      <Box
                        component="button"
                        onClick={() => viewFile("cibilReport")}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: '#0a8001', // Dark green background for the button
                          color: colors.white["whiteshade"], // Icon color
                          border: 'none',
                          borderRadius: 1,
                          ml: 2,
                          width: 30,
                          height: 30,
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease', // Smooth background transition
                          '&:hover': {
                            bgcolor: '#086c01', // Darker green on hover
                          },
                        }}
                      >
                        <Tooltip title="Credit Report">

                          <PreviewIcon
                            sx={{
                              fontSize: '22px', // Icon size
                            }}
                          />
                        </Tooltip>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>

            </Paper>
          </AccordionDetails>
        </Accordion>
    </Box>
  );
};

export default CibilScore;
