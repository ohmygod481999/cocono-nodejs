var app = angular.module('myApp', [
    'ngResource',
    'ngRoute',
    'myControllers',
    'teacherControllers',
    'courseController'
]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'modules/index/views/index.html',
            controller: 'IndexController'
        })
        .when('/about',{
            templateUrl: 'modules/index/views/about.html',
            controller: 'IndexController'
        })
        .when('/blog',{
            templateUrl: 'modules/index/views/blog.html',
            controller: 'IndexController'
        })
        .when('/courses',{
            templateUrl: 'modules/courses/views/courses.html',
            controller: 'CourseController'
        })
        .when('/events',{
            templateUrl: 'modules/index/views/events.html',
            controller: 'IndexController'
        })
        .when('/teachers',{
            templateUrl: 'modules/teachers/views/teachers.html',
            controller: 'TeacherController'
        })
        .when('/course-single',{
            templateUrl: 'modules/courses/views/course-single.html',
            controller: 'IndexController'
        })
}])