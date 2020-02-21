"use strict";

var TipId = 1;
var startSession;

function reloadDiv(id) {
    if (document.getElementById(id).style.display === "") {
        document.getElementById(id).style.display = "none";
    } else {
        document.getElementById(id).style.display = "";
    }
}
function reloadOn(id) {
    document.getElementById(id).style.display = "";
}
function reloadOff(id) {
    document.getElementById(id).style.display = "none";
}

function openVideo(videoID) {
    document.getElementById("YouTubeVideoDisplayBg").style.display = "";
    str = document.getElementById(videoID + "_div").innerHTML;
    str = str + '<iframe style="width:100%;height:100%;" src="https://www.youtube.com/embed/' + videoID + '?autoplay=1&mute=0&modestbranding=1&autohide=1&showinfo=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    document.getElementById("YouTubeVideoDisplayContent").innerHTML = str;
}
function closeYouTubeVideoDisplay() {
    document.getElementById("YouTubeVideoDisplayBg").style.display = "none";
    document.getElementById("YouTubeVideoDisplayContent").innerHTML = '';
}
function init() {
    var imgDefer = document.getElementsByTagName('img');
    for (var i = 0; i < imgDefer.length; i++) {
        if (imgDefer[i].getAttribute('data-src')) {
            imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
        }
    }

    if (location.pathname != "/") {
        var init_script_load = setTimeout(function () {
            var script = document.createElement('script');
            script.src = "https://api.aiq-magazine.com/FunnelsAssets/FunnelJS/init_funnels.js?v=0.08";
            document.getElementsByTagName('head')[0].appendChild(script);
        }, 1000);
        if (window.location != '/') {
            var funnel_script_load = setTimeout(function () {
                var script = document.createElement('script');
                script.src = "https://api.aiq-magazine.com/FunnelsAssets/FunnelJS/AiqHome_funnels_v1.js?v=0.06";
                document.getElementsByTagName('head')[0].appendChild(script);
                var Temph3 = document.getElementById("Temph3");
                Temph3.style.display = "none";
            }, 1200);
        }
    }

    UserPageStartSession();
}

document.addEventListener('readystatechange', function (event) {
    if (event.target.readyState === "complete") {
        init();
        var Icons = document.createElement('link');
        Icons.rel = 'stylesheet';
        Icons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        Icons.type = 'text/css';
        var godefer = document.getElementById("MaterialIcons");
        godefer.parentNode.replaceChild(Icons, godefer);
    }

    var CallToActionText = document.getElementById("CallToActionText");
    if (CallToActionText) {
        window.onscroll = function (e) {
            var scrollPosition = window.pageYOffset;
            if (scrollPosition > 500) {
                CallToActionText.classList.add("float");
            }
        };
    }
});

function openNav() {
    document.getElementById("slideNav").style.left = "0px";
    document.querySelectorAll(".sidebar-overlay")[0].style.display = "block";
}

function closeNav() {
    document.getElementById("slideNav").style.left = "-1500px";
    document.querySelectorAll(".sidebar-overlay")[0].style.display = "none";
}

function UserPageStartSession() {
    startSession = new Date();
}

function setCookie(cname, cvalue, exdHours) {
    var d = new Date();
    //console.log(d);
    d.setTime(d.getTime() + exdHours * 60 * 60 * 1000);
    //console.log(d);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

window.toggleSection = function (event, sectionID) {
    var section_id = document.getElementById(sectionID);
    var change_word = event.childNodes;
    if (section_id.getAttribute("isOpen") !== null) {
        console.log(change_word);
        for (var i = 0; i < change_word.length; i++) {
            if (change_word[i].className === "change-word") {
                change_word[i].innerHTML = "All";
                break;
            }
        }
        section_id.removeAttribute("isOpen");
        section_id.style.display = "none";
    } else {
        console.log(change_word);
        for (var j = 0; j < change_word.length; j++) {
            if (change_word[j].className === "change-word") {
                change_word[j].innerHTML = "Close";
                break;
            }
        }
        section_id.setAttribute("isOpen", "true");
        section_id.style.display = "flex";
    }
};

var zoom = 10;
var map, zipcode, zip_next_button;

setTimeout(function () {
    try {
        roof_Replacement_3 = document.getElementById("__Roof_Replacement_3__");
        roof_Replacement_4 = document.getElementById("__Roof_Repair_4__");
        roof_Replacement_3.addEventListener('click', getZipInput);
        roof_Replacement_4.addEventListener('click', getZipInput);
    } catch (e) {
        console.log("error add listiner zipcode");
    }
}, 3500);

function getZipInput() {
    zipcode = document.getElementById("1_zipCode");
    zip_next_button = document.getElementById("__Next_zipCode__");
    zip_next_button.addEventListener("click", function () {
        makeZipGetRequest(zipcode.value);
    });
}

function makeZipGetRequest(zipcode) {
    var location_zipcode = document.getElementById("location-zipcode");
    var city_name = document.getElementById("city-name");
    var mapContainer = document.getElementById("map");
    mapContainer.style.width = "173.5%";

    var url = "ContentPage?handler=Coordient" + "&zipCode=" + zipcode + "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var Coordient = JSON.parse(xhttp.responseText);
            location_zipcode.innerHTML = zipcode;
            city_name.innerHTML = Coordient.city + ", " + Coordient.state;
            setLocationAfterZipCode(parseInt(Coordient.latitude), parseInt(Coordient.longitude));
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}

function setLocationAfterZipCode(latCoord, longCoord) {
    map.panTo({ lat: latCoord, lng: longCoord });
    setTimeout(function () {
        map.setZoom(14);
        var marker = new google.maps.Marker({
            position: { lat: latCoord, lng: longCoord },
            map: map,
            title: map.loca
        });
    }, 500);
}

function initMap() {
    // Styles a map in night mode.

    var location = {
        lat: latCoord,
        lng: longCoord
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: zoom,
        styles: [{
            "elementType": "geometry",
            "stylers": [{
                "color": "#ebe3cd"
            }]
        }, {
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#523735"
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#f5f1e6"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#c9b2a6"
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#dcd2be"
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#ae9e90"
            }]
        }, {
            "featureType": "administrative.neighborhood",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dfd2ae"
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dfd2ae"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#93817c"
            }]
        }, {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#a5b076"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#447530"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f1e6"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#fdfcf8"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f8c967"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#e9bc62"
            }]
        }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e98d58"
            }]
        }, {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#db8555"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#806b63"
            }]
        }, {
            "featureType": "transit",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dfd2ae"
            }]
        }, {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#8f7d77"
            }]
        }, {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ebe3cd"
            }]
        }, {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dfd2ae"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#b9d3c2"
            }]
        }, {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#92998d"
            }]
        }]
    });

    var contentString = "amit";
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
}

