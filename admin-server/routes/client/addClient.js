const express = require('express');
const app = express();
const Clients = require('../../models/Clients');

const addClient = async (req, res) => {
    const values = req.body;

    const client = new Clients();
    client.firstName = values['firstName'];
    client.lastName = values['lastName'];
    client.email = values['email'];
    client.phone = values['contact'];

    try {

        const preuser = await Clients.findOne({ email: client.email });

        if (preuser) {
            console.log("This user is already exist");
            res.status(201).json({ status: "Exist" });
        } else {
            await client.save((err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).send({ "message": "Client Added" })
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error
        })
    }
};

module.exports = addClient;

