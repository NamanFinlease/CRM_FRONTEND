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
import { useAllocateLeadMutation, useFetchAllLeadsQuery } from '../../Service/Query';

const VisitRequest = ({ disburse }) => {
  const { applicationProfile } = useStore()
  const { activeRole } = useAuthStore()
  const [remarks, setRemarks] = useState(null);
  const [openRemark, setOpenRemark] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = () => {
    
  };

  // Color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', mt: 3, borderRadius: '5px', background:"#fff" }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color:colors.black["blackshade"]}} />}
                    aria-controls="visit-request-content"
                    id="visit-request-header"
                    sx={{
                        backgroundColor: colors.white["whiteshade"],
                        color: colors.primary["primaryshade"],
                        fontWeight: '600',
                        fontSize:'16px !important',
                        borderRadius: '5px',
                        boxShadow: '0px 0px 10px #d1d5db, -5px -5px 10px #ffffff'
                    }}
                >
                    <Typography>Request Field Visit</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ width: '100%',background: colors.white["whiteshade"] }}>
                        <form onSubmit={handleSubmit}>
                            <div className="search-form-wrapper">
                                <div className="search-form-part-1"> 
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="visitId"
                                            name="visitId"
                                            // value={formValues.name}
                                            placeholder='Visit ID'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="visitType"
                                            name="visitType"
                                            // value={formValues.leadId}
                                            placeholder='Visit Type'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="visitRequestedBy"
                                            name="visitRequestedBy"
                                            // value={formValues.applicationNo}
                                            placeholder='Visit Requested By'
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="visitRequestedOn"
                                            name="visitRequestedOn"
                                            // value={formValues.pan}
                                            placeholder='Visit Requested On'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="visitRequestedRemarks"
                                            name="visitRequestedRemarks"
                                            // value={formValues.cif}
                                            placeholder='Visit Requested Remarks'
                                        />
                                    </div>
                                </div>
                                <div className='search-button'>
                                    <button 
                                        type="submit" 
                                        style={{
                                            background:colors.primary["primaryshade"],
                                            color:colors.white["whiteshade"],
                                            fontWeight:600,
                                            borderRadius:"5px",
                                            border:`2px solid ${colors.primary["primaryshade"]}`,
                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    </>
  );
};

export default VisitRequest;