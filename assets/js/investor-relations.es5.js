// Get the modal
"use strict";

var modalOne = document.getElementById("aiqProsModal");
var modalTwo = document.getElementById("wcmsModal");
var modalThree = document.getElementById("aiqHomeModal");

// Get the button that opens the modal
var btnOne = document.getElementById("aiqProsBtn");
var btnTwo = document.getElementById("wcmsBtn");
var btnThree = document.getElementById("aiqHomeBtn");

// Get the <span> element that closes the modal
var spanOne = document.getElementsByClassName("close-one")[0];
var spanTwo = document.getElementsByClassName("close-two")[0];
var spanThree = document.getElementsByClassName("close-three")[0];

// When the user clicks the button, open the modal
btnOne.onclick = function () {
	modalOne.style.display = "block";
};

btnTwo.onclick = function () {
	modalTwo.style.display = "block";
};

btnThree.onclick = function () {
	modalThree.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
spanOne.onclick = function () {
	modalOne.style.display = "none";
};
spanTwo.onclick = function () {
	modalTwo.style.display = "none";
};
spanThree.onclick = function () {
	modalThree.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modalOne) {
		modalOne.style.display = "none";
	}
	if (event.target == modalTwo) {
		modalTwo.style.display = "none";
	}
	if (event.target == modalThree) {
		modalThree.style.display = "none";
	}
};

