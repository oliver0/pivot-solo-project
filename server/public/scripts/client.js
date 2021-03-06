var app = angular.module('pivotApp', ['ngRoute', 'firebase', 'countdown']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl: '/views/templates/home.html',
    controller: 'HomeController',
    controllerAs: 'home'
  })
  .when('/progress', {
    templateUrl: '/views/templates/progress.html',
    controller: 'ProgressController',
    controllerAs: 'prog'
  })
  .when('/verbs', {
    templateUrl: '/views/templates/verbs.html',
    controller: 'VerbsController',
    controllerAs: 'verbs'
  })
  .when('/choice', {
    templateUrl: '/views/templates/choose.game.html',
    controller: 'ChoiceController',
    controllerAs: 'choice'
  })
  .when('/game', {
    templateUrl: '/views/templates/game.html',
    controller: 'GameController',
    controllerAs: 'game'
  })
  .when('/score', {
    templateUrl: '/views/templates/score.html',
    controller: 'ScoreController',
    controllerAs: 'score'
  })
  .otherwise({
    redirectTo: 'home'
  });
}]);
