const express = require('express');
const app = express();
const Reservations = require('../../models/Reservations');

const getReservations = async (req, res) => {
    console.log(req.params.id)
    const reservations = await Reservations.find({})
    try {
        res.status(200).json(reservations)
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }
}

module.exports = getReservations;