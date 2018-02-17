const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'pug');
app.set('views','./views');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://adrrak:chopin@ds233238.mlab.com:33238/database-1');
// mongoose.connect('mongodb://localhost/nodeappdatabase', {
//     useMongoClient: true
// });

const todoSchema = new Schema({
    task: { type: String, required: true }
});

const Todo = mongoose.model('Todo', todoSchema);

// app.get('/', function(req, res) {
//     res.render('todo');
// });

app.get('/', function (req, res) {
    Todo.find()
        .then(function(todo) {
            res.render('todo', {data: todo});
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.post('/addtask', function (req, res) {
    let newTodo = new Todo (req.body);
    newTodo.save()
        .then(function() {
            res.redirect('/');
        })
        .catch(function(err) {
            console.log(err);
        });
});
app.get('/todo/delete/:id', function(req, res){
	Todo.findByIdAndRemove({_id: req.params.id}, 
	   function(err, docs){
		if(err) {
            return res.json(err);
        }
        return res.redirect('/');
	});
});

let server = app.listen(app.get('port'), function() {
    console.log('Node app is running on port ', app.get('port'));
});

