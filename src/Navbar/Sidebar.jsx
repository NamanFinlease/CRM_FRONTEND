import React, { useState } from "react";
import { tokens } from "../theme";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import useAuthStore from "../Component/store/authStore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { KeyboardDoubleArrowLeftIcon, KeyboardDoubleArrowRightIcon, RecordVoiceOverRoundedIcon, WebAssetRoundedIcon, GavelRoundedIcon, PublicRoundedIcon, RuleFolderRoundedIcon, CollectionsBookmarkRoundedIcon, ManageAccountsRoundedIcon } from '@mui/icons-material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import WebAssetRoundedIcon from '@mui/icons-material/WebAssetRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import RuleFolderRoundedIcon from '@mui/icons-material/RuleFolderRounded';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import FolderSpecialRoundedIcon from '@mui/icons-material/FolderSpecialRounded';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
const { empInfo, activeRole } = useAuthStore();

// Define accordion items based on active role
const accordionItems = [
  {
    id: "lead",
    title: "Lead",
    icon: <RecordVoiceOverRoundedIcon/>,
    items: [
      { text: "New Lead", link: "/lead-new" },
      { text: "Leads-Inprocess", link: "/lead-process" },
      { text: "Hold Lead", link: "/lead-hold" },
      { text: "Rejected Lead", link: "/rejected-leads" },
    ],
    roles: ["screener", "admin", "sanctionHead"],
  },
  {
    id: "application",
    title: "Application",
    icon: <WebAssetRoundedIcon/>,
    items: [
      { text: "New", link: "/new-applications" },
      { text: "Inprocess", link: "/application-process" },
    ],
    roles: ["creditManager", "sanctionHead", "admin"],
  },
  {
    id: "sanction",
    title: "Sanction",
    icon: <GavelRoundedIcon/>,
    items: [
      { text: "Pending Sanctions", link: "/pending-sanctions" },
      { text: "Sanctioned", link: "/sanctioned" },
    ],
    roles: ["sanctionHead", "admin"],
  },
  {
    id: "globalApplication",
    title: "Global Application",
    icon: <PublicRoundedIcon/>,
    items: [
      { text: "E-Sign Pending", link: "/eSign-pending" },
      { text: "Hold", link: "/application-hold" },
      { text: "Rejected Applications", link: "/rejected-applications" },
    ],
    roles: ["creditManager", "sanctionHead", "admin"],
  },
  {
    id: "disbursal",
    title: "Disbursal",
    icon: <RuleFolderRoundedIcon/>,
    items: [
      { text: "New", link: "/disbursal-new" },
      { text: "Disbursals In Process", link: "/disbursal-process" },
      { text: "Hold", link: "/disbursal-hold" },
      { text: "Rejected", link: "/rejected-disbursals" },
      { text: "Pending Disbursals", link: "/disbursal-pending" },
      { text: "Disbursed", link: "/disbursed" },
    ],
    roles: ["disbursalManager", "disbursalHead", "admin"],
  },
  {
    id: "preCollection",
    title: "Pre-Collection",
    icon: <FolderSpecialRoundedIcon/>,
    items: [
      { text: "Active Leads", link: "/activeLeads" },
      { text: "Verification Pending", link: "/pending-verification" },
      { text: "Closed Leads", link: "/closed-leads" },
    ],
    roles: ["collectionExecutive", "collectionHead", "admin"],
  },
  {
    id: "collection",
    title: "Collection",
    icon: <CollectionsBookmarkRoundedIcon/>,
    items: [
      { text: "Active Leads", link: "/activeLeads" },
      { text: "Verification Pending", link: "/pending-verification" },
      { text: "Closed Leads", link: "/closed-leads" },
    ],
    roles: ["collectionExecutive", "collectionHead", "admin"],
  },
  {
    id: "accounts",
    title: "Accounts",
    icon: <ManageAccountsRoundedIcon/>,
    items: [
      { text: "Pending Verification", link: "/pending-verification" },
      { text: "Closed Leads", link: "/closed-leads" },
    ],
    roles: ["accountExecutive", "accountHead", "admin"],
  },
];

// Find the first accordion item that matches the active role
const firstAccordionForRole = accordionItems.find((item) =>
  item.roles.includes(activeRole)
);

