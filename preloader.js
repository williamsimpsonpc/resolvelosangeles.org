const preloader = document.querySelector('.preloader');

const fadeEffect = setInterval(() => {
    // if we don't set opacity 1 in CSS, then
    // it will be equaled to "" -- that's why
    // we check it, and if so, set opacity to 1
    if (!preloader.style.opacity) {
        preloader.style.opacity = 1;
    }
    if (preloader.style.opacity > 0) {
        preloader.style.opacity -= 1;
    } else {
        clearInterval(fadeEffect);
        preloader.style.display = "none"
    }
}, 1500);

//This line wasn't running due to an error, and setInterval takes care of running this anyways.
//window.addEventListener('load');