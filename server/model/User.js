const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken : String
})

const user_data = mongoose.model('user',user);

const refresh = new Schema({
    token:{
        type: String
    }
})

const refresh_token = mongoose.model('refresh',refresh);

module.exports = {user_data,refresh_token}