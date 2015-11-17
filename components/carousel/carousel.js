/* global angular, $ */
angular.module('suite')
    .directive('carousel', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                carouselOptions: '='
            },
            templateUrl: 'components/carousel/carousel.html',
            transclude: true,
            link: function($scope, element, attrs) {
                $timeout(function() {
                    var $$carousel;
                    $$carousel = $(element).find('.carousel');
                    $$carousel.slick($scope.carouselOptions);
                });
            }
        };
    }])
;
