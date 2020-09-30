'use strict';

$(document).ready(function () {
	if (window.innerWidth > 600) {
		var services = document.querySelectorAll('.services-list-col');
		console.log(services);

		services.forEach(function (service) {
			var height = service.clientHeight;
			// console.log(height);
			var spans = Math.ceil(height / 10 + 1);
			console.log(spans);
			$(service).css({ gridRowEnd: 'span ' + (spans + 1) });
		});
	}
});

// window.addEventListener("resize", myFunction);

