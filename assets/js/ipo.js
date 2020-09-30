import { CountUp } from './countUp.js';

window.openIpoModel = (id, headline) => {
	document.getElementById("ipoModal").style.display = "block";
	document.getElementById("ipoModalHeadline").innerHTML = headline;
	document.getElementById("ipoModalText").innerHTML = document.getElementById("fullText_Ipo").innerHTML;
};

window.closeIpoModel = (id, headline) => {
	document.getElementById("ipoModal").style.display = "none";
	document.getElementById("ipoModalHeadline").innerHTML = '';
	document.getElementById("ipoModalText").innerHTML = '';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == document.getElementById("ipoModal")) {
		closeIpoModel();
	}
};

// Download modal
window.openIpoDownloadPopup = () => {
	document.getElementById("ipoDownloadModal").style.display = "block";
};

window.closeIpoDownloadPopup = () => {
	document.getElementById("ipoDownloadModal").style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == document.getElementById("ipoDownloadModal")) {
		closeIpoDownloadPopup();
	}
};


// Selectpicker
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
