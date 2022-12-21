import { React, useEffect, useState, useCallback } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import Header from '../../components/Header';
import { tokens } from "../../theme";
import axios from 'axios';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
    const [status, setStatus] = useState(false);

    const resArray = [];

    const getAllReservations = async (e) => {

        const res = await axios.get('http://localhost:8080/get-reservation');
        const data = res.data;

        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            for (var j = 0; j < data.length; j++) {
                var date = data[j].date.replace(/(..).(..).(....)/, "$3-$2-$1");
                var time = convertTime(data[j].time);
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

    const convertTime = (time) => {
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12) hours = hours + 12;
        if (AMPM == "AM" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        var convertedTime = sHours + ":" + sMinutes + ":00";
        return convertedTime;
    }


    const handleDateClick = (selected) => {
        const title = prompt("Create new reservation");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();
        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay
            })
        }
    }


    const onEventDrop = useCallback((data) => {
        console.log("onEventDrop " + JSON.stringify(data));
        console.log(moment(data.start).toDate());

        const changedDate = new Date(data.start);
        console.log(changedDate.toLocaleDateString());
        console.log(new Date().toLocaleDateString());
        if (changedDate.toLocaleDateString() < new Date().toLocaleDateString()) {
            MySwal.fire({
                icon: 'warning',
                text: 'Can not select previouse dates!',
                time: 4000
            });
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
                const response = await axios.get(
                    "http://localhost:8080/availability", { params: body }
                )
                console.log(response.status);
                if (response.status === 200) {
                    console.log(response.data.data);

                    if (response.data.data.length === 0) {
                        console.log("change booking");
                        changeBookingDate(date, bookingId, time);
                    } else {
                        MySwal.fire({
                            icon: 'info',
                            title: 'Oops..',
                            text: 'Stylish is not available at this time slot!',
                            time: 4000
                        });
                    }
                }
            } catch (error) {
                console.log(error)
                MySwal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Something Went Wrong',
                    time: 4000
                })
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
                const response = await axios.patch(
                    `http://localhost:8080/update-reservation/${values.bookingId}`, values
                )

                if (response.status === 200) {
                    console.log("Booking Updated Successfully");
                    MySwal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Reservation Updated Successfully!',
                        time: 4000
                    }).then(() => {
                        setStatus(!status);
                    })

                } else if (response.status === 201) {
                    MySwal.fire({
                        icon: 'info',
                        title: 'Oops..',
                        text: 'Update Fail!',
                        time: 4000
                    })
                }
            } catch (error) {
                console.log(error)
                MySwal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Something Went Wrong',
                    time: 4000
                })
            }
        }, []
    )

    const onEventResize = (data) => {
        const { start, end } = data;

        setReservations((state) => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: [...state.events] };
        });
    };

    useEffect(() => {
        getAllReservations();
    }, [])

    // useEffect(() => {

    // }, [])


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
                <Box flex="1 1 100%" ml="15px" sx={{
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
                    <DnDCalendar
                        localizer={localizer}
                        defaultDate={moment().toDate()}
                        defaultView="week"
                        events={reservations}
                        onEventDrop={onEventDrop}
                        //onEventResize={onEventResize}
                        resizable
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default UserCalendar;