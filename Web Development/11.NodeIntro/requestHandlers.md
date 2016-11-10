Introduction to Node. Part 2
--------------------
In this short tutorial we'll add request handlers to make the routing work.

**Request Handlers**

Right now our website is working ok. We receive a request, we send a response. We already have the logic to receive and parse the url, so we already know which url we're receiving. We want to handle requests differently. /start should send to a different website than /upload, and here is where request handlers become useful. Our router will just help as a connection point between the server and the request handlers. Too much talk. Let's create a requestHandlers.js file and put this.

    function start(){
    	console.log("Request handler for 'start'");
    }
    
    function upload() {
    	console.log("Request handler for 'upload'");
    }
    
    exports.start = start;
    exports.upload = upload;
The idea of the website is that when the url is / or /start, it will call the start request handler, and when the url is /upload, it will call the upload request handler. We built this as a module, so we won't have much problem calling this from outside. As before, we'll work with dependency injection to make it work. The easy way would be to send as parameters the two handlers (start and upload), but let's say you want to have many handlers later. Like...20 handlers. Adding 20 arguments would get pretty ugly, so we should create a JavaScript object that maps each route to each path.

    /					->		requestHandlers.start
    /start				->		requestHandlers.start
	/upload			    ->		requestHandlers.upload

Ok, we'll create the handle object and send it to the server. Where should we do this? To keep things separated, let's do this in the index.js file. It should look like this now:

    var server = require('./server');
    var router = require('./router');
    var requestHandlers = require('./requestHandlers');
    
    var handle = {};
    handle['/'] = requestHandlers.start;
    handle['/start'] = requestHandlers.start;
    handle['/upload'] = requestHandlers.upload;
    
    server.start(router.route, handle);
We importes the requestHandlers, and created the object that maps as specified before. Finally, we added the handle object as an argument to the server. Alright. As you supposed, we'll now have to change how server.js works. 

    var http = require('http');
    var url = require('url');
    
    function start(route, handle) {
    	http.createServer(onRequest).listen(8080);
    	console.log("Server was created");
    
    	function onRequest(request, response) {
    		var pathname = url.parse(request.url).pathname;
    		console.log("Server received request for " + pathname);
    
    		route(handle, pathname)
    
    		response.writeHead(200, {"Content-Type": "text/plain"});
    		response.write("Hello World");
    		response.end();
    	}
    }
    
    exports.start = start;

There isn't much difference right now. We just received the handle object as an object, and sent it to the route. So now the handle is available to the route function. What should we do now? Guessed right! We need to change the route function to receive the handle. 

    function route(handle, pathname) {
    	console.log("About to route a request for " + pathname);
    	if(typeof handle[pathname] === 'function') {
    		handle[pathname]();
    	}
    	else {
    		console.log("No request handler for " + pathname);
    	}
    }
    
    exports.route = route;
This will manage a lot of the logic. It looks a little confusing, but let's check what is going on. Remember that the handle object maps a path to a function (which is the request handler start or upload). We check if, for that pathname, handle maps to a function. If it does, it will call it. Else, if it doesn't exist, it will say that there is no request handler for that pathname.

Try and go to the next links:

http://localhost:8080/
http://localhost:8080/start
http://localhost:8080/upload
http://localhost:8080/aaa

Check what happens in the console:

> Server received request for / 
> About to route a request for / 
> Server received request for /start
> About to route a request for /start 
> Server received request for /upload 
> About to route a request for /upload
> Server received request for /upld 
> About to route a request for /upld
> No request handler for /upld

Perfect. Our website now distinguishes between urls and the router identifies when the path is not valid. That will work perfect for an error website. Right now our content is always the same, but let's change how this works. Why don't we send the content from the request handlers? So the requestHandlers.js file should look like:

    function start(){
    	console.log("Request handler for 'start'");
    	return "START WEBSITE";
    }
    
    function upload() {
    	console.log("Request handler for 'upload'");
    	return "UPLOAD WEBSITE";
    }
    
    exports.start = start;
    exports.upload = upload;
So they will return the content to be displayed. We will also need to change the router.js file.

    function route(handle, pathname) {
    	console.log("About to route a request for " + pathname);
    	if(typeof handle[pathname] === 'function') {
    		return handle[pathname]();
    	}
    	else {
    		console.log("No request handler for " + pathname)
    		return "404 NOT FOUND";
    	}
    }
    
    exports.route = route;
