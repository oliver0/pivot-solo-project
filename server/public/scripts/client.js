var app = angular.module('pivotApp', ['ngRoute']);

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
  .when('/definition', {
    templateUrl: '/views/templates/definition.html',
    controller: 'DefinitionController',
    controllerAs: 'def'
  })
  .when('/blank', {
    templateUrl: '/views/templates/blank.html',
    controller: 'BlankController',
    controllerAs: 'blank'
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
