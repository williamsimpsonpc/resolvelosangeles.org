const desired_r = 175;
const desired_g = 179;
const desired_b = 223; //define the RGB values of the desired color to fade towards

document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll(".space");
    elements.forEach(element => {
        updateColor(element);
    });
    // Call the updateColor function for each element when the window is scrolled or resized
    window.addEventListener("scroll", () => {
        elements.forEach(element => {
            updateColor(element);
        });
    });
    window.addEventListener("resize", () => {
        elements.forEach(element => {
            updateColor(element);
        });
    });
});

function updateColor(element) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const elementRect = element.getBoundingClientRect();

    const elementCenterX = elementRect.left + elementRect.width / 2;
    let elementCenterY = elementRect.top + elementRect.height / 2.5;

    // Calculate distance between element center and screen center
    const distance = Math.sqrt(
        (elementCenterX - centerX) ** 2 + (elementCenterY - centerY) ** 2
    );

    // A bit calculation-intensive for this type of thing, but JS deals with this with only a few ms of delay (for all elements)
    // This number only needs really small changes. Graph it out in desmos for a visual editor with `y = 0.0022x`
    let changeScale = (window.innerWidth * 0.0018);

    // Fade the color to white as distance increases. The closer to the center, the closer to rgb(175, 179, 223).
    const red = desired_r + (255 - desired_r) * (distance / (window.innerWidth / changeScale));
    const green = desired_g + (255 - desired_g) * (distance / (window.innerWidth / changeScale));
    const blue = desired_b + (255 - desired_b) * (distance / (window.innerWidth / changeScale));

    // Set the background color
    element.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}