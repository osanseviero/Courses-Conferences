Introduction to Node
--------------------
In this short tutorial we'll cover the basic concepts of Node.

**Advantages of Node**

 - Really fast (it runs in a V8, which is a really fast VM).
 - It is JavaScript, so you don't have to learn a new language.
 - Can handle many connections at the same time.

**Modules**

A core concept in Node development is modules. Modules work just as libraries in other programming languages. Node has some modules by default (like http to handle UDP connections and fs to work with file systems), but we can use npm (Node Package Manager) to import new modules. Later in the course we'll be using Express, which is a Node module to work with backend. There are many modules for other things, like testing (Mocha, JSHint, etc) and making easier the asynchronous stuff.

**Callbacks and events**

Remember that Node is asynchronous. This means that there can be multiple parallel workflows at the same time. Remember how we used events and callbacks in JavaScript for the Front-End? Well, it is exactly the same for Node.

**Let's go**

Ok, we did enough explanation for now. Let's start programming. To check if you have Node installed, try the next commands in the terminal. Remember, npm is the package manager and will allow us to install new modules and organice our projects. If you don't have Node installed, please [do it](https://nodejs.org/en/download/).

    node --version
    npm --version

Our first step will be to put the setup of the project. First, create a new directory and go with the terminal to that directory (to move to another directory in the terminal you can use *cd*).

    npm init

That utility will go step by step to create a package.json file. You need to put some info (name, version, etc), but don't worry, you can just leave the default values there. After executing, a new file package.json was created and should have a content similar to this:

    {
      "name": "test",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }

In this project we're just going to use the default Node packages, but we will Express just to understand what we are doing.

    npm install express --save
    
That line is telling us to install express. Using the npm install will download and put Express and all its dependencies at node_modules directory. We add the --save option to include the package version at the json file. It should look like this now:

    {
      "name": "test",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        "express": "^4.14.0"
      }
    }
Why is this useful? Well, let's think that you're working with 10 different developers and there are dozens of dependencies. Having this configuration file will allow everybody to have the same versions. Next time you run npm install, it will install all the dependencies. If you upload the project to Github, there is no need to upload the node_modules directory.

**The Server**

Ok, too much talk, let's start programming. Create a index.js file and put the next content.

    console.log("Hey");

Remember, Node is JavaScript, so all you learned from JavaScript still applies here. You can run the index file like this:

    node index.js
    
That was easy. Let's start creating our project. Separation of concerns is important, so we'll work with different files and make the modular. For that matter, we'll create a server.js file. That module will help us manage the connection to the server. Do you remember that we mentioned a http module in Node? Well, that module allow us to work with HTTP requests and responses. To include a module, we just need to add a line to server.js:

    var http = require('http');
This line will assign all the http module to the variable http. We could put another name, but the convention is to have the same name. To create the server, http provides us with a built-in method named createServer()

    var http = require('http');
    
    var server = http.createServer();
    server.listen(8000);
    
 If you run this script (with node server.js), the terminal will display nothing (the server is running). If you go to http://localhost:8080/ in your browser, it will keep loading. This happens because we sent a request but the server is not sending us anything. Check that this happens and let's improve our code. First, we'll make it a little easier to work with. We really don't need to have server in a variable, since we just want to do one action with it: listening to the port. This code will have the same effect.

    var http = require('http');
    
    http.createServer().listen(8080);

Remember callbacks? Here is your old friend

     var http = require('http');
    
    http.createServer(function(request, response){
    	console.log("Server received request");
    }).listen(8080);




What is this code doing? The server object can receive a callback function. This function will get executed every time we do a request to the server. If you go to http://localhost:8080/ multiple times, even if it keeps loading without showing anything, in the terminal you will see the "Server received request" multiple times (note: you need to drop the server and run node server.js again) . The server object will additionally send the request and the response objects to the callback, which we'll use later.

Let's imagine we'll have more callbacks inside our code, so it can get pretty messy and we don't want to create a [callback hell](http://callbackhell.com/). So, let's refactor our code and take out that anonymous function from there.

    var http = require('http');
    
    http.createServer(onRequest).listen(8080);
    console.log("Server was created");
    
    function onRequest(request, response) {
    	console.log("Server received request");
    }
This code has the same effect, but it's easier to understand and make changes. Right now the browser is sending a request to the server, but the server is not responding anything! Remember HTTP: Browser send request to server, server receives request, server sends response, browser does anything it has to do with the response. The HTTP responses have a body and a header. The response has a built-in method named write which...well...adds content to the body. Then, there is an end method that will finish the response and send it. This is the code:

    var http = require('http');
    
    http.createServer(onRequest).listen(8080);
    console.log("Server was created");
    
    function onRequest(request, response) {
    	console.log("Server received request");
    	response.write("Hello World");
    	response.end();
    }
 If you drop and launch the server again, and go to http://localhost:8080/, you'll be able to see a Hello World in the browser. Now, let's imagine you can send a lot of data and work with that data. As an important note, if you go to http://localhost:8080/start, http://localhost:8080/login or http://localhost:8080/error, every website will show the same content. This happens because the server is sending the same content to all the **routes**. Just as an important thing to consider, HTTP can send XML or JSON. It can also send plain text, which is the case. Even if it is not obligatory to specify this, it is important to add that part.

    var http = require('http');
    
    http.createServer(onRequest).listen(8080);
    console.log("Server was created");
    
    function onRequest(request, response) {
    	console.log("Server received request");
    	response.writeHead(200, {"Content-Type": "text/plain"});
    	response.write("Hello World");
    	response.end();
    }
