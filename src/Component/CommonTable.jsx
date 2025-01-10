import React, { useEffect, useState } from 'react';
import { tokens } from '../theme';
import { useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const CommonTable = ({
  columns,
  rows,
  totalRows,
  paginationModel,
  onPageChange,
  onRowClick,
  title,
  actionButton,
  onAllocateButtonClick,
  onExportButtonClick,
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


  const handleActionButtonClick = (param) => {
    if (param === "allocate") {
      onAllocateButtonClick();
      console.log(onAllocateButtonClick())
    }else{
      onExportButtonClick();
      console.log(onExportButtonClick())
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

      {actionButton && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            margin: '0px 20px 0px 20px',
          }}
        >
          {(activeRole === "disbursalManager" || activeRole === "disbursalHead" || activeRole === "admin") && <button
            onClick={() => handleActionButtonClick('exportCSV')}
            style={{
                position : "absolute",
                right : "150px",
                top:"90px",
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
            <FileDownloadIcon style={{ marginRight: '5px' }}/>
            Export CSV
          </button>}


          {(activeRole === "screener" || activeRole === "creditManager" || activeRole === "disbursalManager") && <button
            onClick={() => handleActionButtonClick('allocate')}
            style={{
                position : "absolute",
                right : "20px",
                top:"90px",
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
            Allocate
          </button>}
        </div>
      )}

      <div style={{ height: 500, width: '100%', padding: '40px 20px 0px 20px', }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={totalRows}
          pageSizeOptions={[10]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={handlePageChange}
          onRowClick={handleRowClick}
          sx={{
            color: colors.primary['primaryshade'], // Default text color for rows
            '& .MuiDataGrid-columnHeaders .css-yseucu-MuiDataGrid-columnHeaderRow': {
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
