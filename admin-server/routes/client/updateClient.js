const express = require('express');
const app = express();
const Clients = require('../../models/Clients');

const updateClient = async (req, res) => {
    const updateClient = await Clients.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    console.log(req.body);
    try {
        res.status(200).json({
            status: 'Success',
            data: {
                updateClient
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }
}

module.exports = updateClient;