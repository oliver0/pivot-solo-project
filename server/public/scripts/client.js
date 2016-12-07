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
  .otherwise({
    redirectTo: 'home'
  });
}]);



// app.controller("VerbListController", ["$http", function($http){
//
//   console.log('VerbListController running');
//
//   var self = this;
//   self.verbs = [];
//
//   getVerbs();
//
//   function getVerbs() {
//     //$.ajax
//     $http.get('/phrasal_verbs')
//       .then(function(response) {
//         console.log(response.data);
//         self.verbs = response.data;
//       });
//   }
//   }]);
