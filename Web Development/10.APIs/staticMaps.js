navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
	var coordinates = position.coords.latitude + ',' + position.coords.longitude;
	var img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + coordinates + "&zoom=14&size=640x400";
	console.log(img_url);
	document.getElementById("map").innerHTML = '<img src="' + img_url + '">';
}