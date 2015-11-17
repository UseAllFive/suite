/* global angular, $ */
angular.module('suite')
    .directive('carousel', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                carouselOptions: '='
            },
            transclude: true,
            link: function($scope, element, attrs) {
                $timeout(function() {
                    $(element).slick($scope.carouselOptions);
                });
            }
        };
    }])
;
