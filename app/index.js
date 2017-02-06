require('./vendor')();

require.context('./assets/img', true, /^\//);

require('./index.html');

require('./app');

var dinoApp = angular.module('dinoPortfolio')

//Components
    .component('home', require('./components/home/home.component.js'))

//Controllers
    .controller('homeController', require('./components/home/home.controller.js'))

//Configs
    .config(require('./router'))

//Constants
    .constant('ENV', process.env.ENV)

//Directives

//Services
    .service('ImgurService', require('./services/imgur.service'));

//Factories
