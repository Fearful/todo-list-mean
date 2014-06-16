var express = require("express"),
    app     = express()

var _ = require("underscore");
var mongoose = require('mongoose');

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


// mongo db ____________________________________________________________________________________________

var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function() {
        // Schema
        var TaskSchema = new mongoose.Schema({
            texto: { type: String },
            hecho: { type: Boolean }
        });

        // Mongoose also creates a MongoDB collection called 'Posts' for these documents.
        var colTasks = mongoose.model('colTasks', TaskSchema);

//    // examples ____________________________________________________________________________________________
//
//    var post_example1 = new colTasks({
//        id: 1,
//        texto: 'Recruiting Advice No One Tells You',
//        hecho:  false
//    });
//
//    var post_example2 = new colTasks({
//        id: 2,
//        texto: 'Recruiting Nico',
//        hecho:  true
//    });
//
////    var contID = 2;
//
//    post_example1.save();
//    post_example2.save();

    // _____________________________________________________________________________________________________

    // get all Tasks
    app.get('/api/myTasks', function(req, res){
        colTasks.find(function(err, myTasks) {
            if (err) return console.error(err);
            res.send (myTasks);
        });
    });

    // create a new Task.   Preguntar id, texto hecho.   que hace res.json?
    //NO SE PUEDE PASAR LA TAREA ENTERA Y AGREGARLA EN LUGAR DE DESARMAR EL OBJETO?

    app.put('/newTask', function(req, res) {
        var newTask = new colTasks({
            texto : req.body.texto,
            hecho : req.body.hecho
        });
        newTask.save();
        res.json(true);
    });

    // delete todas las tareas terminadas.
    app.delete('/delete', function(req, res) {
        colTasks.remove({hecho: true}, function(err){
            if (err) return handleError(err);
            // removed!
            res.json(true);
        });
    });

    // Select a particular task
    app.post('/selectedTask/:id', function(req, res) {
        colTasks.findOne({ _id: req.params.id }, function (err, task){
            task.hecho = !task.hecho;
            task.save();
        });
        res.json(true);
    });

    app.post('/updateTask', function(req, res){
        colTasks.findOne({_id : req.body._id}, function(err, task){
           task.texto = req.body.texto;
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