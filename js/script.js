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

categoryItems.forEach(item=>{
    
    item.addEventListener("click",()=>{

        categoryItems.forEach(el=>{
            el.classList.remove("active");
        });

        item.classList.add("active");
    });

});


// listing page

// pagination

const mockupProductsDatabase = [
    {
        title: "Canon Camera EOS 2000, Black 10x zoom",
        price: "998.00",
        oldPrice: "1128.00",
        rating: "7.5",
        orders: "154",
        hasFreeShipping: true,
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        imgUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400"
    },
    {
        title: "GoPro HERO6 4K Action Camera - Black Edition",
        price: "799.00",
        oldPrice: null,
        rating: "4.8",
        orders: "89",
        hasFreeShipping: true,
        desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
        imgUrl: "https://images.unsplash.com/photo-1565538810844-1e119de867c2?w=400"
    },
    {
        title: "GoPro HERO6 4K Action Camera - Alternate Pro Grip",
        price: "895.00",
        oldPrice: "999.00",
        rating: "4.5",
        orders: "120",
        hasFreeShipping: false,
        desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
        imgUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400"
    },
    {
        title: "Premium Slim Performance Laptop 15.6-inch Gray",
        price: "1299.00",
        oldPrice: "1450.00",
        rating: "4.9",
        orders: "240",
        hasFreeShipping: true,
        desc: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.",
        imgUrl: "https://images.unsplash.com/photo-1496181130204-755241524eab?w=400"
    },
    {
        title: "Smart Watch Silver Metallic Luxury Edition V2",
        price: "298.00",
        oldPrice: "349.00",
        rating: "4.3",
        orders: "312",
        hasFreeShipping: true,
        desc: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas.",
        imgUrl: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400"
    },
    {
        title: "High-Fidelity Over-Ear Wireless Headphones ANC",
        price: "198.00",
        oldPrice: null,
        rating: "4.6",
        orders: "415",
        hasFreeShipping: true,
        desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi.",
        imgUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        title: "Ultra Wide-Angle Mirrorless Premium Lens",
        price: "450.00",
        oldPrice: "520.00",
        rating: "4.7",
        orders: "67",
        hasFreeShipping: false,
        desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
        imgUrl: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400"
    }
];

// App States
let currentPage = 1;
let itemsPerPage = parseInt(document.getElementById('itemsPerPageSelect').value);

// DOM Elements
const dynamicProductsList = document.getElementById('dynamicProductsList');
const paginationNav = document.getElementById('paginationNav');
const itemsPerPageSelect = document.getElementById('itemsPerPageSelect');
const totalItemsCounter = document.getElementById('totalItemsCounter');

// Products render karne ka function
function renderActivePageData() {
    dynamicProductsList.innerHTML = '';
    totalItemsCounter.innerText = `${mockupProductsDatabase.length} items found in Mobile accessory`;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleProducts = mockupProductsDatabase.slice(startIndex, endIndex);

    visibleProducts.forEach(product => {
        const oldPriceHtml = product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : '';
        const shippingHtml = product.hasFreeShipping ? `<span class="shipping-tag">Free Shipping</span>` : '';
        
        const cardHtml = `
            <div class="mockup-product-card">
                <div class="card-img-wrapper">
                    <img src="${product.imgUrl}" alt="${product.title}">
                </div>
                <div class="card-info-content">
                    <a href="#" class="product-main-title">${product.title}</a>
                    <div class="price-row">
                        <span class="current-price">$${product.price}</span>
                        ${oldPriceHtml}
                    </div>
                    <div class="meta-rating-row">
                        <div class="stars-indicator">
                            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i>
                        </div>
                        <span class="rating-value">${product.rating}</span>
                        <span class="dot-separator">•</span>
                        <span class="orders-count">${product.orders} orders</span>
                        <span class="dot-separator">•</span>
                        ${shippingHtml}
                    </div>
                    <p class="product-desc-text">${product.desc}</p>
                    <a href="#" class="view-details-link">View details</a>
                </div>
                <button class="btn-wishlist-heart" title="Save to wishlist"><i class="bi bi-heart"></i></button>
            </div>
        `;
        dynamicProductsList.insertAdjacentHTML('beforeend', cardHtml);
    });

    renderPaginationBar();
}

// Pagination buttons banane ka function (HTML mein 'data-page' store kar rahe hain)
function renderPaginationBar() {
    paginationNav.innerHTML = '';
    const totalPages = Math.ceil(mockupProductsDatabase.length / itemsPerPage);

    // Prev Button
    const prevDisabled = (currentPage === 1) ? 'disabled' : '';
    let navHtml = `
        <li class="page-item ${prevDisabled}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">
                <i class="bi bi-chevron-left"></i>
            </a>
        </li>
    `;

    // Number Buttons
    for (let i = 1; i <= totalPages; i++) {
        const activeState = (currentPage === i) ? 'active' : '';
        navHtml += `
            <li class="page-item ${activeState}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    // Next Button
    const nextDisabled = (currentPage === totalPages) ? 'disabled' : '';
    navHtml += `
        <li class="page-item ${nextDisabled}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">
                <i class="bi bi-chevron-right"></i>
            </a>
        </li>
    `;

    paginationNav.innerHTML = navHtml;
}

// ==========================================================================
// FIX: SAFE INTERACTION ENGINE (NO MORE WINDOW PROBLEM!)
// ==========================================================================
// Ab humne HTML se onclick khatam kar ke pure container par click event laga diya hai.
paginationNav.addEventListener('click', function(event) {
    // Check karna ki click kisi link (.page-link) par hua hai ya uske andar ke icon par
    const targetLink = event.target.closest('.page-link');
    
    // Agar click pagination link par nahi hua, toh kuch mat karo
    if (!targetLink) return;
    
    event.preventDefault(); // Page reload hone se rokna

    // Link se target page number uthana
    const targetPage = parseInt(targetLink.getAttribute('data-page'));
    const totalPages = Math.ceil(mockupProductsDatabase.length / itemsPerPage);
    
    // Agar page number valid hai, toh state update karke render karo
    if (targetPage >= 1 && targetPage <= totalPages) {
        currentPage = targetPage;
        renderActivePageData();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
    }
});

// Dropdown Change Listener
itemsPerPageSelect.addEventListener('change', function() {
    itemsPerPage = parseInt(this.value);
    currentPage = 1;
    renderActivePageData();
});

// Initial Setup Call
renderActivePageData();