import React, { useState } from 'react'
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import {  usePendingVerificationQuery  , useVerifyPendingLeadMutation } from '../../Service/LMSQueries'

function PendingVerification() {

    const [pendingLeads,setPendingLeads] = useState();
    const [totalPendingLeads,setTotalPendingLeads] = useState();
    const { empInfo,activeRole}=useAuthStore();
    const navigate = useNavigate();
    const [paginationModel , setPaginationModel] = useState({
        page : 0,
        pageSize : 10
    });
    const { data , isSuccess,isError,error,refresh } = usePendingVerificationQuery({  page : paginationModel.page +1 , limit : paginationModel.pageSize})

    const handlePageChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel)

    }

    const handleLeadClick = (disbursal) => {
        navigate(`/pending-verification-profile/${pendingVerification.id}`)
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

    const rows = activeLeads?.map(activeLead => ({
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
        ...((activeRole === "collectionHead" || activeRole === "admin") &&
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
      }, [isSuccess, data])
  return (
    <div>PendingVerification</div>
  )
}

export default PendingVerification