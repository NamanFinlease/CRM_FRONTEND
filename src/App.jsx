import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Component/LoginPage';
import Dashboard from './Component/dashboard';
import DynamicTable from './Component/DynamicTable';
import TableForm from './Component/TableForm'; // Import the new TableForm component
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import 'bootstrap-icons/font/bootstrap-icons.css';
import SearchForm from './Component/SearchForm';
import ExportForm from './Component/ExportForm';
import Navbar from './Navbar/Navbar';
import Sidebar from './Navbar/Sidebar';
import { useEffect, useState } from 'react';
import MISReport from './Component/MisReort';
import ForgotPasswordPage from './Component/ForgotPasswordPage';
import ResetPasswordPage from './Component/ResetPasswordPage';
import UserProfileForm from './Component/UserProfileForm';
import AddEmployee from './Component/AddEmployee';
import ViewUsersForm from './Component/ViewUsersForm';
import ImportCSV from './Component/ImportCSV';
import AddBankDetails from './Component/AddBankDetails';
import AddHolidayDetails from './Component/AddHolidayDetails';
import LeadNew from './SubComponent/LeadNew';
import ProtectedRoute from './Component/ProtectedRoute';
import EmployeeList from './page/EmployeeList';
import ProcessingLeads from './page/ProcessingLeads';
import LeadDetails from './Component/LeadDetails';
import LeadProfile from './page/LeadProfile';
import HoldLead from './Component/leads/HoldLead';
import RejectedLeads from './Component/leads/RejectedLeads';
import ApplicationProfile from './Component/applications/ApplicationProfile';
import NewApplications from './Component/applications/NewApplications';
import ProcessingApplication from './Component/applications/ProcessingApplication';
import AadhaarOtpVerification from './Component/leads/AadhaarOtpVerification';
import CompareUserDetails from './Component/leads/PanCompare';
import HoldApplication from './Component/applications/HoldApplication';
import RejectedApplication from './Component/applications/RejectedApplication';
import PendingSanctions from './Component/sanction/PendingSanctions';
import SanctionProfile from './Component/sanction/SanctionProfile';
import Sanctioned from './Component/sanction/sanctioned';
import DisburseNew from './Component/disbursal/DisburseNew';
import DisbursalProcess from './Component/disbursal/DisburseProcessing';
import DisbursalProfile from './Component/disbursal/DisbursalProfile';
import DisbursePending from './Component/disbursal/DisbursePending';
import Disbursed from './Component/disbursal/Disbursed';
import DisbursalHold from './Component/disbursal/DisbursalHold';
import RejectedDisbursal from './Component/disbursal/RejectedDisbursal';
import RecommendedApplications from './Component/applications/RecommendedApplications';
import RepaymentForm from './Component/repayment/RepaymentForm';
import ActiveLeads from './Component/collection/ActiveLeads';
import PendingVerification from './Component/accounts/PendingVerification';
import CloseLeads from './Component/accounts/CloseLeads';
import CollectionProfile from './Component/collection/CollectionProfile';
import PaymentVerification from './Component/accounts/PaymentVerification';




