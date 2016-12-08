angular.module('dinoPortfolio').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('homePage', {
            url: '/home',
            component: 'homePage',
            resolve: {
                albums: function () {
                    //Call out to imgur api for albums
                },
                navTitle: function () {
                    return 'Home';
                }
            },
            onEnter: function () { //NavigationService
                //NavigationService.setVisible(false);
            }
        })
});