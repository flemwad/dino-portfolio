function imgurService ($log, $http, $q, ENV) {

    this.getAccount = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: ENV.api + 'account/' + ENV.imgur_username
        }).then(
            function successCallback (response) {
                $log.debug('getAccount', response);
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
                $log.debug('getAlbums', response);
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
                $log.debug(response);
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

}

module.exports = imgurService;