function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, colorMode] = useMode();
  return (
    <Router>
      <ColorModeContext.Provider value={colorMode} >
        <ThemeProvider theme={theme} >
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* <Route path='/logout' element={<LogOutPage/>} /> */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

          </Routes>
          <>
            <ProtectedRoute>
              <Navbar />

              <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
              <div style={{ marginLeft: isSidebarOpen ? '250px' : '0px' }} >

                <Routes   >
                  {/* <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}> */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path='/add-holiday-details' element={<AddHolidayDetails />} />
                  <Route path="/user-profile" element={<UserProfileForm />} />
                  <Route path="/employees-list" element={<EmployeeList />} />
                  <Route path='/add-bank-details' element={<AddBankDetails />} />
                  <Route path='/import-csv' element={<ImportCSV />} />
                  <Route path='/view-user' element={<ViewUsersForm />} />
                  <Route path='/add-employee' element={<AddEmployee />} />
                  <Route path='lead-profile/:id' element={<LeadProfile />} />
                  <Route path="/lead-new" element={<LeadNew />} />
                  <Route path='/lead-process' element={<ProcessingLeads />} />
                  <Route path='/lead-process/:id' element={<LeadDetails />} />
                  <Route path="/lead-hold" element={<HoldLead />} />
                  <Route path="/rejected-leads" element={<RejectedLeads />} />
                  <Route path="/new-applications" element={<NewApplications />} />
                  <Route path="/application-profile/:id" element={<ApplicationProfile />} />
                  <Route path="/aadhaar-verification/:id" element={<AadhaarOtpVerification />} />
                  <Route path="/compare" element={<CompareUserDetails />} />
                  <Route path="/application-process" element={<ProcessingApplication />} />
                  <Route path="/application-hold" element={<HoldApplication />} />
               

                  <Route path="/rejected-Applications" element={<RejectedApplication />} />
                  <Route path="/sanction" element={<DynamicTable />} />
                  <Route path="/pending-sanctions" element={<PendingSanctions />} />
                  <Route path="/sanction-profile/:id" element={<SanctionProfile />} />
                  <Route path="/sanction-reject" element={<DynamicTable />} />
                  <Route path="/sanction-sentback" element={<DynamicTable />} />
                  <Route path="/sanctioned" element={<Sanctioned />} />
                  <Route path="/eSign-pending" element={<RecommendedApplications />} />
                  <Route path="/disbursal-new" element={<DisburseNew />} />
                  <Route path="/disbursal-process" element={<DisbursalProcess />} />
                  <Route path="/disbursal-profile/:id" element={<DisbursalProfile />} />
                  <Route path="/disbursal-pending" element={<DisbursePending />} />
                  <Route path="/disbursal-hold" element={<DisbursalHold />} />
                  <Route path="/rejected-disbursals" element={<RejectedDisbursal />} />
                  <Route path="/disbursed" element={<Disbursed />} />

                  {/* Collection Routes */}
                  <Route path="/activeLeads" element={<ActiveLeads />} />
                  {/* Accounts Routes */}
                  <Route path="pending-verification" element={ <PendingVerification /> } />
                  <Route path='close-leads' element={ <CloseLeads />  } />
                  <Route path="/pending-verification-profile/:id" element={<PaymentVerification />} />


                  <Route path="/pre-collection" element={<DynamicTable
                    header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
                    rows={[
                      ["1501", "Pre-Collection", "2024-09-09", "Online", "Liam Wilson", "California", "Sacramento", "Branch WW", "555-9999", "EFG123456U", "Individual", "Pre-Collection"],
                      ["1502", "Pre-Collection", "2024-09-08", "Offline", "Sophia Taylor", "New York", "Queens", "Branch XX", "555-0000", "HIJ789012V", "Business", "Pre-Collection"],
                      ["1503", "Pre-Collection", "2024-09-07", "Referral", "Noah Anderson", "Texas", "Houston", "Branch YY", "555-1111", "KLM345678W", "Individual", "Pre-Collection"],
                      ["1504", "Pre-Collection", "2024-09-06", "Online", "Emma Thomas", "Florida", "Tampa", "Branch ZZ", "555-2222", "NOP901234X", "Business", "Pre-Collection"]
                    ]} />} />
                  <Route path="/collection-pending" element={<DynamicTable
                    header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
                    rows={[
                      ["1601", "Pending Collection", "2024-09-09", "Online", "Oliver Harris", "California", "San Diego", "Branch AAA", "555-3333", "QRS123456Y", "Individual", "Pending Collection"],
                      ["1602", "Pending Collection", "2024-09-08", "Offline", "Mia Clark", "New York", "Bronx", "Branch BBB", "555-4444", "TUV789012Z", "Business", "Pending Collection"],
                      ["1603", "Pending Collection", "2024-09-07", "Referral", "Elijah Lewis", "Texas", "Dallas", "Branch CCC", "555-5555", "WXY345678A", "Individual", "Pending Collection"],
                      ["1604", "Pending Collection", "2024-09-06", "Online", "Isabella Walker", "Florida", "Miami", "Branch DDD", "555-6666", "ZAB901234B", "Business", "Pending Collection"]
                    ]} />} />
                  <Route path="/write-off" element={<DynamicTable
                    header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
                    rows={[
                      ["1701", "Write-Off", "2024-09-09", "Online", "Lucas Johnson", "California", "San Jose", "Branch EEE", "555-7777", "CDE123456F", "Individual", "Write-Off"],
                      ["1702", "Write-Off", "2024-09-08", "Offline", "Ava Robinson", "New York", "Brooklyn", "Branch FFF", "555-8888", "FGH789012G", "Business", "Write-Off"],
                      ["1703", "Write-Off", "2024-09-07", "Referral", "Mason Martinez", "Texas", "Austin", "Branch GGG", "555-9999", "IJK345678H", "Individual", "Write-Off"],
                      ["1704", "Write-Off", "2024-09-06", "Online", "Sophia Lopez", "Florida", "Orlando", "Branch HHH", "555-0000", "LMN901234I", "Business", "Write-Off"]
                    ]} />} />
                  <Route path="/settlement" element={<DynamicTable
                    header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
                    rows={[
                      ["1801", "Settlement", "2024-09-09", "Online", "Charlotte White", "California", "Santa Clara", "Branch III", "555-1111", "NOP123456J", "Individual", "Settlement"],
                      ["1802", "Settlement", "2024-09-08", "Offline", "Ethan King", "New York", "Manhattan", "Branch JJJ", "555-2222", "QRS789012K", "Business", "Settlement"],
                      ["1803", "Settlement", "2024-09-07", "Referral", "Amelia Adams", "Texas", "Dallas", "Branch KKK", "555-3333", "TUV345678L", "Individual", "Settlement"],
                      ["1804", "Settlement", "2024-09-06", "Online", "James Clark", "Florida", "Orlando", "Branch LLL", "555-4444", "WXY901234M", "Business", "Settlement"]
                    ]} />} />

                  <Route path="/form" element={<TableForm />} /> {/* Route for TableForm */}
                  <Route path="/search" element={<SearchForm />} />
                  <Route path="/export-form" element={<ExportForm />} />
                  <Route path="/mis-report" element={<MISReport />} />
                  {/* </Route> */}


                </Routes>
              </div>
            </ProtectedRoute>
            {/* <Navbar /> */}

          </>

        </ThemeProvider>
      </ColorModeContext.Provider>

    </Router>
  );
}

export default App;