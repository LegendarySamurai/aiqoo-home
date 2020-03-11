const isMobile = window.innerWidth < 767;

const letsGoBtn = document.querySelector('.lets-go-btn');
const formWrapper = document.querySelector('.back-layer');
const inner = document.querySelector('.inner');
const body = document.querySelector('body');
let popupVisible = false;


letsGoBtn.addEventListener('click', function() {
	if (isMobile) {
		formWrapper.classList.add('is-active');
		body.classList.add('blocked');
		popupVisible = true;
	} else {
		formWrapper.classList.remove('is-active');
		body.classList.remove('blocked');
	}
});

inner.addEventListener('click', () => {
	formWrapper.classList.remove('is-active');
	body.classList.remove('blocked');
});

const qualityCards = document.querySelectorAll('.quality-card');
const scaledUpCard = document.querySelector('#carousel__slide2');
let cardScaledUp = true;

qualityCards.forEach(card => {
	card.addEventListener('mouseover', () =>{
		qualityCards.forEach(item => {
			item.classList.remove('scaled-up');
		});
		cardScaledUp = false;
	});
	card.addEventListener('mouseout', () => {
		scaledUpCard.classList.add('scaled-up');
	});
});


const carouselItems = document.querySelectorAll('.carousel__navigation-button');
let carouselButtonClicked= false;

carouselItems.forEach(item => {

	item.addEventListener('click', (e) => {
		carouselItems.forEach(item => {
			item.classList.remove('is-clicked');
		});
		e.target.classList.add('is-clicked');
		carouselButtonClicked = true;
	});
});
