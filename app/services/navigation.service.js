function navigationService ($log, $q, ImgurCacheService, ImgurService) {

    this.isLoadingAlbums = function () {
        return this.loadingAlbums;
    };

    this.loadAlbums = function () {
        var self = this;
        var deferred = $q.defer();

        self.loadingAlbums = true;

        //TODO - cacheing would require checking if amount of albums changed
        // var cachedAlbums = ImgurCacheService.getAlbums();
        // if (cachedAlbums) {
        //     this.loadingAlbums = false;
        // } else {
        //
        // }

        ImgurService.getAlbums().then(function (albums) {
            self.loadingAlbums = false;
            deferred.resolve(albums);
        })
        .catch(function (error) {
            self.loadingAlbums = false;
            deferred.reject(error);
        });

        return deferred.promise;
    }

}

module.exports = navigationService;
