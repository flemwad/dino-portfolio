angular.module('dinoPortfolio').component('homePage',
    {
        template: function ($templateCache) {
            return $templateCache.get('components/home/home.template.html');
        },
        controller: 'homeController',
        bindings: {
            navTitle: '=',
            albums: '<'
        }
    }
);