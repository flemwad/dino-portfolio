function homeController ($log, $state) {

    var vm = this;
    
    vm.$onInit = function(bindings) {
        $log.debug(vm.navTitle);
    };
    
}

angular.module('dinoPortfolio').controller('homeController', homeController);