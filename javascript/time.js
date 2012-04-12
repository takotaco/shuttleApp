// variables to store a int representative of the route + pickuplocation to make
// comparison easy + code semi readable. . .
var RouteA = 0;
var RouteB = 1;
var RouteAB = 2;
var RouteC = 3;
var BakerySquareL = 4;
var BakerySquareS = 5;
var PTCroute = 6;

//stops
//bakerysquare routes:
var CICstop = 0;
var BakerySquarestop = 1;
//A, B, AB, C, and PTC routes
var Morewoodstop = 0;
//PTC route
var PTCstop = 1;

// function that gets the current time
// get the day, hour and minute
// stores it as a 5 digit int of the form (day hour hour min min)
function getCurrTime() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var day = d.getDay();
  return d*10000+h*100+m;
}

// get the next available shuttle time
// if a negative number is returned it's because nextT = 0 which means that 
// the shuttles are done for the day
function timeDiff(timeArray, time) {
  var i = 0;
  var nextT = 0;
  while (i < timeArray.length)
    {
	if (time >= timeArray[i])
          i ++;
        else {
           nextT = timeArray[i];
           break;
        }
    }
   return nextT - time;
}

// given a specific route and pickup spot on the route, gets the time the
// next shuttle will come based on the stored time arrays, the day, and the
// current time
function timeTilNextShuttle(route, stop) {
  var t = getCurrTime();
  var day = t / 10000;
  var time = t % 10000;

  if (route == RouteA)
    {
      if (day < 1 || day > 5)
        return -1;
      else 
        return timeDiff(routeAMF, time);
    }
  else if (route == RouteB)
    {
      if (day < 1 || day > 5)
        return -1;
      else
        return timeDiff(routeBMF, time);
    }
  else if (route == RouteAB)
    {
      if (day < 1 || day > 5) 
        return timeDiff(routeABSSu, time);
      else
        return timeDiff(routeABMF, time);
    }
  else if (route == RouteC)
    {
      if (day > 4)
        return -1;
      else 
        return timeDiff(routeCSuR, time);
    }
  else if (route == BakerySquareL)
    {  
      if (stop == CICstop) 
      {
        if (day < 1 || day > 5)
          return -1;
        else
          return timeDiff(BakerySquareLRCICMF, time);
      }
      else if (stop == BakerySquarestop)
      {
        if (day < 1 || day > 5)
          return -1;
        else 
          return timeDiff(BakerySquareLRBSMF, time);
      }
      else 
        return -1;
    }
  else if (route == BakerySquareS)
    {
      if (stop == CICstop) 
      {
        if (day < 1 || day > 5)
          return -1;
        else
          return timeDiff(BakerySquareSRCICMF, time);
      }
      else if (stop == BakerySquarestop)
      {
        if (day < 1 || day > 5)
          return -1;
        else 
          return timeDiff(BakerySquareSRBSMF, time);
      }
      else 
        return -1;
    }
  else if (route == PTCroute)
    { 
      if (stop == Morewoodstop) 
      {
        if (day < 1 || day > 5)
          return timeDiff(PTCMorewoodSSu, time);
        else
          return timeDiff(PTCMorewoodMF, time);
      }
      else if (stop == PTCstop)
      {
        if (day < 1 || day > 5)
          return timeDiff(PTCPTCSSu, time);
        else
          return timeDiff(PTCPTCMF, time);
      }
      else
        return -1;
  }
  else 
    return -1;
}

// store the times for each route/pickup location for a gien day
// form: routeName + pickup location (if multiple for that route) +
// range of days of operation
var routeAMF = [645, 715, 745, 815, 845, 915, 945, 1015, 1045, 1630, 1700,
                1730, 1800];

var routeBMF = routeAtimesMF;

var routeABMF = [1115, 1200, 1245, 1330, 1415, 1500, 1545, 1830, 1915,
                 2000, 2045, 2130, 2215, 2300];

var routeABSSu = [645, 730, 815, 900, 945, 1030, 1145, 1230, 1315, 1400,
                  1445, 1530, 1615, 1700, 1745, 1900, 1945, 2030, 2115,
                  2200, 2245];

var routeCSuR = [1930, 2015, 2100, 2145, 2200, 2315, 30, 115, 200, 245]; 

var BakerySquareLRCICMF = [830, 930, 1630, 1730];

var BakerySquareLRBSMF = [900, 1000, 1700, 1800];

var BakerySquareSRCICMF = [1030, 1130, 1230, 1330];

var BakerySquareSRBSMF = [1100, 1200, 1300, 1345];

var PTCMorewoodMF = [45, 145, 745, 845, 945, 1045, 1145, 1245, 1345, 1445,
                     1545, 1645, 1745, 1845, 2045, 2145, 2245, 2345];  

var PTCPTCMF = [15, 115, 215, 815, 915, 1015, 1115, 1215, 1315, 1415, 1515, 
                1615, 1715, 1815, 1915, 2115, 2215, 2315];

var PTCMorewoodSSu = [1045, 1145, 1245, 1345, 1545, 1645, 1745, 1845];

var PTCPTCSSu = [1115, 1215, 1315, 1415, 1615, 1715, 1815, 1915];
