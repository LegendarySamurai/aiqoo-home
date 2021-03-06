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

	let scroll = $(document).scrollTop();

	let aboutUsTop, aboutUsHeight, aboutUsBottom;
	if (aboutUs.length !== 0) {
		aboutUsTop = aboutUs.offset().top;
		aboutUsHeight = aboutUs.innerHeight();
		aboutUsBottom = aboutUsTop + aboutUsHeight;
	}

	let ourProjectsTop, ourProjectsHeight, ourProjectsBottom;
	if (ourProjects.length !== 0) {
		ourProjectsTop = ourProjects.offset().top;
		ourProjectsHeight = ourProjects.innerHeight();
		ourProjectsBottom = ourProjectsTop + ourProjectsHeight;
	}

	let ourReviewsTop, ourReviewsHeight, ourReviewsBottom;
	if (ourReviews.length !== 0) {
		ourReviewsTop = ourReviews.offset().top;
		ourReviewsHeight = ourReviews.innerHeight();
		ourReviewsBottom = ourReviewsTop + ourReviewsHeight;
	};

	let asideBlockTop;
	if (asideBlock.length !== 0) {
		asideBlockTop = asideBlock.offset().top;
	}

	let contentWrapTop;
	if (contentWrap.length !== 0) {
		contentWrapTop = contentWrap.offset().top;
		let positionOnPage = contentWrapTop + scroll;
	}

	$(window).on('resize scroll', function () {
		scroll = $(document).scrollTop();

		if (aboutUs.length !== 0) {
			let aboutUsTop = aboutUs.offset().top;
			let aboutUsHeight = aboutUs.innerHeight();
			let aboutUsBottom = aboutUsTop + aboutUsHeight;
		}

		if (ourProjects.length !== 0) {
			let ourProjectsTop = ourProjects.offset().top;
			let ourProjectsHeight = ourProjects.innerHeight();
			let ourProjectsBottom = ourProjectsTop + ourProjectsHeight;
		}

		if (ourReviews.length !== 0) {
			let ourReviewsTop = ourReviews.offset().top
			let ourReviewsHeight = ourReviews.innerHeight();
			let ourReviewsBottom = ourReviewsTop + ourReviewsHeight;
		};

		if (asideBlock.length !== 0) {
			let asideBlockTop = asideBlock.offset().top;
		}

		if (contentWrap.length !== 0) {
			let contentWrapTop = contentWrap.offset().top;
			positionOnPage = contentWrapTop + scroll;
		}


		// handling active section on scroll
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


	// handling active section on click
	$('.tab').each(function () {
		$(this).on('click', function (e) {
			e.preventDefault();
			let target = $(this).attr('href');
			// console.log('target', target);

			if (!contentWrap || !asideBlock) {
				return;
			}

			if (window.innerWidth < 600) {
				// console.log($(target).offset().top);

				$('body,html').animate(
					{
						scrollTop: $(target).offset().top - contentWrapTop + asideBlockTop + 500,
						behavior: 'smooth'
					},
					800 //speed
				);
			} else {
				if ($(target).length !== 0) {
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
	const $lg = $('.project-card');
	$lg.lightGallery({
		pullCaptionUp: false,
		pager: true,
		selector: 'li'
	});

	$lg.on('onAfterOpen.lg',function() {
		$('body').addClass('blocked');
	});

	$lg.on('onCloseAfter.lg', function() {
		$('body').removeClass('blocked');
	});

});

// Blocks body scroll when gallery is open
$('.project-card').each(function() {
	$(this).on('click', function() {
		if($('body').hasClass('.lg-on')) {
			$('body').addClass('blocked');
		}
	})
});



