const mongoose = require('mongoose')

const StylishSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
})

const Stylish = mongoose.model('Stylish', StylishSchema)

module.exports = Stylish;