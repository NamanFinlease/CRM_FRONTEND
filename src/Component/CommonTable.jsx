import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './store/authStore';


const CommonTable = ({columns,rows,totalLeads,paginationModel,setPaginationModel}) => {
    const { activeRole } = useAuthStore()
    const navigate = useNavigate()
  
    const handleLeadClick = (lead) => {
        navigate(`/lead-profile/${lead.id}`)
    }
    const handlePageChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel)

    }



    return (
        <>
        {<div className="crm-container">
                <div
                    style={{
                        padding: '10px 20px',
                        fontWeight: 'bold',
                        background: '#transparent',
                        color: '#e38710',
                        margin: "20px 0px",
                        border: "1px solid #e38710",
                        borderRadius: '5px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                    }}

                >
                    Leads In Process : {totalLeads || 0} 
                </div>
            </div>}
            
            <div style={{ height: 500, width: '100%', padding: "0px 20px" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowCount={totalLeads}
                    // loading={isLoading}
                    pageSizeOptions={[5]}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={handlePageChange}
                    onRowClick={(params) => handleLeadClick(params)}
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
            </div>

        </>
    )
}

export default CommonTable
