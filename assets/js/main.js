(function () {
    var CallToActionText = document.getElementById("CallToActionText");
    if (CallToActionText) {
        window.onscroll = function (e) {
            var scrollPosition = window.pageYOffset;
            if (scrollPosition > 500) {
                CallToActionText.classList.add("float");
            }
        }
    }
})();