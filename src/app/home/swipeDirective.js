/*global angular, console, alert, window, document*/
(function swipeDirective() {
    'use strict';
    
    var swipe = function () {
        return {
            restrict: 'A',
            link: function (scope, elm, att) {
                var  startX = 0, lastX = 0, touch = {};
                swipe.prototype.initTouch(touch);
                
                
                elm.bind(touch.touchStart, function (e) {
                    //ponto de partida
                    startX = swipe.prototype.getGesturePointFromEvent(e).x;
                    console.log('start');
                    document.addEventListener(touch.touchMove, handleGestureMove, true);
                    document.addEventListener(touch.touchEnd, handleGestureEnd, true);
                });
                
                function handleGestureMove(e) {
                    lastX = swipe.prototype.getGesturePointFromEvent(e).x - startX;
                    swipe.prototype.setAnimation(lastX, elm);
                }
                function handleGestureEnd(e) {
                    if (lastX > (elm[0].clientWidth / 2)) {
                        scope.$apply(att.right);
                        //se o ponto de partida inicial - o final for maior que metade da tela (andou para esquerda)    
                    } else if ((lastX * -1) > (elm[0].clientWidth / 2)) {
                        scope.$apply(att.left);
                    }
                    
                    swipe.prototype.setAnimation(0, elm);
                    document.removeEventListener(touch.touchMove, handleGestureMove, true);
                    document.removeEventListener(touch.touchEnd, handleGestureEnd, true);
                }
            }
        };
    };
    swipe.prototype.initTouch = function setAnimation(touch) {
        //#IE CASE
        if (window.navigator.msPointerEnabled) {
            // Pointer events are supported only in IE.
            touch.touchStart = 'MSPointerDown';
            touch.touchMove = 'MSPointerMove';
            touch.touchEnd = 'MSPointerUp';
        } else {
            touch.touchStart = 'touchstart';
            touch.touchMove = 'touchmove';
            touch.touchEnd = 'touchend';
        }
    };
    
    swipe.prototype.setAnimation = function setAnimation(value, elm) {
        // elm[0].style.transform = 'translate3d(' + endX + 'px,0,0)';
        var transformStyle = 'translateX(' + value + 'px)';
        elm[0].style.msTransform = transformStyle;
        elm[0].style.MozTransform = transformStyle;
        elm[0].style.webkitTransform = transformStyle;
        elm[0].style.transform = transformStyle;
    };
    swipe.prototype.getGesturePointFromEvent = function getGesturePointFromEvent(evt) {
        var point = {};
        
        if (evt.targetTouches) {
            point.x = evt.targetTouches[0].clientX;
            point.y = evt.targetTouches[0].clientY;
        } else if (evt.originalEvent && evt.originalEvent.targetTouches) {
            point.x = evt.originalEvent.targetTouches[0].clientX;
            point.y = evt.originalEvent.targetTouches[0].clientY;
        } else {
            //#IE CASE
            point.x = evt.clientX;
            point.y = evt.clientY;
        }
        
        return point;
    };
    //swipe.$inject = [];
    
    angular.module("Todo").directive('swipe', swipe);
}());