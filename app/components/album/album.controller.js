function albumController ($log) {

    this.$onInit = function(bindings) {
        var self = this;

        //TODO - Load all images given $stateParams.id which should be imgur's album id
        $log.debug('loaded images', self.images);

        //Make the link a large thumbnail instead of the full image
        angular.forEach(self.images, function (image) {
            image.link = 'http://i.imgur.com/' + image.id + 'm.' + image.type.split('/')[1];
        });

    };

}

module.exports = albumController;
