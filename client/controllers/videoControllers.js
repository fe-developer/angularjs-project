angular.module('videoCtrl', [])

//on videolist.html open
.controller('videoController', function($scope, $location, Auth, Watch) {

	var vs = this;

	if (!Auth.isLoggedIn()) {
		$location.path('/login');
	} else {
		var sessionId = getSession(session_id);
		
		Watch.videos(sessionId).then(function(responce){
			if (responce) {
				$scope.videos = videoArrayHandling(responce.data);
			} else {
				$location.path('/login');
			}
		});
	}

	$scope.morevideos = function(skip) {
		var sessionId = getSession(session_id);
		showPreloader();
		
		Watch.videos(sessionId, skip, videos_on_page).then(function(responce){
			if (responce) {
				var v = videoArrayHandling(responce.data);
				i = 0;

				if (v.length > 0) {
					while(i < v.length) {
						$scope.videos.push(v[i]);
						i++;
					}
				}

				hidePreloader();
				
			} else {
				$location.path('/login');
			}
		});
	}

	$scope.watchvideo = function(videoId) {
		openVideo(videoId, $location);
	}
})

.controller('watchController', function($rootScope, $location, Auth, Watch, $scope, $routeParams){
	var videoId = $routeParams['id'];
	var sessionId = getSession(session_id);

	if (!Auth.isLoggedIn()) {
		$location.path('/login');
	} else {
		Watch.video(sessionId, videoId).then(function(responce){
			$scope.singlevideo = responce.data;
		}, function(err){
			$location.path('/');
		});

		Watch.videos(sessionId, 0, 3).then(function(responce){
			$scope.videos = videoArrayHandling(responce.data);
		});
	}

	$scope.watchvideo = function(videoId) {
		openVideo(videoId, $location);
	}
})

.directive("scroll", function ($window, $location) {
  return function(scope, element, attrs) {
    angular.element($window).bind("scroll", function() {
			if (pageBottom()) {
				if($location.path() === '/' && document.getElementById('loadMoreVideosSVG').classList.contains('hidden') && scope.videos.length) {
					return scope.morevideos(scope.videos.length);
				}
			}
			//scope.$apply();
    });
  };
});