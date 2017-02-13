var Masonry = require('masonry-layout');

function ngMasonry ($log, $timeout) {
    return function link (scope, element, attrs) {

        if (scope.$last){
            $timeout(function () {

                var parent = element.parent();
                var masonry = new Masonry(parent[0], {
                    itemSelector: '.item',
                    isAnimated: true,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    },
                    transitionDuration : '0.4s',
                    isResizable: false
                });
            });
        }
    };
}

module.exports = ngMasonry;
