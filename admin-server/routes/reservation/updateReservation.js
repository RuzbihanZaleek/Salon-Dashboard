const express = require('express');
const app = express();
const Reservations = require('../../models/Reservations');

const updateReservation = async (req, res) => {
    const updateReservation = await Reservations.findByIdAndUpdate(req.params.id, req.body, {
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

module.exports = updateReservation;