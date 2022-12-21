const express = require('express');
const app = express();
const Reservations = require('../../models/Reservations');

const reservationStatus = async (req, res) => {
    var date = new Date().toLocaleDateString('fr-BE');

    try {

        const status = await Reservations.aggregate([
            { $match: { date: date } },
            { $group: { _id: "$status", count: { $sum: 1 } } },
        ])

        if (status) {
            console.log(status);
            res.status(200).json(status);
        } else {
            res.status(201).json({ status: "No Reservations Today" });
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error
        })
    }
};

module.exports = reservationStatus;

