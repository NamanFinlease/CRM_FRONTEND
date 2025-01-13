// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
// import { useAllocateLeadMutation, useFetchAllLeadsQuery } from '../Service/Query';
// import { useNavigate } from 'react-router-dom';
// import Header from '../Component/Header';
// import useAuthStore from '../Component/store/authStore';

// const LeadNew = () => {
//   const [leads, setLeads] = useState([]); // Stores lead details
//   const [totalLeads, setTotalLeads] = useState(0); // Stores the total lead count
//   const [page, setPage] = useState(1); // Current page
//   const [selectedLeads, setSelectedLeads] = useState(null); // Stores selected leads
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const [allocateLead, { data: updatedLeads, isSuccess }] = useAllocateLeadMutation();
//   const [paginationModel, setPaginationModel] = useState({
//     page: 0,
//     pageSize: 10,
//   });
//   const {empInfo,activeRole} = useAuthStore()
//   const navigate = useNavigate()
//   const { data: allLeads, refetch } = useFetchAllLeadsQuery({page:paginationModel.page+1,limit:paginationModel.pageSize})

//   useEffect(() => {
//     setLeads(allLeads);
//   }, [page]);

  
  
//   const handleAllocate = async () => {
//     // Perform action based on selected leads
//     allocateLead(selectedLeads);
    
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedLeads(selectedLeads === id ? null : id);
//   }

//   const handlePageChange = (newPaginationModel) => {
//     // setPage(newPaginationModel);
//     // Fetch new data based on the new page
//     setPaginationModel(newPaginationModel)
//     refetch(newPaginationModel); // Adjust this according to your data fetching logic
//   };

//   useEffect(() => {
//     if(isSuccess) navigate("/lead-process")

//   },[isSuccess])

//   useEffect(() => {
//     refetch()
//     setTotalLeads(allLeads?.totalLeads)
//   }, [page, allLeads, updatedLeads])
//   const columns = [
//     {
//       field: 'select',
//       headerName: '',
//       width: 50,
//       renderCell: (params) => (
//         activeRole === "screener" &&
//         <input
//           type="checkbox"
//           checked={selectedLeads === params.row.id}

//           onChange={() => handleCheckboxChange(params.row.id)}
//         />
//       ),
//     },
//     { field: 'name', headerName: 'Full Name', width: 200 },
//     { field: 'mobile', headerName: 'Mobile', width: 150 },
//     { field: 'aadhaar', headerName: 'Aadhaar No.', width: 150 },
//     { field: 'pan', headerName: 'Pan No.', width: 150 },
//     { field: 'city', headerName: 'City', width: 150 },
//     { field: 'state', headerName: 'State', width: 150 },
//     { field: 'loanAmount', headerName: 'Loan Amount', width: 150 },
//     { field: 'salary', headerName: 'Salary', width: 150 },
//     { field: 'source', headerName: 'Source', width: 150 },
//   ];

//   const rows = allLeads?.leads?.map(lead => ({
//     id: lead?._id, // Unique ID for each lead
//     name:` ${lead?.fName}  ${lead?.mName} ${lead?.lName}` ,
//     mobile: lead?.mobile,
//     aadhaar: lead?.aadhaar,
//     pan: lead?.pan,
//     city: lead?.city,
//     state: lead?.state,
//     loanAmount: lead?.loanAmount,
//     salary: lead?.salary,
//     source: lead?.source,
//   }));

//   return (
//     <div>
//       {/* Container for Lead counter and action button */}
//       <div
//         style={{
//           display: 'flex',
//           justifyContent:"center",
//           alignItems: 'center',
//           margin: '20px 0px',
//         }}
//       >
//         {/* Lead counter */}
//         <div
//           style={{
//             padding: '10px 20px',
//             fontWeight: 'bold',
//             backgroundColor: 'transparent',
//             color: '#e38710',
//             border:"1px solid #e38710",
//             borderRadius: '5px',
//             boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//             cursor: 'pointer',
//           }}
//         >
//           New Leads : {totalLeads || 0} {/* Defaults to 0 if no leads */}
//         </div>

//         {/* Action button for selected leads */}
//         {activeRole === "screener" &&  <button
//           onClick={handleAllocate}
//           style={{
//             marginLeft: '20px',
//             fontWeight:"bold",
//             padding: '10px 20px',
//             backgroundColor: 'transparent',
//             color: '#18de26',
//             border: '1px solid #18de26',
//             borderRadius: '5px',
//             boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//             cursor: 'pointer',
//           }}
//         >
//           Allocate
//         </button>}
//       </div>

