var RouteA = 0;
var RouteB = 1;
var RouteAB = 2;
var RouteC = 3;
var BakerySquareL = 4;
var BakerySquareS = 5;
var PTCroute = 6;

// uses google directions(walk)
// to calculate distance between
// two points


function getWalkingDistance(start,stop){
    alert("helo");
    alert(start);
    alert(stop);

    var request = {
	origin: start,
	destination: stop,
	travelMode: google.maps.DirectionsTravelMode.WALKING
    };
    directionsService.route(request, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
		alert("woo");
		// Display the distance:
		alert(response.routes[0].legs[0].distance.value);
		return response.routes[0].legs[0].distance.value;

	    }
	});
    alert("failed");
    return 1000000;
}



function stopToEnd(route,end,ith){
    var nearestStop;
    var minDistance = 999999;

    for (var i = ith; i < route.length; i++) {
	var x = route[i][0];
	var y = route[i][1];
	var distance = getWalkingDistance(x+","+y,end);

	if (distance < minDistance) {
	    minDistance = distance;
	    nearestStop = route[i];
	}
    }
    return [minDistance,nearestStop];
}




function startToEnd(start,route){
    var nearestStop;
    var ith;
    var minDistance = 999999;
    var distance= 10000000;
    for (var i = 0; i < 1; i++) {
	//   for (var i = 0; i < route.length; i++) {

	var x = route[i][0];
	var y = route[i][1];
	var distance = getWalkingDistance(start,x+","+y);
	if (distance < minDistance) {
	    minDistance = distance;
	    ith = i;
	    nearestStop = route[i];
	}
    }
    var res2= stopToEnd(route,end,ith);
    return [minDistance+res2[0], nearestStop,res2[1]];

}


function getBestStops(){
    geolocate();
    var begin = mylat+","+mylong;
    var end = document.getElementById("address").value;
    alert(":" +begin);
    alert(":" +end);
    var exp =getWalkingDistance(begin,end);
    alert(exp);


    var minDist= 999999;
    var getOn;
    var getOff;
    var routes = [routeA, routeB, routeAB, routeC, bakerySquareL, bakerySquareS, PTC];

    for (var i=0; i < 2; i++){
	//    for (var i=0; i < routes.length; i++){
	var res = startToEnd(begin,routes[i]);
	if (res[0]<minDist){
	    minDist=res[0];
	    getOn= res[1];
	    getOff=res[2];
	}
    }
    return [getOn,getOff];

}


/*
function getClosestStop ((lon, lat), routes) {
  var nearestStop;
  var route;
  var minDistance = 100;
  for (int i = 0; i < routes.length(); i++) {
    for (int j = 0; j < routes[i].length(); j++) {
      var (x, y) = routes[i][j];
      var distance = Math.sqrt(Math.pow(lon - x, 2) + Math.pow(lat - y, 2));
      if (distance < minDistance) {
        minDistance = distance;
        route = i;
        nearestStop = routes[i][j];
      }
    }
  }
  return (route, nearestStop);
}
*/

//can make this more careful and case on hour as well. . . kinda annoying
/*
function possibleRoutes (time) {
  int day = time / 10000;
  int hour = (time / 100) % 100;
  if (d = 0) {
    return [[], [], routeAB, routeC, [], [], PTC];
  }
  else if (d <= 1 && d <= 4) {
    if (h
    return [routeA, routeB, [], routeC, bakerySquareL, bakerySquareS, PTC];
  }
  else if (d = 5) {
    return [routeA, routeB, [], [], bakerySquareL, bakerySquareS, PTC];
  }
  else if (d = 6) {
    return [[], [], routeAB, [], [], [], PTC];
  }
}
*/
var routeA = [[-79.942711,40.445419],
[-79.948631,40.444469],
[-79.950386,40.445690],
[-79.950531,40.446968],
[-79.951714,40.448875],
[-79.953178,40.451340],
[-79.950897,40.452213],
[-79.949837,40.452564],
[-79.946411,40.453529],
[-79.944489,40.454109],
[-79.941483,40.455063],
[-79.938622,40.455856],
[-79.934067,40.457226],
[-79.932541,40.454777],
[-79.931763,40.453457],
[-79.931145,40.452099],
[-79.930634,40.451260],
[-79.929726,40.449867],
[-79.932541,40.448956],
[-79.934181,40.448460],
[-79.937027,40.447918]];

