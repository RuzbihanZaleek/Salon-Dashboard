import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import PieChart from '../../components/PieChart';

function Pie(props) {
    return (
        <Box m="20px">
            <Header title="Pie Chart" subtitle="Reservation Status" />
            <Box height="75vh">
                <PieChart />
            </Box>
        </Box>
    );
}

export default Pie;