


function geolocate(){
    // Determine support for Geolocation
    if (navigator.geolocation) {
	// Locate position
	navigator.geolocation.getCurrentPosition(displayPosition, errorFunction);
    } else {
	alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
    }
}

// Success callback function
function displayPosition(pos) {
    point = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
}
// Error callback function
function errorFunction(pos) {
    alert('Error!');
}
