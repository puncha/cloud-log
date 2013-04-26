var Mongoose = require('mongoose');

var schema = new Mongoose.Schema({
    title: String,
    body: String,
    recvDate: Date
});

var Message = module.exports = Mongoose.model('Message', schema, 'messages');