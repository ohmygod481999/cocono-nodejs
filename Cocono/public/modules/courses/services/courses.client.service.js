angular.module('CourseController').factory('Courses', [
    '$resource',
    function($resource){
        return $resource(
            '/courses/api/:id',
            { query: {method: 'GET'}}
        )
    }
])