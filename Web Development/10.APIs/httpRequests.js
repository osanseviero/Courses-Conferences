// First Example

/* Bad practice sync XMLHTTPRequest()
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.codecademy.com/", false);
xhr.send();

console.log(xhr.status);
console.log(xhr.statusText);*/


// Second example

/* Should reuse the code
var theUrl = "https://www.codecademy.com";
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() { 
    console.log(xhr.status);
}
xhr.open("GET", theUrl, true);
xhr.send();
*/

// Third example
/*
function httpGetAsync(theUrl)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        console.log(xmlHttp.status);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

httpGetAsync('https://www.codecademy.com');
*/
/* Show the hard way*/	/*
function httpGetAsync(theUrl, callback)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        callback(xhr.status);
    }
    xhr.open("GET", theUrl, true);
    xhr.send(null);
}

httpGetAsync('https://www.codecademy.com', function(status){
	console.log(status);
});

*/





