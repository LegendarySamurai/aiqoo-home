//For use of the angular funnles

"use strict";

var myExtObject = { fireConvEvent: function fireConvEvent(n) {
        window.dataLayer = window.dataLayer || [], window.dataLayer.push({ event: "conv_" + n.toLowerCase() });
    }, func2: function func2() {
        alert("function 2 called");
    } };

//UTA code
var _apiUrl = "https://api.aiq-magazine.com/api/v1/";
var _userTempCode = IdGenerator(10);
var _ut_UID, _ut_loc, obj, bb, userObj;

function startTracking() {

    _ut_UID = getCookie("ut_UID");
    if (_ut_UID.length < 5) {
        _ut_UID = hashCode(generateUninqUserId());
        setCookie("ut_UID", _ut_UID, 2);
    }

    _ut_loc = getCookie("ut_loc");
    if (_ut_loc.length < 5) {
        makeGetRequest("https://api.ipdata.co/?api-key=test", 3, 1);
    } else {
        getFullInformation();
    }

    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('utm_source')) {
        setCookie('utm_source', urlParams.get('utm_source'), 30);
    }
    if (urlParams.has('utm_medium')) {
        setCookie('utm_medium', urlParams.get('utm_medium'), 30);
    }
    if (urlParams.has('utm_campaign')) {
        setCookie('utm_campaign', urlParams.get('utm_campaign'), 30);
    }
    if (urlParams.has('utm_term')) {
        setCookie('utm_term', urlParams.get('utm_term'), 30);
    }
    if (urlParams.has('utm_content')) {
        setCookie('utm_content', urlParams.get('utm_content'), 30);
    }
    if (urlParams.has('utm_keyword')) {
        setCookie('utm_keyword', urlParams.get('utm_keyword'), 30);
    }
    if (urlParams.has('utm_tags')) {
        setCookie('utm_tags', urlParams.get('utm_tags'), 30);
    }
}

