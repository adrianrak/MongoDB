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
// mongoose.connect('mongodb://localhost/nodeappdatabase', {
//     useMongoClient: true
// });

const todoSchema = new Schema({
    //username: { type: String, required: true},
    list: { type: String, required: true }
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/add-todo', function(req, res) {
    res.render('add-todo');
});

app.get('/todo', function(req, res) {
    Todo.find()
        .then(function(todo) {
            res.render('todo', {data: todo});
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.post('/addtodo', function(req, res) {
    let newTodo = new Todo(req.body);
    newTodo.save()
        .then(function() {
            res.redirect('todo');
        })
        .catch(function(err) {
            console.log(err)
        });
});

let server = app.listen(app.get('port'), function() {
    console.log('Node app is running on port ', app.get('port'));
});

