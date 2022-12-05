const express = require('express');
const app = express();
const Clients = require('../../models/Clients');

const deleteClient = async (req, res) => {

    await Clients.findByIdAndDelete(req.params.id)

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

module.exports = deleteClient;