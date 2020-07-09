﻿"use strict";

console.log("main.js v=0.1");
document.addEventListener('readystatechange', function (event) {
	if (event.target.readyState === "complete") {
		init();
	}
});

//-- Hide Menu In Main Page
var findBox = document.querySelector('.home .find-box');
var pageHeader = document.querySelector('.header');
var headerSearch = document.querySelector('#header-search');
var btnOpenMenu = document.querySelector('#btn-open-menu');
var btnCloseMenu = document.querySelector('#btn-close-menu');
var mainMenuContainer = document.querySelector('#dropdown-menu-container');
var btnSearch = document.querySelector('#btn-search');
var headerSearchInput = document.querySelector('#header-search-input');

function init() {

	/*
 var imgDefer = document.getElementsByTagName('img');
 for (var i = 0; i < imgDefer.length; i++) {
 	if (imgDefer[i].getAttribute('data-src')) {
 		imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
 	}
 }
 */

	/*
 //alert('Raleway 700');
 var Font = document.createElement('link');
 Font.rel = 'stylesheet';
 Font.href = 'https://fonts.googleapis.com/css?family=Raleway:700&display=swap';
 Font.type = 'text/css';
 document.getElementsByTagName('head')[0].appendChild(Font);
 */

	//--
	var Icons_load = setTimeout(function () {
		//alert('fontawesome');
		var Icons = document.createElement('link');
		Icons.rel = 'stylesheet';
		Icons.href = 'https://pro.fontawesome.com/releases/v5.11.2/css/all.css';
		Icons.type = 'text/css';
		//Icons.integrity = 'sha384-zrnmn8R8KkWl12rAZFt4yKjxplaDaT7/EUkKm7AovijfrQItFWR7O/JJn4DAa/gx';
		//Icons.crossorigin = 'anonymous';
		document.getElementsByTagName('head')[0].appendChild(Icons);
	}, 1500);

	if (window.location.href.toLowerCase().indexOf("/c/") > -1) {
		var funnel_script_load = setTimeout(function () {
			var script = document.createElement('script');
			script.src = "assets/js/funnels_0.8.js";
			document.getElementsByTagName('head')[0].appendChild(script);
		}, 1100);
	}

	/*
 var Font_load = setTimeout(function () {
 	//alert('Raleway');
 	var Font = document.createElement('link');
 	Font.rel = 'stylesheet';
 	Font.href = 'https://fonts.googleapis.com/css?family=Raleway:400,500,600&display=swap';
 	Font.type = 'text/css';
 	document.getElementsByTagName('head')[0].appendChild(Font);
 }, 1200)
 */

	//-------------------------------------
	//-------- handle Page Header ---------
	//---- Mobile Menu Event Listeners ----
	//-------------------------------------

	handlePageHeader();
	if (findBox != null) {
		window.addEventListener('scroll', function () {
			handlePageHeader();
		});
	}

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

	//---------------------------
	//------ AutoComplete -------
	//---- Find box / Header ----
	//---------------------------

	if (window.innerWidth <= 600) {
		(function () {
			var handleMobileAutoCompleteOpen = function handleMobileAutoCompleteOpen() {
				$('.find-box').addClass('fixed');
				document.querySelector('body').style.overflow = 'hidden';
				$('#head-section-search-input').focus();
			}
			// Hide placeholder on input have val
			;

			var handleHeaderMobileAutoCompleteOpen = function handleHeaderMobileAutoCompleteOpen() {
				headerSearch.classList.remove('show');
				headerSearch.classList.add('hide');
				$('#header-search').addClass('fixed');
				document.querySelector('body').style.overflow = 'hidden';
				$('.header-search-input-cover').css("display", "none");
				$('#header-search-input').focus();
			};

			// Main Page AutoComplete
			$('#head-section-search-input').click(function () {
				handleMobileAutoCompleteOpen();
				$('#head-section-search-input').focus();
			});
			$('.head-section .find-btn').click(function () {
				handleMobileAutoCompleteOpen();
				$('#head-section-search-input').focus();
			});
			$('.return-button').click(function () {
				$('.find-box').removeClass('fixed');
				document.querySelector('body').style.overflow = 'unset';
			});
			$('#head-section-search-input').blur(function () {
				if (window.innerWidth <= 600) {
					if (this.value.length < 1) {
						$('.find-box .main-super-placeholder-heading').css("display", "block");
					} else {
						$('.find-box .main-super-placeholder-heading').css("display", "none");
					}
				}
			});

			// Header AutoComplete
			$('.btn-search').click(function () {
				handleHeaderMobileAutoCompleteOpen();
			});
			$('.header .find-btn').click(function () {
				handleHeaderMobileAutoCompleteOpen();
			});
			$('.header-search-input-cover').click(function () {
				handleHeaderMobileAutoCompleteOpen();
			});
			$('.return-button-header').click(function () {
				$('#header-search').removeClass('fixed');
				headerSearch.classList.remove('hide');
				headerSearch.classList.add('show');
				document.querySelector('body').style.overflow = 'unset';
				$('.header-search-input-cover').css("display", "block");
			});
		})();
	}
}

