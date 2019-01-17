const fs = require('fs');
const path = require('path');
const express = require('express');
const db = require('./db/db.js');
const bodyParser = require('body-parser');

const mongoose = db.mongoose;

app = express();
app.use(bodyParser.urlencoded({extended: true,}));
app.use(express.static(__dirname + '/static'));

// Assign routes
require('./routes/routes.js')(app);

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(5000);