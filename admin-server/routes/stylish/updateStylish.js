const express = require('express');
const app = express();
const Stylish = require('../../models/Stylish');

const updateStylish = async (req, res) => {
    const updateStylish = await Stylish.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    console.log(req.body);
    try {
        res.status(200).json({
            status: 'Success',
            data: {
                updateStylish
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }
}

module.exports = updateStylish;