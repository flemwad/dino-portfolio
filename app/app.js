var dinoPortfolio = angular.module('dinoPortfolio', [
    'ui.router',
]);

dinoPortfolio.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});

dinoPortfolio.run(function ($transitions, $rootScope) {

    /**
     * Draw page title on successful state transition
     */
    $transitions.onSuccess({}, function(options){

        if (options._targetState.$state().resolve && options._targetState.$state().resolve.pageTitle) {
            //$rootScope.pageTitle = options._targetState.$state().resolve.pageTitle() + ' | POINTMAN';
        }
        else {
            //$rootScope.pageTitle = 'POINTMAN';
        }

    });

});