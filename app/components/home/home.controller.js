function homeController ($log, $state) {

    this.$onInit = function (bindings) {
        var self = this;

        $log.debug('account', self.account);
        $log.debug('carousel images', self.carouselImages);
    };

}

module.exports = homeController;
