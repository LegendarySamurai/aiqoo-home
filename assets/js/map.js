//-- Map Functions
console.log("Map Functions map.js v=0.1");

if (isMobile != true)
{

    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAHnDaHtC-BxNseH5sJi4hhAq07N3lkCX8&callback=initMap&language=en";
    document.getElementsByTagName('head')[0].appendChild(script);


    var bgMap, indexMap, geocoder;
    var bgZoom = 5.6;
    var indexZoom = 10;
    var latCoord = 39.8333333;
    var longCoord = -98.585522;
    var mapStyles = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ebe3cd"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#523735"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f5f1e6"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#c9b2a6"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#dcd2be"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#ae9e90"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "stylers": [
                {
                    "color": "#f4eee4"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#edebf5"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
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
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#93817c"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a5b076"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#447530"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f1e6"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#fdfcf8"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f8c967"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#9791b1"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#9791b1"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e98d58"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#585077"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#9791b1"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#806b63"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#8f7d77"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ebe3cd"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#c9ddf3"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#92998d"
                }
            ]
        }
    ]


}

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

    if (typeof getZipFromPage === 'function')
    {

        var zipCode = getZipFromPage();
        geocoder.geocode({ 'address': zipCode }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK)
            {       
                bgMap = new google.maps.Map(document.getElementById('bg-map'), {
                    center: results[0].geometry.location,
                    zoom: 12,
                    disableDefaultUI: true,
                    fullscreenControl: false,
                    styles: mapStyles
                });
            }
        });

    }
    else
    {
        bgMap = new google.maps.Map(document.getElementById('bg-map'), {
            center: { lat: latCoord, lng: longCoord },
            zoom: bgZoom,
            disableDefaultUI: true,
            fullscreenControl: false,
            styles: mapStyles
        });
	}
   
}

function initIndexMap() {
    var latIndexCoord = 34.052235;
    var longIndexCoord = -118.243683;
	indexMap = new google.maps.Map(document.getElementById('index-map'), {
        center: { lat: latIndexCoord, lng: longIndexCoord },
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
				bgMap.setZoom(14);
				/*var marker = new google.maps.Marker({
					position: { lat: latCoord, lng: longCoord },
					map: bgMap
				});*/

			}, 500)
		}
	});
}

