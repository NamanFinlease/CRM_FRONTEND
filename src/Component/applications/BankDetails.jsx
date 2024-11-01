import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button,
    Paper,
    Divider,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Box,
    Alert,
    MenuItem,
    InputLabel,
    Select,
    FormControl
} from '@mui/material';
import { useAddBankMutation, useGetBankDetailsQuery } from '../../queries/applicationQueries';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import useStore from '../../Store';
import useAuthStore from '../store/authStore';
import Swal from 'sweetalert2';

const BankDetails = ({ id }) => {
    const { applicationProfile } = useStore()
    const { empInfo,activeRole } = useAuthStore()
    const [bankDetails, setBankDetails] = useState(null)
    const [isAddingBank, setIsAddingBank] = useState(false);

    const bankRes = useGetBankDetailsQuery(id, { skip: id === null })
    const [addBank, addBankRes] = useAddBankMutation();

    // React Hook Form setup
    const { handleSubmit, control, reset,formState: { errors }  } = useForm();

    // Handle form submission
    const onSubmit = (data) => {
        console.log('data',data)
        addBank({ id, data });

    };

    const handleOpenForm = () => {
        setIsAddingBank(true)
        reset(bankDetails)
    }

    useEffect(() => {
        if (bankRes.isSuccess) {
            setBankDetails(bankRes?.data)
            // reset(bankRes.data[1])

        }

    }, [bankRes.isSuccess, bankRes.data])
    useEffect(() => {
        if (addBankRes.isSuccess && addBankRes.data) {
            setIsAddingBank(false);
            reset();
            Swal.fire({
                text: "Bank Details added successfully!",
                icon: "success"
            });

        }

    }, [addBankRes.data])

    return (
        <Paper elevation={3} style={{ padding: '10px', marginTop: '20px', borderRadius: '10px' }}>
            {(isAddingBank || !(bankDetails && Object.keys(bankDetails).length > 0)) ? (
                <>
                    <Typography variant="h6" gutterBottom>
                        Add Bank Details
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                <Controller
                                    name="bankName"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <TextField label="Bank Name" fullWidth {...field} />
                                        )
                                    }}
                                />
                                <Controller
                                    name="branchName"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField label="Branch Name" fullWidth {...field} />
                                    )}
                                />
                            </Box>
                            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                <Controller
                                    name="bankAccNo"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField label="Bank Account Number" fullWidth {...field} />
                                    )}
                                />
                                <Controller
                                    name="ifscCode"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField label="IFSC Code" fullWidth {...field} />
                                    )}
                                />
                            </Box>
                            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                {/* Beneficiary Name Input */}
                                <Controller
                                    name="beneficiaryName"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField label="Beneficiary Name" fullWidth {...field} />
                                    )}
                                />

                                {/* Account Type Dropdown */}
                                <Controller
                                    name="accountType"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl
                                            fullWidth
                                            variant="standard"
                                            // error={!!errors.reference2?.relation}
                                        >
                                            <InputLabel>Select Account Type</InputLabel>
                                            <Select
                                                {...field}
                                                label="Account Type"
                                            >
                                                {/* <MenuItem value="">Select Account Type</MenuItem> */}
                                                <MenuItem value="savings">Savings</MenuItem>
                                                <MenuItem value="current">Current</MenuItem>
                                            </Select>
                                            {/* <FormHelperText>{errors.reference2?.relation?.message}</FormHelperText> */}
                                        </FormControl>
                                    )}
                                />
                            </Box>

                        </Box>

                        <Box display="flex" justifyContent="flex-end" marginTop="20px">
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ marginRight: '10px' }}
                                onClick={() => setIsAddingBank(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{ marginRight: '10px' }}
                            >
                                Save
                            </Button>

                        </Box>
                    </form>
                    {addBankRes.isError &&
                        <Alert severity="error" sx={{ borderRadius: '8px', mt: 2 }}>
                            {addBankRes?.error?.data?.message}
                        </Alert>
                    }
                </>

            ) : (
                <>
                    <Typography variant="h6" gutterBottom>
                        Bank Details
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>Bank Name:</strong></TableCell>
                                    <TableCell>{bankDetails?.bankName}</TableCell>
                                    <TableCell><strong>Branch Name:</strong></TableCell>
                                    <TableCell>{bankDetails?.branchName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Bank Account Number:</strong></TableCell>
                                    <TableCell>{bankDetails?.bankAccNo}</TableCell>
                                    <TableCell><strong>IFSC Code:</strong></TableCell>
                                    <TableCell>{bankDetails?.ifscCode}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Beneficiary Name:</strong></TableCell>
                                    <TableCell>{bankDetails?.beneficiaryName}</TableCell>
                                    <TableCell><strong>Account Type:</strong></TableCell>
                                    <TableCell>{bankDetails?.accountType}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {(activeRole !== "sanctionHead" && activeRole !== "admin") && <Box display="flex" justifyContent="flex-end" marginTop="20px">
                        <Button
                            variant="outlined"
                            onClick={handleOpenForm}
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                padding: '10px 20px',
                                '&:hover': {
                                    backgroundColor: 'darkPrimary',
                                },
                            }}
                        >
                            {bankDetails ? "Edit" : "Add Bank"}
                        </Button>
                    </Box>}
                </>


            )}

            <Divider style={{ margin: '30px 0' }} />
            {bankRes.isError &&
                <Alert severity="error" sx={{ borderRadius: '8px', mt: 2 }}>
                    {bankRes?.error?.data?.message}
                </Alert>
            }
        </Paper>
    );
};

export default BankDetails;
