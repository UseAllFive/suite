/* global angular, Modernizr */
angular.module('suite')
    .factory('BrowserFactory', [function() {
        var isChrome;
        var isExplorer;
        var isFirefox;
        var isSafari;
        var isOpera;
        var isAndroid;
        var isEdge;
        isChrome = navigator.userAgent.indexOf('Chrome') > -1;
        isExplorer = navigator.userAgent.indexOf('MSIE') > -1;
        isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
        isSafari = navigator.userAgent.indexOf('Safari') > -1;
        isOpera = navigator.userAgent.toLowerCase().indexOf('op') > -1;
        isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;
        isEdge = navigator.userAgent.toLowerCase().indexOf('edge') > -1;
        // Chrome has both 'Chrome' and 'Safari' inside userAgent string.
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
