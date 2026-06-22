const productImages = [
    "images/cloths/image 34.png", // Grey Polo
    "images/cloths/image 35.png", // White Tee
    "images/cloths/image 36.png", // Black Folded
    "images/cloths/image 37.png", // Hanger Tee
    "images/cloths/image 39.png", // Cyan Shirt
    "images/cloths/image 30.png"  // Casual Blue
];

let currentMobileIndex = 0;

/* Mobile Swipe Handler Logic */
function triggerMobileSwipe(direction) {
    currentMobileIndex += direction;
    if (currentMobileIndex < 0) {
        currentMobileIndex = productImages.length - 1;
    } else if (currentMobileIndex >= productImages.length) {
        currentMobileIndex = 0;
    }
    document.getElementById("mobile-main-img").src = productImages[currentMobileIndex];
}

/* Desktop Thumbnail Swap Handler Logic */
function swapDesktopImage(thumbnailElement, targetImageUrl) {
    // Remove active frame state class from all thumbs
    document.querySelectorAll('.desktop-thumb-box').forEach(box => {
        box.classList.remove('active-thumb');
    });
    // Append target state definition to selection
    thumbnailElement.classList.add('active-thumb');
    document.getElementById("desktop-large-view").src = targetImageUrl;
}

// tab 

function switchLayoutTab(clickedTab, targetPanelId) {
    // Remove active state borders from all navigation triggers
    document.querySelectorAll('.tab-trigger-link').forEach(tab => {
        tab.classList.remove('active-tab-state');
    });

    // Hide all inner tab panels
    document.querySelectorAll('.tab-content-panel').forEach(panel => {
        panel.classList.add('d-none');
    });

    // Set state definitions to the chosen elements
    clickedTab.classList.add('active-tab-state');
    document.getElementById(targetPanelId).classList.remove('d-none');
}