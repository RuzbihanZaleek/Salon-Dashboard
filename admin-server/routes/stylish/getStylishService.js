const express = require('express');
const app = express();
const Stylish = require('../../models/Stylish');

const getStylishService = async (req, res) => {
    var service = req.params.name;
    try {
        const stylish = await Stylish.aggregate([
            { $match: { role: service } },
        ])

        if (stylish) {
            console.log(stylish);
            res.status(200).json(stylish);
        } else {
            res.status(201).json({ status: "No Stylish for this service" });
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error
        })
    }
};

module.exports = getStylishService;

