console.log("aiqHome - main.js versionn 0.1");
document.addEventListener('readystatechange', function (event) {
    if (event.target.readyState === "complete") {
        init();
    }
});


function init() {

    var imgDefer = document.getElementsByTagName('img');
    for (var i = 0; i < imgDefer.length; i++) {
        if (imgDefer[i].getAttribute('data-src')) {
            imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
        }
    }

    var Icons = document.createElement('link');
    Icons.rel = 'stylesheet';
    Icons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    Icons.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(Icons);

    // if (window.location.href.toLowerCase().indexOf("lp/") > -1) {
        var funnel_script_load = setTimeout(function () {
            var script = document.createElement('script');
            script.src = "assets/js/funnels_0.1.js?v=0.01";
            document.getElementsByTagName('head')[0].appendChild(script);
        }, 1500000) //todo chage after test in lighthouse

    // }
}



// Landing page Section search-pro Image size
const imageContainers = document.querySelectorAll('.image-container');


imageContainers.forEach(imageContainer => {
    let imageContainerHeight = (imageContainer.clientWidth) / 2;
    // imageContainer = (imageContainers

    if (window.innerWidth < 767) {
        console.log(111111);
        imageContainer.style.height = `${ imageContainerHeight  }px`;
    }


    console.log('imageContainerHeight => ', imageContainerHeight );
});