The only difference here is that we are telling that the content type is plain text. What is the 200? Remember when we talked about [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)? 200 means that everything went ok. We can send different status codes.

Having this in a file and running it works for now, but we should convert this to a module. Why? If we made this reusable and with good practices, this server could work for different things. 

    var http = require('http');
    
    function start() {
    	http.createServer(onRequest).listen(8080);
    	console.log("Server was created");
    
    	function onRequest(request, response) {
    		console.log("Server received request");
    		response.writeHead(200, {"Content-Type": "text/plain"});
    		response.write("Hello World");
    		response.end();
    	}
    }
    
    exports.start = start;

Woah. What just happened? Well, actually it's pretty simple. First, we created a start function and put all the code that started the server and managed the requests inside of it. Secondly, and this is the new part, we put exports.start = start. The exports is a built-in part of JavaScript. We just added the start function to the context of the exports. Now we will create our server from the index.js file.

    var server = require('./server');
    
    server.start();
Just as we imported the http module, we can import our own module, just be sure that both files are in the same directory. We can use server.start because it was added in the exports context. Run node index.js and check that everything works as it should.

**The routes**

We already have a way to receive the requests and send responses, but we don't want to send the same responses to every url. Routing means that we'll look the HTTP requests, extract the desired URL, and check which HTTP verb it is. Remember, GET asks for content, POSTS sends content. So we'll also look into that and work appropriately. 

We'll start with parsing the url. We want to extract the url from the HTTP request, so let's see how to do that. To make our lives easier, Node has a module named url which will help us in this.

    var http = require('http');
    var url = require('url');
    
    function start() {
    	http.createServer(onRequest).listen(8080);
    	console.log("Server was created");
    
    	function onRequest(request, response) {
    		var pathname = url.parse(request.url).pathname;
    		console.log("Server received request for " + pathname);
    		response.writeHead(200, {"Content-Type": "text/plain"});
    		response.write("Hello World");
    		response.end();
    	}
    }
    
    exports.start = start;

Which are the important parts in this code? First, we imported the module. The weird part is the parsing, but a simple Google search about [how to parse urls with Node](http://stackoverflow.com/questions/17184791/node-js-url-parse-and-pathname-property) give us the syntax. Check what parse does, and let's keep going. If you drop and create your server again, and go to http://localhost:8080/eooe, in the terminal you should see a message: 

> Server received request for /eooe

Perfect. There is a probability that it is also adding the bugging favicon.ico in the requests. Don't worry about that. The favicon is the little icon in the browser tab and we won't work with that. We just added a way to know which route we have. We don't want to work with the routes directly in the server. To separate the concerns, we'll add a router.js file which will manage that.  It should have this content:

    function route(pathname) {
    	console.log("About to route a request for " + pathname);
    }
    
    exports.route = route;
    
Right now it's not doing something really interesting. We just created a function named route that receives the pathname and prints the result. Finally, it gets exportes as a module. 

We want to call this route function from the server. The easy way to do this would be to just import the router from the server.js file and use the function. Do you remember why we did the server as a module? Well, we want to make this reusable. We want our server to be coupled loosely to the rest of the application, so if we just created another router function, we just added it to the server. Adding the router directly to the server would break this flow.

So, what can we do? We could send the router function from the index to the server. First, let's change the index.js file.

    var server = require('./server');
    var router = require('./router');
    
    server.start(router.route);
We imported the router and send the route function from the router module to the start function of server. We then need to receive the router in that function. Let's change the server.js file.

    var http = require('http');
    var url = require('url');
    
    function start(route) {
    	http.createServer(onRequest).listen(8080);
    	console.log("Server was created");
    
    	function onRequest(request, response) {
    		var pathname = url.parse(request.url).pathname;
    		console.log("Server received request for " + pathname);
    
    		route(pathname)
    
    		response.writeHead(200, {"Content-Type": "text/plain"});
    		response.write("Hello World");
    		response.end();
    	}
    }
    
    exports.start = start;

We just changed two things. First, we received the route as a parameter. Secondly, since we already received the route function, we can just call it with the pathname as argument. Drop the server and run index.js file and check if it works. Open this in your browser http://localhost:8080/test and in the terminal this should be displayed:

    Server received request for /test
    About to route a request for /test

Ok, so the flow right now is this: index sends the router to the server, the server receives a request, parse the url, and send the url to the route function. Then, we send the HTTP request. Later we'll move the request to another part of the code, named request handlers, but we don't need to worry about that. This pattern is named dependency injection. It allows us to send the dependencies in a dynamical way, and we won't need to worry about more.
