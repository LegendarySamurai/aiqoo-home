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
		}, 1500000) //todo chage after test in lighthouse

	// }
}


//-- Hide Menu In Main Page
const findBox = document.querySelector('.home .find-box');
const pageHeader = document.querySelector('.header.is-hidden-on-home');

function handlePageHeader () {

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

window.addEventListener("load", function () {
	handlePageHeader();

	if (findBox != null) {
		window.addEventListener('scroll', () => {
			handlePageHeader();
			// if (window.innerWidth >= 992) {
			// 	if (window.pageYOffset >= findBoxRect.top) {
			// 		if (!pageHeader.classList.contains('show-on-home')) {
			// 			pageHeader.classList.add('show-on-home');
			// 		}
			// 		else if (pageHeader.classList.contains('hide-on-home')) {
			// 			pageHeader.classList.remove('hide-on-home');
			// 		}
			// 	}
			// 	else {
			// 		if (pageHeader.classList.contains('show-on-home')) {
			// 			pageHeader.classList.add('hide-on-home');
			// 		}
			// 	}
			// }
		});

	}

});


//-- Mobile Menu Event Listeners
const btnOpenMenu = document.querySelector('#btn-open-menu');
const btnCloseMenu = document.querySelector('#btn-close-menu');
const mainMenuContainer = document.querySelector('#dropdown-menu-container');
const btnSearch = document.querySelector('#btn-search');
const search = document.querySelector('#btn-search');
const headerSearch = document.querySelector('#header-search');
const headerSearchInput = document.querySelector('#header-search-input');

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

btnSearch.addEventListener('click', () => {
	if (!headerSearch.classList.contains('show')) {
		headerSearch.classList.add('show');
		headerSearchInput.focus();
	}
	else if (headerSearch.classList.contains('hide')) {
		headerSearch.classList.remove('hide');
	}
	else if (headerSearch.classList.contains('show')) {
		headerSearch.classList.add('hide');
	}
});


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

		url = "api/v1/Newsletter/setNewSubscribe/?websiteID=3"
		url = url + "&email=" + document.getElementById("NewsletterEmail").value;
		url = url + "&Rand=" + Math.random();

		http = createHttpObject();
		http.open('post', url, true);
		http.onreadystatechange = NewsletterResponse;
		http.send(null);
	}
	else
	{
		reloadon(NewsletterBtn);
		reloadoff(NewsletterBtnSpinner);
	}

	
}

function NewsletterResponse() {
	var newsletterError = document.getElementById("NewsletterError")
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

		url = "api/v1/ContactUs/setNewRequest/?websiteID=3"
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
	}
	else {
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


// code written 17-06-2020 by Igor
// Landing page Section search-pro Image size and map size (always should be 3 cards height)
// function countMapHeight () {
// 	const proCards = document.querySelectorAll('.pro-card');
// 	const mapCol = document.querySelector('.map-col');
//
// 	proCards.forEach(proCard => {
// 		let proCardHeight = proCard.clientHeight;
// 		let mapMaxHeight = proCardHeight * 3;
// 		mapCol.style.maxHeight = `calc(${mapMaxHeight}px + 2rem + 2rem + 2rem)`;
// 	})
// }
//
// window.addEventListener('resize',  function() {
// 	const imageContainers = document.querySelectorAll('.image-container');
//
// 	imageContainers.forEach(imageContainer => {
// 		let imageContainerHeight = (imageContainer.clientWidth) / 2;
//
// 		if (window.innerWidth < 767) {
// 			imageContainer.style.height = `${ imageContainerHeight  }px`;
// 			imageContainer.style.width = "100" + "%";
// 		}
//
// 		if (window.innerWidth >= 768) {
// 			imageContainer.style.height = '150' + 'px';
// 			imageContainer.style.width = '200' + 'px';
// 		}
// 	});
//
// 	countMapHeight();
// });
//
// $(document).ready(function() {
// 	countMapHeight();
// });
