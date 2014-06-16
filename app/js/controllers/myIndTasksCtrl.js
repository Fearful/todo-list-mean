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


    $scope.eliminarTask = function(task){
        $scope.current;
        debugger;
        todoService.borrarTarea(task._id)
            .success(function () {
                $scope.getAll();
            })
            .error(function(current) {
                alert(current);
            });
    }

    $scope.editarTask= function(task){
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
        task.texto = $scope.textoNuevo;
        debugger;
        todoService.editarTarea(task)
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

    $scope.restantes = function () {
        var cuenta = 0;
        angular.forEach($scope.tareas, function (tarea) {
            cuenta += tarea.hecho ? 0 : 1;
        });
        return cuenta;
    }
    //call this method at first!
    $scope.getAll();
});