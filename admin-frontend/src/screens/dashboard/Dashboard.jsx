import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import React from 'react';
import Header from '../../components/Header';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';
import StatBox from '../../components/StatBox';
import ProgressCircle from '../../components/ProgressCircle';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import GroupsIcon from '@mui/icons-material/Groups';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import { mockTransactions } from '../../data/mockData';
import axios from 'axios';

function Dashboard(props) {
    //console.log("props " + JSON.stringify(props.adminDetails));
    //const adminDetails = props.adminDetails;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [reservations, setReservations] = React.useState(0);
    const [todayeReservations, setTodayReservations] = React.useState([]);
    const [clients, setClients] = React.useState(0);
    const [stylish, setStylish] = React.useState(0);
    var date = new Date().toLocaleDateString('fr-BE');

    //var adminName = adminDetails.firstName + " " + adminDetails.lastName;

    const getAllStylish = async (e) => {
        const res = await axios.get('http://localhost:8080/get-stylish');
        const data = res.data;
        var totalStylish = Object.keys(data).length;
        var totalStylish = ("0" + totalStylish).slice(-2);

        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            setStylish(totalStylish);
            console.log("data fetched");
        }
    }

    const getAllClients = async (e) => {
        const res = await axios.get('http://localhost:8080/get-client');
        const data = res.data;
        var totalClients = Object.keys(data).length;
        var totalClients = ("0" + totalClients).slice(-2);

        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            setClients(totalClients);
            console.log("data fetched");
        }
    }
    const getAllReservations = async (e) => {
        const res = await axios.get('http://localhost:8080/get-reservation');
        const data = res.data;
        //const data2 = JSON.stringify(data);
        console.log(JSON.stringify(data[0].date));
        console.log(data);
        console.log(new Date().toLocaleDateString());
        console.log(data.filter((reservation) => reservation.status === "Inprogress"));


        var totalReservations = Object.keys(data).length;
        var totalReservations = ("0" + totalReservations).slice(-2);

        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            setReservations(totalReservations);
            setTodayReservations(data.filter((reservation) => reservation.date === date));
            console.log("data fetched");
            console.log(todayeReservations);
        }
    }

    React.useEffect(() => {
        getAllReservations();
        getAllStylish();
        getAllClients();
    }, []);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 4"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={stylish}
                        subtitle="Total Stylish"
                        progress="0.5"
                        increase="+14%"
                        icon={
                            <Diversity1Icon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 4"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={clients}
                        subtitle="Total Clients"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <GroupsIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 4"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={reservations}
                        subtitle="Total Reservations"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <BookOnlineIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        }
                    />
                </Box>

                {/* ROW 2 */}

                <Box
                    gridColumn="span 6"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Box
                        mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center"
                    >
                        <Box>
                            <Typography variant='h5' fontWeight="600" color={colors.grey[100]}>
                                Today Reservation hours for each stylish
                            </Typography>
                            {/* <Typography variant='h3' fontWeight="600" color={colors.grey[100]}>
                                $500
                            </Typography> */}
                        </Box>
                        {/* <Box>
                            <IconButton>
                                <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
                            </IconButton>
                        </Box> */}
                    </Box>
                    <Box height="250px" ml="">
                        <BarChart isDashboard={true} width="100px" />
                    </Box>
                </Box>

                <Box
                    gridColumn="span 3"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Box
                        mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center"
                    >
                        <Box>
                            <Typography variant='h5' fontWeight="600" color={colors.grey[100]}>
                                Reservations Status
                            </Typography>
                            {/* <Typography variant='h3' fontWeight="bold" color={colors.grey[100]}>
                                $500
                            </Typography> */}
                        </Box>
                        {/* <Box>
                            <IconButton>
                                <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
                            </IconButton>
                        </Box> */}
                    </Box>
                    <Box height="250px">
                        <PieChart isDashboard={true} />
                    </Box>
                </Box>
                {/* TODAY RESERVATIONS */}
                <Box
                    gridColumn="span 3"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >
                        <Typography
                            color={colors.grey[100]}
                            variant="h5"
                            fontWeight="600"
                        >
                            Today Reservations
                        </Typography>
                        <Typography
                            color={colors.grey[100]}
                            variant="h5"
                            fontWeight="600"
                        >
                            {todayeReservations.length}
                        </Typography>
                    </Box>
                    {todayeReservations.map((reservation, i) => (
                        <Box
                            key={`${reservation.clientName}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                        >
                            <Box>
                                <Box display="flex">
                                    <Typography
                                        color={colors.grey[100]}
                                        variant="h5"
                                        fontWeight="600"
                                    >
                                        Client:
                                    </Typography>
                                    <Typography
                                        color={colors.greenAccent[500]}
                                        variant="h5"
                                        fontWeight="600"
                                        marginLeft="2px"
                                    >
                                        {reservation.clientName}
                                    </Typography>
                                </Box>
                                <Box display="flex">
                                    <Typography color={colors.grey[100]} fontWeight="600">
                                        Stylish:
                                    </Typography>
                                    <Typography color={colors.greenAccent[500]} marginLeft="4px" fontWeight="600">
                                        {reservation.stylishName}
                                    </Typography>
                                </Box>
                                <Box display="flex">
                                    <Typography color={colors.grey[100]} fontWeight="600">
                                        Status:
                                    </Typography>
                                    <Typography color={colors.greenAccent[500]} marginLeft="4px" fontWeight="600">
                                        {reservation.status}
                                    </Typography>
                                </Box>

                            </Box>
                            <Box color={colors.grey[100]}>
                                {reservation.time}
                            </Box>
                            {/* <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px" width="107px" justifyContent="center">
                                <Typography margin="auto">
                                    {reservation.status}
                                </Typography>
                            </Box> */}
                        </Box>
                    ))}
                </Box>

            </Box>
        </Box >
    );
}

export default Dashboard;