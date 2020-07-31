// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
// 	anchor.addEventListener('click', function (e) {
// 		e.preventDefault();
//
// 		document.querySelector(this.getAttribute('href')).scrollIntoView({
// 			behavior: 'smooth'
// 		});
// 	});
// });

$(window).on('load', function () {
	const aboutUs = $('#about-us');
	const ourProjects = $('#our-projects');
	const ourReviews = $('#our-reviews');
	const contentWrap = $('.content-wrap');

	let aboutUsTop = aboutUs.offset().top;
	let aboutUsHeight = aboutUs.innerHeight();
	let aboutUsBottom = aboutUsTop + aboutUsHeight;

	let ourProjectsTop = ourProjects.offset().top;
	let ourProjectsHeight = ourProjects.innerHeight();
	let ourProjectsBottom = ourProjectsTop + ourProjectsHeight;

	let ourReviewsTop = ourReviews.offset().top;
	let ourReviewsHeight = ourReviews.innerHeight();
	let ourReviewsBottom = ourReviewsTop + ourReviewsHeight;

	let contentWrapTop = contentWrap.offset().top;

	$(window).on('resize scroll', function () {
		let scroll = $(document).scrollTop();
		let positionOnPage = contentWrapTop + scroll;
		if (positionOnPage <= aboutUsBottom) {
			// console.log('1', 'About us block');
			$('#tab-a').addClass('active');
			$('#tab-b').removeClass('active');
			$('#tab-c').removeClass('active');
		}
		else if (positionOnPage > aboutUsBottom && positionOnPage <= ourProjectsBottom) {
			// console.log('2', 'Our Projects block');
			$('#tab-b').addClass('active');
			$('#tab-a').removeClass('active');
			$('#tab-c').removeClass('active');
		}
		else if (positionOnPage > ourProjectsBottom && positionOnPage <= ourReviewsBottom) {
			// console.log('3', 'Our Reviews block');
			$('#tab-c').addClass('active');
			$('#tab-b').removeClass('active');
			$('#tab-a').removeClass('active');
		}
	});

	$('.tab').each(function () {
		$(this).on('click', function () {
			let target = $(this).attr('href');
			console.log('target', target);
			$('body,html').animate(
				{
					scrollTop: $(target).offset().top - contentWrapTop,
					behavior: 'smooth'
				},
				800 //speed
			);

			$(this).addClass('active');
		});
	});

	// $('#tab-a').click(function() {
	// 	// $(window).scrollIntoView(aboutUsTop);
	// 	$("body,html").animate(
	// 		{
	// 			scrollTop: $(aboutUsTop)
	// 		},
	// 		800 //speed
	// 	);
	// });

	// $('#tab-b').click(function() {
	// 	// $(window).scrollIntoView(aboutUsTop);
	// 	$("body,html").animate(
	// 		{
	// 			scrollTop: $(ourProjectsTop)
	// 		},
	// 		800 //speed
	// 	);
	// });

	// $('#tab-c').click(function() {
	// 	// $(window).scrollIntoView(aboutUsTop);
	// 	$("body,html").animate(
	// 		{
	// 			scrollTop: $(ourReviewsTop)
	// 		},
	// 		800 //speed
	// 	);
	// });
});

