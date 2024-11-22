import React, { useState ,useEffect } from 'react'
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import {  usePendingVerificationQuery  , useVerifyPendingLeadMutation } from '../../Service/LMSQueries';
import { DataGrid } from '@mui/x-data-grid';

function PendingVerification() {

    const [pendingLeads,setPendingLeads] = useState();
    const [totalPendingLeads,setTotalPendingLeads] = useState();
    const { empInfo,activeRole}=useAuthStore();
    const navigate = useNavigate();
    const [paginationModel , setPaginationModel] = useState({
        page : 0,
        pageSize : 10
    });
    const { data , isSuccess,isError,error,refetch } = usePendingVerificationQuery({  page : paginationModel.page +1 , limit : paginationModel.pageSize})

    const handlePageChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel)

    }

    const handleLeadClick = (disbursal) => {
        console.log()
        navigate(`/pending-verification-profile/${disbursal.id}`)
    }

    console.log("The Pending Verifications ")
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
        ...(activeRole === "collectionHead" || activeRole === "admin"
            ? [{ field: 'disbursalHead', headerName: 'Disbursed By', width: 150 }]
            : [])
    ];  

    const rows = pendingLeads?.map(activeLead => ({
        id: activeLead?._id,
        name: ` ${activeLead?.application?.lead?.fName}  ${activeLead?.application?.lead?.mName} ${activeLead?.application?.lead?.lName}`,
        mobile: activeLead?.application?.lead?.mobile,
        aadhaar: activeLead?.application?.lead?.aadhaar,
        pan: activeLead?.application?.lead?.pan,
        city: activeLead?.application?.lead?.city,
        state: activeLead?.application?.lead?.state,
        loanAmount: activeLead?.application?.lead?.loanAmount,
        salary: activeLead?.application?.lead?.salary,
        source: activeLead?.application?.lead?.source,
        ...((activeRole === "accountExecutive" || activeRole === "admin") &&
            { disbursalHead: `${disbursal?.disbursedBy?.fName}${disbursal?.disbursedBy?.mName ? ` ${disbursal?.disbursedBy?.mName}` : ``} ${disbursal?.disbursedBy?.lName}`, })

    }));

    useEffect(() => {
        refetch({ page: paginationModel.page + 1, limit: paginationModel.pageSize });
    }, [paginationModel]);

    useEffect(() => {
        console.log('data',data)
          if (data) {
            setPendingLeads(data.pendingLeads)
              setTotalPendingLeads(data?.totalPendingLeads)
          }
      }, [isSuccess, data]);
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
            Total Pending Verifications: {totalPendingLeads || 0} {/* Defaults to 0 if no leads */}
        </div>
    </div>

    {columns && <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            rowCount={totalPendingLeads}
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
                '& .MuiDataGrid-row': {
                    color: "black"
                    // cursor: 'pointer',
                },
            }}
        />
    </div>}

    {(isError) &&
  <Alert severity="error" style={{ marginTop: "10px" }}>
    {error?.data?.message}
  </Alert>
}

</>
  )
}

export default PendingVerification