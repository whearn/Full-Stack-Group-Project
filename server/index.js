var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var prerender = require('prerender-node');
var api = require('./api');
var routing = require('./middleware/routing.mw');

var clientPath = path.join(__dirname, '../client');

//add group prerender token
// prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);

var app = express();
app.use(prerender);
app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', api);

app.get('*', routing.stateRouting);
app.listen(process.env.PORT || 3000);