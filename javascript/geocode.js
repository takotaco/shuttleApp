function codeAddress() {
  var address = document.getElementById("address").value;
  geocoder.geocode( { 'address': address}, function(results, status) {
   if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
 }

function setStartLocation() {
  alert("Called setStartLocation()");
  var address = document.getElementById("startAddress").value + ",Pittsburgh, PA";
  geocoder.geocode( { 'address': address}, function(results, status) {
   if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      Currentmarker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        title:"Your are here"
      });
      mylat = results[0].geometry.location.lat();
      mylong = results[0].geometry.location.lng();
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
 }
