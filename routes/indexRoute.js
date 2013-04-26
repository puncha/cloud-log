var Mongoose = require('mongoose');
var Message = require("../model/message");
var Util = require("util");

// initialize the DB connection
(function () {
    if (process.env.VCAP_SERVICES) {
        // Online
        var env = JSON.parse(process.env.VCAP_SERVICES);
        var mongo = env['mongodb-1.8'][0]['credentials'];
        var DbUrl = "mongodb://" + mongo.username + ":" + mongo.password + "@" + mongo.hostname + ":" + mongo.port + "/" + mongo.db;
    }
    else {
        // Local
        var DbUrl = "mongodb://localhost:27017/db";
    }

    Mongoose.connect(DbUrl);
    var db = Mongoose.connection;
    db.on('error', console.error.bind(console, 'Failed to connection to Database!'));
    db.once('open', console.error.bind(console, 'Connected to Database.'));
})();

exports.showLogs = function (req, res) {
    Message.find().sort({ recvDate: 'asc' }).exec(function (err, messages) {
        if (err) {
            res.send(500, 'Failed: ' + Util.inspect(err));
            return;
        }
        res.render('index', { messages: messages });
    });
}

exports.postLog = function (req, res) {
    var title = req.query.title;
    var body = req.query.body;

    // Add message to DB
    var message = new Message({ title: title, body: body, recvDate: new Date() });
    console.log(Util.inspect(message));
    message.save(function (err) {
        if (err) {
            res.send(500, 'Failed: ' + Util.inspect(err));
            return;
        }

        res.send("200", "OK");
    });
}

exports.clearLogs = function (req, res) {
    Message.remove(function (err, user) {
        setTimeout(function () {
            res.redirect(303, '/');
        });
    });
}