var routeB = [[-79.942764,40.445560],
[-79.937233,40.447731],
[-79.934380,40.448189],
[-79.932724,40.448711],
[-79.930237,40.451111],
[-79.930710,40.451977],
[-79.931564,40.453346],
[-79.932434,40.454632],
[-79.933517,40.456509],
[-79.928993,40.458771],
[-79.926437,40.459518],
[-79.923546,40.460377],
[-79.922523,40.457233],
[-79.922630,40.455910],
[-79.921974,40.454556],
[-79.921135,40.453022],
[-79.922318,40.452728],
[-79.923927,40.452141],
[-79.925774,40.451389],
[-79.927361,40.450768]];

var routeAB = [[-79.942711,40.445511],
[-79.948563,40.444530],
[-79.950356,40.445648],
[-79.950623,40.446987],
[-79.951691,40.448940],
[-79.953110,40.451420],
[-79.951004,40.452026],
[-79.949738,40.452415],
[-79.946632,40.453453],
[-79.944595,40.453869],
[-79.941597,40.454865],
[-79.938881,40.455566],
[-79.935364,40.453316],
[-79.933624,40.454159],
[-79.932793,40.454506],
[-79.933525,40.456478],
[-79.928978,40.458710],
[-79.926392,40.459431],
[-79.923553,40.460323],
[-79.922401,40.457310],
[-79.922684,40.455936],
[-79.921951,40.454563],
[-79.920959,40.453037],
[-79.923958,40.452049],
[-79.925819,40.451389],
[-79.927444,40.450703],
[-79.929527,40.450150],
[-79.932465,40.449104],
[-79.934036,40.448612],
[-79.936859,40.447914]];

var routeC = [[-79.942741,40.445427],
[-79.947166,40.447052],
[-79.948891,40.445553],
[-79.945969,40.444546],
[-79.941612,40.444355],
[-79.937706,40.442696],
[-79.927826,40.437992],
[-79.927719,40.435802],
[-79.927696,40.434189],
[-79.927658,40.432671],
[-79.927589,40.431095],
[-79.927513,40.429379],
[-79.923630,40.429668],
[-79.921593,40.429096],
[-79.918671,40.428398],
[-79.916229,40.427883],
[-79.915192,40.430191],
[-79.915024,40.432495],
[-79.914124,40.433453],
[-79.912498,40.435146],
[-79.913338,40.437687],
[-79.915970,40.437885],
[-79.916656,40.441296],
[-79.919144,40.444107],
[-79.920494,40.443928],
[-79.923759,40.444038],
[-79.925926,40.444122],
[-79.927788,40.444221],
[-79.929161,40.444691],
[-79.930153,40.445194],
[-79.931252,40.445660],
[-79.933266,40.445492],
[-79.936630,40.444927]];


var bakerySquareL = [[-79.946091,40.444481],
[-79.941887,40.444057],
[-79.927834,40.434242],
[-79.923180,40.434586],
[-79.919144,40.435139],
[-79.920494,40.452744],
[-79.915497,40.453430],
[-79.915154,40.456074],
[-79.922523,40.457306],
[-79.922729,40.455959],
[-79.922020,40.454556],
[-79.921204,40.452972],
[-79.922295,40.452663],
[-79.923904,40.452091],
[-79.925728,40.451275],
[-79.927467,40.450573],
[-79.929527,40.449951],
[-79.934120,40.448582],
[-79.936691,40.447990],
[-79.953751,40.443192]];

var bakerySquareS = [[-79.946129,40.444508],
[-79.941811,40.444187],
[-79.915581,40.453724],
[-79.915108,40.456108],
[-79.922729,40.455929],
[-79.921997,40.454571],
[-79.921051,40.452972],
[-79.922386,40.452694],
[-79.923950,40.452106],
[-79.925774,40.451370],
[-79.927444,40.450703],
[-79.929550,40.450001],
[-79.934097,40.448582],
[-79.936783,40.447960],
[-79.953796,40.443272]];

var PTC = [[-79.942734,40.445511],
[-79.942329,40.440536],
[-79.946823,40.441544],
[-79.964249,40.432640]];
