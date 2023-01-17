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

const admin = new Schema({
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

const admin_data = mongoose.model('admin',admin);

const refresh = new Schema({
    token:{
        type: String
    }
})

const requests = new Schema({
  userid:mongoose.ObjectId,
  name:String,
  email:String,
  company:String,
  city:String,
  phone:Number,
  zip:Number,
  status:String,
  seat:Number
})
const slotrequest = mongoose.model('request',requests);

const refresh_token = mongoose.model('refresh',refresh);

module.exports = {user_data,admin_data,refresh_token,slotrequest}