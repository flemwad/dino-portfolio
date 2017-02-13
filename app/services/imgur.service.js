function imgurService ($log, $http, $q, ENV) {

    this.getAccount = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: ENV.api + 'account/' + ENV.imgur_username
        }).then(
            function successCallback (response) {
                return deferred.resolve(response.data.data);
            }
        ).catch(
            function (error) {
                $log.error(error);
                deferred.reject(error);
            }
        );

        return deferred.promise;
    };

    this.getAlbums = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: ENV.api + 'account/' + ENV.imgur_username + '/albums/'
        }).then(
            function successCallback (response) {
                return deferred.resolve(response.data.data);
            }
        ).catch(
            function (error) {
                $log.error(error);
                deferred.reject(error);
            }
        );

        return deferred.promise;
    };

    this.getAlbumIds = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: ENV.api + 'account/' + ENV.imgur_username + '/albums/ids'
        }).then(
            function successCallback (response) {
                return deferred.resolve(response.data.data);
            }
        ).catch(
            function (error) {
                $log.error(error);
                deferred.reject(error);
            }
        );

        return deferred.promise;
    };

    this.getAlbumImages = function (id) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: ENV.api + 'album/' + id + '/images/'
        }).then(
            function successCallback (response) {
                return deferred.resolve(response.data.data);
            }
        ).catch(
            function (error) {
                $log.error(error);
                deferred.reject(error);
            }
        );

        return deferred.promise;
    };

    this.getCarouselImages = function () {
        var self = this;
        var deferred = $q.defer();

        var promises = [];

        self.getAlbumIds().then(
            function getAlbumIdsSuccess (albumIds) {
                return albumIds;
            }
        )
        .then(function (albumIds) {

            angular.forEach(albumIds , function(albumId) {
                var promise = self.getAlbumImages(albumId);
                promises.push(promise);
            });

            $q.all(promises).then(
                function resolved (allAlbumImages) {
                    var carouselImages = [];
                    var index = 0;

                    angular.forEach(allAlbumImages, function (albumImages) {
                        if (albumImages.length > 0) {
                            albumImages[0].index = index;
                            index++;
                            carouselImages.push(albumImages[0]);
                        }
                    });

                    deferred.resolve(carouselImages);
                }
            );

        })
        .catch(function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

}

module.exports = imgurService;
