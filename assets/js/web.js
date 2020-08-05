console.log("main.js v=0.1");
document.addEventListener('readystatechange', function (event) {
	if (event.target.readyState === "complete") {
		init();
	}
});

var isMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	isMobile = true;
}

//-- Hide Menu In Main Page
const findBox = document.querySelector('.find-box-section .find-box');
const pageHeader = document.querySelector('.header');
const headerSearch = document.querySelector('#header-search');
const btnOpenMenu = document.querySelector('#btn-open-menu');
const btnCloseMenu = document.querySelector('#btn-close-menu');
const mainMenuContainer = document.querySelector('#dropdown-menu-container');
const btnSearch = document.querySelector('#btn-search');
const headerSearchInput = document.querySelector('#header-search-input');

function init() {

	/*
	//alert('Raleway 700');
	var Font = document.createElement('link');
	Font.rel = 'stylesheet';
	Font.href = 'https://fonts.googleapis.com/css?family=Raleway:700&display=swap';
	Font.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(Font);
	

	var Icons_load = setTimeout(function () {
		//alert('fontawesome');
		var Icons = document.createElement('link');
		Icons.rel = 'stylesheet';
		Icons.href = 'https://pro.fontawesome.com/releases/v5.11.2/css/all.css';
		Icons.type = 'text/css';
		//Icons.integrity = 'sha384-zrnmn8R8KkWl12rAZFt4yKjxplaDaT7/EUkKm7AovijfrQItFWR7O/JJn4DAa/gx';
		//Icons.crossorigin = 'anonymous';
		document.getElementsByTagName('head')[0].appendChild(Icons);
	}, 1500)
	*/


	if (window.location.href.toLowerCase().indexOf("/c/") > -1 || window.location.href.toLowerCase().indexOf("/g/") > -1 || window.location.href.toLowerCase().indexOf("/s/") > -1 || window.location.href.toLowerCase().indexOf("/p/") > -1) {
		var funnel_script_load = setTimeout(function () {
			var script = document.createElement('script');
			script.src = "assets/js/funnels_1.3.js";
			document.getElementsByTagName('head')[0].appendChild(script);
		}, 1100)
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


	var imgDefer = document.getElementsByTagName('img');
	for (var i = 0; i < imgDefer.length; i++) {
		if (imgDefer[i].getAttribute('data-src')) {
			imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
		}
	}


	//-------------------------------------
	//-------- handle Page Header ---------
	//---- Mobile Menu Event Listeners ----
	//-------------------------------------

	handlePageHeader();
	if (findBox != null) {
		window.addEventListener('scroll', () => {
			handlePageHeader();
		});
	}
	// handleSearchBox();
	if(headerSearch) {
		window.addEventListener('scroll', () => {
			handleSearchBox();
		})
	}

	btnOpenMenu.addEventListener('click', () => {
		mainMenuContainer.classList.remove('hide', 'd-none');
		mainMenuContainer.classList.add('show');
	});

	btnCloseMenu.addEventListener('click', () => {
		mainMenuContainer.classList.add('hide');

		setTimeout(() => {
			mainMenuContainer.classList.add('d-none');
		}, 600)
	});

	//---------------------------
	//------ AutoComplete -------
	//---- Find box / Header ----
	//---------------------------

	if (window.innerWidth <= 600) {

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
		function handleMobileAutoCompleteOpen() {
			$('.find-box').addClass('fixed');
			document.querySelector('body').style.overflow = 'hidden';
			$('#head-section-search-input').focus();
		}
		// Hide placeholder on input have val
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
			document.querySelector('body').style.overflow = 'unset';
			$('.header-search-input-cover').css("display", "block");
		});
		function handleHeaderMobileAutoCompleteOpen() {
			headerSearch.classList.add('hide');
			$('#header-search').addClass('fixed');
			headerSearch.classList.remove('hide-on-start');
			document.querySelector('body').style.overflow = 'hidden';
			$('.header-search-input-cover').css("display", "none");
			$('#header-search-input').focus();
		}
	}


}

function handlePageHeader() {
	if (findBox)
	{ 
		if (window.innerWidth >= 992) {
			const findBoxRect = findBox.getBoundingClientRect();

			if (window.pageYOffset >= findBoxRect.top) {
				if (!pageHeader.classList.contains('show-on-home')) {
					pageHeader.classList.add('show-on-home');
				}
				else if (pageHeader.classList.contains('hide-on-home')) {
					pageHeader.classList.remove('hide-on-home');
				}
			}
			else {
				if (pageHeader.classList.contains('show-on-home')) {
					pageHeader.classList.add('hide-on-home');
				}
			}
		}
	}
}
function handleSearchBox() {
	if (window.innerWidth < 600)
	{
		var isShow = false;
		if (findBox) {
			var rect = findBox.getBoundingClientRect();
			if (rect.bottom <= 0) { isShow = true; }
		}
		else {
			if (window.pageYOffset >= 250) { isShow = true; }
		}
		if (isShow)
		{
			headerSearch.classList.add('show');
			headerSearch.classList.remove('hide');
			headerSearch.classList.remove('hide-on-start');
		}
		else 
		{
			headerSearch.classList.add('hide');
			headerSearch.classList.remove('show');
		}
	}
}

function JoinNewsletter() {

	var email = document.getElementById("NewsletterEmail");
	var newsletterError = document.getElementById("NewsletterError")
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

		var url = "api/v1/Newsletter/setNewSubscribe/?websiteID=3"
		url = url + "&email=" + document.getElementById("NewsletterEmail").value;
		url = url + "&Rand=" + Math.random();

		var xhr = createHttpObject();
		xhr.open('post', url, true);
		xhr.send();
		xhr.onreadystatechange = function () {
			var _this = this;

			var newsletterError = document.getElementById("NewsletterError");
			if (xhr.readyState === 4) {
				if (xhr.status == 200) {
					if (xhr.responseText == "true") {
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
		};

	}
	else
	{
		reloadon(NewsletterBtn);
		reloadoff(NewsletterBtnSpinner);
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

		var url = "api/v1/ContactUs/setNewRequest/?websiteID=3"
		url = url + "&fullName=" + form.cu_fullName.value;
		url = url + "&phone=" + form.cu_phone.value;
		url = url + "&email=" + form.cu_email.value;
		url = url + "&whoAreYou=" + form.cu_whoAreYou.value;
		url = url + "&details=" + form.cu_details.value;
		url = url + "&Rand=" + Math.random();

		var xhr = createHttpObject();
		xhr.open('post', url, true);
		xhr.send();
		xhr.onreadystatechange = function () {
			var _this = this;
			if (xhr.readyState === 4) {
				if (xhr.status == 200) {
					if (xhr.responseText == "true") {
						reloadoff(cu_form_div);
						reloadon(cu_success);
						document.body.scrollTop = 0; // For Safari
						document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
					} else {
						alert('Oops, something went wrong, try again');
					}
				}
			}
		};
	}
	else {
		reloadon(cu_btn);
		reloadoff(cu_btnSpinner);
	}

	return false;

}

function validatePhone(Phone) {
	var phonePattern = /(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/;
	var error = "";
	if (Phone.value == "" || Phone.value == null) {
		error = "Should not be empty.";
	} else if ((Phone.value.length < 10)) {
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
function createHttpObject() { var hr; if (window.XMLHttpRequest) { try { hr = new XMLHttpRequest(); } catch (e) { hr = false; } } else if (window.ActiveXObject) { try { hr = new ActiveXObject("Msxml2.HTMLHTTP"); } catch (e) { try { hr = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) { hr = false; } } } return hr; }
