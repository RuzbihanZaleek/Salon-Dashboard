const express = require('express');
const app = express();
const Stylish = require('../../models/Stylish');

const addStylish = async (req, res) => {

    const values = req.body;

    const stylish = new Stylish();
    stylish.firstName = values['firstName'];
    stylish.lastName = values['lastName'];
    stylish.role = values['role'];
    stylish.email = values['email'];
    stylish.phone = values['contact'];

    try {

        const preuser = await Stylish.findOne({ email: stylish.email });

        if (preuser) {
            console.log("This stylish is already exist");
            res.status(201).json({ status: "Exist" });
        } else {
            await stylish.save((err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).send({ "message": "Stylish Added" })
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

module.exports = addStylish;
