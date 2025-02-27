import React, { useEffect, useState } from 'react'
import { useFetchAllMarketingLeadQuery } from '../../Service/Query';
import { DataGrid } from '@mui/x-data-grid';

function LandingPageLeads() {

    const [landingPageLeads,setLandingPageLeads] = useState();
    const {data,isSuccess,isError,error} = useFetchAllMarketingLeadQuery();
    const [totalLandingPageLeads , setTotalLandingPageLead] = useState()
    //  const [paginationModel, setPaginationModel] = useState({
    //         page: 0,
    //         pageSize: 5,
    //     });

        // const handlePageChange = (newPaginationModel) => {
        //     setPaginationModel(newPaginationModel)
        // }

    useEffect( ()=>{
        if(data){
            console.log("The data is",data);
            setLandingPageLeads(data?.leads)
            setTotalLandingPageLead(data?.totalLeads);
        }
    } ,[isSuccess ,data] );

    const columns = [
        { field: 'fullName', headerName: 'Full Name', width: 200 },
        { field: 'mobile', headerName: 'Mobile', width: 150 },
        { field: 'email', headerName: 'Email No.', width: 150 },
        { field: 'pan', headerName: 'Pan No.', width: 150 },
        // { field: 'city', headerName: 'City', width: 150 },
        { field: 'pinCode', headerName: 'Pin Code', width: 150 },
        { field: 'loanAmount', headerName: 'Loan Amount', width: 150 },
        { field: 'salary', headerName: 'Salary', width: 150 },
        { field: 'source', headerName: 'Source', width: 150 },
    ];

    const rows = data?.leads?.map(lead => ({
        id: lead?._id, 
        fullName: lead?.fullName,
        mobile: lead?.mobile,
        aadhaar: lead?.aadhaar,
        pan: lead?.pan,
        city: lead?.city,
        state: lead?.state,
        loanAmount: lead?.loanAmount,
        salary: lead?.salary,
        source: (lead?.source === "marketing" ? "Landing Page Lead" : ""),
        pinCode  : lead?.pinCode,
        email : lead?.email
        // ...((activeRole === "sanctionHead" || activeRole === "admin") &&
        // { heldBy: `${lead?.heldBy?.fName}${lead?.heldBy?.mName ? ` ${lead?.heldBy?.mName}` :``} ${lead?.heldBy?.lName}`,})
        
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
                       Total Applicattion: {totalLandingPageLeads || 0} 
                       {/* Defaults to 0 if no leads */}
                   </div>
                   </div>
                   {columns && <div style={{ height: 400, width: '100%' }}>
                       <DataGrid
                           rows={rows}
                           columns={columns}
                           rowCount={totalLandingPageLeads}
                           // loading={isLoading}
                        //    pageSizeOptions={[5]}
                        //    paginationModel={paginationModel}
                        //    paginationMode="server"
                        //    onPaginationModelChange={handlePageChange}
                        //    onRowClick={(params) => handleLeadClick(params)}
                           // sx={{
                           //     '& .MuiDataGrid-row:hover': {
                           //         cursor: 'pointer',
                           //     },
                           // }}
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
               {/* </div> */}
   
           </>
  )
}

export default LandingPageLeads