const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
})

const Clients = mongoose.model('Clients', ClientSchema)

module.exports = Clients