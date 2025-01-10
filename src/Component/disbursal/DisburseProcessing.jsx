import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useAllocatedDisbursalsQuery } from '../../Service/applicationQueries';
import useAuthStore from '../store/authStore';
import CommonTable from '../CommonTable';



const DisbursalProcess = () => {
    const [disbursals, setDisbursals] = useState()
    const [totalDisbursals, setTotalDisbursals] = useState()
    const [id, setId] = useState(null)
    const { empInfo,activeRole } = useAuthStore()
    const navigate = useNavigate()
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const { data, isSuccess, refetch } = useAllocatedDisbursalsQuery({ page: paginationModel.page + 1, limit: paginationModel.pageSize })
    // const {data:applicationData,isSuccess:applicationSuccess} = useFetchSingleApplicationQuery(id,{skip:id===null})
    const handlePageChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel)

    }

    const handleLeadClick = (disbursal) => {
        navigate(`/disbursal-profile/${disbursal.id}`)
    }



    const columns = [
        { field: 'name', headerName: 'Full Name', width: 200 },
        { field: 'mobile', headerName: 'Mobile', width: 150 },
        { field: 'loanNo', headerName: 'Loan Number', width: 150 },
        { field: 'aadhaar', headerName: 'Aadhaar No.', width: 150 },
        { field: 'pan', headerName: 'Pan No.', width: 150 },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'state', headerName: 'State', width: 150 },
        { field: 'loanAmount', headerName: 'Loan Amount', width: 150 },
        { field: 'salary', headerName: 'Salary', width: 150 },
        { field: 'source', headerName: 'Source', width: 150 },
        ...(activeRole === "disbursalHead" || activeRole === "admin"
            ? [{ field: 'disbursalManagerId', headerName: 'Disbursal Manager', width: 150 }]
            : [])
    ];

    const rows = disbursals?.map(disbursal => ({
        id: disbursal?._id,
        name: ` ${disbursal?.sanction?.application?.lead?.fName}  ${disbursal?.sanction?.application?.lead?.mName} ${disbursal?.sanction?.application?.lead?.lName}`,
        mobile: disbursal?.sanction?.application?.lead?.mobile,
        loanNo: disbursal?.loanNo,
        aadhaar: disbursal?.sanction?.application?.lead?.aadhaar,
        pan: disbursal?.sanction?.application?.lead?.pan,
        city: disbursal?.sanction?.application?.lead?.city,
        state: disbursal?.sanction?.application?.lead?.state,
        loanAmount: disbursal?.sanction?.application?.lead?.loanAmount,
        salary: disbursal?.sanction?.application?.lead?.salary,
        source: disbursal?.sanction?.application?.lead?.source,
        ...((activeRole === "disbursalHead" || activeRole === "admin") &&
            { disbursalManagerId: `${disbursal?.sanction?.application?.disbursalManagerId?.fName}${disbursal?.sanction?.application?.creditManagerId?.mName ? ` ${disbursal?.sanction?.application?.creditManagerId?.mName}` : ``} ${disbursal?.sanction?.application?.creditManagerId?.lName}`, })

    }));

    
    useEffect(() => {
      refetch({ page: paginationModel.page + 1, limit: paginationModel.pageSize });
  }, [paginationModel]);

  useEffect(() => {
      if (data) {
          setDisbursals(data.disbursals)
          setTotalDisbursals(data?.totalDisbursals)
      }
  }, [isSuccess, data])

    return (
        <>
            {/* {columns &&
                <CommonTable
                    columns={columns}
                    rows={rows}
                    totalLeads={totalLeads}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                />

            } */}
            <CommonTable
                columns={columns}
                rows={rows}
                totalRows={totalDisbursals}
                paginationModel={paginationModel}
                onPageChange={handlePageChange}
                onRowClick={handleLeadClick}
                title="Disbursals In Process"
                // actionButton={true}
                // actionButtonText="Allocate Leads"
                // onActionButtonClick={handleActionButtonClick}
            />
        </>
    )
}

export default DisbursalProcess

