function dinoRouter ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            component: 'home',
            resolve: {
                account: function (ImgurService) {
                    return ImgurService.getAccount();
                },
                carouselImages: function (ImgurService) {
                    return ImgurService.getCarouselImages();
                }
            }
        })
        .state('album', {
            url: '/album/:id',
            component: 'album',
            resolve: {
                images: function ($log, $stateParams, ImgurService) {
                    return ImgurService.getAlbumImages($stateParams.id);
                }
            }
        })
        .state('about', {
            url: '/about',
            component: 'about'
        });

    //TODO: Dynamic album states

}

module.exports = dinoRouter;
