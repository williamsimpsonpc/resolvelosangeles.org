const preloader = document.querySelector('.preloader_homepage');

document.addEventListener('DOMContentLoaded', function () {
    //Swap from the static PNG loading screen to the animated GIF transition
    preloader.innerHTML = '<img src="resolvezoomin-regular.gif" alt="loading screen">';
    preloader.style.background = '#141414';
    preloader.style.transition = 'background-color 1s ease-out';
    preloader.style.backgroundColor = 'transparent';
    setTimeout(function () {
        preloader.remove();
    }, 1180);
});



//TextScramble credit goes to Justin Windle
// https://codepen.io/soulwire/pen/mErPAK
class TextScramble {
    constructor(el) {
        this.el = el
        this.chars = '!<>-_\\/[]{}—=+*^?#________'
        this.update = this.update.bind(this)
    }
    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }
    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span class="dud">${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update)
            this.frame++
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}

//function to do the same thing as above
function scrambleText() {
    const phrases = document.querySelectorAll('.scramble')
    phrases.forEach((phrase) => {
        const fx = new TextScramble(phrase)
        const realText = phrase.innerText;
        phrase.innerText = '';
        let counter = 0
        const next = () => {
            fx.setText(realText).then(() => {
                if (fx.el.innerText !== realText) {
                    setTimeout(next, 800)
                }
            })
            counter = (counter + 1) % phrases.length
        }
        next()
    })
}


// Show elements and run scrambleText function after 1180ms
document.addEventListener('DOMContentLoaded', function () {
    // Hide elements on page load
    const elementsToHide = document.querySelectorAll('.scramble');
    elementsToHide.forEach((element) => {
        //hide the element
        element.style.opacity = 0;
    });
    setTimeout(function () {
        elementsToHide.forEach((element) => {
            //show the element
            element.style.opacity = 1;
        });
        scrambleText();
    }, 500);
});


document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('mousemove', function (e) {
        if (window.innerWidth > 1024 && !isTouchEventsEnabled()) {
            var cursorElement = document.querySelector('.cursor-element');
            cursorElement.style.left = e.pageX + 'px';
            cursorElement.style.top = e.pageY + 'px';
            //set the .links_item and html styles to cursor: none
            const linksItems = document.querySelectorAll('.links_item');
            const html = document.querySelector('html');
            linksItems.forEach((item) => {
                item.style.cursor = 'none';
            });
            html.style.cursor = 'none';
        } else {
            const cursorElement = document.querySelector('.cursor-element');
            cursorElement.style.display = 'none';
            //set the .links_item and html styles to cursor: pointer
            const linksItems = document.querySelectorAll('.links_item');
            const html = document.querySelector('html');
            linksItems.forEach((item) => {
                item.style.cursor = 'pointer';
            });
            html.style.cursor = 'pointer';
        }
    });
});

//If the window width changes, show/hide cursor
window.addEventListener('resize', function () {
    if (window.innerWidth > 1024 && !isTouchEventsEnabled()) {
        const cursorElement = document.querySelector('.cursor-element');
        cursorElement.style.display = 'block';
    } else {
        const cursorElement = document.querySelector('.cursor-element');
        cursorElement.style.display = 'none';
    }
});

//detecting touch is far more complicated than it probably should be
//https://stackoverflow.com/questions/55833326/wrong-maxtouchpoints-and-ontouchstart-in-document-in-chrome-mobile-emulati
function isTouchEventsEnabled() {
    //should never be run within a frame, so we can safely use this.
    const navigator = (window.top || window).navigator;
    const maxTouchPoints = Number.isFinite(navigator.maxTouchPoints) ? navigator.maxTouchPoints : navigator.msMaxTouchPoints;
    if (Number.isFinite(maxTouchPoints)) {
        // Windows 10 system reports that it supports touch, even though it acutally doesn't (ignore msMaxTouchPoints === 256).
        return maxTouchPoints > 0 && maxTouchPoints !== 256;
    }
    return 'ontouchstart' in window;
}

document.addEventListener('DOMContentLoaded', function () {
    const cursorElement = document.querySelector('.cursor-element');
    const linksItems = document.querySelectorAll('.links_item');

    //set a transition on cursorElement so the scale takes 0.5s
    cursorElement.style.transition = 'transform 0.25s ease-out';

    linksItems.forEach((item) => {
        item.addEventListener('mouseenter', function () {
            cursorElement.style.transform = 'scale(0)';
        });

        item.addEventListener('mouseleave', function () {
            cursorElement.style.transform = 'scale(1)';
        });
    });
});