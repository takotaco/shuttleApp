var map;
var geocoder;
var chicago = new google.maps.LatLng(41.850033, -87.6500523);
function initialize() {

    // create the map with certain specs
    var myOptions = {
        center: new google.maps.LatLng(40.443504, -79.941571),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
				  myOptions);

    // add route layers
    allKMLRoutes(map);
    // install the geocoder
    geocoder = new google.maps.Geocoder();
    // detect browser and adjust accordingly
    detectBrowser();
    // Create the DIV to hold the control and call the HomeControl() constructor
    // passing in this DIV.
    var homeControlDiv = document.createElement('div');
    var homeControl = new HomeControl(homeControlDiv, map);
    homeControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);



}

