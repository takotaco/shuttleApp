
function HomeControl(controlDiv, map) {

    // Set CSS styles for the DIV containing the control
    // Setting padding to 5 px will offset the control
    // from the edge of the map.
    controlDiv.style.padding = '5px';

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'white';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '1px';
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
    controlText.style.paddingTop = '2px';
    controlText.style.paddingBottom = '2px';
    controlText.innerHTML = '<strong>Where am I?<strong>';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to current location.
    google.maps.event.addDomListener(controlUI, 'click', function() {
	    // call geolocate
	    geolocate();
	    // set point to (lat,long)
	    map.setCenter(point);
	});
}
