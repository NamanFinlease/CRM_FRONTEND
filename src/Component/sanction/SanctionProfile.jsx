import React, { useEffect, useState } from 'react';
import {Paper, Box, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useLazySanctionPreviewQuery, useSanctionProfileQuery } from '../../queries/applicationQueries';
import useAuthStore from '../store/authStore';
import useStore from '../../Store';
import BarButtons from '../BarButtons';
import InternalDedupe from '../InternalDedupe';
import ApplicationLogHistory from '../ApplicationLogHistory';
import ActionButton from '../actionButton';
import PersonalDetails from '../applications/PersonalDetails';
import BankDetails from '../applications/BankDetails';
import UploadDocuments from '../UploadDocuments';
import Cam from '../applications/Cam'
import LoanSanctionPreview from './LoanSanctionPreview'
import ApplicantProfileData from '../applicantProfileData';


const barButtonOptions = ['Application', 'Documents', 'Personal', 'Banking', 'Verification', 'Cam']

const SanctionProfile = () => {
  const { id } = useParams();
  const { empInfo } = useAuthStore()
  const { setApplicationProfile } = useStore();
  const [previewSanction, setPreviewSanction] = useState(false)
  const [forceRender,setForceRender] = useState(false)
  const navigate = useNavigate();
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [currentPage, setCurrentPage] = useState("application");

  const { data, isSuccess, isError, error } = useSanctionProfileQuery(id, { skip: id === null });
  const [sanctionPreview, { data: previewData, isSuccess: previewSuccess, isLoading:previewLoading,reset, isError: isPreviewError, error: previewError }] = useLazySanctionPreviewQuery()




  useEffect(() => {
    if (isSuccess) {
      setApplicationProfile(data);
    }
    if (isSuccess && data?.lead?.document?.length) {
      setUploadedDocs(data?.lead?.document.map(doc => doc.type));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (previewSuccess && previewData && forceRender  ) {
      setPreviewSanction(true);
      setForceRender(false)
    }

  }, [previewSuccess,previewData,forceRender]);

  return (
    <div className="crm-container" style={{ padding: '10px' }} key={forceRender}>
      {previewSanction ? previewLoading ? <h1> .....Loading data</h1>:
        <LoanSanctionPreview 
        id={id} 
        preview={previewSanction} 
        setPreview={setPreviewSanction} 
        previewData={previewData} 
        />
        :
        <>

          <div className='p-3'>
            <BarButtons
              barButtonOptions={barButtonOptions}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />

            {currentPage === "application" &&
              <>
                <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px', borderRadius: '10px' }}>
                  <ApplicantProfileData leadData={data?.lead} />
                </Paper>
                {data?.lead?._id &&
                  <>
                    <InternalDedupe id={data?.lead?._id} />
                    <ApplicationLogHistory id={data?.lead?._id} />

                    {/* Action Buttons */}

                    {!data.isRejected && <Box display="flex" justifyContent="center" sx={{ marginTop: '20px' }}>
                      <ActionButton
                        id={data._id}
                        isHold={data.onHold}
                        setPreviewSanction={setPreviewSanction}
                        sanctionPreview={sanctionPreview}
                        setForceRender={setForceRender}
                        
                      />

                    </Box>}
                  </>
                }
                {(isPreviewError || isError) &&
                  <Alert severity="error" style={{ marginTop: "10px" }}>
                    {error?.data?.message} || {previewError?.data?.message}
                  </Alert>
                }
              </>
            }
            {data && Object.keys(data).length > 0 &&
              <>
                {currentPage === "personal" && <PersonalDetails id={data.applicant} />}
                {currentPage === "banking" &&
                  <BankDetails id={data?.applicant} />}

                {currentPage === "documents" && <UploadDocuments leadData={data?.lead} setUploadedDocs={setUploadedDocs} uploadedDocs={uploadedDocs} />}

                {currentPage === "cam" && <Cam />}
              </>

            }


          </div>
        </>
      }


    </div>
  );
};

export default SanctionProfile;
