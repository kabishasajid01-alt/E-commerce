let activeFilters = new Set();

// 1. Checkbox state changes
function handleCheckboxChange(checkbox) {
    if (checkbox.checked) {
        activeFilters.add(checkbox.value);
    } else {
        activeFilters.delete(checkbox.value);
    }
    renderBadges();
}

// 2. Radio buttons condition handling
function handleRadioChange(radio) {
    // Remove previous condition values if any
    const conditions = ['Any', 'Refurbished', 'Brand new', 'Old items'];
    conditions.forEach(cond => activeFilters.delete(cond));

    if (radio.value !== 'Any') { // Image target doesn't show badge for 'Any'
        activeFilters.add(radio.value);
    }
    renderBadges();
}

// 3. Category link toggle
function toggleLinkBadge(element, value) {
    element.classList.toggle('active');
    if (element.classList.contains('active')) {
        activeFilters.add(value);
    } else {
        activeFilters.delete(value);
    }
    renderBadges();
}

// 4. Range slider connector
function updatePriceInputs(val) {
    document.getElementById('maxPrice').value = val;
}

function applyPriceFilter() {
    let min = document.getElementById('minPrice').value;
    let max = document.getElementById('maxPrice').value;
    let priceString = `$${min}-$${max}`;

    // Remove existing price badges
    activeFilters.forEach(item => {
        if (item.includes('$')) activeFilters.delete(item);
    });

    activeFilters.add(priceString);
    renderBadges();
}

// 5. Render Badges to UI (Matches Image 2 format)
function renderBadges() {
    const container = document.getElementById('badgesContainer');
    const clearBtn = document.getElementById('clearAllBtn');

    // Clear all except the Clear Button
    container.innerHTML = '';

    if (activeFilters.size > 0) {
        container.style.display = 'flex';

        activeFilters.forEach(filter => {
            const badge = document.createElement('div');
            badge.className = 'filter-badge';
            badge.innerHTML = `${filter} <button class="btn-close-badge" onclick="removeSingleFilter('${filter}')"><i class="fa-solid fa-xmark"></i></button>`;
            container.appendChild(badge);
        });

        // Re-append clear all button at the end
        container.appendChild(clearBtn);
    } else {
        container.style.display = 'none';
    }
}

// 6. Remove individual filter item
function removeSingleFilter(value) {
    activeFilters.delete(value);

    // Uncheck matching checkboxes
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    checkboxes.forEach(cb => {
        if (cb.value === value) cb.checked = false;
    });

    // Reset radio buttons if applicable
    const radios = document.querySelectorAll('.filter-radio');
    radios.forEach(rb => {
        if (rb.value === value) document.getElementById('condAny').checked = true;
    });

    // Deactivate Category links
    const links = document.querySelectorAll('.filter-link');
    links.forEach(lnk => {
        if (lnk.innerText === value) lnk.classList.remove('active');
    });

    renderBadges();
}

// 7. Clear all reset function
function clearAllFilters() {
    activeFilters.clear();

    // Reset inputs
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
    document.querySelectorAll('.filter-radio').forEach(rb => rb.checked = false);
    document.getElementById('condAny').checked = true;
    document.querySelectorAll('.filter-link').forEach(lnk => lnk.classList.remove('active'));

    renderBadges();
}

// pagination

