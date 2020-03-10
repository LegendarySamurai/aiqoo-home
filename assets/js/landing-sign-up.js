const isMobile = window.innerWidth < 600;

const letsGoBtn = document.querySelector('.lets-go-btn');
const formWrapper = document.querySelector('.back-layer');
let popupVisible = false;


letsGoBtn.addEventListener('click', function() {

	if (isMobile) {
		formWrapper.classList.add('is-active');
		popupVisible = true;
	} else {
		formWrapper.classList.remove('is-active');
	}

});
