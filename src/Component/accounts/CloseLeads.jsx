import React, { useState, useEffect } from "react";
import { tokens } from '../../theme';
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useClosedLeadsQuery } from "../../Service/LMSQueries";
import { DataGrid } from "@mui/x-data-grid";
import { Alert, useTheme} from '@mui/material';
import CommonTable from "../CommonTable";

function CloseLeads() {
    const [closedLeads, setClosedLeads] = useState();
    const [totalClosedLeads, setTotalClosedLeads] = useState();
    const { empInfo, activeRole } = useAuthStore();
    const navigate = useNavigate();
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    //color theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { data, isSuccess, isError, error, refetch } = useClosedLeadsQuery({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
    });

    const handlePageChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel);
    };

    const columns = [
        { field: "name", headerName: "Full Name", width: 200 },
        { field: "mobile", headerName: "Mobile", width: 150 },
        { field: "aadhaar", headerName: "Aadhaar No.", width: 150 },
        { field: "pan", headerName: "Pan No.", width: 150 },
        { field: "city", headerName: "City", width: 150 },
        { field: "state", headerName: "State", width: 150 },
        { field: "loanAmount", headerName: "Loan Amount", width: 150 },
        { field: "salary", headerName: "Salary", width: 150 },
        { field: "source", headerName: "Source", width: 150 },
        ...(activeRole === "collectionHead" || activeRole === "admin"
            ? [
                  {
                      field: "disbursalHead",
                      headerName: "Disbursed By",
                      width: 150,
                  },
              ]
            : []),
    ];
    let subrows;
    const rows = closedLeads?.map((closedLead) => {
        subrows = closedLead?.data.map((lead) => ({
            id: lead?.loanNo || 0,
            name: ` ${lead?.disbursal?.sanction?.application?.lead?.fName}  ${lead?.disbursal?.sanction?.application?.lead?.mName} ${lead?.disbursal?.sanction?.application?.lead?.lName}`,
            mobile: lead?.disbursal?.sanction?.application?.lead?.mobile,
            aadhaar: lead?.disbursal?.sanction?.application?.lead?.aadhaar,
            pan: lead?.disbursal?.sanction?.application?.lead?.pan,
            city: lead?.disbursal?.sanction?.application?.lead?.city,
            state: lead?.disbursal?.sanction?.application?.lead?.state,
            loanAmount:
                lead?.disbursal?.sanction?.application?.lead?.loanAmount,
            salary: lead?.disbursal?.sanction?.application?.lead?.salary,
            source: lead?.disbursal?.sanction?.application?.lead?.source,
            ...((activeRole === "accountExecutive" ||
                activeRole === "admin") && {
                disbursalHead: `${lead?.disbursal?.disbursedBy?.fName}${
                    lead?.disbursal?.disbursedBy?.mName
                        ? ` ${lead?.disbursal?.disbursedBy?.mName}`
                        : ``
                } ${lead?.disbursal?.disbursedBy?.lName}`,
            }),
        }));
    });

    useEffect(() => {
        refetch({
            page: paginationModel.page + 1,
            limit: paginationModel.pageSize,
        });
    }, [paginationModel]);

    useEffect(() => {
        if (data) {
            setClosedLeads(data?.closedLeads);
            setTotalClosedLeads(data?.totalClosedLeads);
        }
    }, [isSuccess, data]);

    return (   
    <>
        <CommonTable
            columns={columns}
            rows={subrows}
            totalRows={totalClosedLeads}
            paginationModel={paginationModel}
            onPageChange={handlePageChange}
            // onRowClick={handleLeadClick}
            title="Closed Leads"
            // actionButton={true}
            // actionButtonText="Allocate Leads"
            // onActionButtonClick={handleActionButtonClick}
        />

        {isError && (
            <Alert severity="error" style={{ marginTop: "10px" }}>
                {error?.message}
            </Alert>
        )}
    </>
    );
}

export default CloseLeads;
