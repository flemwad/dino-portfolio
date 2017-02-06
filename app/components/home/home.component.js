var templateUrl = require('./home.template.html');

module.exports = {
    templateUrl: templateUrl,
    controller: 'homeController',
    bindings: {
        navTitle: '=',
        albums: '<'
    }
};
