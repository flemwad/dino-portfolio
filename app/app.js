var dinoPortfolio = angular.module('dinoPortfolio', [
    'ui.router',
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

dinoPortfolio.run(function ($transitions, $rootScope, ImgurService) {

    //Get account info to cache for album requests, etc.
    ImgurService.getAccount();

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
