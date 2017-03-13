angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth, $scope) {
	
	var vm = this;
	$scope.username = getSession(session_user);

	vm.doLogin = function() {
		if (vm.loginData == undefined || vm.loginData.username == undefined || vm.loginData.password == undefined) {
			
		} else {
			vm.proceccing = true;

			vm.error = '';

			Auth.login(vm.loginData.username, vm.loginData.password).then(function(responce){
				vm.proceccing = false;

				vm.user = responce.data;
				
				if (vm.user.status == 'success') {
					$scope.username = getSession(session_user);
					$location.path('/');
				} else
					$location.path('/login');
			});
		}
	}

	vm.logout = function() {
		Auth.logout();
		removeSession();
		$location.path('/login');
	}

	vm.isLoggedIn = function() {
		return Auth.isLoggedIn();
		$scope.username = getSession(session_user);
	}

	vm.gotoMainPage = function() {
		$location.path('/');
	}
})

.controller('LoginController', function($location, Auth) {
	if (Auth.isLoggedIn()) {
		$location.path('/');
	}
})