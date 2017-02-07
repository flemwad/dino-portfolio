function navigationController ($log, $state, ImgurService, ImgurCacheService) {

    this.$onInit = function(bindings) {
        var self = this;

        //TODO - handle hiding and showing album buttons when they are finished dynamically loaded
        //Refer to app.js for now for dynamic state loading

        // if (ImgurService.getCachedAlbums()) {
        //     $log.debug('cached albums: ', ImgurService.albums);
        //     self.albums = ImgurService.albums;
        //
        //     //iterateAlbumImages(self.albums);
        // } else {
        //     ImgurService.getAlbums().then(function (data) {
        //         self.albums = data;
        //     }).catch(function (error) {
        //         //TODO - toast error
        //         throw new Error(error);
        //     });
        // }

    };

}

module.exports = navigationController;
