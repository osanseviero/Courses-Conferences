var getWeather = function(lat, lon) {
    var openWeatherMapKey = "f5216f58c47a54439c5756b472f0f0bc";
    var requestString = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + 
    	"&appid=" + openWeatherMapKey;
    request = new XMLHttpRequest();
    request.onload = proccessResults;
    request.open("get", requestString, true);
    request.send();
};

var proccessResults = function() {
    //console.log(this);
    var results = JSON.parse(this.responseText);
    console.log(results);
    console.log(results.weather[0].main);
    console.log(results.wind);
};

function showPosition(position) {
	getWeather(position.coords.latitude, position.coords.longitude);
}

navigator.geolocation.getCurrentPosition(showPosition);