// 1. Mock Database Structure (Images match perfectly across categories)
const database = [
    { title: "Canon Camera EOS 200D, Black 18-55mm", price: "$998.00", oldPrice: "$1128.00", rating: 4.5, orders: "154 orders", shipping: "Free Shipping", img: "images/tech/6.png", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", link: "product-detail.html", },
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$895.50", oldPrice: "$1099.00", rating: 4, orders: "154 orders", shipping: "Free Shipping", img: "images/tech/8.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit." , link: "product-detail.html"},
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$89.50", oldPrice: "$109.00", rating: 3.5, orders: "154 orders", shipping: "", img: "images/tech/image 23.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit." , link: "product-detail.html"},
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$990.00", oldPrice: "", rating: 4, orders: "154 orders", shipping: "Free Shipping", img: "images/tech/image 29.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit." , link: "product-detail.html" },
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", oldPrice: "$159.00", rating: 4.5, orders: "75 orders", shipping: "Free Shipping", img: "images/tech/image 32.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." , link: "product-detail.html" },
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$199.50", oldPrice: "$259.00", rating: 5, orders: "25 orders", shipping: "", img: "images/tech/image 34.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." , link: "product-detail.html"},
    { title: "GoPro HERO6 4K Action Camera - Premium", price: "$299.00", oldPrice: "", rating: 4, orders: "190 orders", shipping: "Free Shipping", img: "images/tech/image 85.png", desc: "Premium ultra clear action lens design perfect for extreme sports and outdoor recording." , link: "product-detail.html"},
    { title: "Smart Sound Over-Ear Headphones White", price: "$89.50", oldPrice: "$120.00", rating: 3, orders: "320 orders", shipping: "Free Shipping", img: "images/tech/image 86.png", desc: "Noise cancelling wireless bluetooth connectivity with extreme depth sound buffers." , link: "product-detail.html"},
    { title: "Leather Classic Men's Minimalist Wallet", price: "$32.00", oldPrice: "$45.00", rating: 4.5, orders: "450 orders", shipping: "", img: "images/cloths/2 1.png", desc: "Genuine processed structure hide leather with double layer compartment protection." , link: "product-detail.html"},
    { title: "Canon Camera EOS 200D, Black 18-55mm", price: "$998.00", oldPrice: "$1128.00", rating: 4.5, orders: "154 orders", shipping: "Free Shipping", img: "images/cloths/bitmap (2).png", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." , link: "product-detail.html"},
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$895.50", oldPrice: "$1099.00", rating: 4, orders: "154 orders", shipping: "Free Shipping", img: "images/cloths/bitmap.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit." , link: "product-detail.html"},
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$89.50", oldPrice: "$109.00", rating: 3.5, orders: "154 orders", shipping: "", img: "images/cloths/image 24.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit." , link: "product-detail.html"},
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$990.00", oldPrice: "", rating: 4, orders: "154 orders", shipping: "Free Shipping", img: "images/cloths/image 26.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit." , link: "product-detail.html" },
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", oldPrice: "$159.00", rating: 4.5, orders: "75 orders", shipping: "Free Shipping", img: "images/cloths/image 30.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." , link: "product-detail.html"},
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$199.50", oldPrice: "$259.00", rating: 5, orders: "25 orders", shipping: "", img: "images/cloths/image 34.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." , link: "product-detail.html"},
    { title: "GoPro HERO6 4K Action Camera - Premium", price: "$299.00", oldPrice: "", rating: 4, orders: "190 orders", shipping: "Free Shipping", img: "images/interior/1.png", desc: "Premium ultra clear action lens design perfect for extreme sports and outdoor recording." , link: "product-detail.html"},
    { title: "Smart Sound Over-Ear Headphones White", price: "$89.50", oldPrice: "$120.00", rating: 3, orders: "320 orders", shipping: "Free Shipping", img: "images/interior/3.png", desc: "Noise cancelling wireless bluetooth connectivity with extreme depth sound buffers." , link: "product-detail.html"},
    { title: "Leather Classic Men's Minimalist Wallet", price: "$32.00", oldPrice: "$45.00", rating: 4.5, orders: "450 orders", shipping: "", img: "images/interior/6.png", desc: "Genuine processed structure hide leather with double layer compartment protection." , link: "product-detail.html"},
    { title: "Canon Camera EOS 200D, Black 18-55mm", price: "$998.00", oldPrice: "$1128.00", rating: 4.5, orders: "154 orders", shipping: "Free Shipping", img: "images/interior/7.png", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." , link: "product-detail.html"},
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$895.50", oldPrice: "$1099.00", rating: 4, orders: "154 orders", shipping: "Free Shipping", img: "images/interior/8.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit." , link: "product-detail.html"},
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$89.50", oldPrice: "$109.00", rating: 3.5, orders: "154 orders", shipping: "", img: "images/interior/9.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit." , link: "product-detail.html"},
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$990.00", oldPrice: "", rating: 4, orders: "154 orders", shipping: "Free Shipping", img: "images/interior/image 89.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit." , link: "product-detail.html"},
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", oldPrice: "$159.00", rating: 4.5, orders: "75 orders", shipping: "Free Shipping", img: "images/interior/image 93.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." , link: "product-detail.html"},
    { title: "GoPro HERO6 4K Action Camera - Black", price: "$199.50", oldPrice: "$259.00", rating: 5, orders: "25 orders", shipping: "", img: "images/tech/image 34.png", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." , link: "product-detail.html"},
    { title: "GoPro HERO6 4K Action Camera - Premium", price: "$299.00", oldPrice: "", rating: 4, orders: "190 orders", shipping: "Free Shipping", img: "images/tech/image 85.png", desc: "Premium ultra clear action lens design perfect for extreme sports and outdoor recording." , link: "product-detail.html"},
    { title: "Smart Sound Over-Ear Headphones White", price: "$89.50", oldPrice: "$120.00", rating: 3, orders: "320 orders", shipping: "Free Shipping", img: "images/tech/image 86.png", desc: "Noise cancelling wireless bluetooth connectivity with extreme depth sound buffers.",  link: "product-detail.html" },
    { title: "Leather Classic Men's Minimalist Wallet", price: "$32.00", oldPrice: "$45.00", rating: 4.5, orders: "450 orders", shipping: "", img: "images/cloths/2 1.png", desc: "Genuine processed structure hide leather with double layer compartment protection." , link: "product-detail.html"}
];

let currentView = 'grid'; // Base initialization tracker
let currentPage = 1;
let itemsPerPage = 9;

// 2. Main View Switcher Logic
function switchView(viewType) {
    currentView = viewType;
    const container = document.getElementById('productContainer');
    const btnGrid = document.getElementById('btnGrid');
    const btnList = document.getElementById('btnList');

    if (viewType === 'grid') {
        container.className = "product-wrapper grid-view";
        btnGrid.classList.add('active');
        btnList.classList.remove('active');
    } else {
        container.className = "product-wrapper list-view";
        btnList.classList.add('active');
        btnGrid.classList.remove('active');
    }
    renderProducts(); // Refresh architecture layout instantly
}

// Helper to generate precise stars
function generateStarsHTML(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            starsHTML += '<i class="fa-solid fa-star"></i>';
        } else if (i - 0.5 === rating) {
            starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            starsHTML += '<i class="fa-regular fa-star" style="color:#e4e7e9;"></i>';
        }
    }
    return starsHTML;
}

// 3. Render System Core
function renderProducts() {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';

    // Pagination slice boundaries
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = database.slice(start, end);

    paginatedItems.forEach(item => {
        const productCard = document.createElement('div');
        productCard.className = 'card-product';

        productCard.innerHTML = `
               <a href="${item.link}">
                <div class="img-container">
                    <img src="${item.img}" alt="Product Image">
                </div>
                <button class="btn-wishlist"><i class="fa-regular fa-heart"></i></button>
                <div class="details-container">
                    <div class="price-row">
                        ${item.price} ${item.oldPrice ? `<span class="old-price">${item.oldPrice}</span>` : ''}
                    </div>
                    <div class="meta-row">
                        <span class="rating-stars">${generateStarsHTML(item.rating)}</span>
                        <span class="rating-count">${item.rating}</span>
                        <span class="orders-count">• ${item.orders}</span>
                        ${item.shipping ? `<span class="shipping-tag">• ${item.shipping}</span>` : ''}
                    </div>
                    <div class="product-title">${item.title}</div>
                    <p class="desc-text">${item.desc}</p>
                    <a href="product-detail.html" class="view-details-link">View details</a>
                </div>
               </a>
            `;
        container.appendChild(productCard);
    });

    renderPaginationControls();
}

// 4. Fully Functional Pagination Controls
function renderPaginationControls() {
    const nav = document.getElementById('paginationNav');
    nav.innerHTML = '';

    let totalPages = Math.ceil(database.length / itemsPerPage);

    // Previous Button
    const prevLi = document.createElement('li');
    prevLi.className = currentPage === 1 ? 'disabled' : '';
    prevLi.innerHTML = `<a onclick="goToPage(${currentPage - 1})"><i class="fa-solid fa-chevron-left"></i></a>`;
    nav.appendChild(prevLi);

    // Page Numbers Loop (Generates exactly 3 to 4 pages as requested)
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = currentPage === i ? 'active' : '';
        li.innerHTML = `<a onclick="goToPage(${i})">${i}</a>`;
        nav.appendChild(li);
    }

    // Next Button
    const nextLi = document.createElement('li');
    nextLi.className = currentPage === totalPages ? 'disabled' : '';
    nextLi.innerHTML = `<a onclick="goToPage(${currentPage + 1})"><i class="fa-solid fa-chevron-right"></i></a>`;
    nav.appendChild(nextLi);
}

function goToPage(page) {
    let totalPages = Math.ceil(database.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderProducts();
    window.scrollTo(0, 0); // Smooth experience scroll
}

function changeItemsPerPage() {
    itemsPerPage = parseInt(document.getElementById('itemsPerPage').value);
    currentPage = 1; // reset to page 1 on adjustment
    renderProducts();
}

// Initialization trigger
document.addEventListener("DOMContentLoaded", function () {
    renderProducts();
});