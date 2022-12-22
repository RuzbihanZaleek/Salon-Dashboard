import { React, useEffect, useState, useCallback } from 'react';
import { formatDate } from '@fullcalendar/react';
import { Box, List, ListItem, ListItemText, styled, Typography, useTheme } from "@mui/material";
import Header from '../../components/Header';
import { tokens } from "../../theme";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { convertTime, getAvailability, getReservations, updateReservation } from './calendarFn';
import Spinner from '../../components/Spinner';
import { TransparentBox } from '../../StyledComponents/StyledButton';
import { SwtAlert, Toast } from '../../components/Swal';
import axios from 'axios';

const MySwal = withReactContent(Swal);
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

function UserCalendar(props) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [reservations, setReservations] = useState([
        { id: "1234", title: "Lecture", start: "2022-12-12T10:30:00", end: "2022-12-12T11:30:00" },
        { id: "1235", title: "Practical", start: "2022-12-14T10:30:00", end: "2022-12-14T12:30:00" },
        { id: "1236", title: "Exam", start: "2022-12-16T10:30:00", end: "2022-12-16T13:30:00" },
    ]);
    const [loading, setLoading] = useState(false);

    const resArray = [];

    const getAllReservations = async (e) => {
        const res = await axios.get('http://localhost:8080/get-reservation');
        console.log(res);
        const data = res.data;
        console.log(data);
        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            for (var j = 0; j < data.length; j++) {
                var date = data[j].date.replace(/(..).(..).(....)/, "$3-$2-$1");
                var time = convertTime(data[j].time);
                //var time = moment(data[j].time, 'hh:mm:ss A').format('hh:mm A');
                var time = time.slice(0, -3);
                var dateTime = date + "T" + time;

                resArray.push({
                    id: data[j]._id,
                    title: data[j].service,
                    start: moment(dateTime).toDate(),
                    end: moment(dateTime)
                        .add(1, "hours")
                        .toDate(),
                    stylish: data[j].stylishName

                })
            }
            setReservations(resArray);

        }
    }

    const onEventDrop = useCallback((data) => {
        setLoading(true);
        console.log("onEventDrop " + JSON.stringify(data));
        console.log(moment(data.start).toDate());

        const changedDate = new Date(data.start);
        console.log(changedDate.toLocaleDateString());
        console.log(new Date().toLocaleDateString());
        if (changedDate.toLocaleDateString('fr-BE') < new Date().toLocaleDateString('fr-BE')) {
            setLoading(false);
            SwtAlert('warning', '', 'Can not select previouse dates!', 4000);
        } else {
            const bookingId = data.event.id;
            const time = moment(data.start).toDate();
            const stylish = data.event.stylish;
            isStylishAvailable(changedDate, time, stylish, bookingId);
        }
    }, []);


    const isStylishAvailable = useCallback(
        async (date, time, stylishName, bookingId) => {
            const tempTime = time.toLocaleTimeString();
            const tempDate = date.toLocaleDateString('fr-BE');
            const body = {
                date: tempDate,
                time: tempTime,
                stylishName: stylishName,
                bookingId: bookingId
            };

            try {

                const res = getAvailability(body);
                const response = (await res);
                console.log(response.status);
                if (response.status === 200) {
                    console.log(response.data.data);

                    if (response.data.data.length === 0) {
                        console.log("change booking");
                        changeBookingDate(date, bookingId, time);
                    } else {
                        setLoading(false);
                        SwtAlert('info', 'Oops..', 'Stylish is not available at this time slot!', 4000)
                    }
                }
            } catch (error) {
                console.log(error)
                SwtAlert('error', 'Error!', 'Something Went Wrong', 4000)
            }
        }, []
    );

    const changeBookingDate = useCallback(
        async (date, bookingId, time) => {
            const tempTime = time.toLocaleTimeString();
            const tempDate = date.toLocaleDateString('fr-BE');
            const values = {
                date: tempDate,
                time: tempTime,
                bookingId: bookingId
            };

            try {
                const res = updateReservation(values);
                const response = (await res);
                setLoading(false);
                if (response.status === 200) {

                    console.log("Booking Updated Successfully");
                    if (!loading) {
                        SwtAlert('success', 'Success!', 'Reservation Updated Successfully!', 4000)
                    }

                } else if (response.status === 201) {
                    SwtAlert('info', 'Oops..', 'Update Fail!', 4000)
                }
            } catch (error) {
                setLoading(false);
                console.log(error)
                SwtAlert('error', 'Error!', 'Something Went Wrong', 4000)
            }
        }, []
    )

    useEffect(() => {
        getAllReservations();
    }, [])


    return (
        <Box m="20px">
            <Header title="CALENDAR" subtitle="Full Calendar Intervation Page" />

            <Box display="flex" justifyContent="space-between" height="75vh">

                {/* CALENDAR SIDEBAR */}
                <Box flex="1 1 20%" backgroundColor={colors.primary[400]} p="15px" borderRadius="4px" overflow="auto">
                    <Typography variant="h5">Reservations</Typography>
                    <List>
                        {reservations.map((event) => (
                            <ListItem
                                key={event.id}
                                sx={{
                                    backgroundColor: colors.greenAccent[500],
                                    margin: "10px 0",
                                    borderRadius: "2px"
                                }}
                            >
                                <ListItemText
                                    primary={event.title}
                                    secondary={
                                        <Typography>
                                            {formatDate(event.start, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric"
                                            })}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                {/* CALENDAR */}
                {loading ? <Spinner /> :
                    <Box flex="1 1 100%" ml="15px" overflow="auto" sx={{
                        "& .rbc-day-bg.rbc-today, .rbc-active": {
                            backgroundColor: "#4CCEAC !important"
                        },
                        "& .rbc-day-bg.rbc-off-range-bg, .rbc-header.rbc-today": {
                            backgroundColor: "#1F2A40 !important"
                        },
                        "& .rbc-day-slot, .rbc-time-slot": {
                            borderTop: "1px solid #4CCEAC !important"
                        }
                    }}>
                        <TransparentBox>
                            <DnDCalendar
                                localizer={localizer}
                                defaultDate={moment().toDate()}
                                defaultView="week"
                                events={reservations}
                                onEventDrop={onEventDrop}
                                //onEventResize={onEventResize}
                                resizable
                            />
                        </TransparentBox>
                    </Box>
                }
            </Box>
        </Box>
    );
}

export default UserCalendar;

