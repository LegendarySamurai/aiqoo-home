"use strict";

console.log("main.js v=0.1");
document.addEventListener('readystatechange', function (event) {
	if (event.target.readyState === "complete") {
		init();
	}
});

function init() {

	var imgDefer = document.getElementsByTagName('img');
	for (var i = 0; i < imgDefer.length; i++) {
		if (imgDefer[i].getAttribute('data-src')) {
			imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
		}
	}

	var Icons = document.createElement('link');
	Icons.rel = 'stylesheet';
	Icons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
	Icons.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(Icons);

	// if (window.location.href.toLowerCase().indexOf("lp/") > -1) {
	var funnel_script_load = setTimeout(function () {
		var script = document.createElement('script');
		script.src = "assets/js/funnels_0.1.js?v=0.01";
		document.getElementsByTagName('head')[0].appendChild(script);
	}, 1500000); //todo chage after test in lighthouse

	// }
}

//-- Hide Menu In Main Page
window.addEventListener("load", function () {

	var pageHeader = document.querySelector('.header');
	var findBox = document.querySelector('.home .find-box');
	if (findBox != null) {
		(function () {
			var findBoxRect = findBox.getBoundingClientRect();
			window.addEventListener('scroll', function () {
				if (window.innerWidth >= 992) {
					if (window.scrollY >= findBoxRect.top) {
						if (!pageHeader.classList.contains('show-on-home')) {
							pageHeader.classList.add('show-on-home');
						} else if (pageHeader.classList.contains('hide-on-home')) {
							pageHeader.classList.remove('hide-on-home');
						}
					} else {
						if (pageHeader.classList.contains('show-on-home')) {
							pageHeader.classList.add('hide-on-home');
						}
					}
				}
			});
		})();
	}
});

//-- Mobile Menu Event Listeners
var btnOpenMenu = document.querySelector('#btn-open-menu');
var btnCloseMenu = document.querySelector('#btn-close-menu');
var mainMenuContainer = document.querySelector('#dropdown-menu-container');
var btnSearch = document.querySelector('#btn-search');
var search = document.querySelector('#btn-search');
var headerSearch = document.querySelector('#header-search');
var headerSearchInput = document.querySelector('#header-search-input');

btnOpenMenu.addEventListener('click', function () {
	mainMenuContainer.classList.remove('hide', 'd-none');
	mainMenuContainer.classList.add('show');
});

btnCloseMenu.addEventListener('click', function () {
	mainMenuContainer.classList.add('hide');

	setTimeout(function () {
		mainMenuContainer.classList.add('d-none');
	}, 600);
});

btnSearch.addEventListener('click', function () {
	if (!headerSearch.classList.contains('show')) {
		headerSearch.classList.add('show');
		headerSearchInput.focus();
	} else if (headerSearch.classList.contains('hide')) {
		headerSearch.classList.remove('hide');
	} else if (headerSearch.classList.contains('show')) {
		headerSearch.classList.add('hide');
	}
});

