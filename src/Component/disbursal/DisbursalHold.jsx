import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useAllHoldApplicationQuery, useFetchDisbursalHoldQuery } from '../../queries/applicationQueries';
import useAuthStore from '../store/authStore';


const DisbursalHold = () => {
    const [holdApplications, setHoldApplications] = useState()
    const [totalHoldApplications, setTotalHoldApplications] = useState()
    const [id, setId] = useState(null)
    const {empInfo,activeRole} = useAuthStore()
    const navigate = useNavigate()
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const {data,isSuccess,isError,error} = useFetchDisbursalHoldQuery({ page: paginationModel.page + 1, limit: paginationModel.pageSize })
    const handlePageChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel)
    }

    const handleLeadClick = (application) => {
        setId(application.id)
        navigate(`/disbursal-profile/${application.id}`)
    }


    // useEffect(() => {
    //     refetch({ page: paginationModel.page + 1, limit: paginationModel.pageSize });
    // }, [paginationModel]);

    useEffect(() => {
        if (data) {
            setHoldApplications(data?.heldApplications?.disbursals)
        setTotalHoldApplications(data?.heldApplications?.totalRecords)
        }
    }, [isSuccess, data])


    const columns = [
        { field: 'name', headerName: 'Full Name', width: 200 },
        { field: 'mobile', headerName: 'Mobile', width: 150 },
        { field: 'aadhaar', headerName: 'Aadhaar No.', width: 150 },
        { field: 'pan', headerName: 'Pan No.', width: 150 },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'state', headerName: 'State', width: 150 },
        { field: 'loanAmount', headerName: 'Loan Amount', width: 150 },
        { field: 'salary', headerName: 'Salary', width: 150 },
        { field: 'source', headerName: 'Source', width: 150 },
        ...(activeRole === "disbursalHead" || activeRole === "admin"
            ? [{ field: 'heldBy', headerName: 'Hold By', width: 150 }]
            : [])
    ];

    const rows = holdApplications?.map(disbursal => ({
        id: disbursal?._id, 
        name: ` ${disbursal?.application?.lead?.fName}  ${disbursal?.application?.lead?.mName} ${disbursal?.application?.lead?.lName}`,
        mobile: disbursal?.application?.lead?.mobile,
        aadhaar: disbursal?.application?.lead?.aadhaar,
        pan: disbursal?.application?.lead?.pan,
        city: disbursal?.application?.lead?.city,
        state: disbursal?.application?.lead?.state,
        loanAmount: disbursal?.application?.lead?.loanAmount,
        salary: disbursal?.application?.lead?.salary,
        source: disbursal?.application?.lead?.source,
        ...((activeRole === "disbursalHead" || activeRole === "admin") &&
        { heldBy: `${disbursal?.application?.heldBy?.fName}${disbursal?.application?.heldBy?.mName ? ` ${disbursal?.application?.heldBy?.mName}` : ``} ${disbursal?.application?.heldBy?.lName}`, })
  
    }));

    return (
        <>
            <div className="crm-container">
            <div
                    style={{
                        padding: '10px 20px',
                        fontWeight: 'bold',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        borderRadius: '5px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        marginBottom:"15px"
                    }}
                >
                    Total Applicattion: {totalHoldApplications || 0} {/* Defaults to 0 if no leads */}
                </div>
                </div>
                {columns && <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        rowCount={totalHoldApplications}
                        // loading={isLoading}
                        pageSizeOptions={[5]}
                        paginationModel={paginationModel}
                        paginationMode="server"
                        onPaginationModelChange={handlePageChange}
                        onRowClick={(params) => handleLeadClick(params)}
                        sx={{
                            color: '#1F2A40',  // Default text color for rows
                                '& .MuiDataGrid-columnHeaders': {
                                  backgroundColor: '#1F2A40',  // Optional: Header background color
                                  color: 'white'  // White text for the headers
                                },
                                '& .MuiDataGrid-footerContainer': {
                                  backgroundColor: '#1F2A40',  // Footer background color
                                  color: 'white',  // White text for the footer
                                },
                            '& .MuiDataGrid-row:hover': {
                                cursor: 'pointer',
                            },
                        }}
                    />
                </div>}
            {/* <OTPVerificationUI /> */}
            {/* </div> */}

        </>
    )
}

export default DisbursalHold