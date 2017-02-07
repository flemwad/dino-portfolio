var templateUrl = require('./navigation.template.html');

module.exports = {
    templateUrl: templateUrl,
    controller: 'navigationController',
    bindings: {
        navTitle: '=',
        albums: '<'
    }
};
