import React, { useEffect, useState } from 'react';
import { tokens } from '../theme';
import { DataGrid } from '@mui/x-data-grid';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Alert,
    useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useApplicationLogsQuery } from '../Service/Query';
import { formatDateTime } from '../utils/helper';
import CommonTable from './CommonTable';

const columns = [
    { field: 'sr', headerName: '#', width: 50 },
    { field: 'borrower', headerName: 'Borrower', width: 150 },
    { field: 'logDate', headerName: 'Log Date', width: 150 },
    { field: 'status', headerName: 'Action', width: 200 },
    { field: 'leadRemark', headerName: 'Lead Remark', width: 300 },
    { field: 'reason', headerName: 'Reason', width: 250 },
];

const ApplicationLogHistory = ({ id }) => {

    const [applicationLog, setApplicationLog] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const { data, isSuccess, isError, error } = useApplicationLogsQuery(id);

    useEffect(() => {
        if (isSuccess) {
            setApplicationLog(data || []);
        }
    }, [isSuccess, data]);

    const rows = applicationLog.map((log, index) => ({
        id: log._id,
        sr: index + 1,
        borrower: log?.borrower,
        logDate: formatDateTime(log?.logDate),
        status: log?.status,
        leadRemark: log?.leadRemark,
        reason: log?.reason,
    }));

    const handlePageChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel);
    };

    // Color theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{ maxWidth: '700px', margin: '0 auto', mt: 3 }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="application-log-content"
                    id="application-log-header"
                    sx={{
                        backgroundColor: colors.white["whiteshade"],
                        color: colors.primary["primaryshade"],
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        boxShadow:'0px 0px 5px 1px rgba(0,0,0,0.1)',
                    }}
                >
                    <Typography>Application Log</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ height: 500, width: '100%', }}>
                        
                        <CommonTable    
                            columns={columns}
                            rows={rows}
                            // rowCount={data?.relatedLeads.length}
                            paginationModel={ paginationModel}
                            onPageChange={handlePageChange}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
            {isError &&
                <Alert severity="error" sx={{ borderRadius: '8px', mt: 2 }}>
                    {error?.data?.message}
                </Alert>
            }
        </Box>
    );
};

export default ApplicationLogHistory;
