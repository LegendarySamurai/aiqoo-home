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
let headerClientRect = header.getBoundingClientRect();
header.classList.remove('sticky');

const makeHeaderSticky = () => {
	if (window.pageYOffset >= headerClientRect.bottom) {
		header.classList.add('sticky');
		headerClientRect = header.getBoundingClientRect();

	}
	else if (window.pageYOffset < headerClientRect.bottom) {
		header.classList.remove('sticky');
		headerClientRect = header.getBoundingClientRect();
	}
};

window.addEventListener('scroll', function () {
	makeHeaderSticky();
});
