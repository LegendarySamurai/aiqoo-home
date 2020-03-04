// Igor created 26 February 2020
const isMobile = window.innerWidth < 800;
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
const header = document.querySelector('.head-section');
// const headerSticky = document.querySelector('.header-sticky');
const headerSticky = $('.header-sticky').not('.header-visible');
let stickyHeaderHasBeenShown = false;
let headerClientRect = header.getBoundingClientRect();

const makeHeaderSticky = () => {
	if (window.pageYOffset >= headerClientRect.bottom) {
		headerSticky.classList.remove('is-hidden');
		headerSticky.classList.add('is-active');
		stickyHeaderHasBeenShown = true;
	}
	else if (window.pageYOffset < headerClientRect.bottom && stickyHeaderHasBeenShown) {
		headerSticky.classList.add('is-hidden');
	}
};

window.addEventListener('scroll', function () {
	if (isDesktop) {
		makeHeaderSticky();
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


if (isMobile) {
	showNavBar();
	hideNavBar();
}

