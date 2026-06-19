// Local Dataset with high quality placeholder image fallbacks
let cartItemsDatabase = [
    {
        id: "prod-101",
        title: "T-shirts with multiple colors, for men and lady",
        size: "medium",
        color: "blue",
        material: "Plastic",
        seller: "Artel Market",
        price: 78.99,
        quantity: 9,
        imgUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200"
    },
    {
        id: "prod-102",
        title: "Solid Backpack blue jeans large size",
        size: "medium",
        color: "blue",
        material: "Plastic",
        seller: "Best factory LLC",
        price: 39.00,
        quantity: 3,
        imgUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200"
    },
    {
        id: "prod-103",
        title: "Water boiler black for kitchen, 1200 Watt",
        size: "medium",
        color: "blue",
        material: "Plastic",
        seller: "Artel Market",
        price: 170.50,
        quantity: 1,
        imgUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200"
    }
];

const DISCOUNT_VALUE = 60.00;
const TAX_VALUE = 14.00;

document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cartItemsContainer");

    function renderCartLayout() {
        if (!cartContainer) return;
        cartContainer.innerHTML = '';

        if (cartItemsDatabase.length === 0) {
            cartContainer.innerHTML = `<div class="p-4 text-center text-muted">Your cart is empty!</div>`;
            calculateCartTotals();
            return;
        }

        cartItemsDatabase.forEach(item => {
            const itemHtml = `
                    <div class="cart-item-row" data-id="${item.id}">
                        
                        <div class="item-upper-mobile-row flex-grow-1 d-flex">
                            <div class="item-img-box">
                                <img src="${item.imgUrl}" alt="${item.title}" onerror="this.onerror=null; this.src='https://placehold.co/80x80/e3e8ee/8b96a5?text=Product';">
                            </div>
                            
                            <div class="item-body-content-flex">
                                <div class="item-details-block">
                                    <a href="#" class="item-title">${item.title}</a>
                                    <div class="item-meta-text">
                                        Size: ${item.size}, Color: ${item.color}, Material: ${item.material}<br>
                                        Seller: ${item.seller}
                                    </div>
                                    
                                    <div class="item-actions-row d-none d-md-flex">
                                        <button class="btn-action-sm text-danger remove-trigger">Remove</button>
                                        <button class="btn-action-sm text-primary">Save for later</button>
                                    </div>
                                </div>

                                <div class="item-right-meta d-none d-md-flex">
                                    <span class="item-price-tag">$${item.price.toFixed(2)}</span>
                                    <select class="form-select form-select-sm desktop-qty-dropdown qty-dropdown-trigger">
                                        ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => `<option value="${n}" ${item.quantity === n ? 'selected' : ''}>Qty: ${n}</option>`).join('')}
                                    </select>
                                </div>
                            </div>

                            <button class="mobile-options-trigger d-md-none">
                                <i class="bi bi-three-dots-vertical"></i>
                            </button>
                        </div>

                        <div class="item-bottom-controls d-md-none">
                            <div class="mobile-qty-counter">
                                <button class="btn-counter-ticker counter-minus-btn">-</button>
                                <div class="counter-value-display">${item.quantity}</div>
                                <button class="btn-counter-ticker counter-plus-btn">+</button>
                            </div>
                            <span class="item-price-tag">$${item.price.toFixed(2)}</span>
                        </div>

                    </div>
                `;
            cartContainer.insertAdjacentHTML('beforeend', itemHtml);
        });

        calculateCartTotals();
    }

    function calculateCartTotals() {
        let subtotal = 0;
        cartItemsDatabase.forEach(item => {
            subtotal += (item.price * item.quantity);
        });

        // Adjust totals dynamically if cart becomes empty
        const discount = cartItemsDatabase.length > 0 ? DISCOUNT_VALUE : 0;
        const tax = cartItemsDatabase.length > 0 ? TAX_VALUE : 0;
        const finalTotal = Math.max(0, (subtotal - discount) + tax);

        document.getElementById("summarySubtotal").innerText = `$${subtotal.toFixed(2)}`;
        document.getElementById("summaryDiscount").innerText = `-$${discount.toFixed(2)}`;
        document.getElementById("summaryTax").innerText = `+$${tax.toFixed(2)}`;
        document.getElementById("summaryTotal").innerText = `$${finalTotal.toFixed(2)}`;

        // Adjust header badge count
        const titleEl = document.querySelector(".cart-main-title");
        if (titleEl) titleEl.innerText = `My cart (${cartItemsDatabase.length})`;
    }

    // Dropdown quantity changes
    if (cartContainer) {
        cartContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('qty-dropdown-trigger')) {
                const targetRow = e.target.closest('.cart-item-row');
                const itemId = targetRow.getAttribute('data-id');
                const matchedItem = cartItemsDatabase.find(i => i.id === itemId);
                if (matchedItem) {
                    matchedItem.quantity = parseInt(e.target.value);
                    calculateCartTotals();
                }
            }
        });

        // Button operational trackers
        cartContainer.addEventListener('click', (e) => {
            const targetRow = e.target.closest('.cart-item-row');
            if (!targetRow) return;
            const itemId = targetRow.getAttribute('data-id');
            const matchedItem = cartItemsDatabase.find(i => i.id === itemId);

            if (e.target.classList.contains('counter-minus-btn')) {
                if (matchedItem && matchedItem.quantity > 1) {
                    matchedItem.quantity--;
                    renderCartLayout();
                }
            }

            if (e.target.classList.contains('counter-plus-btn')) {
                if (matchedItem && matchedItem.quantity < 10) {
                    matchedItem.quantity++;
                    renderCartLayout();
                }
            }

            if (e.target.classList.contains('remove-trigger')) {
                cartItemsDatabase = cartItemsDatabase.filter(i => i.id !== itemId);
                renderCartLayout();
            }
        });
    }

    // Clear all trigger operations
    const clearBtn = document.getElementById("clearAllCartBtn");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            cartItemsDatabase = [];
            renderCartLayout();
        });
    }

    renderCartLayout();
});