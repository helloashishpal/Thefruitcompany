// Mobile hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking on a navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Initialize all functionality after DOM is loaded
    initializeNavigation();
    initializeButtons();
    initializeContactForm();
    initializeScrollAnimations();
    updateBusinessHoursStatus();
});

// Smooth scrolling for navigation links
function initializeNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize button functionality
function initializeButtons() {
    // CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to products section
            const productsSection = document.getElementById('products');
            if (productsSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = productsSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add animation to product cards after scroll
                setTimeout(() => {
                    document.querySelectorAll('.product-card').forEach((card, index) => {
                        setTimeout(() => {
                            card.style.transform = 'scale(1.05)';
                            setTimeout(() => {
                                card.style.transform = '';
                            }, 200);
                        }, index * 100);
                    });
                }, 800);
            }
        });
    }

    // Add to cart functionality
    document.querySelectorAll('.product-card .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Show immediate button feedback
            const originalText = this.textContent;
            const originalBg = this.style.backgroundColor;
            
            this.textContent = 'Added!';
            this.style.backgroundColor = '#4CAF50';
            this.disabled = true;
            
            // Show notification
            showNotification(`${productName} (${productPrice}) has been added to your cart!`);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = originalBg;
                this.disabled = false;
            }, 2000);
        });
    });
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = this.querySelector('input[type="text"]');
            const phoneInput = this.querySelector('input[type="tel"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';
            
            // Basic validation
            if (!name || !phone || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(phone)) {
                showNotification('Please enter a valid phone number.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you for your message! We will contact you during our business hours (7 AM - 11 AM).', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
}

// Enhanced notification system
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Determine colors based on type
    let bgColor, textColor;
    switch (type) {
        case 'error':
            bgColor = '#FF5722';
            textColor = 'white';
            break;
        case 'success':
            bgColor = '#4CAF50';
            textColor = 'white';
            break;
        default:
            bgColor = '#4CAF50';
            textColor = 'white';
    }
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: ${textColor};
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        max-width: 300px;
        font-weight: 500;
        font-size: 14px;
        line-height: 1.4;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Scroll animations
function initializeScrollAnimations() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        document.querySelectorAll('.product-card, .benefit-card, .location-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('.product-card, .benefit-card, .location-item').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
}

// Header scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow based on scroll position
        if (scrollTop > 0) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)';
        }
        
        lastScrollTop = scrollTop;
    }
});

// Fruit icon hover effects
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.fruit-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Business hours indicator
function updateBusinessHoursStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const isBusinessHours = currentHour >= 7 && currentHour < 11;
    
    const businessHoursElements = document.querySelectorAll('.contact-item p');
    businessHoursElements.forEach(element => {
        if (element && element.textContent.includes('7 AM - 11 AM')) {
            // Remove existing status indicator
            const existingIndicator = element.querySelector('.status-indicator');
            if (existingIndicator) {
                existingIndicator.remove();
            }
            
            // Create new status indicator
            const statusIndicator = document.createElement('span');
            statusIndicator.className = 'status-indicator';
            statusIndicator.style.cssText = `
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                margin-left: 8px;
                background: ${isBusinessHours ? '#4CAF50' : '#FF5722'};
                animation: pulse 2s infinite;
            `;
            
            element.appendChild(statusIndicator);
        }
    });
}

// Add pulse animation for status indicator
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.1);
            opacity: 0.7;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(pulseStyle);

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('Script error:', e.error);
});

// Ensure all functionality works even if some elements are missing
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && typeof callback === 'function') {
        callback(element);
    }
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Re-run initialization if needed
        setTimeout(() => {
            if (!document.querySelector('.notification-styles')) {
                // Ensure notification system is ready
                console.log('Fruity Co. website loaded successfully');
            }
        }, 100);
    });
} else {
    // DOM is already loaded
    setTimeout(() => {
        console.log('Fruity Co. website loaded successfully');
    }, 100);
}