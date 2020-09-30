'use strict';

var _countUpJs = require('./countUp.js');

$(function () {
	$('.lang-select').selectpicker();
});

// Counter
window.onload = function () {
	var countUp = new _countUpJs.CountUp('counter', 2000000, {
		startVal: 0,
		formattingFn: function formattingFn(number) {
			var numberToString = number.toString();
			var chars = numberToString.split('');
			// console.log(chars);
			var numArray = chars.map(Number);
			console.log(numArray);

			var newValue = numArray.reduce(function (accumulator, currentValue) {
				return accumulator + '<span>' + currentValue + '</span>';
			}, '');
			console.log(newValue);
			return newValue;
		}
	});
	countUp.start();
};

// Header Ipo appears on scroll
$(window).scroll(function () {
	var scrollTop = $(window).scrollTop();

	var headerIpo = $('.info-content-header');
	var headerIpoHeight = headerIpo.height();

	if (scrollTop > headerIpoHeight) {
		headerIpo.addClass('show-content');
		headerIpo.removeClass('hide-content');
	} else {
		headerIpo.removeClass('show-content');
		headerIpo.addClass('hide-content');
	}
});

