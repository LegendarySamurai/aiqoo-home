$(document).ready(function() {
	const services = document.querySelectorAll('.services-list-col');
	console.log(services);

	services.forEach(service => {
		const height = service.clientHeight;
		// console.log(height);
		const spans = Math.ceil(height / 10 + 1);
		console.log(spans);
		$(service).css({gridRowEnd: `span ${ spans+ 1}`});
	});
});
