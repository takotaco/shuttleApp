function detectBrowser() {
    var useragent = navigator.userAgent;
    var mapdiv = document.getElementById("map_canvas");

    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
	mapdiv.style.width = '100%';
	mapdiv.style.height = '100%';
    } else {
	mapdiv.style.width = '800px';
	mapdiv.style.height = '600px';
    }
}
