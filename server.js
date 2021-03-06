var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var methodOverride = require('method-override');

var app = express();
app.use(cors());

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect('mongodb://localhost:27017/futbol');
mongoose.set('debug',true);

require('./models/team.js');
require('./models/match.js');
require('./models/event.js');
require('./models/eventtype.js');

app.use(require('./routes'));

var router=express.Router();

app.use(router);

app.listen(port, () => {
  console.log('We are live on ' + port);
});
