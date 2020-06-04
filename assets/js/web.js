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
window.addEventListener("load", function () {

	const pageHeader = document.querySelector('.header');
	const findBox = document.querySelector('.home .find-box');
	if (findBox != null) {
		const findBoxRect = findBox.getBoundingClientRect();
		window.addEventListener('scroll', () => {
			if (window.innerWidth >= 992) {
				if (window.scrollY >= findBoxRect.top) {
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