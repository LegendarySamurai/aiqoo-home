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
	const asideBlock = $('.aside-inner');

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
	let asideBlockTop = asideBlock.offset().top;

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


			if (window.innerWidth < 600) {
				console.log($(target).offset().top);
				$('body,html').animate(
					{
						scrollTop: $(target).offset().top - contentWrapTop + asideBlockTop + 500,
						behavior: 'smooth'
					},
					800 //speed
				);
			} else {
				$('.tab').removeClass('active');
				$(this).addClass('active');
				$('body,html').animate(
					{
						scrollTop: $(target).offset().top - contentWrapTop + 80,
						behavior: 'smooth'
					},
					800 //speed
				);
			}

		});
	});
});

// Calling LightGallery
// $(document).ready(function() {
// 	$("#hash").lightGallery({
// 		download: false,
// 		counter: false,
// 		hash: true,
// 		galleryId: 1
// });
// 	$("#hash2").lightGallery({
// 		download: false,
// 		counter: false,
// 		hash: true,
// 		galleryId: 2
// });
// });

// $('.project-card').each(function (index) {
// 	$('#' + this.id).lightGallery({
// 		share: false,
// 		galleryId: index
// 	});
// });
$(document).ready(function() {
	$('.project-card').lightGallery();
});



