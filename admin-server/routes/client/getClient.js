const express = require('express');
const app = express();
const Clients = require('../../models/Clients');

const getClients = async (req, res) => {
    console.log(req.params.id)
    const clients = await Clients.find({})
    try {
        // res.status(200).json({
        //     status: 'Success',
        //     data: {
        //         clients  
        //     }
        // })

        res.status(200).json(clients)
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }
}

module.exports = getClients;