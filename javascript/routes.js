// variables to store a int representative of the route + pickuplocation to make
// comparison easy + code semi readable. . .
var RouteA = 0;
var RouteB = 1;
var RouteAB = 2;
var RouteC = 3;
var BakerySquareL = 4;
var BakerySquareS = 5;
var PTCroute = 6;
var Escortroute = 7;
var Shuttlepickups = 8;

function allKMLRoutes(map) {
  /*showRoute(RouteA, map);
  showRoute(RouteB, map);
  showRoute(RouteAB, map);
  showRoute(RouteC, map);
  showRoute(BakerySquareL, map);
  showRoute(BakerySquareS, map);
  showRoute(PTCroute, map);
  showRoute(Escortroute, map);
  */showRoute(Shuttlepickups, map);
}

function showRoute(route, map) {
  if (route == RouteA) {
    setRoute = new google.maps.KmlLayer('http://maps.google.com/maps/ms?hl=en&ie=UTF8&source=embed&authuser=0&oe=UTF8&msa=0&output=kml&msid=207124610843438221482.0004a87faf0e510523963');
   setRoute.setMap(map); 
  }
  else if (route == RouteB) {
    setRoute = new google.maps.KmlLayer('http://maps.google.com/maps/ms?hl=en&ie=UTF8&source=embed&authuser=0&msa=0&output=kml&msid=207124610843438221482.0004a88283203980d6c19');
    setRoute.setMap(map); 
  }
  else if (route == RouteAB) {
    setRoute = new google.maps.KmlLayer('http://maps.google.com/maps/ms?hl=en&ie=UTF8&source=embed&authuser=0&msa=0&output=kml&msid=207124610843438221482.0004a8bed5dc3eb7d17f7');
    setRoute.setMap(map);  
  }
  else if (route == RouteC) {
    setRoute = new google.maps.KmlLayer('http://maps.google.com/maps/ms?hl=en&ie=UTF8&source=embed&authuser=0&msa=0&output=kml&msid=207124610843438221482.0004a883bef66d782025b');
    setRoute.setMap(map); 
  }
  else if (route == BakerySquareL) {
    setRoute  = new google.maps.KmlLayer('http://maps.google.com/maps/ms?hl=en&ie=UTF8&source=embed&authuser=0&msa=0&output=kml&msid=207124610843438221482.0004a935108c289127c9e');
    setRoute.setMap(map); 
  }
  else if (route == BakerySquareS) {
    setRoute = new google.maps.KmlLayer('http://maps.google.com/maps/ms?hl=en&ie=UTF8&source=embed&authuser=0&msa=0&output=kml&msid=207124610843438221482.0004a934a493df56d75e5');
  }
  else if (route == PTCroute) {
    setRoute = new google.maps.KmlLayer('http://maps.google.com/maps/ms?hl=en&ie=UTF8&source=embed&authuser=0&msa=0&output=kml&msid=207124610843438221482.0004a8c0b786126831bc1');
    setRoute.setMap(map); 
  }
  else if (route == Escortroute) {
    setRoute  = new google.maps.KmlLayer('http://maps.google.com/maps/ms?hl=en&ie=UTF8&source=embed&authuser=0&msa=0&output=kml&msid=207124610843438221482.0004a8f88f9de4f48d463');
    setRoute.setMap(map); 
  } 
  else if (route == Shuttlepickups) {
    setRoute = new google.maps.KmlLayer('http://maps.google.com/maps/ms?authuser=0&vps=2&hl=en&ie=UTF8&msa=0&output=kml&msid=202712592852361000472.0004bd1f02f0f5eb620ab');
    setRoute.setMap(map); 
  }
  //else break;
  }

