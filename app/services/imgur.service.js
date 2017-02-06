function imgurService ($log, $http, $q, ENV, localStorageService) {

    this.accountInfo = null;
    this.albums = null;

    var getCachedAccount = function () {
        var self = this;
        if (!self.accountInfo) self.accountInfo = localStorageService.get('portfolio_account');
        return self.accountInfo;
    };

    var setCachedAccount = function (account) {
        var self = this;
        self.accountInfo = account;
        localStorageService.set('portfolio_account', account);
    };

    this.getCachedAlbums = function () {
        var self = this;
        if (!self.albums) self.albums = localStorageService.get('portfolio_albums');
        return self.albums;
    };

    var setCachedAlbums = function (albums) {
        var self = this;
        self.albums = albums;
        localStorageService.set('portfolio_albums', albums);
    };

    this.getAccount = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: ENV.api + 'account/' + ENV.imgur_username
        }).then(
            function successCallback (response) {
                $log.debug('getAccount', response);

                setCachedAccount(response.data.data);
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

                setCachedAlbums(response.data.data);
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
