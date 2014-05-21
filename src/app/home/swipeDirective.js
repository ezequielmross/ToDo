/*global angular, console, alert, window, document*/
(function swipeDirective() {
    'use strict';
    
    var swipe = function () {
        return {
            restrict: 'A',
            link: function (scope, elm, att) {
                var startX, lastX, touchStart, touchMove, touchEnd;
                        if (window.navigator.msPointerEnabled) {
                            // Pointer events are supported.
                            touchStart = 'MSPointerDown';
                            touchMove = 'MSPointerMove';
                            touchEnd = 'MSPointerUp';
                        } else {
                            touchStart = 'touchstart';
                            touchMove = 'touchmove';
                            touchEnd = 'touchend';
                        }
                        function getGesturePointFromEvent(evt) {
                            var point = {};

                            if (evt.targetTouches) {
                                point.x = evt.targetTouches[0].clientX;
                                point.y = evt.targetTouches[0].clientY;
                            } else {
                                point.x = evt.clientX;
                                point.y = evt.clientY;
                            }

                            return point;
                        }
                        function setAnimation(value) {
                           // elm[0].style.transform = 'translate3d(' + endX + 'px,0,0)';
                            var transformStyle = 'translateX(' + value + 'px)';
                            elm[0].style.msTransform = transformStyle;
                            elm[0].style.MozTransform = transformStyle;
                            elm[0].style.webkitTransform = transformStyle;
                            elm[0].style.transform = transformStyle;
                        }
                        function handleGestureMove(e) {
                            lastX = getGesturePointFromEvent(e).x - startX;
                            setAnimation(lastX);
                        }
                        function handleGestureEnd(e) {
                            if (lastX > (elm[0].clientWidth / 2)) {
                                scope.$apply(att.right);
                                //se o ponto de partida inicial - o final for maior que metade da tela (andou para esquerda)    
                            } else if ((lastX * -1) > (elm[0].clientWidth / 2)) {
                                scope.$apply(att.left);
                            }

                            setAnimation(0);
                            document.removeEventListener(touchMove, handleGestureMove, true);
                            document.removeEventListener(touchEnd, handleGestureEnd, true);
                        }

                elm.bind(touchStart, function (e) {
                    //ponto de partida
                    startX = getGesturePointFromEvent(e).x;
                    console.log('start');
                    document.addEventListener(touchMove, handleGestureMove, true);
                    document.addEventListener(touchEnd, handleGestureEnd, true);
                });
            }
        };
    };
    
    //ngTask.$inject = [];
    
    angular.module("Todo").directive('swipe', swipe);
}());