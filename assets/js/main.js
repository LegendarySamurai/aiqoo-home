// Igor created 26 February 2020
const isMobile = window.innerWidth < 600;
const isDesktop = window.innerWidth >= 1200;

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
const header = document.querySelector('.header');
const headerSticky = document.querySelector('.header-sticky');
let stickyHeaderHasBeenShown = false;
let headerClientRect = header.getBoundingClientRect();

const makeHeaderSticky = () => {
	console.log('=>1', headerClientRect.bottom, window.pageYOffset );
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
	makeHeaderSticky();
});
