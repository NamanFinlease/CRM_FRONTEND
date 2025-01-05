import React, { useEffect, useState } from 'react';
import { Typography, Button, Accordion, AccordionSummary, AccordionDetails, Paper, Divider, TextField, Box, Alert, Select, MenuItem, FormControl, InputLabel, FormHelperText, TableContainer, TableBody, TableRow, TableCell, Table, CircularProgress, useTheme } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useUpdatePersonalDetailsMutation } from '../../Service/applicationQueries';
import useStore from '../../Store';
import { yupResolver } from '@hookform/resolvers/yup';
import { referenceSchema } from '../../utils/validations';
import useAuthStore from '../store/authStore';
import { tokens } from '../../theme'

const Reference = ({ reference }) => {
  const { applicationProfile } = useStore();
  const { empInfo, activeRole } = useAuthStore()
  const [openEdit, setOpenEdit] = useState(false)
  const id = applicationProfile._id;
  const [referenceDetails, setReferenceDetails] = useState()

  // const defaultValues = {

  // }

  // Color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const accordionStyles = {
    borderRadius: '5px',
    background: colors.white["whiteshade"],
    boxShadow: '0px 0px 15px rgb(0,0,0,0.1)',
    marginBottom: '20px'
  };
  
  const paperStyles = {
    padding: '30px',
    borderRadius: '15px',
    border:`2px solid ${colors.primary["primaryshade"]}`,
    backgroundColor: colors.white["whiteshade"],
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
  };

  const [updatePersonalDetails, { data, isSuccess, isLoading, isError, error }] = useUpdatePersonalDetailsMutation();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(referenceSchema)
  });

  const onSubmit = (data) => {
    const newData = { reference: [{ ...data.reference1 }, { ...data.reference2 }] };


    // Call API or mutation here
    updatePersonalDetails({ id, updates: newData })
    setOpenEdit(false)
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (reference.length > 0) {
      setReferenceDetails(reference)
    }

  }, [reference])
  console.log('reference details',referenceDetails)

  const buttonStyles = {
    borderRadius: '5px',
    padding: '10px 20px',
    background: isLoading ? "#ccc" : colors.primary["primaryshade"],
    color: isLoading ? "#666" : colors.white["whiteshade"],
    cursor: isLoading ? "not-allowed" : "pointer",
    "&:hover": {
      backgroundColor: isLoading ? "#ccc" : colors.secondary["secondaryshade"],
    },
  };

  return (
    <>
      <Accordion style={accordionStyles}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: colors.black["blackshade"] }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" style={{ fontWeight: '600' }}>Reference Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={3} style={paperStyles}>
            {(Object.keys(reference).length === 0 || openEdit) ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="column" gap={4}>
                  {/* Reference 1 */}
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Typography variant="h6">Reference 1</Typography>
                    <Box display="flex" gap={2}>
                      <Controller
                        name="reference1.name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Name"
                            fullWidth
                            variant="standard"
                            error={!!errors.reference1?.name}
                            helperText={errors.reference1?.name?.message}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name="reference1.mobile"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Mobile"
                            fullWidth
                            variant="standard"
                            error={!!errors.reference1?.mobile}
                            helperText={errors.reference1?.mobile?.message}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name="reference1.relation"
                        control={control}
                        render={({ field }) => (
                          <FormControl
                            fullWidth
                            variant="standard"
                            error={!!errors.reference1?.relation}
                          >
                            <InputLabel>Relation</InputLabel>
                            <Select
                              {...field}
                              label="Relation"
                            >
                              <MenuItem value="Friend">Friend</MenuItem>
                              <MenuItem value="Colleague">Colleague</MenuItem>
                              <MenuItem value="Relative">Relative</MenuItem>
                              <MenuItem value="Neighbor">Neighbor</MenuItem>
                            </Select>
                            <FormHelperText>{errors.reference1?.relation?.message}</FormHelperText>
                          </FormControl>
                        )}
                      />
                    </Box>
                  </Box>

                  {/* Reference 2 */}
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Typography variant="h6">Reference 2</Typography>
                    <Box display="flex" gap={2}>
                      <Controller
                        name="reference2.name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Name"
                            fullWidth
                            variant="standard"
                            error={!!errors.reference2?.name}
                            helperText={errors.reference2?.name?.message}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name="reference2.mobile"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Mobile"
                            fullWidth
                            variant="standard"
                            error={!!errors.reference2?.mobile}
                            helperText={errors.reference2?.mobile?.message}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name="reference2.relation"
                        control={control}
                        render={({ field }) => (
                          <FormControl
                            fullWidth
                            variant="standard"
                            error={!!errors.reference2?.relation}
                          >
                            <InputLabel>Relation</InputLabel>
                            <Select
                              {...field}
                              label="Relation"
                            >
                              <MenuItem value="Friend">Friend</MenuItem>
                              <MenuItem value="Colleague">Colleague</MenuItem>
                              <MenuItem value="Relative">Relative</MenuItem>
                              <MenuItem value="Neighbor">Neighbor</MenuItem>
                            </Select>
                            <FormHelperText>{errors.reference2?.relation?.message}</FormHelperText>
                          </FormControl>
                        )}
                      />
                    </Box>
                  </Box>

                  {/* Error Message Display */}
                  {isError && (
                    <Alert severity="error" sx={{ borderRadius: '8px', mt: 2 }}>
                      {error?.data?.message}
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                    <Button 
                      variant="outlined" 
                      sx={{
                        border:"2px solid red",
                        color: "red",
                        "&:hover": {
                          backgroundColor: "red",
                          color: "white",
                        }
                      }}
                      onClick={() => reset()}>
                      Cancel
                    </Button>
                    <Button type="submit" style={buttonStyles}>
                      {isLoading ? <CircularProgress size={20} color="inherit" /> : "Save"}
                    </Button>
                  </Box>
                </Box>
              </form>
            ) : (
              <>
                <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
                  <Table aria-label="personal details table">
                    <TableBody>
                      {referenceDetails?.map((references, index) => (
                        <TableRow key={index}>
                          <TableCell><strong>Name:</strong> {references.name}</TableCell>
                          <TableCell><strong>Mobile:</strong> {references.mobile}</TableCell>
                          <TableCell><strong>Relation:</strong> {references.relation}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider sx={{ my: 2 }} />
                {(activeRole === "creditManager") && <Box display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
                  <Button
                    variant="contained"
                    style={buttonStyles}
                    onClick={() => setOpenEdit(true)}
                  >
                    Edit 
                  </Button>
                </Box>}
              </>
            )}
          </Paper>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Reference;
