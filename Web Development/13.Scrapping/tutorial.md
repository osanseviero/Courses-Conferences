Web Scraping with Node
--------------------
Web Scraping is a technique of data extraction pulling the information from the websites. It is really useful when the data needed is not given with APIs. Note: be careful with what information you extract from which website. 

We'll use the next technologies

 1. Node
 2. Express - easier server creation
 3. Request - easier HTTP calls
 4. Cheerio - jQuery for the server, makes easy DOM manipulation

**Creating the project**
Run the following commands to make the basic setup of the project

    npm init
    npm install express --save
    npm install cheerio --save
    npm install request --save
    
In this project we'll extract the name of a movie, the release year and the community rating at IMDb, and save that information to a JSON file. 

**The flow of our application**

 1. Launch the server.
 2. Visit a URL on the server.
 3. The scraper will get activated and make a HTTP request to the website.
 4. The request will get the HTML of the website and return it to our server.
 5. The server is going to traverse the DOM and extract the data.
 6. The extracted data will then formatted as a JSON and saved. 

**First steps**
First, we need to require the modules installed. We'll also use fs for being able to work with files. We've not seen a lot of Express before, but it makes all the part of the server easier. 

    var express = require('express');
    var fs = require('fs');
    var request = require('request');
    var cheerio = require('cheerio');
    
    var app = express();
    
    app.get('/scrape', function(req, res){
    
      //All the web scraping magic will happen here
    
    })
    
    app.listen('8081')
    
    console.log('Magic happens on port 8081');
    
    exports = module.exports = app;

As in HTTP module, we listen to a specific port. We're also exporting the whole server at the end to keep it modularised. The server gets activated when it gets the URL /scrape. Visit the different URLs and you'll see that an error message is shown. But if we go to http://localhost:8080/scrape the server keeps waiting, just like in our previous project. 

**Getting the HTML**

We're going to use the request module to make a simple HTTP request. The first parameter is the url and the second parameter is a callback function. As always, the first argument is reserved for any error. The request also received a response and all the HTML of the website. Running this will show all the HTML of the website!

    app.get('/scrape', function(req, res){
    	var url = "http://www.imdb.com/title/tt0368891";
    
    	request(url, function(error, response, html) {
    		console.log(html);
    	})
    })
But there could be some errors, so we should use the error variable.

    app.get('/scrape', function(req, res){
    	var url = "http://www.imdb.com/title/tt0368891";
    
    	request(url, function(error, response, html) {
    		if(!error) {
    			console.log(html);
    		}
    	})
    })

The next step is to use cheerio to make the DOM manipulation easier. We can load the HTML with cheerio.

    app.get('/scrape', function(req, res){
    	var url = "http://www.imdb.com/title/tt0368891";
    
    	request(url, function(error, response, html) {
    		if(!error) {
    			$ = cheerio.load(html);
    
    			var title, release, rating;
    
    			var json = {title: "", release: "", rating: ""};
    		}
    	})
    })

**Extracting the data**

The hard part here is to find a good selector to find the element. Checking the website, we see that the class title_wrapper holds the title and the date. Remember jQuery selectors? We can simply put the CSS selector and that's it.

  
     $('.title_wrapper').filter(function() {
    		var data = $(this);
    
    		title = data.children().eq(1).text();
    
    		console.log(title);
    	})
    	
We simply need to do the same for the data of release:

    $('.title_wrapper').filter(function() {
    				var data = $(this);
    
    			title = data.children().eq(1).text();
				release = data.children().first().children().last().text();
    
    				json.title = title;	
    				json.release = release;
    			})

The process for the rating is pretty similar, except that it is in a different section, so a new CSS selector is needed.

    request(url, function(error, response, html) {
    		if(!error) {
    			$ = cheerio.load(html);
    
    			var title, release, rating;
    
    			var json = {title: "", release: "", rating: ""};
    
    			$('.title_wrapper').filter(function() {
    				var data = $(this);
    
    				title = data.children().eq(1).text();
    				release = data.children().first().children().last().text();
    
    				console.log(title);
    				console.log("R" + release);
    
    				json.title = title;	
    				json.release = release;
    			})
    
    			$('.ratingValue').filter(function() {
    				var data = $(this);
    
    				rating = data.children().first().text();
    				console.log(rating);
    
    				json.rating = rating;
    			})
    		}
    	})

We're almost done. We already extracted the information from the website, but we need to save it to the file.

**Saving the data**

As mentioned before, the fs module was included to be able to save to a file. It is simple!

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    		    console.log('File successfully written!');
    		})

And that's it. Our web scrapper is finished!
