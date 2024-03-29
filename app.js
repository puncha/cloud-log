var express = require('express')
  , indexRoute = require('./routes/indexRoute')
  , http = require('http')
  , path = require('path')

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 80);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', indexRoute.showLogs);
app.all('/log', indexRoute.postLog);
app.get('/clear', indexRoute.clearLogs);

var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
