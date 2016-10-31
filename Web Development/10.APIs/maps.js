var map;
function initMap(latitude, longitude) {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: latitude, lng: longitude},
		zoom: 30,
		mapTypeId: google.maps.MapTypeId.SATELLITE
	});
}

function showPosition(position) {
	initMap(position.coords.latitude, position.coords.longitude);
}

function getLocation() {
	navigator.geolocation.getCurrentPosition(showPosition);
}
