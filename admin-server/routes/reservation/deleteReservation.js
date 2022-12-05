const express = require('express');
const app = express();
const Reservations = require('../../models/Reservations');

const deleteReservation = async (req, res) => {

    await Reservations.findByIdAndDelete(req.params.id)

    try {
        res.status(200).json({
            status: 'Success',
            data: {}
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }
}

module.exports = deleteReservation;