function getFullInformation() {

    userObj = {};
    userObj.browser_language = navigator.language;
    userObj.brwoser_name = checkBrowser(), userObj.browser_version = checkVersionBrowser(), userObj.platform = navigator.platform, userObj.operation_system = navigator.appVersion, userObj.connection = GetConnection(), userObj.connection_speed = ConnectionSpeed(), userObj.url = window.location.href, userObj.page_refer = document.referrer, userObj.device_operation_system = getDeviceOperatingSystem(), userObj.device = getDevice(), userObj.device_height = screen.height, userObj.device_width = screen.width, userObj.document_height = window.innerHeight, userObj.document_width = window.innerWidth, userObj.page_open_time = new Date(), userObj.utm_source = getUrlParams('utm_source');
    userObj.utm_medium = getUrlParams('utm_medium');
    userObj.utm_campaign = getUrlParams('utm_campaign');
    userObj.utm_term = getUrlParams('utm_term');
    userObj.utm_content = getUrlParams('utm_content');
    userObj.utm_keyword = getUrlParams('utm_keyword');
    userObj.utm_tags = getUrlParams('utm_tags');

    try {
        navigator.getBattery().then(function (battery) {
            bb = battery.level * 100 + "%";
            return bb;
        }).then(function (data) {
            userObj.battery_status = data;
        });
    } catch (e) {
        userObj.battery_status = "-1%";
    }

    var amitObj = JSON.parse(JSON.parse(_ut_loc));

    var languageName = "";var languageRtl = "";
    amitObj.languages.forEach(function (element) {
        languageName += element.name + ",";
        languageRtl += element.rtl.toString() + ",";
    });

    languageName += "###";
    languageRtl += "###";
    languageName = languageName.replace(",###", "");
    languageRtl = languageRtl.replace(",###", "");

    userObj.ip = amitObj.ip;
    userObj.is_eu = amitObj.is_eu;
    userObj.city = amitObj.city;
    userObj.region = amitObj.region;
    userObj.region_code = amitObj.region_code;
    userObj.country_name = amitObj.country_name;
    userObj.country_code = amitObj.country_code;
    userObj.continent_name = amitObj.continent_name;
    userObj.continent_code = amitObj.continent_code;
    userObj.latitude = amitObj.latitude;
    userObj.longitude = amitObj.longitude;
    userObj.asn = amitObj.asn;
    userObj.organisation = amitObj.organisation;
    userObj.postal = amitObj.postal;
    userObj.calling_code = amitObj.calling_code;
    userObj.flag = amitObj.flag;
    userObj.carrier_name = amitObj.carrier["name"];
    userObj.carrier_mcc = amitObj.carrier["mcc"];
    userObj.carrier_mnc = amitObj.carrier["mnc"];
    userObj.languages_name = languageName;
    userObj.languages_rtl = languageRtl;
    userObj.currency_name = amitObj.currency["name"];
    userObj.currency_code = amitObj.currency["code"];
    userObj.currency_symbol = amitObj.currency["symbol"];
    userObj.currency_native = amitObj.currency["native"];
    userObj.currency_plural = amitObj.currency["plural"];
    userObj.time_zone_name = amitObj.time_zone["name"];
    userObj.time_zone_abbr = amitObj.time_zone["abbr"];
    userObj.time_zone_offset = amitObj.time_zone["offset"];
    userObj.time_zone_is_dst = amitObj.time_zone["is_dst"];
    userObj.time_zone_current_time = amitObj.time_zone["current_time"];
    userObj.threat_is_tor = amitObj.threat["is_tor"];
    userObj.threat_is_proxy = amitObj.threat["is_proxy"];
    userObj.threat_is_anonymous = amitObj.threat["is_anonymous"];
    userObj.threat_is_known_attacker = amitObj.threat["is_known_attacker"];
    userObj.threat_is_known_abuser = amitObj.threat["is_known_abuser"];
    userObj.threat_is_threat = amitObj.threat["is_threat"];
    userObj.threat_is_bogon = amitObj.threat["is_bogon"];

    //var fullDataObj = Object.assign(userObj, JSON.parse(_ut_loc));

    obj = {};
    obj.UID = _ut_UID;
    obj.TempCode = _userTempCode;
    obj.FullData = JSON.stringify(userObj);
    makeRequest('POST', _apiUrl, "TrackingPoints/addTrackingPoint", 3, 1, JSON.stringify(obj));
}

function createRequestObject() {
    var ro;if (window.XMLHttpRequest) {
        try {
            ro = new XMLHttpRequest();
        } catch (e) {
            ro = false;
        }
    } else if (window.ActiveXObject) {
        try {
            ro = new ActiveXObject("Msxml2.HTMLHTTP");
        } catch (e) {
            try {
                ro = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                ro = false;
            }
        }
    }return ro;
}

function makeGetRequest(url, numberOfRuns, currentRun) {

    if (currentRun <= numberOfRuns) {

        var xhr = createRequestObject();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = function () {
            var _this = this;

            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    _ut_loc = xhr.responseText;

                    var startIndex = _ut_loc.indexOf("emoji_flag");
                    var endIndex = _ut_loc.indexOf("carrier");

                    _ut_loc = JSON.stringify(_ut_loc.replace(_ut_loc.substring(startIndex, endIndex), ""));

                    setCookie("ut_loc", _ut_loc, 2);
                    console.log(xhr.responseText);

                    getFullInformation();
                    return xhr.responseText;
                } else {
                    var timout = setTimeout(function () {
                        makeGetRequest(url, numberOfRuns, currentRun + 1);
                        console.log(_this.readyState + ' - bad - ' + xhr.responseText + currentRun);
                    }, 2000);
                }
            }
        };
    } else {
        _ut_loc = "{}";
        getFullInformation();
    }
}

