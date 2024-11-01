import React, { useState } from 'react';
import {
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton
} from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import useAuthStore from '../Component/store/authStore';
import { FaBars } from 'react-icons/fa';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CSSTransition } from 'react-transition-group';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const { empInfo,activeRole } = useAuthStore();
    
    // State to control the expanded accordions
    const [expanded, setExpanded] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    console.log('sidebar expand',expanded)

    // Function to handle accordion toggle
    const handleAccordionToggle = (panel) => (event, isExpanded) => {
        console.log('expand',panel,isExpanded)
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box
            sx={{
                width: isSidebarOpen ? 250 : 0,
                height: '100vh',
                color: '#fff',
                position: 'fixed',
                top: 0,
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                transition: 'width 0.3s ease',
                overflowY: 'auto',
                boxShadow: isSidebarOpen ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none',
                zIndex: 0,
                backgroundColor: '#001f3f',
            }}
        >
            {/* Heading for the sidebar */}
            <Box sx={{ backgroundColor: '#001f3f', padding: 2, textAlign: 'left' }}>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold', marginTop: '5px', marginLeft: '20px' }}>
                    Speedoloan
                </Typography>
            </Box>

            <Box sx={{ marginTop: '0px', padding: isSidebarOpen ? 2 : 0 }}>
                <List sx={{ padding: 0, margin: 0 }}>
                    {(activeRole === "screener" || activeRole === "admin" || activeRole === "sanctionHead") && (
                        <Accordion 
                            expanded={expanded === 'lead'} 
                            onChange={handleAccordionToggle('lead')}
                            sx={{
                                '&:before': {
                                    display: 'none',
                                },
                                transition: 'background-color 0.3s ease, transform 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#002b5c',
                                    transform: 'scale(1.03)',
                                }
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#001f3f', color: '#fff' }}>
                                <Typography variant="subtitle1">
                                    <i className="bi bi-person" style={{ marginRight: '8px' }}></i> Lead
                                </Typography>
                            </AccordionSummary>
                            <CSSTransition
                                in={expanded === 'lead'}
                                timeout={300}
                                classNames={{
                                    enter: 'accordion-enter',
                                    enterActive: 'accordion-enter-active',
                                    exit: 'accordion-exit',
                                    exitActive: 'accordion-exit-active',
                                }}
                                unmountOnExit
                            >
                                <AccordionDetails sx={{ backgroundColor: '#001f3f', padding: 0 }}>
                                    <List>
                                        <ListItem component={NavLink} to="/lead-new" sx={{ color: '#fff', textDecoration: 'none', padding: '10px 15px' }}>
                                            <ListItemText primary="New Lead" sx={{ color: '#fff' }} />
                                        </ListItem>
                                        <ListItem component={NavLink} to="/lead-process" sx={{ color: '#fff', textDecoration: 'none', padding: '10px 15px' }}>
                                            <ListItemText primary="Lead-Inprocess" sx={{ color: '#fff' }} />
                                        </ListItem>
                                        <ListItem component={NavLink} to="/lead-hold" sx={{ color: '#fff', textDecoration: 'none', padding: '10px 15px' }}>
                                            <ListItemText primary="Hold Lead" sx={{ color: '#fff' }} />
                                        </ListItem>
                                        <ListItem component={NavLink} to="/rejected-leads" sx={{ color: '#fff', textDecoration: 'none', padding: '10px 15px' }}>
                                            <ListItemText primary="Rejected Lead" sx={{ color: '#fff' }} />
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </CSSTransition>
                        </Accordion>
                    )}
                    {console.log('credit manager role',activeRole)}

                    {(activeRole === "creditManager" || activeRole === "sanctionHead") && (
                        <Accordion expanded={expanded === 'application'} onChange={handleAccordionToggle('application')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: 'transparent', color: '#fff' }}>
                                <Typography variant="subtitle1">Application</Typography>
                            </AccordionSummary>
                            <CSSTransition
                                in={expanded === 'application'}
                                timeout={300}
                                classNames={{
                                    enter: 'accordion-enter',
                                    enterActive: 'accordion-enter-active',
                                    exit: 'accordion-exit',
                                    exitActive: 'accordion-exit-active',
                                }}
                                unmountOnExit
                            >
                                <AccordionDetails sx={{ backgroundColor: 'transparent', padding: 0 }}>
                                    <List>
                                        {[
                                            { text: 'New', link: '/new-applications' },
                                            { text: 'Inprocess', link: '/application-process' },
                                            { text: 'Hold', link: '/application-hold' },
                                            { text: 'Rejected Applications', link: '/rejected-applications' }
                                        ].map((item, index) => (
                                            <ListItem
                                                key={index}
                                                component={Link}
                                                to={item.link}
                                                sx={{ color: '#fff', textDecoration: 'none', padding: '10px 15px' }}
                                            >
                                                {console.log('item',item)}
                                                <ListItemText primary={item.text} sx={{ color: '#fff' }} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </AccordionDetails>
                            </CSSTransition>
                        </Accordion>
                    )}

                    {activeRole === "sanctionHead" && (
                        <Accordion expanded={expanded === 'sanction'} onChange={handleAccordionToggle('sanction')}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: 'transparent', color: '#fff' }}>
                                <Typography variant="subtitle1">
                                    <i className="bi bi-check" style={{ marginRight: '8px' }}></i> Sanction
                                </Typography>
                            </AccordionSummary>
                            <CSSTransition
                                in={expanded === 'sanction'}
                                timeout={300}
                                classNames={{
                                    enter: 'accordion-enter',
                                    enterActive: 'accordion-enter-active',
                                    exit: 'accordion-exit',
                                    exitActive: 'accordion-exit-active',
                                }}
                                unmountOnExit
                            >
                                <AccordionDetails sx={{ backgroundColor: 'transparent', padding: 0 }}>
                                    <List>
                                        <ListItem component={Link} to="/recommended-application" sx={{ color: '#fff', textDecoration: 'none', padding: '10px 15px' }}>
                                            <ListItemText primary="Recommended" sx={{ color: '#fff' }} />
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </CSSTransition>
                        </Accordion>
                    )}
                </List>
            </Box>

            <IconButton
                sx={{
                    position: 'fixed',
                    top: 13,
                    left: isSidebarOpen ? 220 : 10,
                    color: '#fff',
                    borderRadius: 1,
                    transition: 'background-color 0.3s, color 0.3s, left 0.3s',
                    zIndex: 1001,
                }}
                onClick={toggleSidebar}
            >
                <FaBars />
            </IconButton>

            <style jsx>{`
                .accordion-enter {
                    opacity: 0;
                    transform: translateY(-10px);
                }

                .accordion-enter-active {
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity 300ms, transform 300ms;
                }

                .accordion-exit {
                    opacity: 1;
                    transform: translateY(0);
                }

                .accordion-exit-active {
                    opacity: 0;
                    transform: translateY(-10px);
                    transition: opacity 300ms, transform 300ms;
                }
            `}</style>
        </Box>
    );
};

export default Sidebar;

