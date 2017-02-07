function homeController ($log, $state, $q, ImgurService, ImgurCacheService) {

    //TODO - move this to the cache service
    var iterateAlbumImages = function (albums) {
        var self = this;
        var deferred = $q.defer();

        //TODO - $q.all, forgot how
        angular.forEach(albums, function (album) {
            ImgurService.getAlbumImages(album.id).then(function (data) {
                self['album:' + album.id] = data;
                $log.debug(self['album:' + album.id]);
            }).catch(function (error) {
                deferred.reject(error);
            });

        });

        return deferred.promise;
    };

    this.$onInit = function(bindings) {
        var self = this;

        //TODO - Load all images given $state.id which should be imgur's album id

        // if (albums) {
        //     $log.debug('cached albums: ', ImgurService.albums);
        //     self.albums = ImgurService.albums;
        //
        //     //iterateAlbumImages(self.albums);
        // } else {
        //     ImgurService.getAlbums().then(function (data) {
        //         return data;
        //     })
        //     .then(function (data) {
        //         self.albums = data;
        //         //return iterateAlbumImages(self.albums);
        //     })
        //     .catch(function (error) {
        //         //TODO - toast error
        //         throw new Error(error);
        //     });
        // }

    };

}

module.exports = homeController;
