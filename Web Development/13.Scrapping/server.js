var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.get('/scrape', function(req, res){
	var url = "http://www.imdb.com/title/tt0963966";

	request(url, function(error, response, html) {
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

		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
		    console.log('File successfully written!');
		})

		res.send('Finished!')
	})
})


app.listen('8080')
console.log('Magic happens on port 8080');

exports = module.exports = app;

