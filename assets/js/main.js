// Igor created 26 February 2020
const isMobile = window.innerWidth < 992;
const isDesktop = window.innerWidth >= 992;

// EOL: Igor created 26 February 2020

(function () {
	var CallToActionText = document.getElementById('CallToActionText');
	if (CallToActionText) {
		window.onscroll = function (e) {
			var scrollPosition = window.pageYOffset;
			if (scrollPosition > 500) {
				CallToActionText.classList.add('float');
			}
		}
	}
})();


// Igor created 23 February 2020
const headSection = document.querySelector('.head-section');
// const headerSticky = document.querySelector('.header-sticky');
const headerStickyHome = document.querySelector('.header-home');
// const headerStickyLanding = document.querySelector('.header-landing');
// const headerSticky = $('.header-sticky').not('.header-visible');
let stickyHeaderHasBeenShown = false;
let headerClientRect = headSection.getBoundingClientRect();

const makeHeaderStickyHome = () => {
	if (window.pageYOffset >= headerClientRect.bottom) {
		headerStickyHome.classList.remove('is-hidden');
		headerStickyHome.classList.add('is-active');
		stickyHeaderHasBeenShown = true;
	}
	else if (window.pageYOffset < headerClientRect.bottom && stickyHeaderHasBeenShown) {
		headerStickyHome.classList.add('is-hidden');
	}
};

// const makeHeaderStickyLanding = () => {
// 	if (window.pageYOffset >= headerClientRect.bottom) {
// 		headerStickyLanding.classList.remove('is-hidden');
// 		headerStickyLanding.classList.add('is-active');
// 		stickyHeaderHasBeenShown = true;
// 	}
// 	else if (window.pageYOffset < headerClientRect.bottom && stickyHeaderHasBeenShown) {
// 		headerStickyLanding.classList.add('is-hidden');
// 	}
// };

// window.addEventListener('scroll', function () {
// 	makeHeaderStickyLanding();
// });

window.addEventListener('scroll', function () {
	if (isDesktop) {
		makeHeaderStickyHome();
	}
});

// Navbar mobile
const navBarShowBtn = document.querySelector('#show-navbar');
const navBarHideBtn = document.querySelector('#hide-navbar');
const navBarCollapseBody = document.querySelector('#navbar');
let havBarOpened = false;
navBarHideBtn.classList.add('d-none');

const showNavBar = () => {
	navBarShowBtn.addEventListener('click', function() {
		navBarCollapseBody.classList.remove('navbar-hide');
		navBarCollapseBody.classList.add('navbar-active');
		navBarHideBtn.classList.remove('d-none');
		navBarHideBtn.classList.add('d-block');
		havBarOpened = true;
	});
};

const hideNavBar = () => {
	navBarHideBtn.addEventListener('click', function() {
		navBarCollapseBody.classList.remove('navbar-active');
		navBarCollapseBody.classList.add('navbar-hide');
		navBarHideBtn.classList.add('d-none');
	});
};


if (isMobile) {
	showNavBar();
	hideNavBar();
}


// slick
$('.slick-container').slick({
	rows: 0,
	arrows: false,
	dots: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	infinite: false,
	variableWidth: true,
});