//       <Header />

//       {columns && <div style={{ height: 500, display:"flex", justifyContent:"center", margin: "0px 20px", boxShadow:"0px 0px 20px 10px rgba(0,0,0,0.1)" }}>
//         <DataGrid
//         sx={{color: '#000',  // Default text color for rows
//           '& .MuiDataGrid-columnHeaders .css-yrdy0g-MuiDataGrid-columnHeaderRow': {
//           backgroundColor: '#e38710 !important',  // Optional: Header background color
//             color: 'white'  // White text for the headers
//           },
//           '& .MuiDataGrid-footerContainer': {
//             backgroundColor: '#e38710',  // Footer background color
//             color: 'white',  // White text for the footer
//           }}}
//           rows={rows}
//           columns={columns}
//           rowCount={totalLeads}
//           // loading={isLoading}
//           pageSizeOptions={[10]}
//           paginationModel={paginationModel}
//           paginationMode="server"
//           onPaginationModelChange={handlePageChange}
//         />
//       </div>}
//     </div>
//   );
// };

// export default LeadNew;


import { useEffect, useState } from 'react';
import React from 'react';
import { useAllocateLeadMutation, useFetchAllLeadsQuery } from '../Service/Query';
import { useNavigate } from 'react-router-dom';
import Header from '../Component/Header';
import CommonTable from '../Component/CommonTable';
import useAuthStore from '../Component/store/authStore';


