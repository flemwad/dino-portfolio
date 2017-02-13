function navigationController ($log, $state, NavigationService) {

    this.loadingAlbums = NavigationService.isLoadingAlbums;

    this.$onInit = function(bindings) {
        var self = this;

        NavigationService.loadAlbums().then(
            function loadAlbumSuccess (albums) {
                $log.debug('loaded albums:', albums);
                self.albums = albums;
            }
        )
        .catch(function loadAlbumFailure (error) {
            self.albums = [];
            self.loadingAlbumsFailed = true;
            $log.error(error);
        })
    };

    this.goAlbum = function (albumId) {
        $state.go('album', {id: albumId});
    }

}

module.exports = navigationController;