// State to control the expanded accordions
const [expanded, setExpanded] = useState(firstAccordionForRole);

const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};

// Color theme
const theme = useTheme();
const colors = tokens(theme.palette.mode);

// Function to handle accordion toggle
const handleAccordionToggle = (panel) => (event, isExpanded) => {
  setExpanded(isExpanded ? panel : false);
};

  return (
    <>
    <div sx={{background: colors.white["whiteshade"]}}>
      <Box
          sx={{
              width: isSidebarOpen ? 250 : 0,
              height: "100vh",
              color: colors.white["whiteshade"],
              position: "fixed",
              top: 70,
              left: 0,
              display: "flex",
              flexDirection: "column",
              transition: "width 0.3s ease",
              overflowY: "auto",
              boxShadow: isSidebarOpen
                  ? "0px 10px 20px rgba(227, 135, 16, 0.6)"
                  : "none",
              zIndex: 1001,
              background: `linear-gradient(90deg, ${colors.white["whiteshade"]}  1%, ${colors.primary["primaryshadeopacity"]} 250%), ${colors.white["whiteshade"]}`,
              borderRadius : "5px",
              borderRight: `3px solid ${colors.primary["primaryshade"]}`,
      }}
      >
      <IconButton 
      onClick={toggleSidebar}
      sx={{
          position: "fixed",
          top: 90,
          left: isSidebarOpen ? 250 : 10,
          color: colors.black["blackshade"],
          background: colors.white["whiteshade"],
          border:`3px solid ${colors.primary["primaryshade"]}`,
          borderRadius: 1,
          transition: "background-color 0.3s, color 0.3s, left 0.3s",
          zIndex: 1001,
          ":hover":{
              background:colors.primary["primaryshade"],
          }
      }}
      >
          {isSidebarOpen ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
      </IconButton>

        <List>
          {accordionItems.map((item) => {
            if (item.roles.includes(activeRole)) {
              return (
                <Accordion
                  key={item.id}
                  expanded={expanded === item.id}
                  onChange={handleAccordionToggle(item.id)}
                  disableGutters
                  elevation={0}
                  sx={{
                      margin:"5px 20px",
                      color: colors.white["whiteshade"],
                  }}
                >
                  <AccordionSummary 
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                          background: colors.primary["primaryshade"],
                          borderRadius:"5px",
                          boxShadow:"0px 0px 10px 1px rgba(227, 135, 16, 0.6)",
                          "&:hover": {
                            background:colors.primary["primaryshade"],
                          }
                      }}
                  >
                    <Box sx={{display:"flex"}}>
                      {item.icon}
                      <Typography sx={{marginLeft:"10px"}}>{item.title}</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails
                      sx={{
                          boxShadow:"0px 0px 10px 1px rgba(227, 135, 16, 0.6)",
                          borderRadius:"5px",
                      }}>
                      <List>
                      {item.items.map((subItem) => (
                          <ListItem button 
                              component={NavLink} 
                              to={subItem.link} 
                              key={subItem.text}
                              sx={{
                                  color: colors.primary["primaryshade"],
                                  textDecoration: "none",
                                  padding: "10px 15px",
                                  "&.active":{
                                      fontWeight: "bold",
                                      borderLeft:`4px solid ${colors.primary["primaryshade"]}`,
                                      borderTopLeftRadius:"10px",
                                      borderBottomLeftRadius:"10px",
                                      "&::after":{
                                          content : '""',
                                          position : "absolute",
                                          right:"20px",
                                          top:"20px",
                                          width:"10px",
                                          height:"10px",
                                          borderRadius:"50%",
                                          backgroundColor: colors.primary["primaryshade"],
                                          animation:"blink 1s infinite",
                                      },
                                  },
                                  '@keyframes blink':{
                                      "0%":{backgroundColor:colors.white["whiteshade"]},
                                      "100%":{backgroundColor:colors.primary["primaryshade"]},
                                  }
                              }}
                          >
                          <ListItemText sx={{color:colors.primary["primaryshade"]}} primary={subItem.text} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              );
            }
            return null;
          })}
        </List>
      </Box>
      </div>
    </>
  );
};

export default Sidebar