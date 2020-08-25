"use strict";
var _ut_web_id = "Aiq-3";
var _apiUrl = "https://api.aiq-magazine.com/api/v1/";
var _ut_GUID, _ut_Parent_GUID, _ut_ip_api, _userObj;
console.log("ut ver 0.3");
startTrack();

//----------------------------------------------------
//------    For use of the angular funnles      -----
//--------------------------------------------------

var myExtObject = {
    fireConvEvent: function fireConvEvent(v) {
        window.dataLayer = window.dataLayer || [], window.dataLayer.push({ event: "conv_" + v.toLowerCase() });
    },
    getVariableVal: function getVariableVal(v) {
        return eval(v);
    },
    zipChange: function zipChange(v) {
        mapPanToByZip(v);
    }
};

//--------------------------------------
//------    End Session Event     -----
//------------------------------------
window.addEventListener('beforeunload', function (e) {
    setEndSession(_apiUrl + "TrackingPoints/ut_setEndSession?gUid=" + _ut_GUID, 3, 1);
});

function setEndSession(url, numberOfRuns, currentRun) {

    if (currentRun <= numberOfRuns) {
        var xhr = createRequestObject();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = function () {
            var _this2 = this;

            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    //console.log("Success");
                } else {
                        var timout = setTimeout(function () {
                            setEndSession(url, numberOfRuns, currentRun + 1);
                            //console.log(_this2.readyState + ' - bad - ' + xhr.responseText + currentRun);
                        }, 2000);
                    }
            }
        };
    }
}

//-----------------------------
//------    UTA code     -----
//---------------------------

function startTrack() {

    _ut_Parent_GUID = getCookie("Cookie_Parent_Guide") + "";
    if (_ut_Parent_GUID.length < 30) {
        _ut_Parent_GUID = "0";
    }

    _ut_ip_api = getCookie("Cookie_Ip_Api");
    if (_ut_ip_api.length < 5) {
        getIpApiRequest("https://api.ipdata.co/?api-key=565e4d0e5329609464a995a1d828b97341e2867b20e97fefc676d863", 3, 1);
    } else {
        populateUserObject();
    }

    //-- set Utm paramiters
    setUtmParam('utm_source');
    setUtmParam('utm_medium');
    setUtmParam('utm_campaign');
    setUtmParam('utm_term');
    setUtmParam('utm_content');
    setUtmParam('utm_keyword');
    setUtmParam('utm_tags');
}

function setUtmParam(name) {
    if (getUrlParams(name, window.location.href) !== null) {
        var res = getUrlParams(name, window.location.href) + "";
        if (res.length > 1) {
            setCookie(name, res, 168);
        }
    }
}

function populateUserObject() {

    _userObj = {};
    _userObj.browser_language = navigator.language;
    _userObj.brwoser_name = checkBrowser(), _userObj.browser_version = checkVersionBrowser(), _userObj.platform = navigator.platform, _userObj.operation_system = navigator.appVersion, _userObj.connection = GetConnection(), _userObj.connection_speed = ConnectionSpeed(), _userObj.url = window.location.href, _userObj.page_refer = document.referrer, _userObj.device_operation_system = getDeviceOperatingSystem(), _userObj.device = getDevice(), _userObj.device_height = screen.height, _userObj.device_width = screen.width, _userObj.document_height = window.innerHeight, _userObj.document_width = window.innerWidth, _userObj.page_open_time = new Date(), _userObj.utm_source = getUrlParams('utm_source');
    _userObj.utm_medium = getUrlParams('utm_medium');
    _userObj.utm_campaign = getUrlParams('utm_campaign');
    _userObj.utm_term = getUrlParams('utm_term');
    _userObj.utm_content = getUrlParams('utm_content');
    _userObj.utm_keyword = getUrlParams('utm_keyword');
    _userObj.utm_tags = getUrlParams('utm_tags');

    var bLevel;
    try {
        navigator.getBattery().then(function (battery) {
            bLevel = battery.level * 100 + "%";
            return bLevel;
        }).then(function (data) {
            _userObj.battery_status = data;
        });
    } catch (e) {
        _userObj.battery_status = "-1%";
    }

    var apiIpObj = JSON.parse(JSON.parse(_ut_ip_api));
    var languageName = "";var languageRtl = "";
    for (var i = 0; i < apiIpObj.languages.length; i++) {
        languageName += apiIpObj.languages[i].name + ",";
        languageRtl += apiIpObj.languages[i].rtl + ",";
    }
    languageName += "###";
    languageRtl += "###";
    languageName = languageName.replace(",###", "");
    languageRtl = languageRtl.replace(",###", "");
    _userObj.ip = apiIpObj.ip;
    _userObj.is_eu = apiIpObj.is_eu;
    _userObj.city = apiIpObj.city;
    _userObj.region = apiIpObj.region;
    _userObj.region_code = apiIpObj.region_code;
    _userObj.country_name = apiIpObj.country_name;
    _userObj.country_code = apiIpObj.country_code;
    _userObj.continent_name = apiIpObj.continent_name;
    _userObj.continent_code = apiIpObj.continent_code;
    _userObj.latitude = apiIpObj.latitude;
    _userObj.longitude = apiIpObj.longitude;
    _userObj.asn = apiIpObj.asn;
    _userObj.organisation = apiIpObj.organisation;
    _userObj.postal = apiIpObj.postal;
    _userObj.calling_code = apiIpObj.calling_code;
    _userObj.flag = apiIpObj.flag;
    _userObj.languages_name = languageName;
    _userObj.languages_rtl = languageRtl;
    _userObj.currency_name = apiIpObj.currency["name"];
    _userObj.currency_code = apiIpObj.currency["code"];
    _userObj.currency_symbol = apiIpObj.currency["symbol"];
    _userObj.currency_native = apiIpObj.currency["native"];
    _userObj.currency_plural = apiIpObj.currency["plural"];
    _userObj.time_zone_name = apiIpObj.time_zone["name"];
    _userObj.time_zone_abbr = apiIpObj.time_zone["abbr"];
    _userObj.time_zone_offset = apiIpObj.time_zone["offset"];
    _userObj.time_zone_is_dst = apiIpObj.time_zone["is_dst"];
    _userObj.time_zone_current_time = apiIpObj.time_zone["current_time"];
    _userObj.threat_is_tor = apiIpObj.threat["is_tor"];
    _userObj.threat_is_proxy = apiIpObj.threat["is_proxy"];
    _userObj.threat_is_anonymous = apiIpObj.threat["is_anonymous"];
    _userObj.threat_is_known_attacker = apiIpObj.threat["is_known_attacker"];
    _userObj.threat_is_known_abuser = apiIpObj.threat["is_known_abuser"];
    _userObj.threat_is_threat = apiIpObj.threat["is_threat"];
    _userObj.threat_is_bogon = apiIpObj.threat["is_bogon"];

    SendUtPointToServer();
}

