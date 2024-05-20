const mongoose = require('mongoose');
const { Admin } = require('../config/roles_list');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        requireed: true,
    },
    role: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        requireed: true
    },
    refreshToken: String

})

module.exports = mongoose.model('User', userSchema)