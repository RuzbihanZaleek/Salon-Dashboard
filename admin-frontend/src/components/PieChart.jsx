import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useTheme } from "@mui/material";
import { mockPieData as data } from "../data/mockData";
import { tokens } from '../theme';
import axios from 'axios';

function PieChart({ isDashboard = false }) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //////////////////////////////////////////////////////////////////////////////
    const [status, setStatus] = React.useState([]);
    const [stylish, setStylish] = React.useState([]);

    const statusObj = [];
    const statusArr = ['Not Completed', 'Inprogress', 'Completed'];
    var labelArr = [];

    if (isDashboard) {
        labelArr = ['NC', 'IP', 'C'];
    } else {
        labelArr = statusArr;
    }

    const getAllReservations = async (e) => {
        const res = await axios.get('http://localhost:8080/reservations-status');
        const data = res.data;

        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            for (var j = 0; j < data.length; j++) {
                statusObj.push({
                    id: labelArr[j],
                    value: data[j].count,
                })
            }
            setStatus(statusObj);
        }
    }

    React.useEffect(() => {
        getAllReservations();
    }, []);


    //////////////////////////////////////////////////////////////////////////////

    return (
        <ResponsivePie
            data={status}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100]
                        }
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100]
                        }
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1
                        },
                        text: {
                            fill: colors.grey[100]
                        }
                    }
                },
                legends: {
                    text: {
                        fill: colors.grey[100]
                    }
                }
            }}
            margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'category10' }}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={colors.grey[100]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            enableArcLabels={true}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
        />
    );
}

export default PieChart;