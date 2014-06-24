'use strict';

app.controller('myIndTasksCtrl', function($scope, todoService, $location) {
    //get all elements

    $scope.textBtEdit = "Edit";
    $scope.state = true;
    var btEdit = true;


    $scope.getAll = function() {
        todoService.getAll()
            .success(function (data, status, headers, config) {
                $scope.tareas = data;
            })
            .error(function(data, status, headers, config) {
                alert(current);
            });
    }


    $scope.delTask = function(task){
        $scope.current;
        debugger;
        todoService.delTask(task._id)
            .success(function () {
                $scope.getAll();
            })
            .error(function(current) {
                alert(current);
            });
    }

    $scope.editTask= function(task){
        if(btEdit == true){
            $scope.state = false;
            $scope.textBtEdit = "Save";
            btEdit = false;
        }
        else{
            confirmEditTask(task);
        }
    }


    var confirmEditTask = function(task){
        $scope.current;
        debugger;
        task.texto = $scope.newText;
        debugger;
        todoService.editTask(task)
            .success(function () {
                $scope.getAll();
                $scope.textBtEdit = "Edit";
                $scope.state = true;
                btEdit = true;
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
    }
    //call this method at first!
    $scope.getAll();
});