var dinoPortfolio = angular.module('dinoPortfolio', [
    'ui.router',
    'ui.bootstrap',
    'LocalStorageModule'
]);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['dinoPortfolio'])
});

dinoPortfolio.config(function ($logProvider, $httpProvider, localStorageServiceProvider, ENV) {
    if(ENV.dev) $logProvider.debugEnabled(true);

    localStorageServiceProvider.setPrefix('imgurfolio');

    $httpProvider.defaults.headers.common['Authorization'] = 'Client-ID ' + ENV.api_client_id;
});

var createAlbumStates = function ($state, albums) {
    console.log(albums);
    angular.forEach(albums, function (album) {
        $state.router.stateProvider.state('album' + album.id, {
            url: '/album/:id',
            component: 'album',
            onEnter: function ($log) {
                $log.debug('album ' + albums.id + 'worked!');
            }
        });
    })
};

dinoPortfolio.run(function ($log, $state, $transitions, ImgurService, ImgurCacheService) {

    //TODO - Async, bad spot for this, move it or lose it
    if (!ImgurCacheService.getAccount()) ImgurService.getAccount();

    //TODO - move this to some service
    var cachedAlbums = ImgurCacheService.getAlbums();
    if (cachedAlbums) {
        //TODO: check if album exists before blindly adding it to nav
        createAlbumStates($state, cachedAlbums);
    } else {
        ImgurService.getAlbums().then(function (albums) {
            createAlbumStates($state, albums);
        })
        .catch(function (error) {
            //TODO - handle gracefully, nav bar shouldn't show any albums, show a sad face instead
            throw new Error(error);
        })
    }

    /**
     * Draw page title on successful state transition
     */
    $transitions.onSuccess({}, function(options){

        if (options._targetState.$state().resolve && options._targetState.$state().resolve.pageTitle) {
            //$rootScope.pageTitle = options._targetState.$state().resolve.pageTitle() + ' | i';
        }
        else {
            //$rootScope.pageTitle = '';
        }

    });

});
