var app = angular.module('myApp', []);

app.controller('myController', myController);

function myController($scope, $http) {
    $scope.title = 'Xin chao';

    $scope.courses = [];
    $scope.getCourses = function () {
        $http.get('/course').then(function (result) {
            $scope.courses = result.data;
        });
    };
    $scope.getCourses();
}