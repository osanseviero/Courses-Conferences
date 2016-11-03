var http = require('http');

// Building a module

function start() {
	http.createServer(onRequest).listen(8080);
	console.log("Server was created");

	// Refactor
	function onRequest(request, response) {
		console.log("Server received request");
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello World");
		response.end();
	}
}

exports.start = start;

