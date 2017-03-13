//config variables--->
var session_id = 'sessionId';
var session_user = 'user';
var storage = window.sessionStorage;
var video_bg_path = 'images/video_bg';
var video_bg_extension = '.png';
var videos_on_page = 10;
//<---config variables

//session id manipulating functions--->
function setSession(item, value) {
	storage.setItem(item, value);
}

function getSession(item) {
	return storage.getItem(item);
}

function removeSession() {
	storage.removeItem(session_id);
	storage.removeItem(session_user);
}
//<---session id manipulating functions

//generate video bg-images file name
//video rating calculation
function videoArrayHandling(array) {
	var n = array.length;
	var i = 0;

	while (i < n) {
		var img = video_bg_path + '/' + getVideoName(array[i].url) + video_bg_extension;
		array[i]['video_bg'] = img;
		array[i]['video_rating'] = videoRating(array[i].ratings);
		i++;
	}

	return array;
}

//get video name from video url
function getVideoName(url) {
	var n = url.length-1,
		i = n,
		name = '';

	while (url[i] != '/' && i > 0) {
		name = url[i] + name;
		i--;
	}

	return name;
}

//video rating calculating
function videoRating(array) {
	var n = array.length;

	if (n > 0) {
		var i = 0, sum = 0;

		while(i < n) {
			sum = sum + array[i];
			i++;
		}

		return Math.floor(sum / n);
	} else {
		return 0;
	}
}

//on video item click function
function openVideo(videoId, $location) {
	$location.path('/watchvideo/'+videoId);
}

function pageBottom() {
	var body = document.body,
  html = document.documentElement;
  countVideo = document.getElementsByClassName('video_item').length;

	var pageH = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

	var clientH = html.clientHeight;
	var fromTop = window.pageYOffset;

	if (clientH + fromTop >= pageH) {
		return true;
	} else {
		return false;
	}
}

function showPreloader() {
	document.getElementById('loadMoreVideosSVG').classList.remove('hidden');
}

function hidePreloader() {
	document.getElementById('loadMoreVideosSVG').classList.add('hidden');
}