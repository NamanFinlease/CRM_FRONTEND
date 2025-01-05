import React, { useEffect, useRef, useState } from 'react';
import { tokens } from '../theme';
import {
    Typography,
    Button,
    Box,
    IconButton,
    Checkbox,
    TextField,
    CircularProgress,
    Tooltip,
    useTheme
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useUploadDocumentsMutation } from '../Service/Query';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuthStore from './store/authStore';
import DocumentsTable from './documentsTable';

const UploadDocuments = ({ leadData }) => {

    const { id } = useParams();
    const fileInputRef = useRef()
    const { empInfo } = useAuthStore();
    const [uploadedDocs, setUploadedDocs] = useState()
    const [selectedDocuments, setSelectedDocuments] = useState([])
    const [selectedDocType, setSelectedDocType] = useState(null);
    const [fileInputs, setFileInputs] = useState([{ file: null, remarks: '' }]);
    const [documents, setDocuments] = useState({
        aadhaarFront: null,
        aadhaarBack: null,
        panCard: null,
        salarySlip: [],
        bankStatement: [],
    });
    const [uploadDocuments, { data, isSuccess: docSuccess, isLoading, isError: isDocError, error: docError }] = useUploadDocumentsMutation();

    // Handle file selection
    const handleFileChange = (index, event) => {
        const selectedFile = event.target.files[0];
        event.target.value = null;
        setFileInputs((prevFileInputs) => {
            const newFileInputs = [...prevFileInputs];
            newFileInputs[index].file = selectedFile;
            return newFileInputs;
        });
        setSelectedDocuments((prevFileInputs) => ({
            ...prevFileInputs,
            file: selectedFile,
        }));

    };

    // Color theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Handle remarks input
    const handleRemarksChange = (index, event) => {
        const { value } = event.target;
        setFileInputs((prevFileInputs) => {
            const newFileInputs = [...prevFileInputs];
            newFileInputs[index].remarks = value;
            return newFileInputs;
        });
        setSelectedDocuments((prevFileInputs) => ({
            ...prevFileInputs,
            remarks: value,
        }));
    };

    // Add new file input
    const handleAddFileInput = () => {
        const lastInput = fileInputs[fileInputs.length - 1];
        if (!lastInput || !lastInput.file) {
            Swal.fire('Warning!', 'Please select a file for the current input before adding a new one.', 'warning');
            return;
        }
        setFileInputs([...fileInputs, { file: null, remarks: '' }]);
    };

    // Remove file input
    const handleRemoveFileInput = (index) => {
        const updatedInputs = fileInputs.filter((_, i) => i !== index);
        setFileInputs(updatedInputs);
    };



    const handleSubmit = async () => {
        const hasFileSelected = fileInputs.some((input) => input.file);

        if (!hasFileSelected) {
            Swal.fire('Warning!', 'Please select at least one file to upload.', 'warning');
            return;
        }

        const formData = new FormData();

        // Prepare data to be sent to the FormData
        fileInputs.forEach((input, index) => {
            if (input.file) {
                formData.append(`${selectedDocType}`, input.file); // Append file to formData
                formData.append(`remarks`, input.remarks); // Append remarks to formData
            }
        });

        try {
            // Call the mutation to upload the documents with formData
            await uploadDocuments({ id: leadData._id, docsData: formData }).unwrap();
            Swal.fire('Success!', 'Documents uploaded successfully!', 'success');

            // Reset state after successful upload
            setDocuments({
                aadhaarFront: null,
                aadhaarBack: null,
                panCard: null,
                salarySlip: [],
                bankStatement: [],
            });
            setFileInputs([{ file: null, remarks: '' }]); // Reset file inputs
            setSelectedDocType(null)

        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error?.data?.message,
                icon: "error",
                customClass: {
                  popup: 'custom-swal-popup',
                  title: 'custom-swal-title',
                  htmlContainer: 'custom-swal-content',
                  confirmButton: 'custom-swal-button'
                },
                willOpen: (popup) => {
                  popup.style.color = "#721c24"; // Dark red text
                  popup.style.borderRadius = "8px"; // Rounded corners
                  popup.style.fontFamily = "Arial, sans-serif"; // Font style
                },
                didRender: () => {
                  document.querySelector('.custom-swal-title').style.fontSize = "1.5rem";
                  document.querySelector('.custom-swal-title').style.color = "#721c24";
              
                  document.querySelector('.custom-swal-content').style.fontSize = "1rem";
                  document.querySelector('.custom-swal-content').style.color = "#f71945";
              
                  const confirmButton = document.querySelector('.custom-swal-button');
                  confirmButton.style.backgroundColor = "#f56481";
                  confirmButton.style.border = "none";
                  confirmButton.style.padding = "10px 20px";
                  confirmButton.style.fontSize = "1rem";
                  confirmButton.style.borderRadius = "5px";
                  confirmButton.style.cursor = "pointer";
              
                }
              });
              
            console.error('Upload error:', error); // Log error for debugging
        }
    };


    useEffect(() => {
        if (docSuccess) {
            Swal.fire({
                title: 'Documents uploaded successfully!',
                icon: 'success',
            });
        }
    }, [docSuccess]);
    useEffect(() => {
        if (leadData?.documents?.document && Object.keys(leadData?.documents?.document)) {
            const merged = [
                ...leadData?.documents?.document?.multipleDocuments?.salarySlip,
                ...leadData?.documents?.document?.multipleDocuments?.bankStatement,
                ...leadData?.documents?.document?.multipleDocuments?.others,
                ...leadData?.documents?.document?.singleDocuments
            ];
            setUploadedDocs(merged)
        }
    }, [leadData]);




    return (
        <Box sx={{ maxWidth: '1000px', margin: '0 auto', mt: 3, p: 3, background: colors.white["whiteshade"] , borderRadius: 2 }}>
            <Box sx={{boxShadow:`0px 0px 5px 1px ${colors.primary["primaryshade"]}`, padding:"10px 15px", borderRadius:2, }}>

                <Typography variant="h6" style={{ fontWeight: '600', color: colors.black["blackshade"], mb: 2 }}>
                    Upload Documents
                </Typography>

                <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                        {['aadhaarFront', 'aadhaarBack', 'panCard', 'salarySlip', 'bankStatement', 'others'].map((key) => (
                            <Box key={key} display="flex" alignItems="center" gap={1}>
                                <Checkbox
                                    checked={selectedDocType === key}
                                    onChange={(e) => {
                                        setSelectedDocType(null);
                                        setFileInputs([{ file: null, remarks: '' }]);

                                        if (e.target.checked) {
                                            setSelectedDocType(key);
                                        }
                                    }}
                                    sx={{ color: colors.primary["primaryshade"], }}
                                />
                                <Typography variant="subtitle2" style={{ fontWeight: '600', color: colors.black["blackshade"], fontSize: '14px' }}>
                                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {selectedDocType && (
                        <>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {fileInputs.map((input, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            p: 2,
                                            borderRadius: 2,
                                            backgroundColor: '#f9f9f9',
                                            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
                                        }}
                                    >
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            // onClick={() => fileInputRef.current.click()}
                                            sx={{
                                                minWidth: 120,
                                                borderColor: colors.primary["primaryshade"],
                                                color: colors.primary["primaryshade"],
                                                '&:hover': {
                                                    backgroundColor: colors.primary["primaryshade"],
                                                    color: colors.white["whiteshade"],
                                                },
                                            }}
                                        >
                                            Choose File
                                            <input
                                                type="file"
                                                // ref={fileInputRef}
                                                hidden
                                                onChange={(event) => handleFileChange(index, event)}
                                            />
                                        </Button>

                                        {/* Remarks Input */}
                                        <TextField
                                            label="Remarks"
                                            value={input.remarks}
                                            onChange={(event) => handleRemarksChange(index, event)}
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                flex: 1,
                                                '& .MuiInputBase-input': { color: colors.black["blackshade"] },
                                                '& .MuiInputLabel-root': { color: colors.black["blackshade"] },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': { borderColor: '#000' },
                                                    '&:hover fieldset': { borderColor: '#e38710' },
                                                },
                                            }}
                                        />

                                        {/* View Button */}
                                        {input.file && (
                                            <IconButton
                                                color="primary"
                                                component="a"
                                                href={URL.createObjectURL(input.file)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{ color: '#007bff' }}
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                        )}

                                        {/* Remove File Button */}
                                        {index > 0 && <IconButton
                                            color="secondary"
                                            onClick={() => handleRemoveFileInput(index)}
                                            sx={{ color: '#ff4d4f' }}
                                        >
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>}

                                        {/* Add New Input Button */}
                                        {(
                                            index === fileInputs.length - 1 &&
                                            !["aadhaarFront", "aadhaarBack", "panCard"].includes(selectedDocType)) &&
                                            fileInputs[fileInputs.length - 1].file &&
                                            (
                                                <IconButton
                                                    color="primary"
                                                    onClick={handleAddFileInput}
                                                    sx={{
                                                        backgroundColor: '#007bff',
                                                        color: 'white',
                                                        '&:hover': {
                                                            backgroundColor: '#0056b3',
                                                        },
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            )}
                                    </Box>
                                ))}
                            </Box>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        // variant="contained"
                                        sx={{
                                            backgroundColor: isLoading ? "#ccc" : colors.white["whiteshade"],
                                            color: isLoading ? "#666" : colors.primary["primaryshade"],
                                            cursor: isLoading ? "not-allowed" : "pointer",
                                            border: `2px solid ${colors.primary["primaryshade"]}`,
                                            "&:hover": {
                                                backgroundColor: isLoading ? "#ccc" : colors.primary["primaryshade"],
                                                color : isLoading ? "ccc" : colors.white["whiteshade"]
                                            },
                                        }}
                                    >
                                        {isLoading ? <CircularProgress size={20} color="inherit" /> : "Submit"}
                                    </Button>
                        </>
                    )}
                </Box>
            </Box>


            {
                uploadedDocs && uploadedDocs.length > 0 &&
                <DocumentsTable
                    leadData={leadData}
                    uploadedDocs={uploadedDocs}
                />
            }
        </Box>
    );
};

export default UploadDocuments;
