angular.module('appRoutes', ['ngRoute'])


.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'pages/videolist.html'
		})
		.when('/login', {
			templateUrl: 'pages/login.html',
			controller: 'LoginController'
		})
		.when('/logout', {
			template: '<h1>Logout</h1>'
		})
		.when('/watchvideo/:id', {
			templateUrl: 'pages/watchvideo.html'
		})

	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix = '!';
});