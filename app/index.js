require('./vendor')();

require.context('./assets/img/', true, /^\.\//);

require('./assets/sass/styles.scss');

require('./index.html');

require('./app');

//App has already been bootstrapped by this point
angular.module('dinoPortfolio')

//Components
    .component('home', require('./components/home/home.component'))
    .component('navigation', require('./components/navigation/navigation.component'))
    .component('album', require('./components/album/album.component'))
    .component('about', require('./components/about/about.component'))

//Controllers
    .controller('homeController', require('./components/home/home.controller'))
    .controller('navigationController', require('./components/navigation/navigation.controller'))
    .controller('albumController', require('./components/album/album.controller'))

//Configs
    .config(require('./router'))

//Constants
    .constant('ENV', process.env.ENV)

//Directives
    .directive('ngMasonry', require('./directives/masonry.directive'))

//Services
    .service('ImgurService', require('./services/imgur.service'))
    .service('ImgurCacheService', require('./services/imgurCache.service'))
    .service('NavigationService', require('./services/navigation.service'));

//Factories

//Providers
