const pageHeader = document.querySelector('.header');
const findBox = document.querySelector('.home .find-box');
const findBoxRect = findBox.getBoundingClientRect();

window.addEventListener('scroll', () => {
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
});

