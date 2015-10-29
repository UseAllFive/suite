/* global angular, Modernizr */
angular.module('ua5App')
    .factory('BrowserFactory', ['$resource', function($resource) {

        var isChrome = navigator.userAgent.indexOf('Chrome') > -1;
        var isExplorer = navigator.userAgent.indexOf('MSIE') > -1;
        var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
        var isSafari = navigator.userAgent.indexOf('Safari') > -1;
        var isOpera = navigator.userAgent.toLowerCase().indexOf('op') > -1;
        var isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;
        var isEdge = navigator.userAgent.toLowerCase().indexOf('edge') > -1;

        //chrome has both 'Chrome' and 'Safari' inside userAgent string.
        if ((isChrome) && (isSafari)) {
            isSafari = false;
        }

        if ((isChrome) && (isOpera)) {
            isChrome = false;
        }

        if ((isChrome) && (isEdge)) {
            isChrome = false;
        }

        return {
            isSafari: function() {
                return isSafari;
            },
            isChrome: function() {
                return isChrome;
            },
            isExplorer: function() {
                return isExplorer;
            },
            isFastBrowser: function() {
                return ((isChrome || isFirefox) && !Modernizr.touch);
            },
            hasTouch: function() {
                return Modernizr.touch;
            },
            hasWebGl: function() {
                return Modernizr.webgl;
            },
            isAndroid: function() {
                return isAndroid;
            }
        };
    }])
;
