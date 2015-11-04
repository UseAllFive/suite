/* global angular, $ */
angular.module('suite')
    .directive('orphan', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, element, attrs) {
                var $$element;
                var $$p;
                $timeout(function() {
                    $$element = $(element);
                    $$p = $$element.find('p');                    
                    if ($$p.length > 1) {
                        // If there are multiple paragraphs contained within
                        // element, then apply widowFix to each paragraph.
                        $.each($$p, function(i, p) {
                            $(p).widowFix();
                        });
                    } else {
                        // Otherwise, apply widowFix to the entire element.
                        $$element.widowFix();
                    }                
                });
            }
        };
    }])
;
