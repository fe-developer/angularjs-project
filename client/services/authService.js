angular.module('authService', [])


.factory('Auth', function($http, $q) {
	var authFactory = {};

	authFactory.login = function(username, password) {
		return $http.post('/user/auth', {
			username: username,
			password: password
		}).then(function(responce){
			if (responce.data.sessionId != undefined) {
				setSession(session_id, responce.data.sessionId);
				setSession(session_user, responce.data.username);
				return responce;
			}
		})
	}

	authFactory.logout = function() {
		var sessionId = getSession();
		if (sessionId) {
			return $http.get('/user/logout?sessionId=' + sessionId).then(function(responce){
				return responce;
			});
		}
	}

	authFactory.isLoggedIn = function() {
		var sessionId = getSession(session_id);

		if (sessionId) {
			return true;
		} else {
			return false;
		}
	}

	return authFactory;
})