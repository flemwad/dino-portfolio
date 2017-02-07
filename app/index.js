require('./vendor')();

require.context('./assets/img/', true, /^\.\//);

require('./index.html');

require('./app');

//App has already been bootstrapped by this point
angular.module('dinoPortfolio')

//Components
    .component('home', require('./components/home/home.component'))
    .component('navigation', require('./components/navigation/navigation.component'))

//Controllers
    .controller('homeController', require('./components/home/home.controller'))
    .controller('navigationController', require('./components/navigation/navigation.controller'))

//Configs
    .config(require('./router'))

//Constants
    .constant('ENV', process.env.ENV)

//Directives

//Services
    .service('ImgurService', require('./services/imgur.service'))
    .service('ImgurCacheService', require('./services/imgurCache.service'))
    .service('NavigationService', require('./services/navigation.service'));

//Factories

//Providers
