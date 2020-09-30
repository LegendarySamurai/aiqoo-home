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
			// console.log(numArray);

			let newValue = numArray.reduce((accumulator, currentValue) => {
				return accumulator + '<span>' + currentValue + '</span>'
			}, '');
			// console.log(newValue);
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


window.IpoContactUsRequest = () => {
	var form = document.getElementById("ipo_form");
	var errorCount = 0;

	reloadon(cu_btnSpinner);
	reloadoff(cu_btn);
	reloadoff(cu_fullName_error);
	reloadoff(cu_phone_error);
	reloadoff(cu_email_error);
	


	if (form.cu_fullName.value == "" || form.cu_fullName.value == null) {
		document.getElementById("cu_fullName_error").innerHTML = 'Please enter your full name';
		reloadon(cu_fullName_error);
		form.cu_fullName.focus();
		errorCount++;
	} else {
		reloadoff(cu_fullName_error);
	}

	var resMsg = validatePhone(form.cu_phone);
	if (resMsg != "NoError") {
		document.getElementById("cu_phone_error").innerHTML = resMsg;
		reloadon(cu_phone_error);
		form.cu_phone.focus();
		errorCount++;
	} else {
		reloadoff(cu_phone_error);
	}		

	if (validateEmail(form.cu_email.value) == false) {
		document.getElementById("cu_email_error").innerHTML = 'Please enter valid email address';
		reloadon(cu_email_error);
		form.cu_email.focus();
		errorCount++;
	} else {
		reloadoff(cu_email_error);
	}


	if (errorCount == 0) {

		var url = "api/v1/ContactUs/setNewIpoRequest/"
		url = url + "?fullName=" + form.cu_fullName.value;
		url = url + "&phone=" + form.cu_phone.value;
		url = url + "&email=" + form.cu_email.value;
		url = url + "&language=" + form.cu_language.value;
		url = url + "&Rand=" + Math.random();

		var xhr = createHttpObject();
		xhr.open('post', url, true);
		xhr.send();
		xhr.onreadystatechange = function () {
			var _this = this;
			if (xhr.readyState === 4) {
				if (xhr.status == 200) {
					if (xhr.responseText == "true") {
						reloadoff(cu_form_div);
						reloadon(cu_success);
					} else {
						alert('Oops, something went wrong, try again');
					}
				}
			}
		};
	}
	else {
		reloadon(cu_btn);
		reloadoff(cu_btnSpinner);
	}

	return false;

}
function validatePhone(Phone) {
	var phonePattern = /(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/;
	var error = "";
	if (Phone.value == "" || Phone.value == null) {
		error = "Should not be empty.";
	} else if ((Phone.value.length < 10)) {
		error = "Should not be less than 10 digits";
	} else if (!Phone.value.match(phonePattern)) {
		error = "Invalid Number Please re-enter using valid 10 digit number";
	} else {
		error = "NoError";
	}

	return error;
}

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}


function reloadon(c) {
	c.style.display = "";
}
function reloadoff(c) {
	c.style.display = "none";
}
function createHttpObject() { var hr; if (window.XMLHttpRequest) { try { hr = new XMLHttpRequest(); } catch (e) { hr = false; } } else if (window.ActiveXObject) { try { hr = new ActiveXObject("Msxml2.HTMLHTTP"); } catch (e) { try { hr = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) { hr = false; } } } return hr; }
