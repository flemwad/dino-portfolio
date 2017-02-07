function imgurCacheService ($log, localStorageService) {

    this.accountInfo = null;
    this.albums = null;

    this.getAccount = function () {
        var self = this;
        if (!self.accountInfo) self.accountInfo = localStorageService.get('portfolio_account');
        return self.accountInfo;
    };

    this.setAccount = function (account) {
        var self = this;
        self.accountInfo = account;
        localStorageService.set('portfolio_account', account);
    };

    this.getAlbums = function () {
        var self = this;
        if (!self.albums) self.albums = localStorageService.get('portfolio_albums');
        return self.albums;
    };

    this.setAlbums = function (albums) {
        var self = this;
        self.albums = albums;
        localStorageService.set('portfolio_albums', albums);
    };

}

module.exports = imgurCacheService;
