'use strict';

/* Services */
app.service('todoService', function ($http, $location) {
        
        var urlBase = "/api/myTasks";
    
        //return the array
        this.getAll = function () {
           return $http.get('/api/myTasks');
        }

    //add a new element to array
    this.create = function (newTask) {
        return $http.put('/newTask', newTask);
    };

    this.seleccion = function(selectedTaskID){
        return $http.post('/selectedTask/' + selectedTaskID);
    };

    this.delSelectedTasks = function () {
        return $http.delete('/delete');
    };

    this.borrarTarea = function(myTaskID){
        return $http.delete('/delTask/'+ myTaskID);
    };

    this.editarTarea = function(myTask){
        return $http.post('/updateTask', myTask);
    }
}); 
