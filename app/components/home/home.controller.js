function homeController ($log, $state, ImgurService) {

    var albums = ImgurService.getCachedAlbums();

    this.$onInit = function(bindings) {
        var self = this;

        $log.debug(this.navTitle);

        if (albums) {
            $log.debug('cached albums: ', ImgurService.albums);
            self.albums = ImgurService.albums;
            ImgurService.getAlbumImages(ImgurService.albums[0].id);
        } else {
            ImgurService.getAlbums().then(function (data) {
                return data;
            })
            .then(function (data) {
                self.albums = data;
                return ImgurService.getAlbumImages(data[0].id);
            })
            .then(function (data) {
                self.album1Images = data;
            })
        }

    };

}

module.exports = homeController;
