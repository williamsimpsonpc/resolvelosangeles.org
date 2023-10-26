const preloader = document.querySelector('.preloader');

//TODO: Work on getting this to be a little less jittery during the end of init scripts
document.addEventListener('DOMContentLoaded', function() {
    //fade the preloader out slowly
    preloader.style.opacity = 1;
    var fadeEffect = setInterval(() => {
        if (preloader.style.opacity > 0) {
            preloader.style.opacity -= 0.05;
        } else {
            clearInterval(fadeEffect);
            preloader.style.display = "none"
        }
    }, 1);
});

//This line wasn't running due to an error, and setInterval takes care of running this anyways.
//window.addEventListener('load');