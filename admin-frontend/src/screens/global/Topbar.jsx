import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import Search from '@mui/icons-material/Search';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import { IconButton, InputBase, styled, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';


function Topbar(props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [open, setOpen] = useState(false);

    const logout = () => {
        console.log("logout");
        localStorage.removeItem("admin");
        window.location = "/login";
    }
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex">
                <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ mr: "20px", ml: "4px" }}>Salon Prauge
                </Typography>
            </Box>


            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlined />
                    ) : (
                        <LightModeOutlined />
                    )}
                </IconButton>
                <IconButton onClick={() => { setOpen(!open) }}>
                    <Box>
                        <PersonOutlined />
                    </Box>
                </IconButton>
                <IconButton sx={{ fontSize: "14px" }}>
                    {open ? (
                        <Box onClick={logout} color={colors.greenAccent[400]}>
                            Logout
                        </Box>
                    ) : (null)}
                </IconButton>
            </Box>
        </Box>
    );
}

export default Topbar;
