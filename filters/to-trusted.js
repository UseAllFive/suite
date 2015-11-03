/* global angular */
angular.module('suite').
    filter('toTrusted', ['$sce', function($sce) {
        return function(value) {
            return $sce.trustAsHtml(value);
        };
    }])
;
