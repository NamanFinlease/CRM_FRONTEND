import React from 'react'
import { tokens } from '../theme';
import {Button, Box, useTheme } from '@mui/material';


const BarButtons = ({barButtonOptions,currentPage,setCurrentPage}) => {

  // Color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleBarButtons = status => setCurrentPage(status);
  return (
    <>
    <Box display="flex" flexWrap="wrap" justifyContent="center" mb={3}>
              {barButtonOptions?.map(status => (
                <Button
                  key={status}
                  variant="contained"
                //   color={status.toLowerCase() === currentPage.toLowerCase() ? "primary" : "success"}
                  onClick={() => handleBarButtons(status.toLowerCase())}
                  sx={{
                    margin: "10px 5px",
                    padding:"10px 10px",
                    backgroundColor: status.toLowerCase() === currentPage.toLowerCase() ? colors.primary["primaryshade"] : colors.white["whiteshade"], // Active: Indigo, Inactive: Green
                    border: status.toLowerCase() === currentPage.toLowerCase() ? `2px solid ${colors.primary["primaryshade"]}` : `2px solid ${colors.primary["primaryshade"]}`, // Active: Indigo, Inactive: Green
                    color: status.toLowerCase() === currentPage.toLowerCase() ? colors.white["whiteshade"] : colors.primary["primaryshade"], // Active: Indigo, Inactive: Green
                    borderRadius: '5px',
                    boxShadow: status.toLowerCase() === currentPage.toLowerCase() ? '0px 4px 20px rgba(63, 81, 181, 0.4)' : 'none', // Subtle shadow for active
                    transition: 'background-color 0.3s, box-shadow 0.3s', // Smooth transition
                    '&:hover': {
                      backgroundColor: status.toLowerCase() === currentPage.toLowerCase() ? colors.secondary["secondaryshade"] : colors.primary["primaryshade"], // Darker shade on hover
                      color : status.toLowerCase() === currentPage.toLowerCase() ? colors.white["whiteshade"] : colors.white["whiteshade"],
                      boxShadow: status.toLowerCase() === currentPage.toLowerCase() ? '0px 6px 24px rgba(63, 81, 181, 0.5)' : 'none',
                    },
                  }}
                >
                  {status}
                </Button>
              ))}
            </Box>
      
    </>
  )
}

export default BarButtons
