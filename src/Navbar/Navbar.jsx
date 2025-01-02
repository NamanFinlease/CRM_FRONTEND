import React, { useEffect, useState } from "react";
import { tokens } from "../theme";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Avatar,
    FormControl,
    InputLabel,
    Select,
    Box,
    useTheme
} from "@mui/material";
import { Logout, Person } from "@mui/icons-material";
import useStore from "../Store";
import { useLogoutMutation } from "../Service/Query";
import useAuthStore from "../Component/store/authStore";
import Swal from "sweetalert2";



const Navbar = () => {
    const navigate = useNavigate();
    const { setEmployeeDetails } = useStore();
    const { setLogin, setEmpInfo, empInfo, activeRole, setActiveRole } =
        useAuthStore();
    // const [currentActiveRole, setCurrentActiveRole] = useState(activeRole)

    const [logout, { isSuccess, isError, error }] = useLogoutMutation();
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    //color theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Logout failed: ", err);
        }
    };

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;

        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to switch to the ${selectedRole} role?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: `${colors.primary["primaryshade"]}`,
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, switch role",
        }).then((result) => {
            if (result.isConfirmed) {
                setActiveRole(selectedRole); // Set the new active role
                navigate("/"); // Navigate to the desired page
            }
        });
    };

    const handleMenuClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    function splitCamelCase(str) {
        return str
            .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert a space before each uppercase letter
            .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word
    }

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    useEffect(() => {
        if (isSuccess) {
            setLogin(false);
            setEmpInfo(null);
            setEmployeeDetails(null);
            navigate("/login");
        }

        if (isError) {
            console.error("Error during logout: ", error);
        }
    }, [
        isSuccess,
        isError,
        error,
        setLogin,
        setEmpInfo,
        setEmployeeDetails,
        navigate,
    ]);

    // Function to get initials from the employee's name
    function getInitials(name) {
        return name
            .split(" ")
            .filter((word) => word) // Remove any empty strings caused by extra spaces
            .map((word) => word[0].toUpperCase())
            .join("");
    }

    // Generate initials for the Avatar
    const empInitials = empInfo?.name ? getInitials(empInfo.name) : "AB"; // Default initials if name is unavailable

    const sidebarLinks = [
        { text: "User Profile", path: "/user-profile" },
        { text: "Import CSV", path: "/import-csv" },
        ...(activeRole === "admin"
            ? [
                { text: "View Employees", path: "/employees-list" },
                { text: "Add Employee", path: "/add-employee" },
                { text: "Add Bank Details", path: "/add-bank-details" },
            ]
            : []),
        { text: "Add Holiday Details", path: "/add-holiday-details" },
    ];

    return (
        <div>
        <AppBar
            position="fixed"
            sx={{
                background: `linear-gradient(180deg, ${colors.white["whiteshade"]} 1%, ${colors.primary["primaryshadeopacity"]} 250%), ${colors.white["whiteshade"]}`,
                borderBottom:`3px solid ${colors.primary["primaryshade"]}`,
                borderBottomLeftRadius:"10px",
                borderBottomRightRadius:"10px",
                boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.1)",
                height:"70px",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ ml: 5,}}
                >
                    {/* Speedoloan */}
                    <Box 
                        component="img" 
                        src="../src/assets/image/speedo_logo.png"
                        background="transparent"
                        sx={{ width: 100, height: 100, margin: "10px" }} 
                    />
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, }}>
                    <FormControl
                        variant="outlined"
                        sx={{ m: 0, minWidth: 150,}}
                    >
                        {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={activeRole}
                            onChange={(e) => handleRoleChange(e)}
                            sx={{
                                background:`${colors.primary["primaryshade"]}`, 
                                borderRadius:"5px", 
                                color:`${colors.white["whiteshade"]}`, 
                                height:"40px",
                                boxShadow:"0px 0px 5px 1px rgb(0,0,0,0.2)"
                            }}
                        // label="Age"
                        >
                            {empInfo.empRole &&
                                empInfo.empRole.map((role, i) => (
                                    <MenuItem 
                                        key={i} 
                                        value={role} 
                                        sx={{
                                            background:`${colors.white["whiteshade"]}`, 
                                            color:`${colors.primary["primaryshade"]}`,
                                            '&:hover':{
                                                background:`${colors.primary["primaryshade"]}`,
                                                color:`${colors.white["whiteshade"]}`
                                            }
                                        }}
                                    >
                                        {splitCamelCase(role)}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>

                    <IconButton color="inherit" onClick={handleMenuClick}>
                        <Avatar
                            sx={{ backgroundColor: `${colors.black["grayshade"]}`, color: `${colors.black["blackshade"]}` }}
                        >
                            {empInitials} {/* Replace with dynamic initials */}
                        </Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={menuAnchorEl}
                        open={Boolean(menuAnchorEl)}
                        onClose={handleMenuClose}
                        sx={{
                            ".MuiPaper-root": {
                                backgroundColor: `${colors.white["whiteshade"]}`,
                                color: `${colors.primary["primaryshade"]}`,
                            },
                        }}
                    >
                        {sidebarLinks.map((link) => (
                            <MenuItem
                                component={Link}
                                to={link.path}
                                key={link.text}
                                sx={{
                                    color: `${colors.primary["primaryshade"]}`,
                                    "&:hover": { backgroundColor: `${colors.primary["primaryshade"]}`, color:`${colors.white["whiteshade"]}` },
                                }}
                            >
                                {link.text}
                            </MenuItem>
                        ))}
                        <MenuItem
                            onClick={handleLogout}
                            sx={{ color: "#ff4d4d", fontWeight: "bold", "&:hover": { backgroundColor: "#ff4d4d", color:"#fff" } }}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
        </div>
    );
};

export default Navbar;
