const express = require('express');
const app = express();
const Reservations = require('../../models/Reservations');

const updateReservation = async (req, res) => {
    const values = req.body;

    const reservation = {
        clientName: values['client'],
        service: values['service'],
        date: values['date'],
        time: values['time'],
        stylishName: values['stylish'],
        status: values['status']
    };

    const stylishNotAvailable = await Reservations.findOne({
        stylishName: reservation.stylishName,
        date: reservation.date,
        time: reservation.time
    });

    if (stylishNotAvailable) {
        console.log("Stylish is not available at this time");
        res.status(201).json({ status: "Not available" });
    } else {
        const updateReservation = await Reservations.findByIdAndUpdate(
            req.body.id, reservation, {
            new: true,
            runValidators: true
        })

        try {
            res.status(200).json({
                status: 'Success',
                data: {
                    updateReservation
                }
            })
        } catch (error) {
            res.status(500).json({
                status: 'Failed',
                message: error
            })
        }
    }
}

module.exports = updateReservation;