const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    stylishName: { type: String, required: true },
    status: { type: String, required: true }
})

const Reservations = mongoose.model('Reservations', ReservationSchema)

module.exports = Reservations