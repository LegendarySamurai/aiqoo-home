
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
});

$(window).on('resize scroll', function() {
	// console.log('999999999');

	$('.section-content-b').each(function() {
		let elementTop = $(this).offset().top;
		// let elementBottom = $(window).height() - $(this).height();
		// elementBottom = elementTop - elementBottom;
		// console.log('1', this , elementTop);
		// console.log('2',this,  elementBottom);

		let elementHeight = $(this).innerHeight();
		// console.log('=>', elementHeight);

		let viewportTop = $(window).scrollTop();
		// console.log('2', viewportTop);

		let viewportBottom = viewportTop + $(window).height();
		// console.log('3', viewportBottom);
		if(window.outerHeight > (elementTop + elementHeight)) {
			console.log('1', elementTop);
			console.log('2', elementHeight);
			console.log('3', window.outerHeight);
			console.log(window.outerHeight > (elementTop + elementHeight));
		}

		// let positionOne = $('.about-us').getBoundingClientRect();
		// console.log('a', $('.about-us').getClientRects);

		// let elementBottom = viewportTop
	});
	// let elementOne = $('#a');
	// let topOne = elementOne.offset().top;
	// let bottomOne = elementOne.offset().bottom;
	// console.log('a', topOne && bottomOne);
});

// $.fn.isInViewport = function() {
// 	var elementTop = $(this).offset().top;
// 	var elementBottom = elementTop + $(this).outerHeight();
//
// 	var viewportTop = $(window).scrollTop() - 500;
// 	console.log();
// 	var viewportBottom = viewportTop + $(window).height();
//
// 	return elementBottom > viewportTop && elementTop < viewportBottom;
// };

// $(window).on('resize scroll', function() {
// 	$('.section-content-b').each(function() {
// 		var activeTab = $(this).attr('id');
// 		console.log('1', activeTab);
// 		if ($(this).isInViewport()) {
// 			$('#tab-' + activeTab).addClass(activeTab + '-active');
// 		} else {
// 			$('#tab-' + activeTab).removeClass(activeTab + '-active');
// 		}
// 	});
// });
