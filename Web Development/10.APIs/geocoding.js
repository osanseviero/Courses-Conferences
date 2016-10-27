function getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        console.log(results);
        var country = (results[4].formatted_address);
        console.log(country);
    });
}

function showPosition(position) {
    getReverseGeocodingData(position.coords.latitude, position.coords.longitude)
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
}