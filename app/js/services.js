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

    this.selection = function(selectedTaskID){
        return $http.post('/selectedTask/' + selectedTaskID);
    };

    this.delSelectedTasks = function () {
        return $http.get('/delete');
    };

    this.deleteTask = function(myTaskID){
        return $http.delete('/delTask/'+ myTaskID);
    };

    this.editTask = function(myTask){
        return $http.post('/updateTask', myTask);
    }
}); 
