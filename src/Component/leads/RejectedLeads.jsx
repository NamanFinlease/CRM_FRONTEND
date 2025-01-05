import React, { useEffect, useState } from 'react'
import LeadProfile from '../../page/LeadProfile'
import { useFetchAllHoldLeadsQuery, useFetchAllRejectedLeadsQuery, useFetchSingleLeadQuery } from '../../Service/Query';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import CommonTable from '../CommonTable';


const RejectedLeads = () => {
    const [rejectedLeads, setRejectedLeads] = useState()
    const [totalRejectedLeads, setTotalRejectedLeads] = useState()
    const [page, setPage] = useState(1); // Current page
    const { empInfo,activeRole } = useAuthStore()
    const [id, setId] = useState(null)
    const navigate = useNavigate()
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const { data, isSuccess, isError,refetch } = useFetchAllRejectedLeadsQuery()
    // const { data: LeadData, isSuccess: leadSuccess } = useFetchSingleLeadQuery(id, { skip: id === null })
    const handleRowClick = (params) => {
        if (onRowClick) {
          onRowClick(params);
        }
    };
    const handlePageChange = (newPaginationModel) => {
        setPage(newPaginationModel);
        // Fetch new data based on the new page
        setPaginationModel(newPaginationModel)
        refetch({ page: newPaginationModel.page +1, limit: newPaginationModel.pageSize}); // Adjust this according to your data fetching logic
    };

    useEffect(() => {
        if (data) {
            setRejectedLeads(data?.rejectedLeads)
            setTotalRejectedLeads(data?.rejectedLeads?.totalLeads)
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
        ...(activeRole === "sanctionHead" || activeRole === "admin"
            ? [{ field: 'rejectedBy', headerName: 'Rejected By', width: 150 }]
            : [])
    ];

    const rows = rejectedLeads?.leads?.map(lead => ({
        id: lead?._id,
        name: ` ${lead?.fName}  ${lead?.mName} ${lead?.lName}`,
        mobile: lead?.mobile,
        aadhaar: lead?.aadhaar,
        pan: lead?.pan,
        city: lead?.city,
        state: lead?.state,
        loanAmount: lead?.loanAmount,
        salary: lead?.salary,
        source: lead?.source,
        ...((activeRole === "sanctionHead" || activeRole === "admin") &&
            { rejectedBy: `${lead?.rejectedBy?.fName}${lead?.rejectedBy?.mName ? ` ${lead?.rejectedBy?.mName}` : ``} ${lead?.rejectedBy?.lName}`, })
    }));

    useEffect(() => {
        refetch({ page: paginationModel.page + 1, limit: paginationModel.pageSize });
    }, [paginationModel]);

    return (
        <>
            {/* <div className="crm-container">
                <div
                    style={{
                        padding: '10px 20px',
                        fontWeight: 'bold',
                        background: '#transparent',
                        color: '#e38710',
                        margin:"20px 0px",
                        border:"1px solid #e38710",
                        borderRadius: '5px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                    }}
                > */}
                    {/* Leads Rejected : {totalRejectedLeads || 0} Defaults to 0 if no leads */}
                {/* </div> */}
            {/* // </div> */}
            {/* {columns && <div style={{ height: 400, width: '100%', padding:"0px 20px" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowCount={totalRejectedLeads}
                    // loading={isLoading}
                    pageSizeOptions={[5]}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={handlePageChange}
                    onRowClick={(params) => handleLeadClick(params)}
                    // sx={{
                    //     '& .MuiDataGrid-row:hover': {
                    //         cursor: 'pointer',
                    //     },
                    // }}
                    sx={{
                        color: '#000',  // Default text color for rows
                        '& .MuiDataGrid-columnHeaders .css-yrdy0g-MuiDataGrid-columnHeaderRow': {
                            backgroundColor: '#e38710',  // Optional: Header background color
                            color: 'white'  // White text for the headers
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: '#e38710',  // Footer background color
                            color: 'white',  // White text for the footer
                        },
                        '& .MuiDataGrid-row:hover': {
                            cursor: 'pointer',
                        },
                    }}
                />
            </div>} */}
            {/* </div> */}
            <CommonTable
                columns={columns}
                rows={rows}
                totalRows={totalRejectedLeads}
                paginationModel={{ page: 1, pageSize: 10 }}
                onPageChange={handlePageChange}
                onRowClick={handleRowClick}
                title="Rejected Leads"
                // actionButton={true}
                // actionButtonText="Allocate Leads"
                // onActionButtonClick={handleActionButtonClick}
            />
        </>
    )
}

export default RejectedLeads
