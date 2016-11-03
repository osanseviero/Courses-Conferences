var http = require('http');
var url = require('url');

function start(route, handle) {
	http.createServer(onRequest).listen(8080);
	console.log("Server was created");

	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log('Request for: ' + pathname + ' was received.');

		route(handle, pathname, response)
	}
}

exports.start = start;

