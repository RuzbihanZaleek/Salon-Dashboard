const express = require('express');
const app = express();
const Reservations = require('../../models/Reservations');

const stylishReservations = async (req, res) => {
    var date = new Date().toLocaleDateString('fr-BE');

    try {

        const reservationsPerStylish = await Reservations.aggregate([
            { $match: { date: date } },
            { $group: { _id: "$stylishName", count: { $sum: 1 } } },
            { $sort: { stylishName: 1 } },
        ])

        if (reservationsPerStylish) {
            console.log(reservationsPerStylish);
            res.status(200).json(reservationsPerStylish);
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

module.exports = stylishReservations;

