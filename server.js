const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('./'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'pug');
app.set('views','./views');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://<adrrak>:<chopin>@ds233238.mlab.com:33238/database-1', {
    useMongoClient: true
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/todo', function (req, res) {
    res.render('todo', { name: req.query.first_name });
});

let server = app.listen(app.get('port'), function() {
    console.log('Node app is running on port ', app.get('port'));
});

