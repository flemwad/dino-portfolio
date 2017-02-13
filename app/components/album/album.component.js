var templateUrl = require('./album.template.html');

module.exports = {
    templateUrl: templateUrl,
    controller: 'albumController',
    bindings: {
        images: '<'
    }
};
