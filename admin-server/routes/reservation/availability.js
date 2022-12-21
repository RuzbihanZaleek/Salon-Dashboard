const express = require('express');
const app = express();
const Reservations = require('../../models/Reservations');

const availability = async (req, res) => {
    console.log(req.query.bookingId);
    const reserved = await Reservations.find({
        date: req.query.date,
        time: req.query.time,
        stylishName: req.query.stylishName
    })

    res.status(200).send({
        data: reserved
    });
}

module.exports = availability;