function SendUtPointToServer() {
    var obj = {};
    obj.WebID = _ut_web_id.replace("Aiq-", "");
    obj.parentGuide = _ut_Parent_GUID;
    obj.FullData = JSON.stringify(_userObj);
    postRequest('POST', _apiUrl, "TrackingPoints/ut_addPoint", 3, 1, JSON.stringify(obj));
}

//-------------------------------------------
//------     http Request functions     -----
//------------------------------------------
function getIpApiRequest(url, numberOfRuns, currentRun) {

    if (currentRun <= numberOfRuns) {
        var xhr = createRequestObject();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = function () {
            var _this = this;

            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    _ut_ip_api = xhr.responseText;
                    var startIndex = _ut_ip_api.indexOf("emoji_flag");
                    var endIndex = _ut_ip_api.indexOf("languages");
                    _ut_ip_api = JSON.stringify(_ut_ip_api.replace(_ut_ip_api.substring(startIndex, endIndex), ""));
                    setCookie("Cookie_Ip_Api", _ut_ip_api, 1);
                    populateUserObject();
                    return xhr.responseText;
                } else {
                    var timout = setTimeout(function () {
                        makeGetRequest(url, numberOfRuns, currentRun + 1);
                    }, 2000);
                }
            }
        };
    } else {
        _ut_ip_api = "{}";
        populateUserObject();
    }
}

function postRequest(method, url, endpoint, numberOfRuns, currentRun, data) {

    if (currentRun <= numberOfRuns) {
        var http_req = createRequestObject();
        url += endpoint;
        http_req.open(method, url, true);
        http_req.setRequestHeader("Content-Type", "application/json");
        http_req.setRequestHeader('Access-Control-Allow-Origin', '*');
        http_req.send(data);

        http_req.onreadystatechange = function () {
            if (http_req.readyState == 4) {
                if (http_req.status == 200) {
                    var res = JSON.parse(JSON.parse(JSON.stringify(http_req.responseText)));
                    if (res.error == false) {
                        setCookie("Cookie_GUID", res.responseMessage, 1);
                        _ut_GUID = res.responseMessage;

                        if (_ut_Parent_GUID == "0") {
                            setCookie("Cookie_Parent_Guide", res.responseMessage, 8760);
                            _ut_Parent_GUID = res.responseMessage;
                        }
                    } else {
                        var timout = setTimeout(function () {
                            postRequest(endpoint, numberOfRuns, currentRun + 1, data);
                        }, 2000);
                    }
                } else {
                    var timout = setTimeout(function () {
                        postRequest(endpoint, numberOfRuns, currentRun + 1, data);
                    }, 2000);
                }
            }
        };
    }
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

//---------------------------------------
//------     general functions     -----
//-------------------------------------
function getUrlParams(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

//-------------------------------------------------
//------     populate user obj functions     ----
//----------------------------------------------

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

