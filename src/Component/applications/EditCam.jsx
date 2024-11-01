import React, { useState, useEffect } from 'react'

import { Button, TextField } from '@mui/material';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useUpdateCamDetailsMutation } from '../../queries/applicationQueries';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const EditCam = ({ camData, setIsEditing }) => {
    const { id } = useParams();

    const [formData, setFormData] = useState(camData)
    const [errorMessage, setErrorMessage] = useState("")

    console.log('edit form ', formData)



    const [updateCamDetails, isLoading, isSuccess, isError] = useUpdateCamDetailsMutation();

    const calculateDaysDifference = (disbursalDate, repaymentDate) => {
        console.log("The loan amount is calculateDaysDifference", disbursalDate, repaymentDate)

        if (!disbursalDate && !repaymentDate) {
            return 0;
        }
        // Convert the string dates to Date objects
        const startDate = new Date(disbursalDate);
        const endDate = new Date(repaymentDate);

        // Get the time difference in milliseconds
        const timeDiff = endDate - startDate;

        // Convert time difference from milliseconds to days (1000ms * 60s * 60m * 24h)
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        return daysDiff;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data with the new value
        setFormData((prevFormData) => {
            const updatedFormData = {
                ...prevFormData, // Start by copying the previous formData state
                [name]: value,   // Update the field that triggered the change event
            };

            // Handle loan recommendation logic
            if (name === 'loanRecommended') {
                const recommendedLoan = Number(value);
                const finalsalaryToIncomeRatioPercentage = prevFormData.actualNetSalary
                    ? (recommendedLoan / prevFormData.actualNetSalary) * 100
                    : 0;
                // Add calculated fields to updatedFormData
                updatedFormData.finalsalaryToIncomeRatioPercentage = `${finalsalaryToIncomeRatioPercentage.toFixed(2)}%`;
                updatedFormData.adminFee = recommendedLoan * 0.15;
                updatedFormData.netAdminFeeAmount = recommendedLoan * 0.15;
                updatedFormData.netDisbursalAmount = recommendedLoan - recommendedLoan * 0.15;
            }
            // Handle repayment date change and calculate repayment amount
            if (name === 'repaymentDate') {

                const eligibleTenure = calculateDaysDifference(prevFormData.disbursalDate, value);
                updatedFormData.eligibleTenure = eligibleTenure + 1 || 0;

                // Convert ROI to decimal
                const roiDecimal = 0.005;
                // ro
                // Calculate repaymentAmount using the correct formula
                const loanRecommended = Number(prevFormData.loanRecommended);
                updatedFormData.repaymentAmount = loanRecommended
                    ? loanRecommended + (loanRecommended * roiDecimal * (eligibleTenure + 1))
                    : 0;
            }
            // Return the updated form data
            return updatedFormData;
        });
    };
    console.log('form data', formData)

    const handleSave = async (e) => {
        e.preventDefault();
        console.log("The form data is", formData);

        // Utility function to validate if the input is a valid date
        const isValidDate = (date) => {
            return !isNaN(Date.parse(date)); // Returns true if valid, false if invalid
        };

        // Validation checks
        if (formData.actualNetSalary > 0 && isValidDate(formData.disbursalDate) && isValidDate(formData.repaymentDate)) {
            try {
                console.log("wating here to check")
                const response = await updateCamDetails({
                    id: id, // ID of the CAM (assuming this is passed as a prop)
                    updates: formData // The updated data from the form
                }).unwrap();

                console.log("the response is ", response)

                if (response?.success) {
                    Swal.fire({
                        text: "Cam Updated Successfuly!",
                        icon: "success"
                    });
                    setIsEditing(false); // Stop editing after successful update
                    setErrorMessage(""); // Clear any error message
                } else {
                    setErrorMessage("Failed to update the data. Please try again.");
                }
            } catch (error) {
                console.error("Error updating CAM details:", error);
                setErrorMessage("An error occurred while updating the data.");
            }

            console.log('Form data saved:', formData);
        } else {
            setErrorMessage("Please fill out all the required fields.");
            console.warn("Validation failed. Required fields missing.");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({})
    };



    // Function to calculate the salaryToIncomeRatio percentage based on the actual net salary
    const calculatesalaryToIncomeRatio = (salary) => {
        if (salary < 25000) {
            return '0%';
        } else if (salary >= 25000 && salary < 35000) {
            return '35%';
        } else if (salary >= 35000 && salary < 50000) {
            return '40%';
        } else {
            return '45%';
        }
    };

    // Function to calculate the eligible loan based on the actual net salary and salaryToIncomeRatio
    const calculateEligibleLoan = (salary, salaryToIncomeRatioPercentage) => {
        const salaryToIncomeRatioDecimal = parseFloat(salaryToIncomeRatioPercentage) / 100;
        return salary * salaryToIncomeRatioDecimal;
    };

    // UseEffect to calculate salaryToIncomeRatio whenever the actualNetSalary changes
    useEffect(() => {
        const salaryToIncomeRatioPercentage = calculatesalaryToIncomeRatio(formData.actualNetSalary);
        const eligibleLoan = calculateEligibleLoan(formData.actualNetSalary, salaryToIncomeRatioPercentage);
        if (formData.actualNetSalary > 25000) {
            setFormData((prevData) => ({
                ...prevData,
                customerCategory: 'CAT - B'
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                customerCategory: ''
            }));
        }
        setFormData((prevData) => ({
            ...prevData,
            eligiblesalaryToIncomeRatioPercentage: salaryToIncomeRatioPercentage,
            eligibleLoan: eligibleLoan,
        }));
    }, [formData.actualNetSalary]);

    const meanSalary = (sal1, sal2, sal3) => {
        return (sal1 + sal2 + sal3) / 3;
    };

    useEffect(() => {
        const avgSal = meanSalary(
            Number(formData.salaryAmount1),
            Number(formData.salaryAmount2),
            Number(formData.salaryAmount3)
        ).toFixed(2);

        setFormData((prevData) => ({
            ...prevData,
            averageSalary: avgSal || 0,  // Ensure default value is set if avgSal is NaN
        }));
    }, [formData.salaryAmount1, formData.salaryAmount2, formData.salaryAmount3]);





    useEffect(() => {
        const calculateFOIR = (netSalary, obligations) => {
            const foir = netSalary > 0 ? ((netSalary - obligations) / netSalary) * 100 : 0;
            return `${foir.toFixed(2)}%`;
        };

        // Update the form data with the calculated FOIR
        setFormData((prevData) => ({
            ...prevData,
            eligiblesalaryToIncomeRatioPercentage: calculateFOIR(prevData.actualNetSalary, prevData.obligations),
        }));

    }, [formData.actualNetSalary, formData.obligations]);
    return (
        <>
            <form onSubmit={handleSave} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', background: '#808080', padding: '10px' }}>
                {/* First Row (4 items) */}
                <div style={{ flex: '1 1 100%' }}>
                    <TextField
                        label="Lead ID"
                        name="leadId"
                        type="string"
                        fullWidth
                        value={formData.leadId}
                        onChange={handleChange}
                        disabled
                    // Makes the field read-only
                    />
                </div>
                {/* <div style={{ flex: '1 1 46%' }}> */}
                {/* <TextField
          label="Loan No"
          name="loanNo"
          fullWidth
          value={formData.loanNo}
          onChange={handleChange}
          disabled
        /> */}
                {/* </div> */}
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Salary Date 1"
                        name="salaryDate1"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={formData.salaryDate1}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Salary Amount 1"
                        name="salaryAmount1"
                        type="number"
                        fullWidth
                        value={formData.salaryAmount1}
                        onChange={handleChange}
                    />
                </div>

                {/* Second Row (4 items) */}
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Salary Date 2"
                        name="salaryDate2"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={formData.salaryDate2}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Salary Amount 2"
                        name="salaryAmount2"
                        type="number"
                        fullWidth
                        value={formData.salaryAmount2}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Salary Date 3"
                        name="salaryDate3"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={formData.salaryDate3}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Salary Amount 3"
                        name="salaryAmount3"
                        type="number"
                        fullWidth
                        value={formData.salaryAmount3}
                        onChange={handleChange}
                    />
                </div>

                {/* Third Row (4 items) */}
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Next Pay Date"
                        name="nextPayDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={formData.nextPayDate}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Average Salary"
                        name="averageSalary"
                        type="number"
                        fullWidth
                        value={formData.averageSalary}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Actual Net Salary"
                        name="actualNetSalary"
                        type="number"
                        fullWidth
                        value={formData.actualNetSalary}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Credit Bureau Score"
                        name="creditBureauScore"
                        fullWidth
                        // InputProps={{ readOnly: true }}
                        disabled
                        value={formData.creditBureauScore}
                        onChange={handleChange}
                    />
                </div>

                {/* Fourth Row (4 items) */}
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Customer Type"
                        name="customerType"
                        fullWidth
                        value={formData.customerType}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    {/* <TextField
          label="Dedupe Check"
          name="dedupeCheck"
          fullWidth
          value={formData.dedupeCheck}
          onChange={handleChange}
        /> */}
                    <FormControl fullWidth>
                        <InputLabel id="dedupe-check-label">Dedupe Check</InputLabel>
                        <Select
                            labelId="dedupe-check-label"
                            label="Dedupe Check"
                            name="dedupeCheck"
                            value={formData.dedupeCheck}
                            onChange={handleChange}
                        >
                            {/* Placeholder option */}
                            <MenuItem value="">
                                <em>Select Dedupe Check</em>
                            </MenuItem>
                            {/* Option for Yes */}
                            <MenuItem value="Yes">Yes</MenuItem>
                            {/* Option for No */}
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Customer Category"
                        name="customerCategory"
                        fullWidth
                        value={formData.customerCategory}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        disabled
                    />
                </div>
                {/* <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Repeat Times"
          name="repeatTimes"
          type="number"
          fullWidth
          value={formData.repeatTimes}
          onChange={handleChange}
        />
      </div> */}
                {/* Fifth Row (4 items) */}
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Obligations (Rs)"
                        name="obligations"
                        type="number"
                        fullWidth
                        value={formData.obligations}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Initial salary To Income Ratio"
                        name="eligiblesalaryToIncomeRatioPercentage"
                        fullWidth
                        value={calculatesalaryToIncomeRatio(formData.netSalary)}
                        onChange={handleChange}
                        disabled // Updated from InputProps to slotProps
                    />
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Eligible Loan"
                        name="eligibleLoan"
                        type="number"
                        fullWidth
                        value={formData.eligibleLoan}
                        onChange={handleChange}
                        disabled // Updated from InputProps to slotProps
                    />
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Loan Recommended"
                        name="loanRecommended"
                        type="number"
                        fullWidth
                        value={formData.loanRecommended}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Final salary To Income Ratio"
                        name="finalsalaryToIncomeRatioPercentage"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.finalsalaryToIncomeRatioPercentage}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Net Disbursal Amount"
                        name="netDisbursalAmount"
                        type="number"
                        fullWidth
                        value={formData.netDisbursalAmount}
                        onChange={handleChange}
                        disabled
                        InputLabelProps={{ shrink: true }}
                    />
                </div>
                {/* New Row (Additional Fields) */}
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="ROI"
                        name="ROI"
                        type="string"
                        fullWidth
                        value={`${formData.roi} %`}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                        //disabled // Updated from InputProps to slotProps
                        disabled
                    />
                </div>
                {/* <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Eligible Admin Fee"
          name="eligibleAdminFee"
          type="string"
          fullWidth
          value={formData.eligibleAdminFee}
          onChange={handleChange}
         disabled // Updated from InputProps to slotProps
        />
      </div> */}
                
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Disbursal Date"
                        name="disbursalDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={formData.disbursalDate}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Repayment Date"
                        name="repaymentDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={formData.repaymentDate}
                        onChange={handleChange}
                        required
                    // disabled
                    />
                </div>
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Eligible Tenure"
                        name="eligibleTenure"
                        type="number"
                        fullWidth
                        value={formData.eligibleTenure}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                {/* Sixth Row (More Fields) */}
               
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Admin Fee % Inc. Gst"
                        name="adminFee"
                        type="string"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.adminFeePercentage}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                {/* <div style={{ flex: '1 1 46%' }}> */}
                {/* <TextField
          label="Admin Fee GST"
          name="adminFeeGst"
          type="string"
          fullWidth
          value="15%"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
         disabled  */}


                {/* </div> */}
                {/* Final Row (More Fields and Buttons) */}
                {/* <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Admin Fee GST Amount"
          name="adminFeeGstAmount"
          type="string"
          fullWidth
          value={formData.adminFeeGstAmount}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
         disabled
        />
      </div> */}
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Total Admin Fee"
                        name="netAdminFeeAmount"
                        type="number"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.netAdminFeeAmount}
                        onChange={handleChange}
                        disabled // Updated from InputProps to slotProps
                    />
                </div>
                
                <div style={{ flex: '1 1 46%' }}>
                    <TextField
                        label="Repayment Amount"
                        name="repaymentAmount"
                        type="number"
                        fullWidth
                        // value={formData.repaymentAmount}
                        value={Number(formData.loanRecommended)* Number(formData.eligibleTenure) * Number(formData.roi) }
                        onChange={handleChange}
                        disabled
                    />
                </div>

                {/* Save and Cancel Buttons */}
                <div style={{ flex: '1 1 100%', marginTop: '20px' }}>
                    <Button
                        type="submit"  // Use 'type="submit"' to handle form submit
                        variant="contained"
                        color="primary"
                    //  onClick={handleSave}
                    >
                        Save CAM
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleCancel}
                        style={{ marginLeft: '10px' }}
                        sx={{
                            ':hover': {
                                color: 'white',
                                backgroundColor: 'red',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </form>

        </>
    )
}

export default EditCam
