const track = document.getElementById('product-scroll-track');
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
    if (window.innerWidth >= 768) return; // Desktop grid par dynamic movement apply nahi hogi
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
});

track.addEventListener('mouseleave', () => {
    isDown = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag scroll velocity ratio
    track.scrollLeft = scrollLeft - walk;
});


const track = document.getElementById('horizontal-scroll-track');
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
    if (window.innerWidth >= 992) return; // Only active on mobile/tablet views
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
});

track.addEventListener('mouseleave', () => {
    isDown = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed sensitivity
    track.scrollLeft = scrollLeft - walk;
});

const categoryItems = document.querySelectorAll(".category");

categoryItems.forEach(item => {

    item.addEventListener("click", () => {

        categoryItems.forEach(el => {
            el.classList.remove("active");
        });

        item.classList.add("active");
    });

});


// listing page

// countdown

// Countdown target date
const targetDate = new Date("July 1, 2026 12:00:00").getTime();

function startCountdown() {

    const now = new Date().getTime();

    const distance = targetDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    // Add leading zero
    document.getElementById("days").innerHTML =
        String(days).padStart(2, "0");

    document.getElementById("hours").innerHTML =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerHTML =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerHTML =
        String(seconds).padStart(2, "0");

    // Stop when countdown ends
    if (distance < 0) {

        clearInterval(timer);

        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}

// Run every second
const timer = setInterval(startCountdown, 1000);

// Run immediately
startCountdown();