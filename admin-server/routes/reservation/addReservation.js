const express = require('express');
const app = express();
const Reservations = require('../../models/Reservations');

const addReservation = async (req, res) => {
    const values = req.body;

    const reservation = new Reservations();
    reservation.clientName = values['client'];
    reservation.service = values['service'];
    reservation.date = values['date'];
    reservation.time = values['time'];
    reservation.stylishName = values['stylish'];
    reservation.status = values['status'];

    try {

        const stylishNotAvailable = await Reservations.findOne({
            stylishName: reservation.stylishName,
            date: reservation.date,
            time: reservation.time
        });

        if (stylishNotAvailable) {
            console.log("Stylish is not available at this time");
            res.status(201).json({ status: "Not available" });
        } else {
            await reservation.save((err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).send({ "message": "Booking Success" })
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error
        })
    }
};

module.exports = addReservation;

