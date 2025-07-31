// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 99.99,
        image: "MP000000019549901_437Wx649H_202310072320441.avif",
        rating: 4,
        category: "Electronics"
    },
    {
        id: 2,
        name: "Smart Watch Fitness Tracker",
        price: 129.99,
        image: "images (2).jpeg",
        rating: 5,
        category: "Electronics"
    },
    {
        id: 3,
        name: "Men's Casual T-Shirt",
        price: 24.99,
        image: "coloured-collar-t-shirt-for-men-casual-regular-fit-t-shirt-pure-cotton-lightweight-comfortable-classic-t-shirt-classic-vertical-stripes-medium-green-product-images-rvru39vlcx-0-202209090825.webp",
        rating: 4,
        category: "Fashion"
    },
    {
        id: 4,
        name: "Women's Running Shoes",
        price: 79.99,
        image: "W+NIKE+VOMERO+18.avif",
        rating: 5,
        category: "Fashion"
    },
    {
        id: 5,
        name: "Modern Coffee Table",
        price: 149.99,
        image: "64f2db9c78a75765700f7ab1-ikifly-modern-glossy-white-coffee-table.jpg",
        rating: 4,
        category: "Home Decor"
    },
    {
        id: 6,
        name: "Ceramic Plant Pot Set",
        price: 39.99,
        image: "MP000000016731384_437Wx649H_202303022008181.avif",
        rating: 4,
        category: "Home Decor"
    },
    {
        id: 7,
        name: "Organic Face Cream",
        price: 29.99,
        image: "images (3).jpeg",
        rating: 4,
        category: "Beauty"
    },
    {
        id: 8,
        name: "Electric Toothbrush",
        price: 59.99,
        image: "1_22320a77-6496-492d-a881-d039ae22e7ed.webp",
        rating: 5,
        category: "Beauty"
    },
    {
        id: 9,
        name: "Wireless Charging Pad",
        price: 34.99,
        image: "images.jpeg",
        rating: 3,
        category: "Electronics"
    },
    {
        id: 10,
        name: "Leather Wallet",
        price: 49.99,
        image: "81WIcyHQ7oL._AC_UY1100_ (1).jpg",
        rating: 4,
        category: "Fashion"
    },
    {
        id: 11,
        name: "Decorative Throw Pillow",
        price: 19.99,
        image: "images (4).jpeg",
        rating: 4,
        category: "Home Decor"
    },
    {
        id: 12,
        name: "Hair Dryer",
        price: 45.99,
        image: "61JdNyhyxuL.jpg",
        rating: 4,
        category: "Beauty"
    }
];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const loginBtn = document.getElementById('login-btn');
const cartBtn = document.getElementById('cart-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const cartModal = document.getElementById('cart-modal');
const checkoutModal = document.getElementById('checkout-modal');
const confirmationModal = document.getElementById('confirmation-modal');
const closeButtons = document.querySelectorAll('.close');
const registerLink = document.getElementById('register-link');
const checkoutBtn = document.getElementById('checkout-btn');
const continueShoppingBtn = document.getElementById('continue-shopping');

// Cart state
let cart = [];

// Initialize the app
function init() {
    renderProducts();
    setupEventListeners();
    loadCart();
}

// Render products to the page
function renderProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Generate star rating
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= product.rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">${stars}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// Set up event listeners
function setupEventListeners() {
    // Modal open buttons
    loginBtn.addEventListener('click', () => openModal(loginModal));
    cartBtn.addEventListener('click', () => {
        renderCart();
        openModal(cartModal);
    });
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });
    checkoutBtn.addEventListener('click', () => {
        closeModal(cartModal);
        openModal(checkoutModal);
    });
    continueShoppingBtn.addEventListener('click', () => {
        closeModal(confirmationModal);
    });
    
    // Close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Add to cart buttons (delegated event)
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });
    
    // Cart item quantity changes (delegated events)
    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-btn')) {
            const itemId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
            const isIncrease = e.target.classList.contains('increase');
            updateQuantity(itemId, isIncrease);
        }
        
        if (e.target.classList.contains('remove-item')) {
            const itemId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
            removeFromCart(itemId);
        }
    });
    
    // Form submissions
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login functionality would be implemented here');
        closeModal(loginModal);
    });
    
    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Registration functionality would be implemented here');
        closeModal(registerModal);
    });
    
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        placeOrder();
    });
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    showAddedToCartMessage(product.name);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, isIncrease) {
    const item = cart.find(item => item.id === productId);
    
    if (!item) return;
    
    if (isIncrease) {
        item.quantity += 1;
    } else {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
            return;
        }
    }
    
    updateCart();
}

function updateCart() {
    saveCart();
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-id', item.id);
        
        cartItem.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                    <button class="quantity-btn increase">+</button>
                    <span class="remove-item">Remove</span>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
}

function placeOrder() {
    // In a real app, this would send the order to a server
    const orderId = 'SHOP' + Math.floor(Math.random() * 1000000);
    document.getElementById('order-id').textContent = orderId;
    
    // Clear the cart
    cart = [];
    updateCart();
    
    // Show confirmation
    closeModal(checkoutModal);
    openModal(confirmationModal);
}

// Modal functions
function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Local storage functions
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Helper functions
function showAddedToCartMessage(productName) {
    const message = document.createElement('div');
    message.className = 'added-to-cart-message';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} added to cart</span>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 3000);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);