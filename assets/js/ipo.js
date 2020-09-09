import { CountUp } from './countUp.js';

// Language Selection in ipo-header
// To style only selects with the my-select class

$(function () {
	$('.lang-select').selectpicker();
});

// Counter
window.onload = function() {
	var countUp = new CountUp('counter', 2000000, {
		startVal: 0,
		formattingFn: function (number) {
			let numberToString =  number.toString();
			let chars = numberToString.split('');
			// console.log(chars);
			let numArray = chars.map(Number);
			console.log(numArray);

			let newValue = numArray.reduce((accumulator, currentValue) => {
				return accumulator + '<span>' + currentValue + '</span>'
			}, '');
			console.log(newValue);
			return newValue;
		}
	});
	countUp.start();
};


// Header Ipo appears on scroll
$(window).scroll(function() {
	var scrollTop = $(window).scrollTop();

	let headerIpo = $('.info-content-header');
	let headerIpoHeight = headerIpo.height();

	if ( scrollTop > headerIpoHeight) {
		headerIpo.addClass('show-content');
		headerIpo.removeClass('hide-content');
	}
	else {
		headerIpo.removeClass('show-content');
		headerIpo.addClass('hide-content');
	}
});
