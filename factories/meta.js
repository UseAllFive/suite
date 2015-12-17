/* global angular, _ */
angular.module('suite')
    .factory('MetaFactory', ['metaDefaults', function(metaDefaults) {
        var meta = {};
        meta = angular.extend({}, metaDefaults, meta);
        function strip(html) {
            var tmp = document.createElement('DIV');
            tmp.innerHTML = html.replace(/['"]+/g, '');
            return tmp.textContent || tmp.innerText || '';
        }
        return {
            meta: meta,
            set: function(src) {
                var cleanedSrc = {};
                angular.forEach(src, function(value, key) {
                    cleanedSrc[key] = strip(value);
                });
                angular.forEach(metaDefaults, function(value, key) {
                    if (!cleanedSrc.hasOwnProperty(key)) {
                        cleanedSrc[key] = value;
                    }
                });
                meta = _.extend(meta, metaDefaults, cleanedSrc);
            }
        };
    }])
;
