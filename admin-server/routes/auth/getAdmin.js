const express = require('express');
const app = express();
const Admins = require('../../models/Admin');

const getAdmin = async (req, res) => {
    console.log(req.params.id)
    const admins = await Admins.find({})
    try {
        res.status(200).json(admins)
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error
        })
    }
}

module.exports = getAdmin;