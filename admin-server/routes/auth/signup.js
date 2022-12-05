const express = require('express');
const app = express();
const Admins = require('../../models/Admin');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const values = req.body;
    const admin = new Admins();
    admin.firstName = values['firstName'];
    admin.lastName = values['lastName'];
    admin.email = values['email'];
    admin.phone = values['contact'];
    admin.password = values['password'];

    try {
        const preuser = await Admins.findOne({ email: admin.email });
        encryptedPassword = await bcrypt.hash(admin.password, 10);
        admin.password = encryptedPassword;

        if (preuser) {
            res.status(201).json({ status: "Exist" });
        } else {
            await admin.save((err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).send({ "message": "Admin Added" });
                }
            })
        }

        //Create token
        // const token = jwt.sign(
        //     { user_id: admin._id, email: admin.email },
        //     process.env.TOKEN_KEY,
        //     {
        //         expiresIn: '2h'
        //     }
        // );
        // admin.token = token;

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            message: error
        })
    }
};

module.exports = signup;

