/* global angular, $, _ */
angular.module('suite')
    .directive('equalize', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                equalizeChildSelector: '@',
                equalizeMobileBreakpoint: '@'
            },
            link: function($scope, element, $attrs) {
                var TRY_MAX = 50;
                var $$element;
                var $$window;
                var count;
                var tryEqualize;
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
                            $$element.find($scope.equalizeChildSelector).css('height', '');
                        }
                    }
                    // Default count
                    count = 0;
                    // Try calling equalize recursively until the children's
                    // DOM has been updated. Otherwise, equalize may be run
                    // before the children are in place.
                    tryEqualize = _.throttle(function() {
                        count++;
                        if ($$element.find($scope.equalizeChildSelector).length !== 0 && count < TRY_MAX) {
                            equalize();
                        } else {
                            tryEqualize();
                        }
                    }, 500);
                    tryEqualize();
                    $$window.on('resize.equalize', equalize);
                    $scope.$on('$destroy', function() {
                        $$window.off('resize.equalize');
                    });
                });
            }
        };
    }])
;
