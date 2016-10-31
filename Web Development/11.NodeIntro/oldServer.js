// import http server
var http = require('http');

// handle sending requests and receiving responses
function handleRequest(req, res) {
	console.log(req.url);
	console.log(req.method);
	res.end("Hello World");
}

// create the server
var server = http.createServer(handleRequest);

// start server and listen specific port
server.listen(8080, function() {
	console.log("I'm listening");
});
