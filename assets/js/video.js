console.log("video.js v=0.2");

$(window).on('load', function () {

	$('#video-play').on('click', function (e) {
		e.preventDefault();
		$("#video-player")[0].src += "?autoplay=1&rel=0&modestbranding=1&autohide=1&showinfo=0";
		$('#video-player').show();

		$('#video-play-i').hide();
		$('#video-mask').hide();
		$("#video-img").fadeOut(2000);
	})

});