import React from 'react';
import { useTheme } from "@mui/material";
import { ResponsiveBar } from '@nivo/bar';
import { tokens } from '../theme';
import axios from 'axios';

function BarChart({ isDashboard = false }) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //////////////////////////////////////////////////////////////////////////////
    const [reservations, setReservations] = React.useState([]);
    // const [stylish, setStylish] = React.useState([]);
    // const [stylishList, setStylistList] = React.useState([]);
    // var date = new Date().toLocaleDateString('fr-BE');

    const todayeReservations = [];

    const getAllReservations = async (e) => {
        let stylishFirstname = "";

        const res = await axios.get('http://localhost:8080/stylish-reservations');
        const data = res.data;
        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            for (let j = 0; j < data.length; j++) {
                stylishFirstname = data[j]._id.split(" ").slice(0, -1).join(' ');
                todayeReservations.push({
                    stylish: stylishFirstname,
                    [`h${j}`]: data[j].count
                })
            }
            setReservations(todayeReservations);
        }
    }

    React.useEffect(() => {
        getAllReservations();
    }, []);


    //////////////////////////////////////////////////////////////////////////////
    return (
        <ResponsiveBar
            data={reservations}
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
            keys={['h0', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8']}
            //keys={"hours"}
            indexBy="stylish"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={{ scheme: 'paired' }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : 'stylish',
                legendPosition: 'middle',
                legendOffset: 32,
                format: () => null
            }}

            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : 'hours',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            enableLabel={false}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
        />
    );
}

export default BarChart;