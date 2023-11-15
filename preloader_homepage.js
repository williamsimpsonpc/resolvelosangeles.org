const preloader = document.querySelector('.preloader_homepage');

document.addEventListener('DOMContentLoaded', function() {
    //Swap from the static PNG loading screen to the animated GIF transition
    preloader.innerHTML = '<img src="resolvezoomin-regular.gif" alt="loading screen">';
    preloader.style.background = '#141414';
    preloader.style.transition = 'background-color 1s ease-out';
    preloader.style.backgroundColor = 'transparent';
    setTimeout(function() {
        preloader.remove();
    }, 1180);
});