/* global angular, $ */
angular.module('suite')
    .directive('orphan', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, element, attrs) {
                $timeout(function() {
                    $(element).widowFix();
                });
            }
        };
    }])
;
