var express = require("express"),
    app     = express()
var _ = require("underscore");
var mongoose = require('mongoose');
//==================================================================

//===========================CONFIGURATION==========================

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.errorHandler());
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
    app.use(express.errorHandler());
    app.use(app.router);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


app.get("/", function(req, res) {
    res.redirect("/index.html");
});
//==================================================================

//===========================MONGO DB===============================
var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function() {
        // Schema
        var TaskSchema = new mongoose.Schema({
            text: { type: String },
            done: { type: Boolean }
        });

        // Mongoose also creates a MongoDB collection called 'colTasks' for these documents.
        var colTasks = mongoose.model('colTasks', TaskSchema);

    // get all tasks
    app.get('/api/myTasks', function(req, res){
        colTasks.find(function(err, myTasks) {
            if (err) return console.error(err);
            res.send (myTasks);
        });
    });

    // create a new task
    app.post('/newTask', function(req, res) {
        var newTask = new colTasks({
            text : req.body.text,
            done : req.body.done
        });
        newTask.save();
        res.json(true);
    });

    // delete all removed tasks.
    app.delete('/delete', function(req, res) {        
        var deletedTasks = new Array();
        colTasks.find({ done: true}, function (err, myDeletedTasks) {
            if (err) return handleError(err);
            colTasks.remove({done: true}, function(err){
                if (err) return handleError(err);
                // removed!
            });
            _.each(myDeletedTasks, function(task){
                deletedTasks.push({id: task._doc._id});
            });
            res.send (deletedTasks);
        });
    });

    // Select a particular task
    app.put('/selectedTask/:id', function(req, res) {
        colTasks.findOne({ _id: req.params.id }, function (err, task){
            task.done = !task.done;
            task.save();
        });
        res.json(true);
    });

    // Update a particular task
    app.put('/updateTask', function(req, res){
        colTasks.findOne({_id : req.body._id}, function(err, task){
            task.text = req.body.text;
            task.save();
        });
        res.json(true);
    });

    app.delete('/delTask/:id', function(req, res){
        colTasks.remove({_id: req.params.id}, function(err){
            if (err) return handleError(err);
            // removed!
            res.json(true);
        });
    });
});

mongoose.connect('mongodb://localhost/todo');
//==================================================================