// Igor created 5th March 2020
const headSectionLanding = document.querySelector('.head-section');
const headerStickyLanding = document.querySelector('.header-landing');
let stickyHeaderLandingHasBeenShown = false;
let headerClientRectLanding = headSectionLanding.getBoundingClientRect();

const makeHeaderStickyLanding = () => {
	// console.log('=>', headerClientRectLanding.bottom, window.pageYOffset);
	if (window.pageYOffset >= headerClientRectLanding.bottom) {
		headerStickyLanding.classList.remove('is-hidden');
		headerStickyLanding.classList.add('is-active');
		stickyHeaderLandingHasBeenShown = true;
	}
	else if (window.pageYOffset < headerClientRectLanding.bottom && stickyHeaderLandingHasBeenShown) {
		headerStickyLanding.classList.add('is-hidden');
	}
};

window.addEventListener('scroll', function () {
	makeHeaderStickyLanding();
});

