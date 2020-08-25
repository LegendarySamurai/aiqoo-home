// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
// 	anchor.addEventListener('click', function (e) {
// 		e.preventDefault();
//
// 		document.querySelector(this.getAttribute('href')).scrollIntoView({
// 			behavior: 'smooth'
// 		});
// 	});
// });

'use strict';

$(window).on('load', function () {
	var aboutUs = $('#about-us');
	var ourProjects = $('#our-projects');
	var ourReviews = $('#our-reviews');
	var contentWrap = $('.content-wrap');
	var asideBlock = $('.aside-inner');

	var scroll = $(document).scrollTop();

	var aboutUsTop = undefined,
	    aboutUsHeight = undefined,
	    aboutUsBottom = undefined;
	if (aboutUs.length !== 0) {
		aboutUsTop = aboutUs.offset().top;
		aboutUsHeight = aboutUs.innerHeight();
		aboutUsBottom = aboutUsTop + aboutUsHeight;
	}

	var ourProjectsTop = undefined,
	    ourProjectsHeight = undefined,
	    ourProjectsBottom = undefined;
	if (ourProjects.length !== 0) {
		ourProjectsTop = ourProjects.offset().top;
		ourProjectsHeight = ourProjects.innerHeight();
		ourProjectsBottom = ourProjectsTop + ourProjectsHeight;
	}

	var ourReviewsTop = undefined,
	    ourReviewsHeight = undefined,
	    ourReviewsBottom = undefined;
	if (ourReviews.length !== 0) {
		ourReviewsTop = ourReviews.offset().top;
		ourReviewsHeight = ourReviews.innerHeight();
		ourReviewsBottom = ourReviewsTop + ourReviewsHeight;
	};

	var asideBlockTop = undefined;
	if (asideBlock.length !== 0) {
		asideBlockTop = asideBlock.offset().top;
	}

	var contentWrapTop = undefined;
	if (contentWrap.length !== 0) {
		contentWrapTop = contentWrap.offset().top;
		var _positionOnPage = contentWrapTop + scroll;
	}

	$(window).on('resize scroll', function () {
		scroll = $(document).scrollTop();

		if (aboutUs.length !== 0) {
			var _aboutUsTop = aboutUs.offset().top;
			var _aboutUsHeight = aboutUs.innerHeight();
			var _aboutUsBottom = _aboutUsTop + _aboutUsHeight;
		}

		if (ourProjects.length !== 0) {
			var _ourProjectsTop = ourProjects.offset().top;
			var _ourProjectsHeight = ourProjects.innerHeight();
			var _ourProjectsBottom = _ourProjectsTop + _ourProjectsHeight;
		}

		if (ourReviews.length !== 0) {
			var _ourReviewsTop = ourReviews.offset().top;
			var _ourReviewsHeight = ourReviews.innerHeight();
			var _ourReviewsBottom = _ourReviewsTop + _ourReviewsHeight;
		};

		if (asideBlock.length !== 0) {
			var _asideBlockTop = asideBlock.offset().top;
		}

		if (contentWrap.length !== 0) {
			var _contentWrapTop = contentWrap.offset().top;
			positionOnPage = _contentWrapTop + scroll;
		}

		// handling active section on scroll
		if (positionOnPage <= aboutUsBottom) {
			// console.log('1', 'About us block');
			$('#tab-a').addClass('active');
			$('#tab-b').removeClass('active');
			$('#tab-c').removeClass('active');
		} else if (positionOnPage > aboutUsBottom && positionOnPage <= ourProjectsBottom) {
			// console.log('2', 'Our Projects block');
			$('#tab-b').addClass('active');
			$('#tab-a').removeClass('active');
			$('#tab-c').removeClass('active');
		} else if (positionOnPage > ourProjectsBottom && positionOnPage <= ourReviewsBottom) {
			// console.log('3', 'Our Reviews block');
			$('#tab-c').addClass('active');
			$('#tab-b').removeClass('active');
			$('#tab-a').removeClass('active');
		}
	});

	// handling active section on click
	$('.tab').each(function () {
		$(this).on('click', function (e) {
			e.preventDefault();
			var target = $(this).attr('href');
			// console.log('target', target);

			if (!contentWrap || !asideBlock) {
				return;
			}

			if (window.innerWidth < 600) {
				// console.log($(target).offset().top);

				$('body,html').animate({
					scrollTop: $(target).offset().top - contentWrapTop + asideBlockTop + 500,
					behavior: 'smooth'
				}, 800 //speed
				);
			} else {
					if ($(target).length !== 0) {
						$('.tab').removeClass('active');
						$(this).addClass('active');
						$('body,html').animate({
							scrollTop: $(target).offset().top - contentWrapTop + 80,
							behavior: 'smooth'
						}, 800 //speed
						);
					}
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
$(document).ready(function () {
	var $lg = $('.project-card');
	$lg.lightGallery({
		pullCaptionUp: false,
		pager: true,
		selector: 'li'
	});

	$lg.on('onAfterOpen.lg', function () {
		$('body').addClass('blocked');
	});

	$lg.on('onCloseAfter.lg', function () {
		$('body').removeClass('blocked');
	});
});

// Blocks body scroll when gallery is open
$('.project-card').each(function () {
	$(this).on('click', function () {
		if ($('body').hasClass('.lg-on')) {
			$('body').addClass('blocked');
		}
	});
});

