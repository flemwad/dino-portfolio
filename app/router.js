function dinoRouter ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            component: 'home',
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
        });

    //TODO: Dynamic album states

}

module.exports = dinoRouter;
