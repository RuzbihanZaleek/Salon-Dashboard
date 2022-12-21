import { IconButton, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';
import { tokens } from '../../theme';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlined from "@mui/icons-material/PeopleOutlineOutlined";
import { Link } from 'react-router-dom';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import ContactsIcon from '@mui/icons-material/Contacts';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BookOnlineOutlinedIcon from '@mui/icons-material/BookOnlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import "react-pro-sidebar/dist/css/styles.css";

function Sidebar(props) {
    //console.log("props " + JSON.stringify(props.adminDetails));
    const isSidebar = props.isSidebar;
    const adminDetails = props.adminDetails;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(isSidebar);
    const [selected, setSelected] = useState("Dashboard");

    var adminName = adminDetails.firstName + " " + adminDetails.lastName;
    var adminEmail = adminDetails.email;
    var subtopic = (adminEmail == "superadmin@gmail.com") ? "Salon Prauge Super Admin" : "Salon Prauge Admin"
    //console.log(adminDetails.email);

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu>
                    {/* LOGO AND MENU ICON */}
                    <MenuItem onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}>
                        {!isCollapsed && (
                            <Box display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px">
                                <Typography variant='h3' color={colors.grey[100]}>
                                    ADMINS
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* USER */}
                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/user.jpg`}
                                    style={{ cursor: "pointer", borderRadius: "50%" }} />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}>{adminName}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color={colors.greenAccent[500]}
                                >
                                    {subtopic}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* MENU ITEMS */}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/dashboard"
                            icon={<HomeOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Stylish"
                            to="/team"
                            icon={<PeopleOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Clients"
                            to="/clients"
                            icon={< ContactsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Reservations"
                            to="/reservations"
                            icon={<BookOnlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Admins"
                            to="/admin"
                            icon={<AdminPanelSettingsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* PAGES */}
                        <Typography variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}>
                            Pages
                        </Typography>
                        <Item
                            title="Booking"
                            to="/bookingForm"
                            icon={<LibraryBooksIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Client Form"
                            to="/clientForm"
                            icon={<GroupAddOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Stylish Form"
                            to="/stylishForm"
                            icon={<PersonAddAlt1OutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Calendar"
                            to="/calendar"
                            icon={<CalendarMonthOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* CHARTS */}
                        <Typography variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}>
                            Charts
                        </Typography>
                        <Item
                            title="Bar Chart"
                            to="/bar"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Pie Chart"
                            to="/pie"
                            icon={<PieChartOutlineIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box >
    );
}

export default Sidebar;


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}>
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    )
}