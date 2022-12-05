const express = require('express');
const app = express();
const Stylish = require('../../models/Stylish');

const deleteStylish = async (req, res) => {
    console.log(req);
    await Stylish.findByIdAndDelete(req.params.id)

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

module.exports = deleteStylish;