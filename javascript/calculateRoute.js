


// route from current
function calcRoute() {
    // var start = document.getElementById("start").value;
    // update my location
    //geolocate();
    var start = mylat+","+mylong;
    var end = document.getElementById("address").value;
    alert(start);
    alert(end);


    // TODO: GET THIS SHIT WORKING
    //alert("check1");
    //    var results = getBestStops();
    //alert("check2");

    //alert(dist(start,start));
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.WALKING
    };
    directionsService.route(request, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
		directionsDisplay.setDirections(response);
		alert(response.routes[0].legs[0].distance.value+"meters");
	    }
	});
}

