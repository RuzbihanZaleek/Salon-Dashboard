const express = require('express');
const app = express();
const Stylish = require('../../models/Stylish');

const getStylish = async (req, res) => {
    console.log(req.params.id)
    const stylish = await Stylish.find({})
    try {
        res.status(200).json(stylish)
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }
}

module.exports = getStylish;