const track = document.querySelector(".slider-track");
const slides = Array.from(track.querySelectorAll(".slide"));

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const dotsContainer = document.querySelector(".slider-dots");

const currentText = document.querySelector("#current");
const totalText = document.querySelector("#total");

let currentIndex = 1;
const totalSlides = slides.length;

// Add copies of the first and last slides for infinite looping.
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

// Create navigation dots automatically.
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");

    dot.classList.add("dot");
    dot.setAttribute("aria-label", `Go to image ${i + 1}`);

    dot.addEventListener("click", () => {
        currentIndex = i + 1;
        updateSlider();
    });

    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");
totalText.textContent = String(totalSlides).padStart(2, "0");

// Update the image position, counter, and active dot.
function updateSlider(animate = true) {
    track.style.transition = animate ? "transform 0.5s ease" : "none";

    track.style.transform =
        `translateX(-${currentIndex * 100}%)`;

    let realIndex = (currentIndex - 1 + totalSlides) % totalSlides;

    currentText.textContent = String(realIndex + 1).padStart(2, "0");

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === realIndex);
    });
}

// Show the next image.
nextButton.addEventListener("click", () => {
    currentIndex++;
    updateSlider();
});

// Show the previous image.
prevButton.addEventListener("click", () => {
    currentIndex--;
    updateSlider();
});

// Jump to the real slide after reaching a clone.
track.addEventListener("transitionend", () => {
    if (currentIndex === totalSlides + 1) {
        currentIndex = 1;
        updateSlider(false);
    }

    if (currentIndex === 0) {
        currentIndex = totalSlides;
        updateSlider(false);
    }
});

// Keep the slider in the correct position when resizing.
window.addEventListener("resize", () => {
    updateSlider(false);
});

// Show the copyright notice when the button is clicked.
document.querySelector("#copyright-button").addEventListener("click", () => {
    alert("Copyright © " + new Date().getFullYear() +
          " Yusuf Ali. All rights reserved.");
});

// Display the first image.
updateSlider(false);
