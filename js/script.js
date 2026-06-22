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



