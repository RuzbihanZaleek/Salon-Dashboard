const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: { type: String }
})

const role = mongoose.model("Role", RoleSchema);

module.exports = role;