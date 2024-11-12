import React, { useEffect, useState } from 'react';
import { Paper, Box, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ApplicantProfileData from '../applicantProfileData';
import InternalDedupe from '../InternalDedupe';
import ApplicationLogHistory from '../ApplicationLogHistory';
import BarButtons from '../BarButtons';
import LeadDetails from '../LeadDetails';
import PersonalDetails from '../applications/PersonalDetails';
import BankDetails from '../applications/BankDetails';
import VerifyContactDetails from '../leads/DetailsVerification';
import UploadDocuments from '../UploadDocuments';
import Cam from '../applications/Cam';
import { useDisbursalProfileQuery } from '../../queries/applicationQueries';
import useAuthStore from '../store/authStore';
import useStore from '../../Store';
import DisburseInfo from './DisburseInfo';
import ActionButton from '../actionButton';



const barButtonOptions = ['Application', 'Documents', 'Personal', 'Banking', 'Verification', 'Cam', 'Disbursal']

const DisbursalProfile = () => {
  const { id } = useParams();
  const [disbursalData, setDisbursalData] = useState()
  const { empInfo, activeRole } = useAuthStore()
  const { setApplicationProfile } = useStore();
  const navigate = useNavigate();
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [currentPage, setCurrentPage] = useState("application");
  const [leadEdit, setLeadEdit] = useState(false);

  const { data, isSuccess, isError, error } = useDisbursalProfileQuery(id, { skip: id === null });


  useEffect(() => {
    if (isSuccess && data) {
      setDisbursalData(data?.disbursal?.application)
      setApplicationProfile(data?.disbursal);
    }
    if (isSuccess && data?.application?.lead?.document?.length) {
      setUploadedDocs(data?.application?.lead?.document.map(doc => doc.type));
    }
  }, [isSuccess, data]);

  return (
    <div className="crm-container" style={{ padding: '10px' }}>

      <div className='p-3'>
        <BarButtons
          barButtonOptions={barButtonOptions}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {currentPage === "application" &&
          <>
            {disbursalData?.lead?._id &&
              <>
                <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px', borderRadius: '10px' }}>
                  <ApplicantProfileData leadData={disbursalData?.lead} />
                </Paper>
                <InternalDedupe id={disbursalData?.lead?._id} />
                <ApplicationLogHistory id={disbursalData?.lead?._id} />

              </>

            }


          </>
        }

        {data && Object.keys(data).length > 0 &&
          <>
            {currentPage === "personal" && <PersonalDetails id={disbursalData?.applicant} />}
            {currentPage === "banking" &&
              <BankDetails id={disbursalData?.applicant} />}

            {currentPage === "verification" &&
              <VerifyContactDetails
                isMobileVerified={disbursalData?.lead?.isMobileVerified}
                isEmailVerified={disbursalData?.lead?.isEmailVerified}
                isAadhaarVerified={disbursalData?.lead?.isAadhaarVerified}
                isPanVerified={disbursalData?.lead?.isPanVerified}
              />
            }
            {currentPage === "documents" &&
              <UploadDocuments
                leadData={disbursalData?.lead}
                setUploadedDocs={setUploadedDocs}
                uploadedDocs={uploadedDocs}
              />
            }

            {currentPage === "cam" && <Cam id={disbursalData._id} />}
            {currentPage === "disbursal" && <DisburseInfo disburse={disbursalData} />}
           
          </>

        }


        {(isError) &&
          <Alert severity="error" style={{ marginTop: "10px" }}>
            {error?.data?.message}
          </Alert>
        }
      </div>
    </div>
  );
};

export default DisbursalProfile;

