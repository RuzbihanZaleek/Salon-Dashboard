const express = require('express');
const app = express();
const Admins = require('../../models/Admin');

const deleteAdmin = async (req, res) => {

    await Admins.findByIdAndDelete(req.params.id)

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

module.exports = deleteAdmin;