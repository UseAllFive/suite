/* global angular */
angular.module('ua5App').
    filter('toTrusted', ['$sce', function($sce) {
        return function(value) {
            return $sce.trustAsHtml(value);
        };
    }])
;
