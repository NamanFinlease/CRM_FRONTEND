import React, { useEffect, useState } from 'react';
import { Paper, Box, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchActiveLeadQuery } from '../../Service/LMSQueries';
import useAuthStore from '../store/authStore';
import useStore from '../../Store';
import BarButtons from '../BarButtons';
import ApplicantProfileData from '../applicantProfileData';
import InternalDedupe from '../InternalDedupe';
import ApplicationLogHistory from '../ApplicationLogHistory';
import PersonalDetails from '../applications/PersonalDetails';
import BankDetails from '../applications/BankDetails';
import VerifyContactDetails from '../leads/DetailsVerification';
import UploadDocuments from '../UploadDocuments';
import Cam from '../applications/Cam';
import DisburseInfo from '../disbursal/DisburseInfo';



const barButtonOptions = ['Application', 'Documents', 'Personal', 'Banking', 'Verification', 'Cam', 'Disbursal',"collection"]

const CollectionProfile = () => {
  const { id } = useParams();
  const [collectionData, setCollectionData] = useState()
  const { empInfo, activeRole } = useAuthStore()
  const { setApplicationProfile } = useStore();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("application");

  const { data, isSuccess, isError, error } = useFetchActiveLeadQuery(id, { skip: id === null });


  useEffect(() => {
    if (isSuccess && data) {
      setCollectionData(data?.disbursal?.sanction)
      setApplicationProfile(data?.disbursal);
    }
    if (isSuccess && data?.sanction?.application?.lead?.document?.length) {
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
            {collectionData?.application?.lead?._id &&
              <>
                <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px', borderRadius: '10px' }}>
                  <ApplicantProfileData leadData={collectionData?.application?.lead} />
                </Paper>
                <InternalDedupe id={collectionData?.application?.lead?._id} />
                <ApplicationLogHistory id={collectionData?.application?.lead?._id} />

              </>

            }


          </>
        }

        {collectionData && Object.keys(collectionData).length > 0 &&
          <>
            {currentPage === "personal" && <PersonalDetails id={collectionData?.application?.applicant} />}
            {currentPage === "banking" &&
              <BankDetails id={collectionData?.application?.applicant} />}

            {currentPage === "verification" &&
              <VerifyContactDetails
                isMobileVerified={collectionData?.application?.lead?.isMobileVerified}
                isEmailVerified={collectionData?.application?.lead?.isEmailVerified}
                isAadhaarVerified={collectionData?.application?.lead?.isAadhaarVerified}
                isPanVerified={collectionData?.application?.lead?.isPanVerified}
              />
            }
            {currentPage === "documents" &&
              <UploadDocuments
                leadData={collectionData?.application?.lead}
              />
            }

            {currentPage === "cam" && <Cam id={collectionData?.application?._id} />}
            {currentPage === "disbursal" && <DisburseInfo disburse={collectionData} />}
           
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

export default CollectionProfile;

