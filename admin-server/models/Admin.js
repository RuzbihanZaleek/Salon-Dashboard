const mongoose = require('mongoose')

// const AdminSchema = new mongoose.Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     token: { type: String },

// })

const AdminSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
})

const Admins = mongoose.model('Admins', AdminSchema)

module.exports = Admins;