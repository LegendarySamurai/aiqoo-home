const btnOpenMenu = document.querySelector('#btn-open-menu');
const btnCloseMenu = document.querySelector('#btn-close-menu');
const mainMenuContainer = document.querySelector('#dropdown-menu-container');
const btnSearch = document.querySelector('#btn-search');
const search = document.querySelector('#btn-search');
const headerSearch = document.querySelector('#header-search');
const headerSearchInput = document.querySelector('#header-search-input');
const headerSuperPlaceholder = document.querySelector('#header-search .super-placeholder');
const headerFindBtn = document.querySelector('#header-search .find-btn');
// const dropdownMenuItems = document.querySelectorAll('.dropdown-menu-navbar-item');

// Dropdown menu
// dropdownMenuItems.forEach(item => {
// 	item.addEventListener('click', function() {
// 		this.classList.add('is-active');
// 	})
// });

// Opened menu
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

btnSearch.addEventListener('click', () => {
	if (!headerSearch.classList.contains('show')) {
		headerSearch.classList.add('show');
		headerSearchInput.focus();
	}
	else if (headerSearch.classList.contains('hide')) {
		headerSearch.classList.remove('hide');
	}
	else if (headerSearch.classList.contains('show')) {
		headerSearch.classList.add('hide');
	}
});

headerFindBtn.addEventListener('click', () => {
	headerSuperPlaceholder.classList.add('is-active');
});
