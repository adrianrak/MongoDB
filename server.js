const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://<adrrak>:<chopin>@ds233238.mlab.com:33238/database-1', {
    useMongoClient: true
});



app.set('port', (process.env.PORT || 5000));
app.use(express.static('./'));
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
let server = app.listen(app.get('port'), function() {
    console.log('Express is working on port ', app.get('port'));
});

