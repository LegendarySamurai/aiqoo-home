const isMobile = window.innerWidth <= 599;
const isDesktop = window.innerWidth >=600;

const pageHeader = document.querySelector('.header');
const findBox = document.querySelector('.home .find-box');
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

const zipCodePlaceholders = document.querySelectorAll('.zip-super-placeholder-heading');
const mainPlaceholderHeadings = document.querySelectorAll('.main-super-placeholder-heading');
const findProBtns = document.querySelectorAll('.find-btn');
const backLayer = document.querySelector('.back-layer');
const inputPlaceholder = document.querySelector('.find-box .form-control');
let headerInputPlaceholder = document.getElementById('header-search-input');
let headSectionInputPlaceholder = document.getElementById('head-section-search-input');

const desktopInputPlaceholder = document.querySelector('.super-placeholder .zip-super-placeholder-heading');
const mobileInputPlaceholder = document.querySelector('.find-box .zip-super-placeholder-heading');

// const findBox = document.querySelector('.find-box');

let findProBtnClicked = false;

findProBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		backLayer.classList.add('is-active');

		mainPlaceholderHeadings.forEach(mainPlaceholder => {
			mainPlaceholder.classList.add('is-hidden');
			mainPlaceholder.classList.remove('is-active');
		});

		zipCodePlaceholders.forEach(placeholder => {
			placeholder.classList.add('is-active');
			placeholder.classList.remove('is-hidden');
		});

		inputPlaceholder.classList.add('is-hidden');
		headerInputPlaceholder.placeholder = 'Enter your zip code.';
		headSectionInputPlaceholder.placeholder = 'Enter your zip code.';

		findProBtnClicked = true;
		document.querySelector('body').style.overflow= 'hidden';

		if (isMobile) {
			desktopInputPlaceholder.classList.remove('is-active');
			desktopInputPlaceholder.classList.add('is-hidden');
			findBox.classList.add('is-active');
		}

		if (isDesktop) {
			mobileInputPlaceholder.classList.remove('is-active');
			mobileInputPlaceholder.classList.add('is-hidden');
			findBox.classList.add('is-active');
		}
		// console.log('=> Works');
	});
});


