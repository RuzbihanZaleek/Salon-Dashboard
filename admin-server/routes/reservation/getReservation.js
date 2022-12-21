const express = require('express');
const app = express();
const Reservations = require('../../models/Reservations');

const getReservation = async (req, res) => {
    var bookingId = req.params.bookingId;
    const reservation = await Reservations.findOne({ _id: bookingId })
    try {
        console.log(reservation);
        res.status(200).send(reservation);

    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }
}

module.exports = getReservation;