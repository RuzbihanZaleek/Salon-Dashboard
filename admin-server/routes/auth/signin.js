const express = require('express');
const app = express();
const Admins = require('../../models/Admin');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signin = async (req, res) => {

    try {
        Admins.findOne({ email: req.body.email })
            .exec((err, admin) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (!admin) {
                    return res.status(201).json({ status: "Admin Not found" });
                }

                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    admin.password
                );

                console.log(passwordIsValid);
                if (!passwordIsValid) {
                    return res.status(202).json({
                        //accessToken: null,
                        status: "Invalid Password!"
                    });
                }

                //Create token
                const token = jwt.sign(
                    { user_id: admin._id, email: admin.email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: 7200 //2 hours
                    }
                );
                admin.token = token;

                res.status(200).send({
                    id: admin._id,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    email: admin.email,
                    accessToken: token
                });

            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            message: error
        })
    }
};

module.exports = signin;

