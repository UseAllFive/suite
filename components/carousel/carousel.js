/* global angular, $ */
angular.module('suite')
    .directive('carousel', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                carouselOptions: '='
            },
            link: function($scope, element, attrs) {
                $timeout(function() {
                    $(element).slick($scope.carouselOptions);
                });
            }
        };
    }])
;
