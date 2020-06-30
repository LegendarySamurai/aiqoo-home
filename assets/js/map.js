//-- Map Functions
console.log("Map Functions map.js v=0.1");

var bgMap, indexMap, geocoder;
var bgZoom = 5.3;
var indexZoom = 10;
var latCoord = 39.8333333;
var longCoord = -98.585522;


var map_script_load = setTimeout(function () {
	var script = document.createElement('script');
	script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAHnDaHtC-BxNseH5sJi4hhAq07N3lkCX8&callback=initMap&language=en";
	document.getElementsByTagName('head')[0].appendChild(script);
}, 2000)


function initMap() {
	geocoder = new google.maps.Geocoder();

	if (document.getElementById("bg-map")) {
		initBgMap();
	}

	if (document.getElementById("index-map")) {
		initIndexMap();
	}
}

function initBgMap() {
	bgMap = new google.maps.Map(document.getElementById('bg-map'), {
		center: { lat: latCoord, lng: longCoord },
		zoom: bgZoom,
		disableDefaultUI: true,
		fullscreenControl: false,
		styles:
			[
				{
					"featureType": "administrative.land_parcel",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "administrative.neighborhood",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "labels.text",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "poi.business",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "labels.icon",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "transit",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "labels.text",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				}
			]
	});
}

function initIndexMap() {
	indexMap = new google.maps.Map(document.getElementById('index-map'), {
		center: { lat: latCoord, lng: longCoord },
		zoom: indexZoom,
		disableDefaultUI: true,
		fullscreenControl: false
	});
}

function mapPanToByZip(zipCode) {
	geocoder.geocode({ 'address': zipCode }, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			bgMap.panTo(results[0].geometry.location);
			setTimeout(function () {
				bgMap.setZoom(15);
				/*var marker = new google.maps.Marker({
					position: { lat: latCoord, lng: longCoord },
					map: bgMap
				});*/

			}, 500)
		}
	});
}

