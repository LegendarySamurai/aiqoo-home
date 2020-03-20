const btnOpenMenu = document.querySelector('#btn-open-menu');
const btnCloseMenu = document.querySelector('#btn-close-menu');
const mainMenuContainer = document.querySelector('#dropdown-menu-container');

btnOpenMenu.addEventListener('click', () => {
	mainMenuContainer.classList.remove('hide', 'd-none');
	mainMenuContainer.classList.add('show');
});

btnCloseMenu.addEventListener('click', () => {
	mainMenuContainer.classList.add('hide');

	setTimeout(() => {
		mainMenuContainer.classList.add('d-none');
	}, 600)
});
