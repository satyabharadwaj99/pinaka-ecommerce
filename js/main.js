// Content Management System
const cms = {
    updateContent: function(elementId, content) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = content;
        }
    },

    updateImage: function(elementId, imageUrl) {
        const element = document.getElementById(elementId);
        if (element) {
            element.src = imageUrl;
        }
    }
};

// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
    }

    addItem(product) {
        this.items.push(product);
        this.calculateTotal();
        this.updateCartUI();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.calculateTotal();
        this.updateCartUI();
    }

    calculateTotal() {
        this.total = this.items.reduce((sum, item) => sum + item.price, 0);
    }

    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.items.length;
        }

        const cartTotal = document.querySelector('.cart-total');
        if (cartTotal) {
            cartTotal.textContent = `₹${this.total.toFixed(2)}`;
        }
    }
}

// Initialize shopping cart
const cart = new ShoppingCart();

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return isValid;
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Admin panel functionality
function saveChanges() {
    // Get all form values
    const formData = {
        hero: {
            title: document.getElementById('heroTitle')?.value,
            subtitle: document.getElementById('heroSubtitle')?.value
        },
        products: {
            coal: {
                title: document.getElementById('coalTitle')?.value,
                description: document.getElementById('coalDesc')?.value,
                price: document.getElementById('coalPrice')?.value
            },
            fertilizer: {
                title: document.getElementById('fertTitle')?.value,
                description: document.getElementById('fertDesc')?.value,
                price: document.getElementById('fertPrice')?.value
            }
        },
        contact: {
            address: document.getElementById('address')?.value,
            phone: document.getElementById('phone')?.value,
            email: document.getElementById('email')?.value
        }
    };

    // Save to localStorage for demo purposes
    localStorage.setItem('websiteContent', JSON.stringify(formData));
    
    // Show success message
    alert('Changes saved successfully!');
}

// Load saved content
function loadSavedContent() {
    const savedContent = localStorage.getItem('websiteContent');
    if (savedContent) {
        const content = JSON.parse(savedContent);
        
        // Update the website content with saved values
        Object.keys(content).forEach(section => {
            Object.keys(content[section]).forEach(key => {
                const element = document.getElementById(`${section}${key.charAt(0).toUpperCase() + key.slice(1)}`);
                if (element) {
                    element.value = content[section][key];
                }
            });
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSavedContent();
});
