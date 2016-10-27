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
        var isWkWebView = false;
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
        if (navigator.platform.substr(0, 2) === 'iP') {
            //iOS (iPhone, iPod or iPad)
            var lte9 = /constructor/i.test(window.HTMLElement);
            var nav = window.navigator, ua = nav.userAgent, idb = !!window.indexedDB;

            if (ua.indexOf('Safari') !== -1 && ua.indexOf('Version') !== -1 && !nav.standalone) {
                //Safari (WKWebView/Nitro since 6+)
            } else if ((!idb && lte9) || !window.statusbar.visible) {
                //UIWebView
            } else if ((window.webkit && window.webkit.messageHandlers) || !lte9 || idb) {
                //WKWebView
                isWkWebView = true;
            }
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
            },
            isWkWebView: function() {
                return isWkWebView;
            }
        };
    }])
;
