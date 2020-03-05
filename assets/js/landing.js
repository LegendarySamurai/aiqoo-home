// Igor created 5th March 2020
const headSection = document.querySelector('.head-section');
const headerStickyLanding = document.querySelector('.header-landing');
let stickyHeaderHasBeenShown = false;
let headerClientRect = headSection.getBoundingClientRect();

const makeHeaderStickyLanding = () => {
	if (window.pageYOffset >= headerClientRect.bottom) {
		headerStickyLanding.classList.remove('is-hidden');
		headerStickyLanding.classList.add('is-active');
		stickyHeaderHasBeenShown = true;
	}
	else if (window.pageYOffset < headerClientRect.bottom && stickyHeaderHasBeenShown) {
		headerStickyLanding.classList.add('is-hidden');
	}
};

window.addEventListener('scroll', function () {
	makeHeaderStickyLanding();
});