function handlePageHeader() {
	if (findBox) {
		if (window.innerWidth >= 992) {
			var findBoxRect = findBox.getBoundingClientRect();

			if (window.pageYOffset >= findBoxRect.top) {
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
	}
}

function JoinNewsletter() {

	var email = document.getElementById("NewsletterEmail");
	var newsletterError = document.getElementById("NewsletterError");
	var errorCount = 0;

	reloadoff(NewsletterError);
	reloadoff(NewsletterBtn);
	reloadon(NewsletterBtnSpinner);

	if (validateEmail(email.value) == false) {
		newsletterError.innerHTML = 'Please enter valid email address';
		reloadon(NewsletterError);
		email.focus();
		errorCount++;
	} else {
		reloadoff(NewsletterError);
	}

	if (errorCount == 0) {

		url = "api/v1/Newsletter/setNewSubscribe/?websiteID=3";
		url = url + "&email=" + document.getElementById("NewsletterEmail").value;
		url = url + "&Rand=" + Math.random();

		http = createHttpObject();
		http.open('post', url, true);
		http.onreadystatechange = NewsletterResponse;
		http.send(null);
	} else {
		reloadon(NewsletterBtn);
		reloadoff(NewsletterBtnSpinner);
	}
}

function NewsletterResponse() {
	var newsletterError = document.getElementById("NewsletterError");
	if (http.readyState == 4) {
		if (http.responseText == "true") {
			reloadoff(NewsletterForm);
			reloadon(NewsletterThank);
		} else {
			newsletterError.innerHTML = 'Oops, something went wrong, try again.';
			reloadon(NewsletterError);
			reloadon(NewsletterBtn);
			reloadoff(NewsletterBtnSpinner);
			email.focus();
		}
	}
}

function ContactUsRequest() {

	var form = document.getElementById("cu_form");
	var errorCount = 0;

	reloadon(cu_btnSpinner);
	reloadoff(cu_btn);
	reloadoff(cu_fullName_error);
	reloadoff(cu_phone_error);
	reloadoff(cu_email_error);

	if (form.cu_fullName.value == "" || form.cu_fullName.value == null) {
		document.getElementById("cu_fullName_error").innerHTML = 'Please enter your full name';
		reloadon(cu_fullName_error);
		form.cu_fullName.focus();
		errorCount++;
	} else {
		reloadoff(cu_fullName_error);
	}

	var resMsg = validatePhone(form.cu_phone);
	if (resMsg != "NoError") {
		document.getElementById("cu_phone_error").innerHTML = resMsg;
		reloadon(cu_phone_error);
		form.cu_phone.focus();
		errorCount++;
	} else {
		reloadoff(cu_phone_error);
	}

	if (form.cu_whoAreYou.value == "" || form.cu_whoAreYou.value == null) {
		document.getElementById("cu_whoAreYou_error").innerHTML = 'Please select what best describes you';
		reloadon(cu_whoAreYou_error);
		form.cu_whoAreYou.focus();
		errorCount++;
	} else {
		reloadoff(cu_whoAreYou_error);
	}

	if (validateEmail(form.cu_email.value) == false) {
		document.getElementById("cu_email_error").innerHTML = 'Please enter valid email address';
		reloadon(cu_email_error);
		form.cu_email.focus();
		errorCount++;
	} else {
		reloadoff(cu_email_error);
	}

	if (errorCount == 0) {

		url = "api/v1/ContactUs/setNewRequest/?websiteID=3";
		url = url + "&fullName=" + form.cu_fullName.value;
		url = url + "&phone=" + form.cu_phone.value;
		url = url + "&email=" + form.cu_email.value;
		url = url + "&whoAreYou=" + form.cu_whoAreYou.value;
		url = url + "&details=" + form.cu_details.value;
		url = url + "&Rand=" + Math.random();

		http = createHttpObject();
		http.open('post', url, true);
		http.onreadystatechange = ContactUsResponse;
		http.send(null);
	} else {
		reloadon(cu_btn);
		reloadoff(cu_btnSpinner);
	}

	return false;
}

function ContactUsResponse() {
	if (http.readyState == 4) {
		if (http.responseText == "true") {
			reloadoff(cu_form_div);
			reloadon(cu_success);
		} else {
			alert('Oops, something went wrong, try again');
		}
	}
}

function validatePhone(Phone) {
	var phonePattern = /(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/;

	if (Phone.value == "" || Phone.value == null) {
		error = "Should not be empty.";
	} else if (Phone.value.length < 10) {
		error = "Should not be less than 10 digits";
	} else if (!Phone.value.match(phonePattern)) {
		error = "Invalid Number Please re-enter using valid 10 digit number";
	} else {
		error = "NoError";
	}

	return error;
}

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function reloadon(c) {
	c.style.display = "";
}
function reloadoff(c) {
	c.style.display = "none";
}
function createHttpObject() {
	var hr;if (window.XMLHttpRequest) {
		try {
			hr = new XMLHttpRequest();
		} catch (e) {
			hr = false;
		}
	} else if (window.ActiveXObject) {
		try {
			hr = new ActiveXObject("Msxml2.HTMLHTTP");
		} catch (e) {
			try {
				hr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				hr = false;
			}
		}
	}return hr;
}
