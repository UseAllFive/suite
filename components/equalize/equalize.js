/* global angular, $ */
angular.module('suite')
    .directive('equalize', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                equalizeChildSelector: '@',
                equalizeMobileBreakpoint: '@'
            },
            link: function($scope, $element, $attrs) {
                var $$element;
                var $$window;
                $$element = $(element);
                $$window = $(window);
                $timeout(function() {
                    function equalize() {
                        if ($$window.width() > $scope.equalizeMobileBreakpoint) {
                            // If the window width is greater than the mobile
                            // breakpoint then run equalize.
                            $$element.equalize({
                                children: $scope.equalizeChildSelector,
                                reset: true
                            });
                        } else {
                            // Reset height
                            $$element.css('height', 0);
                        }                        
                    }                    
                    equalize();
                    $$window.on('resize.equalize', equalize);
                    $scope.$on('$destroy', function() {
                        $$window.off('resize.equalize');
                    });
                });
            }
        };
    }])
;
