var RouteA = 0;
var RouteB = 1;
var RouteAB = 2;
var RouteC = 3;
var BakerySquareL = 4;
var BakerySquareS = 5;
var PTCroute = 6;
var routeNamesList=["A","B","AB","C","Bakery Square Long","Bakery Square Short","PTCroute"];

// ALGORITHM FOR CALULCATING BEST STOP
//
// 1. calulate the best possible geton stop/ get off stop for each route
//    a. find the nearest get on point
//    b. find the nearest get off point from points ahead of get-on
// 2. find the shortest path one
// 3. done
//


/*
THINGS TO DO:
1. certain routes based on time (line 92 ish)
2. if distance is short enough to walk there without shuttle then do it
3. add waypoints between stops to make the actual path more accurate ~line126
*/

/*
THINGS DONE:
1. added "pittsburgh,PA" to all queries to make geocoder better

 */


// uses spherical shape of earth
// to calculate distance between
// two points
function getDistance(x1,y1,x2,y2){
    // make points from latitude and longitudes
    var d1=new google.maps.LatLng(x1, y1);
    var d2=new google.maps.LatLng(x2, y2);
    // get spherical distance
    var distance = Math.ceil(google.maps.geometry.spherical.computeDistanceBetween(d1,d2));
    return distance;
}

// helper function for start to end
// given a route and a destination, find the closest stop
function stopToEnd(route,endx,endy,ith){
    var nearestStop;
    var minDistance = 999999;
    var jth;
    // for each stop in the route calculate its
    // distance and then find the minimum distance
    // stopx
    for (var i = ith; i < route.length; i++) {
	var x = route[i][0];
	var y = route[i][1];
	var distance = getDistance(y,x,endx,endy);
	if (distance < minDistance) {
	    minDistance = distance;
	    nearestStop = route[i];
	    jth=i;
	}
    }
    return [minDistance,nearestStop,jth];
}

// given a route and a destination
// find the closest stop to get on
// and then calls stopToEnd to
// find the closest stop to get off
function startToEnd(route,endx,endy){
    var nearestStop;
    var ith;
    var minDistance = 999999;
    var distance= 1000000000;
    // for each stop calculate distance from start
    // keep track of stop with minimum distance from start
    for (var i = 0; i < route.length; i++) {
	var x = route[i][0];
	var y = route[i][1];
	var distance = getDistance(mylat,mylong,y,x);
	if (distance < minDistance) {
	    minDistance = distance;
	    ith = i;
	    nearestStop = route[i];
	}
    }
    // with remaining stops on route get clsest distance to end
    var res2= stopToEnd(route,endx,endy,ith);
    return [minDistance+res2[0], nearestStop,res2[1],ith,res2[2]];

}

// given a destination, uses current location
// to find best shuttle route to get on and off at
function getBestStops(endx,endy){
    var minDist= 999999;
    var getOn;
    var getOff;
    var ithRoute;
    var getOnName;
    var getOffName;
    var allStops =[routeAstopNames,routeBstopNames,routeABstopNames,routeCstopNames,
		   bakerySquareLongstopNames, bakerySquareShortstopNames,PTCstopNames];
    var routes = [routeA, routeB, routeAB, routeC, bakerySquareL, bakerySquareS, PTC];
    // for each route calculate best route
    for (var i=0; i < routes.length; i++){
        var res = startToEnd(routes[i],endx,endy);
        if (res[0]<minDist){
            minDist=res[0];
            getOn= res[1];
            getOff=res[2];
	    ithRoute=i;

	    getOnName = allStops[i][res[3]];
	    getOffName = allStops[i][res[4]];
        }
    }
    // return the optimal stop to get on from start
    // and stop to get off to end


    return [getOn,getOff,routeNamesList[ithRoute],getOnName,getOffName];

}

// geocodes the destination before main function called
// this is neededed to avoid asynchronous calls
// after main function is called it gets everything
function preGetBestStops(){
    // add pittsburgh Pa to ensure local results
    var end = document.getElementById("address").value+" ,pittsburgh,PA";
    var endx;
    var endy;
    var waitforgeocode=false;
    // geocode destination giving it address
    geocoder.geocode( { 'address': end}, function(results, status) {
	    // if successfull (i put calls in here
	    // to avoid asynchronous issues)
            if (status == google.maps.GeocoderStatus.OK) {
		// put geocoded end into enx and endy
                endx=results[0].geometry.location.lat();
		endy=results[0].geometry.location.lng();
		// find the best stops
		stops = getBestStops(endx,endy);
		// make the route request with waypoints as stops
		var request = {
		    origin:mylat+","+mylong,
		    destination:endx+","+endy,
		    waypoints: [{
			    location:stops[0][1]+","+stops[0][0],
			    stopover:true},{
			    location:stops[1][1]+","+stops[1][0],
			    stopover:true}],
		    travelMode: google.maps.DirectionsTravelMode.WALKING
		};
		// request the route given the paremeters above
		directionsService.route(request, function(response, status) {
			// if successfull
			if (status == google.maps.DirectionsStatus.OK) {
			    // draw the directions
			    directionsDisplay.setDirections(response);
			    // user generated message
			    alert("Walk to "+stops[3]+"(point B) get on shuttle:"+stops[2]+". Get off at "+stops[4]+"(point C) ,then walk to destination "+end+ "(point D)");
			}
		    });
            }
	});
}




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
