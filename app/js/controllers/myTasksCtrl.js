'use strict';

app.controller('myTasksCtrl', function($scope, todoService, $location) {

    var msgAlert = function(msg, isVisible, state){
        $scope.msgAlert = msg;
        $scope.msgVisible = isVisible;
        $scope.styleAdded = state;
    }

    //get all elements
    $scope.getAll = function() {
        todoService.getAll()
            .success(function (data, status, headers, config) {
                $scope.tasks = data;
                $scope.count = data.length;
                numDone();
            })
            .error(function(current) {
                alert(current);
            });
    }

    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.tasks, function (task) {
            count += task.done ? 0 : 1;
        });
        return count;
    };

    var numDone = function () {
        $scope.countDelete = 0;
        angular.forEach($scope.tasks, function (task) {
            $scope.countDelete += task.done ? 1 : 0;
        });
    };
    
    $scope.addTask = function() {        
        if($scope.textNewTask == "" || $scope.textNewTask == undefined) {
            $scope.empty = true;
            msgAlert("You must enter a task", true, false);
            return;
        }
        var task = {
            text : $scope.textNewTask,
            done : false
        };
        todoService.create(task)
            .success(function (current, status, headers, config) {
                $scope.getAll();
                $scope.textNewTask = "";
                msgAlert("Task added", true, true) ;
            })
            .error(function (current, status, headers, config) {
                alert(current);
            });
    };

    $scope.selection = function(task){
        msgAlert("", false, false);
        todoService.selection(task._id)
        .success(function () {
                $scope.getAll();
        })
        .error(function(current, status, headers, config) {
            alert(current);
        });
    }

    $scope.delSelectedTasks = function(){           
        if($scope.countDelete == 0){
            msgAlert("You must select the task to delete", true, false);
            return;
        }
        todoService.delSelectedTasks()
            .success(function(data){
                angular.forEach(data, function(id){
                    angular.forEach($scope.tasks, function(del) {
                        if (del._id == id.id){
                            var index = $scope.tasks.indexOf(del);
                            $scope.tasks.splice(index, 1);
                        }
                    });
                });
                $scope.count = $scope.tasks.length;
                $scope.countDelete = 0;
                msgAlert("Deleted task", true, true);
            })
            .error(function(current){
                alert(current)
            });
    }

    $scope.verifyText = function(){
        if($scope.textNewTask != "" || $scope.textNewTask != undefined) {
            msgAlert("", false, false);
            $scope.empty = false;
        }
    }

    //call this method at first!
    $scope.getAll();
});