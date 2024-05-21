const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: String,
        requireed: true
    },
    lasttname: {
        type: String,
        requireed: true
    },
})

module.exports = mongoose.model('Employee', employeeSchema);