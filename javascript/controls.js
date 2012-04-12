
function HomeControl(controlDiv, map) {

    // Set CSS styles for the DIV containing the control
    // Setting padding to 5 px will offset the control
    // from the edge of the map.
    controlDiv.style.padding = '5px';

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'yellow';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '3px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to set the map to Home';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.innerHTML = '<strong>Where Am i?<strong>';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to current location.
    google.maps.event.addDomListener(controlUI, 'click', function() {
	    // get longitude and latitude
	    geolocate();
	    // set point to (lat,long)
	    map.setCenter(point);
	    // set variables for future use
	    mylat = point.lat();
	    mylong =point.lng();
	    //Add marker
	    Currentmarker = new google.maps.Marker({
		    position: point,
		    map: map,
		    title:"You are here"
		});

	});
}