function makeRequest(method, url, endpoint, numberOfRuns, currentRun, data) {
    if (currentRun <= numberOfRuns) {
        var http_req = createRequestObject();
        url += endpoint;
        http_req.open(method, url, true);
        http_req.setRequestHeader("Content-Type", "application/json");
        http_req.setRequestHeader('Access-Control-Allow-Origin', '*');
        http_req.send(data);

        http_req.onreadystatechange = function () {
            var _this2 = this;

            if (http_req.readyState == 4) {
                if (http_req.status == 200) {
                    return http_req.responseText;
                } else {
                    var timout = setTimeout(function () {
                        makeRequest(endpoint, numberOfRuns, currentRun + 1, data.replace("UID\": ", "UID\": 1"));
                        alert(_this2.readyState + ' - bad - ' + http_req.responseText + currentRun);
                    }, 2000);
                }
            }
        };
    }
}

function getBattery() {
    try {
        var batteryIsCharging = false;

        navigator.getBattery().then(function (battery) {
            batteryIsCharging = battery.charging;

            battery.addEventListener('chargingchange', function () {
                batteryIsCharging = battery.charging;
            });
        });
        return batteryIsCharging;
    } catch (res) {
        return "Not Support";
    }
}

function getDeviceOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }
    if (/android/i.test(userAgent)) {
        return "Android";
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    if (/Chrome/.test(userAgent)) {
        return "Chrome";
    }
    return "unknown";
}

function getDevice() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPhone/.test(userAgent)) {
        return "Iphone";
    }
    if (/Nokia/.test(userAgent)) {
        return "Nokia";
    }
    if (/Nexus/.test(userAgent)) {
        return "Nexus";
    }
    if (/iPad/.test(userAgent)) {
        return "Ipad";
    }
    if (/Android/.test(userAgent)) {
        return "Android";
    }
    if (/Windows Phone/.test(userAgent)) {
        return "Windows Phone";
    }
    if (/Windows/.test(userAgent)) {
        return "Windows PC";
    }
}

function getUrlParams(data) {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has(data)) {
        return urlParams.get(data);
    }
}

function checkBrowser() {
    var isOpera = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    // Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || typeof safari !== 'undefined' && safari.pushNotification);
    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1 - 71
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    // Blink engine detection
    if (isOpera) {
        return "Opera";
    }
    if (isFirefox) {
        return "Firefox";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isEdge) {
        return "Edge";
    }
    if (isChrome) {
        return "Chrome";
    }
}

function GetConnection() {
    try {
        return navigator.connection.effectiveType;
    } catch (res) {
        res = "Not Support";
        return res;
    }
}

function ConnectionSpeed() {
    try {
        if (/\slow-2g|2g|3g/.test(navigator.connection.effectiveType)) {
            return "slow";
        } else {
            return "fast";
        }
    } catch (res) {
        return "Not Support";
    }
}

function checkVersionBrowser() {
    var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdHours) {
    var d = new Date();
    d.setTime(d.getTime() + exdHours * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function IdGenerator(length) {
    var result = '';
    var characters = '123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function generateUninqUserId() {
    var d = new Date();
    return IdGenerator(1) + d.getDate() + "" + d.getMonth() + 1 + "" + d.getFullYear() + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds() + navigator.userAgent;
}

function hashCode(s) {
    for (var i = 0, h = 0; i < s.length; i++) h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h.toString().replace("-", "");
}

window.addEventListener('beforeunload', function (e) {
    setEndSession(_apiUrl + "TrackingPoints/setTrackingPointEndSession?UID=" + getCookie("ut_UID") + "&TempCode=" + _userTempCode, 3, 1);
});

function setEndSession(url, numberOfRuns, currentRun) {

    if (currentRun <= numberOfRuns) {
        var xhr = createRequestObject();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4) {
                if (xhr.status == 200) {} else {
                    var timout = setTimeout(function () {
                        setEndSession(url, numberOfRuns, currentRun + 1);
                    }, 2000);
                }
            }
        };
    }
}

