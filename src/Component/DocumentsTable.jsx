import React, { useEffect } from 'react';
import { tokens } from '../theme';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Button, Box, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLazyGetLeadDocsQuery } from '../Service/Query';
import Swal from 'sweetalert2';

const DocumentsTable = ({ leadData,uploadedDocs }) => {


    const [getLeadDocs,{data,isSuccess,isError,error}] = useLazyGetLeadDocsQuery();

    // Color theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const viewFile = (doc) => {
        let docType = ''
        if(doc.type){
            docType = doc.type
        }else{
            docType = doc.url.split("/")[1]
        }

        getLeadDocs({id:leadData._id,docType,docId:doc._id})

    }

    useEffect(() => {
        if(isSuccess && data){
            const fileUrl = data?.url;
        window.open(fileUrl, '_blank', 'noopener,noreferrer');


        }

    },[isSuccess,data])
    return (
        <TableContainer 
            component={Box} 
            sx={{ 
                marginTop: 6, 
                borderRadius: '8px', 
                border: `1px solid ${colors.primary["primaryshade"]}`, 
                overflow: 'hidden' 
                }}
        >
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: colors.primary["primaryshade"], color: colors.white["whiteshade"] }}>
                            <TableCell sx={{ color: colors.white["whiteshade"], fontWeight: 'bold' }}>S.N</TableCell>
                            <TableCell sx={{ color: colors.white["whiteshade"], fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ color: colors.white["whiteshade"], fontWeight: 'bold' }}>Remark</TableCell>
                            <TableCell sx={{ color: colors.white["whiteshade"], fontWeight: 'bold' }}>View</TableCell>
                            {/* <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uploadedDocs?.map((doc,index) => (
                            <TableRow key={doc?._id}>
                                <TableCell sx={{ color: colors.black["blackshade"]}}>{index + 1}</TableCell>
                                <TableCell sx={{ color: colors.black["blackshade"]}}>{doc?.name}</TableCell>
                                <TableCell sx={{ color: colors.black["blackshade"]}}>{doc?.remarks}</TableCell>
                                <TableCell >
                                    {/* <IconButton sx={{ color: '#454443'}} onClick={() => handleDownload(doc)}>
                                        <VisibilityIcon />
                                    </IconButton> */}
                                    <IconButton
                                            color="primary"
                                            component="a"
                                            onClick={() => viewFile(doc)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ color: colors.primary["primaryshade"] }}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    );
};

export default DocumentsTable;
