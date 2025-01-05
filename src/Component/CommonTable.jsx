// import React, { useEffect, useState } from 'react'
// import { tokens } from '../theme';
// import { useTheme } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { useNavigate } from 'react-router-dom';
// import useAuthStore from './store/authStore';


// const CommonTable = ({columns,rows,totalLeads,paginationModel,setPaginationModel}) => {
//     const { activeRole } = useAuthStore()
//     const navigate = useNavigate()

//     // Color theme
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
  
//     const handleLeadClick = (lead) => {
//         navigate(`/lead-profile/${lead.id}`)
//     }
//     const handlePageChange = (newPaginationModel) => {
//         setPaginationModel(newPaginationModel)

//     }

//     // useEffect(() => {
//     //     refetch({ page: paginationModel.page + 1, limit: paginationModel.pageSize });
//     // }, [paginationModel]);



//     return (
//         <>
//         {<div className="crm-container">
//                 <div
//                     style={{
//                         padding: '10px 20px',
//                         fontWeight: 'bold',
//                         background: '#transparent',
//                         color: colors.primary["primaryshade"],
//                         margin: "20px 0px",
//                         border: `1px solid ${colors.primary["primaryshade"]}`,
//                         borderRadius: '5px',
//                         boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//                         cursor: 'pointer',
//                     }}

//                 >
//                     Leads In Process : {totalLeads || 0}
//                 </div>
//             </div>}
            
//             <div style={{ height: 500, width: '100%', padding: "0px 20px" }}>
//                 <DataGrid
//                     rows={rows}
//                     columns={columns}
//                     rowCount={totalLeads}
//                     // loading={isLoading}
//                     pageSizeOptions={[5]}
//                     paginationModel={paginationModel}
//                     paginationMode="server"
//                     onPaginationModelChange={handlePageChange}
//                     onRowClick={(params) => handleLeadClick(params)}
//                     sx={{
//                         color: colors.white["whiteshade"],  // Default text color for rows
//                         '& .MuiDataGrid-columnHeaders .css-yrdy0g-MuiDataGrid-columnHeaderRow': {
//                             backgroundColor: colors.primary["primaryshade"],  // Optional: Header background color
//                             color: colors.white["whiteshade"]  // White text for the headers
//                         },
//                         '& .MuiDataGrid-footerContainer': {
//                             backgroundColor: colors.primary["primaryshade"],  // Footer background color
//                             color: colors.white["whiteshade"],  // White text for the footer
//                         },
//                         '& .MuiDataGrid-row:hover': {
//                             cursor: 'pointer',
//                         },
//                     }}
//                 />
//             </div>

//         </>
//     )
// }

// export default CommonTable



import React, { useEffect, useState } from 'react';
import { tokens } from '../theme';
import { useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './store/authStore';

const CommonTable = ({
  columns,
  rows,
  totalRows,
  paginationModel,
  onPageChange,
  onRowClick,
  title,
  actionButton,
  actionButtonText,
  onActionButtonClick,
}) => {
  const { activeRole } = useAuthStore();
  const navigate = useNavigate();

  // Color theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  const handleRowClick = (params) => {
    if (onRowClick) {
      onRowClick(params);
    }
  };

  const handleActionButtonClick = () => {
    if (onActionButtonClick) {
      onActionButtonClick();
    }
  };

  return (  
    <div>
      {title && (
        <div
          style={{
            position:"relative",
            top:"20px",
            left:"100px",
            padding: '10px 20px',
            fontWeight: 'bold',
            backgroundColor: 'transparent',
            color: colors.primary['primaryshade'],
            border: `1px solid ${colors.primary['primaryshade']}`,
            borderRadius: '5px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            display:"inline-block",
          }}
        >
          {title} : {totalRows || 0}
        </div>
      )}

      {/* {actionButton && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            margin: '0px 20px 20px 20px',
          }}
        >
          <button
            onClick={handleActionButtonClick}
            style={{
                fontWeight: 'bold',
                padding: '10px 20px',
                backgroundColor: 'transparent',
                color: colors.green["greenshade"],
                border: `1px solid ${colors.green["greenshade"]}`,
                borderRadius: '5px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
            }}
          >
            {actionButtonText}
          </button>
        </div>
      )} */}

      <div style={{ height: 600, width: '100%', padding: '40px 20px 0px 20px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={totalRows}
          pageSizeOptions={[5]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={handlePageChange}
          onRowClick={handleRowClick}
          sx={{
            color: colors.primary['primaryshade'], // Default text color for rows
            '& .MuiDataGrid-columnHeaders .css-yrdy0g-MuiDataGrid-columnHeaderRow': {
              backgroundColor: colors.primary['primaryshade'], // Optional: Header background color
              color: colors.white['whiteshade'], // White text for the headers
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: colors.primary['primaryshade'], // Footer background color
              color: colors.white['whiteshade'], // White text for the footer
            },
            '& .MuiDataGrid-row:hover': {
              cursor: 'pointer',
            },
          }}
        />
      </div>
    </div>
  );
};

export default CommonTable;
