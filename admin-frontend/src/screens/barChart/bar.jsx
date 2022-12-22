import { Box } from '@mui/material';
import Header from '../../components/Header';
import BarChart from '../../components/BarChart';
import React from 'react';

function Bar(props) {
    return (
        <Box m="20px">
            <Header title="Bar Chart" subtitle="Today Reservation hours for each stylish" />
            <Box height="75vh">
                <BarChart />
            </Box>
        </Box>
    );
}

export default Bar;