We're just missing one last step: changing how the server works. We need to receive the content and send it.

    var http = require('http');
    var url = require('url');
    
    function start(route, handle) {
    	http.createServer(onRequest).listen(8080);
    	console.log("Server was created");
    
    	function onRequest(request, response) {
    		var pathname = url.parse(request.url).pathname;
    		console.log("Server received request for " + pathname);
    
    		var content = route(handle, pathname)
    
    		response.writeHead(200, {"Content-Type": "text/plain"});
    		response.write(content);
    		response.end();
    	}
    }
    
    exports.start = start;

Instead of showing the hello world to every website, we'll send different texts. Try the next links and check that everything goes as it should:
http://localhost:8080/
http://localhost:8080/start
http://localhost:8080/upload
http://localhost:8080/test

We can be happy now. Everything works as it should. Right..? Let's do a small test in our requestHandlers file.

    function start(){
    	console.log("Request handler for 'start'");
    	function sleep(milliseconds) {
    		var startTime = new Date().getTime();
    		while(new Date().getTime() < startTime + milliseconds);
    	}
    	sleep(10000);
    	return "START WEBSITE";
    }
    
    function upload() {
    	console.log("Request handler for 'upload'");
    	return "UPLOAD WEBSITE";
    }
    
    exports.start = start;
    exports.upload = upload;

This code is not async. The while loop will keep running for 10 seconds before sending the response. Imagine you're calling to a file that is taking time to be sent, or you're not receiving an answer of an API.Let's see what happens. Go to http://localhost:8080/ and immediately go to http://localhost:8080/upload at another tab. If you see, the first link will keep loading (for 10 seconds, as expected), but upload won't run until start loads. If you have many users in your website, one user could block the server from the others. 

Let's do a second test. In this one we will import an exec module which allows Node to run system commands (just like in the terminal, ex: ls). 

    var exec = require("child_process").exec;
    
    function start(){
    	var content = 'empty';
    	exec("ls -lah", function(error, stdout, stderr){
    		content = stdout;
    	});
    	return content;
    }
    
    function upload() {
    	console.log("Request handler for 'upload'");
    	return "UPLOAD WEBSITE";
    }
    
    exports.start = start;
    exports.upload = upload;
If you run ls -lah in the terminal, you'll see that it just displays your file. The objective here is to see that result in your browser. The problem is that it takes time. So, while it is doing the operation, the start function already returned the content, which is empty. Check http://localhost:8080/. Don't worry about the syntax of this example. It is executing ls -lah and sending a callback function, which receives stdout with the content of running that command.


Let's see the current flow of our application

 1. Server sends path to route.
 2. Route checks for existence and calls respective request handler.
 3. Request handler sends content back to router.
 4. Router sends content to server.
 5. Server fills HTTP request.

Here is another proposal:

1. Server sends path and response to route.
2. Route checks for existence and calls respective request handler with the response object.
3. Request handler fills the response and ends it when it is ready.

Doing this won't block the flow. Why? Well, the server can receive several requests and each request handler will be working without making the server wait for the response. Let's change our request handler, maybe this will be more clear.

    var exec = require("child_process").exec;
    
    function start(response){
    	console.log("Request handler for 'start'");
    
    	var content = 'empty';
    	exec("ls -lah", function(error, stdout, stderr){
    		response.writeHead(200, {"Content-Type" : "text/plain"});
    		response.write(stdout);
    		response.end();
    	});
    }
    
    function upload(response) {
    	console.log("Request handler for 'upload'");
    	response.writeHead(200, {"Content-Type" : "text/plain"});
    	response.write("Upload a file.");
    	response.end();
    }
    
    exports.start = start;
    exports.upload = upload;
    
So now the request handler manage the response, and server is free to do what it has to do. See that both handlers receive the response object as argument. We now need to change the router file to fill the response for wrong urls.

    function route(handle, pathname, response) {
    	console.log("About to route a request for " + pathname);
    	if(typeof handle[pathname] === 'function') {
    		return handle[pathname](response);
    	}
    	else {
    		console.log("No request handler for " + pathname)
    		response.writeHead(404, {"Content-Type" : "text/plain"});
    		response.write("404 NOT FOUND");
    		response.end();
    	}
    }
    
    exports.route = route;
We just added the response argument and filled the response when there is an invalid url. The last part is the server file.

    var http = require('http');
    var url = require('url');
    
    function start(route, handle) {
    	http.createServer(onRequest).listen(8080);
    	console.log("Server was created");
    
    	function onRequest(request, response) {
    		var pathname = url.parse(request.url).pathname;
    		console.log("Server received request for " + pathname);
    
    		route(handle, pathname, response)
    	}
    }
    
    exports.start = start;

This was easy: we just erased everything related to the response and sent it to the route. The server is now free to work as it wishes. If you open http://localhost:8080/, it will successfully show you the terminal result.
