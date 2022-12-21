import axios from 'axios';

export const convertTime = (time) => {
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

export const getReservations = async (e) => {
    const res = await axios.get('http://localhost:8080/get-reservation');
    return res;
}

export const getAvailability = async (e) => {
    const res = await axios.get(
        "http://localhost:8080/availability", { params: e }
    )
    return res;
}

export const updateReservation = async (e) => {
    const res = await axios.patch(
        `http://localhost:8080/update-reservation/${e.bookingId}`, e
    )
    return res;
}