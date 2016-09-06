/* global angular, $ */
angular.module('ua5App')
    .directive('blinkVideo', ['BREAKPOINTS', '$timeout', function(BREAKPOINTS, $timeout) {
        return {
            restrict: 'A',
            scope: {
                blinkVideoData: '='
            },
            templateUrl: 'components/blink-video/blink-video.html',
            link: function($scope, element, attrs) {
                var $video;
                var video;
                var points = $scope.blinkVideoData.points;
                var clickInProgress = false;
                var clickProgressTimeout;
                var windowWidth = $(window).width();
                $scope.canplay = false;
                function isScrolledIntoView(elem) {
                    var docViewTop = $(window).scrollTop();
                    var docViewBottom = docViewTop + $(window).height();
                    var elemTop = $(elem).offset().top;
                    var elemBottom = elemTop + $(elem).height();
                    return ((elemBottom <= docViewBottom && elemBottom >= docViewTop) || (elemTop >= docViewTop && elemTop <= docViewBottom));
                }
                if (windowWidth > BREAKPOINTS.PHABLET) {
                    $scope.video = $scope.blinkVideoData.desktopVideo;
                } else {
                    $scope.video = $scope.blinkVideoData.mobileVideo;
                }
                $scope.backgroundStyle = {'background-image': 'url(' + $scope.blinkVideoData.backgroundImage + ')'};
                $timeout(function() {
                    $video = $('video', element);
                    video = $video[0];
                    window.makeVideoPlayableInline(video);
                    $video.css('opacity', 0);
                    function clickedVideo() {
                        var curTime = video.currentTime;
                        var nextPos = 0;
                        if (clickInProgress || !$scope.canplay) {
                            return;
                        }
                        $video.css('opacity', 1);
                        if (video.paused) {
                            video.play();
                        } else {
                            if (points) {
                                clickInProgress = true;
                                clearTimeout(clickProgressTimeout);
                                clickProgressTimeout = setTimeout(function() {
                                    clickInProgress = false;
                                }, 500);
                                // loops through points to see which one is the next video
                                for (var i = 0; i < points.length; i++) {
                                    if (curTime > points[i]) {
                                        nextPos++;
                                    }
                                }
                                if (typeof points[nextPos] === 'undefined') {
                                    nextPos = 0;
                                }
                                video.currentTime = points[nextPos];
                            } else {
                                video.pause();
                            }
                        }
                    }
                    video.addEventListener('canplaythrough', function(e) {
                        var scope = angular.element($(e.target).parents('.blink-video')).scope();
                        scope.canplay = true;
                        scope.$apply();
                    });
                    $video.on('click', clickedVideo);
                    video.addEventListener('ended', function() {
                        video.play();
                    });
                    video.load();
                    $scope.$on('app:scrolled', function() {
                        if (!isScrolledIntoView(video)) {
                            if (!video.paused) {
                                video.pause();
                            }
                        }
                    });
                });
                $scope.$on('$destroy', function() {
                    $video.off();
                });
            }
        };
    }])
;
