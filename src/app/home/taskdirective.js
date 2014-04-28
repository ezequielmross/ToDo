/*global angular, console, alert*/
(function taskDirective() {
    'use strict';
    
    var ngTask = function () {
        return {
            restrict: 'A',
            link: function (scope, elm, att) {
                var startX, endX;
                
                elm.bind('touchstart', function (e) {
                    //ponto de partida
                    startX = e.changedTouches[0].clientX;
                    //atualizando seu tipo de posição
                    elm[0].style.position = "relative";
                    
                });
                
                elm.bind('touchmove', function (e) {
                    //partida atual - inicial
                    endX = e.changedTouches[0].clientX - startX;
                    //aplicando o estilo left
                    elm[0].style.left = endX + "px";
                    
                });
                
                elm.bind('touchend', function (e) {
                    //se o ponto de partida final - o inicial(andou para direita) for maior que metade da tela
                    if ((e.changedTouches[0].clientX - startX) > (elm[0].clientWidth / 2)) {
                        alert("Finalizado!");
                    //se o ponto de partida inicial - o final(andou para esquerda) for maior que metade da tela    
                    } else if ((startX - e.changedTouches[0].clientX) > (elm[0].clientWidth / 2)) {
                        alert("Excluido!");
                    }
                    elm[0].style.left = '';
                    
                });
            }
        };
    };
    
    //ngTask.$inject = [];
    
    angular.module("Todo").directive('ngTask', ngTask);
}());