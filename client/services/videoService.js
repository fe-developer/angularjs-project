angular.module('videoService', [])


.factory('Watch', function($http, $q) {
	var videoFactory = {};

	videoFactory.videos = function(sessionId, skip, limit) {
		return $http.get('/videos?sessionId=' + sessionId + '&skip=' + skip + '&limit=' + limit).then(function(responce){
			return responce.data;
		}, function(err){
			if (err.status == 401) {
				return 401;
			}
		});
	}

	videoFactory.video = function(sessionId, videoId) {
		return $http.get('/video?sessionId=' + sessionId + '&videoId=' + videoId).then(function(responce){
			return responce.data;
		});
	}

	videoFactory.raiting = function() {
		
	}

	return videoFactory;
})