const LeadNew = () => {
  const [leads, setLeads] = useState([]); // Stores lead details
  const [totalLeads, setTotalLeads] = useState(0); // Stores the total lead count
  const [page, setPage] = useState(1); // Current page 
  const [selectedLeads, setSelectedLeads] = useState(null); // Stores selected leads
  const apiUrl = import.meta.env.VITE_API_URL;
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { empInfo, activeRole } = useAuthStore();
  const navigate = useNavigate();
  const { data: allLeads, refetch } = useFetchAllLeadsQuery({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
  });
  const [allocateLead, { data: updatedLeads, isSuccess }] = useAllocateLeadMutation();
  
  useEffect(() => {
    if (allLeads) {
      setLeads(allLeads.leads);
      setTotalLeads(allLeads.totalLeads);
    }
  }, [allLeads]);

  useEffect(() => {
        refetch()
        setTotalLeads(allLeads?.totalLeads)
      }, [page, allLeads, updatedLeads])

  useEffect(() => {
    setLeads(allLeads);
  }, [page]);    

  const handleCheckboxChange = (id) => {
    setSelectedLeads(selectedLeads === id ? null : id);
  }

  const handleAllocate = async () => {
    // Perform action based on selected leads
    allocateLead(selectedLeads);
    
  };

  const columns = [
    {
      field: 'select',
      headerName: '',
      width: 50,
      renderCell: (params) => (
        activeRole === "screener" &&
        <input
          type="checkbox"
          checked={selectedLeads === params.row.id}

          onChange={() => handleCheckboxChange(params.row.id)}
        />
      ),
    },
    { field: 'name', headerName: 'Full Name', width: 200 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    { field: 'aadhaar', headerName: 'Aadhaar No.', width: 150 },
    { field: 'pan', headerName: ' Pan No.', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'loanAmount', headerName: 'Loan Amount', width: 150 },
    { field: 'salary', headerName: 'Salary', width: 150 },
    { field: 'source', headerName: 'Source', width: 150 },
  ];

  const rows = allLeads?.leads?.map((lead) => ({
      id: lead?._id,
      name: `${lead?.fName} ${lead?.mName} ${lead?.lName}`,
      mobile: lead?.mobile,
      aadhaar: lead?.aadhaar,
      pan: lead?.pan,
      city: lead?.city,
      state: lead?.state,
      loanAmount: lead?.loanAmount,
      salary: lead?.salary,
      source: lead?.source,
    })) || [];

  const handleRowClick = (params) => {
    if (onRowClick) {
      onRowClick(params);
    }
  };

  const handlePageChange = (newPaginationModel) => {
    // setPage(newPaginationModel);
    // Fetch new data based on the new page
    setPaginationModel(newPaginationModel)
    refetch({ page: newPaginationModel.page +1, limit: newPaginationModel.pageSize}); // Adjust this according to your data fetching logic
  };

  return (
    <>
      <CommonTable
        columns={columns}
        rows={rows}
        totalRows={totalLeads}
        paginationModel={paginationModel}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
        title="New Leads"
        actionButton={true}
        onAllocateButtonClick={handleAllocate}
        // onActionButtonClick={handleActionButtonClick}
      />
      </>
  );
};

export default LeadNew;

// const LeadNew = () => {
//   const [selectedLeads, setSelectedLeads] = React.useState([]);
//   const [paginationModel, setPaginationModel] = React.useState({
//     page: 1,
//     pageSize: 10,
//   });

//   const { empInfo, activeRole } = useAuthStore();
//   const navigate = useNavigate();
//   const { data: allLeads, refetch } = useFetchAllLeadsQuery({
//     page: paginationModel.page,
//     limit: paginationModel.pageSize,
//   });
//   const [allocateLead, { data: updatedLeads, isSuccess }] = useAllocateLeadMutation();

//   const totalLeads = allLeads?.totalLeads || 0;
//   const rows = allLeads?.leads?.map((lead) => ({
//     id: lead?._id,
//     name: `${lead?.fName} ${lead?.mName} ${lead?.lName}`,
//     mobile: lead?.mobile,
//     aadhaar: lead?.aadhaar,
//     pan: lead?.pan,
//     city: lead?.city,
//     state: lead?.state,
//     loanAmount: lead?.loanAmount,
//     salary: lead?.salary,
//     source: lead?.source,
//   })) || [];

//   const columns = [
//     {
//       field: 'select',
//       headerName: '',
//       width: 50,
//       renderCell: (params) => (
//         activeRole === "screener" && (
//           <input
//             type="checkbox"
//             checked={selectedLeads.includes(params.row.id)}
//             onChange={() => handleCheckboxChange(params.row.id)}
//           />
//         )
//       ),
//     },
//     { field: 'name', headerName: 'Full Name', width: 200 },
//     { field: 'mobile', headerName: 'Mobile', width: 150 },
//     { field: 'aadhaar', headerName: 'Aadhaar No.', width: 150 },
//     { field: 'pan', headerName: 'Pan No.', width: 150 },
//     { field: 'city', headerName: 'City', width: 150 },
//     { field: 'state', headerName: 'State', width: 150 },
//     { field: 'loanAmount', headerName: 'Loan Amount', width: 150 },
//     { field: 'salary', headerName: 'Salary', width: 150 },
//     { field: 'source', headerName: 'Source', width: 150 },
//   ];

//   const handleAllocate = () => {
//     if (selectedLeads.length > 0) {
//       allocateLead(selectedLeads);
//     }
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedLeads((prev) =>
//       prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]
//     );
//   };

//   const handlePageChange = (newPage) => {
//     setPaginationModel((prev) => ({ ...prev, page: newPage }));
//     refetch({ page: newPage, limit: paginationModel.pageSize });
//   };

//   React.useEffect(() => {
//     if (isSuccess) {
//       navigate("/lead-process");
//     }
//   }, [isSuccess, navigate]);

//   return (
//     <div>
//       <Header />
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: "center",
//           alignItems: 'center',
//           margin: '20px 0px',
//         }}
//       >
//         <div
//           style={{
//             padding: '10px 20px',
//             fontWeight: 'bold',
//             backgroundColor: 'transparent',
//             color: '#e38710',
//             border: "1px solid #e38710",
//             borderRadius: '5px',
//             boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//             cursor: 'pointer',
//           }}
//         >
//           New Leads : {totalLeads || 0} {/* Defaults to 0 if no leads */}
//         </div>

//         {activeRole === "screener" && (
//           <button
//             onClick={handleAllocate}
//             style={{
//               marginLeft: '20px',
//               fontWeight: "bold",
//               padding: '10px 20px',
//               backgroundColor: 'transparent',
//               color: '#18de26',
//               border: '1px solid #18de26',
//               borderRadius: '5px',
//               boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//               cursor: ' pointer',
//             }}
//           >
//             Allocate Leads
//           </button>
//         )}
//       </div>

//       <CommonTable
//         rows={rows}
//         columns={columns}
//         paginationModel={paginationModel}
//         onPageChange={handlePageChange}
//         totalRows={totalLeads}
//       />
//     </div>
//   );
// };

// export default LeadNew;








// import { useEffect, useState, useMemo, useCallback } from 'react';
// import { useAllocateLeadMutation, useFetchAllLeadsQuery } from '../Service/Query';
// import { useNavigate } from 'react-router-dom';
// import Header from '../Component/Header';
// import { CommonTable } from 'CommonTable';
// import useAuthStore from '../Component/store/authStore';
// import './LeadNew.css'; // External CSS for styling

// const LeadNew = () => {
//   const [selectedLeads, setSelectedLeads] = useState([]);
//   const [paginationModel, setPaginationModel] = useState({
//     page: 1,
//     pageSize: 10,
//   });


//   const { empInfo, activeRole } = useAuthStore();
//   const navigate = useNavigate();
//   const { data: allLeads, refetch } = useFetchAllLeadsQuery({
//     page: paginationModel.page,
//     limit: paginationModel.pageSize,
//   });
//   const [allocateLead, { data: updatedLeads, isSuccess }] = useAllocateLeadMutation();

//   const totalLeads = useMemo(() => allLeads?.totalLeads || 0, [allLeads]);
//   const rows = useMemo(() => allLeads?.leads?.map(lead => ({
//     id: lead?._id,
//     name: `${lead?.fName} ${lead?.mName} ${lead?.lName}`,
//     mobile: lead?.mobile,
//     aadhaar: lead?.aadhaar,
//     pan: lead?.pan,
//     city: lead?.city,
//     state: lead?.state,
//     loanAmount: lead?.loanAmount,
//     salary: lead?.salary,
//     source: lead?.source,
//   })) || [], [allLeads]);

//   const handleAllocate = useCallback(() => {
//     if (selectedLeads.length > 0) {
//       allocateLead(selectedLeads);
//     }
//   }, [selectedLeads, allocateLead]);

//   const handleCheckboxChange = useCallback((id) => {
//     setSelectedLeads(prev => 
//       prev.includes(id) ? prev.filter(leadId => leadId !== id) : [...prev, id]
//     );
//   }, []);

//   const handlePageChange = useCallback((newPage) => {
//     setPaginationModel(prev => ({ ...prev, page: newPage }));
//     refetch({ page: newPage, limit: paginationModel.pageSize });
//   }, [paginationModel.pageSize, refetch]);

//   useEffect(() => {
//     if (isSuccess) {
//       navigate("/lead-process");
//     }
//   }, [isSuccess, navigate]);

//   return (
//     <div className="lead-new-container">
//       <Header />
//       <div className="lead-counter-container">
//         <div className="lead-counter">
//           New Leads: {totalLeads}
//         </div>
//         {activeRole === "screener" && (
//           <button className="allocate-button" onClick={handleAllocate}>
//             Allocate
//           </button>
//         )}
//       </div>
//       <div className="lead-table-container">
//         <table className="lead-table">
//           <thead>
//             <tr>
//               {activeRole === "screener" && <th></th>}
//               <th>Full Name</th>
//               <th>Mobile</th>
//               <th>Aadhaar No.</th>
//               <th>Pan No.</th>
//               <th>City</th>
//               <th>State</th>
//               <th>Loan Amount</th>
//               <th>Salary</th>
//               <th>Source</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row) => (
//               <tr key={row.id}>
//                 {activeRole === "screener" && (
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedLeads.includes(row.id)}
//                       onChange={() => handleCheckboxChange(row.id)}
//                     />
//                   </td>
//                 )}
//                 <td>{row.name}</td>
//                 <td>{row.mobile}</td>
//                 <td>{row.aadhaar}</td>
//                 <td>{row.pan}</td>
//                 <td>{row.city}</td>
//                 <td>{row.state}</td>
//                 <td>{row.loanAmount}</td>
//                 <td>{row.salary}</td>
//                 <td>{row.source}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="pagination">
//           <button
//             onClick={() => handlePageChange(paginationModel.page -  1)}
//             disabled={paginationModel.page === 1}
//           >
//             Previous
//           </button>
//           <span>Page {paginationModel.page}</span>
//           <button
//             onClick={() => handlePageChange(paginationModel.page + 1)}
//             disabled={rows.length < paginationModel.pageSize}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeadNew;