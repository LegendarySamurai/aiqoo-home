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


// code written 17-06-2020 by Igor
// Landing page Section search-pro Image size and map size (always should be 3 cards height)
function countMapHeight () {
    const proCards = document.querySelectorAll('.pro-card');
    const mapCol = document.querySelector('.map-col');

    proCards.forEach(proCard => {
        let proCardHeight = proCard.clientHeight;
        let mapMaxHeight = proCardHeight * 3;
        mapCol.style.maxHeight = `calc(${mapMaxHeight}px + 2rem + 2rem + 2rem)`;
    })
}

window.addEventListener('resize',  function() {
    const imageContainers = document.querySelectorAll('.image-container');

    imageContainers.forEach(imageContainer => {
        let imageContainerHeight = (imageContainer.clientWidth) / 2;

        if (window.innerWidth < 767) {
            imageContainer.style.height = `${ imageContainerHeight  }px`;
            imageContainer.style.width = "100" + "%";
        }

        if (window.innerWidth >= 768) {
            imageContainer.style.height = '150' + 'px';
            imageContainer.style.width = '200' + 'px';
        }
    });

    countMapHeight();
});

$(document).ready(function() {
    countMapHeight();
});

// window.addEventListener('scroll', () => {
//     let coordinates = $(window).scrollTop();
//     // console.log('=> ', coordinates);
// });

//  EOL: code written 17-06-2020 by Igor
