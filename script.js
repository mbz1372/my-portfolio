// Language management
let currentLanguage = 'en';
let currentTheme = 'light';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    const savedLanguage = localStorage.getItem('website-language') || 'en';
    setLanguage(savedLanguage);

    // Initialize theme
    const savedTheme = localStorage.getItem('website-theme') || 'light';
    setTheme(savedTheme);
    
    // Handle profile image loading
    handleProfileImageLoading();
    
    // Add smooth transitions
    addPageTransitions();
    
    // Initialize navigation
    initializeNavigation();
    
    // Add scroll effects
    addScrollEffects();
    
    // Initialize interactive elements
    initializeInteractiveElements();
    
    // Initialize mouse cursor
    initializeCustomCursor();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize skill bars animation
    initializeSkillBars();
    
    // Initialize contact form
    initializeContactForm();
});

// Language switching function
function toggleLanguage() {
    const newLanguage = currentLanguage === 'en' ? 'fa' : 'en';
    setLanguage(newLanguage);
}

// Set language function
function setLanguage(language) {
    currentLanguage = language;
    
    // Update HTML attributes
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', language);
    htmlElement.setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr');
    
    // Update all text content
    updateTextContent(language);
    
    // Save preference
    localStorage.setItem('website-language', language);
    
    // Update language button text
    updateLanguageButton(language);
    
    // Add transition effect
    document.body.style.opacity = '0.7';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 150);
}

// Update text content based on language
function updateTextContent(language) {
    const elements = document.querySelectorAll('[data-en][data-fa]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${language}`);
        if (text) {
            // Handle different element types
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update form placeholders
    updateFormPlaceholders(language);
}

// Update form placeholders
function updateFormPlaceholders(language) {
    const inputs = document.querySelectorAll('input[data-en-placeholder], textarea[data-en-placeholder]');
    inputs.forEach(input => {
        const placeholder = input.getAttribute(`data-${language}-placeholder`);
        if (placeholder) {
            input.placeholder = placeholder;
        }
    });
}

// Update language button text
function updateLanguageButton(language) {
    const langBtn = document.querySelector('.lang-text');
    if (langBtn) {
        langBtn.textContent = language === 'en' ? 'فارسی' : 'English';
    }
}

// Theme switching function
function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Set theme function
function setTheme(theme) {
    currentTheme = theme;
    
    // Update body class
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    // Save preference
    localStorage.setItem('website-theme', theme);
    
    // Update theme button
    updateThemeButton(theme);
}

// Update theme button
function updateThemeButton(theme) {
    const themeBtn = document.querySelector('.theme-btn');
    const themeIcon = themeBtn?.querySelector('i');
    const themeText = themeBtn?.querySelector('.theme-text');
    
    if (themeBtn && themeIcon && themeText) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark';
        }
    }
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

// Handle contact form submission
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    
    // Reset form
    e.target.reset();
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Get notification icon
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Get notification color
function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// Handle profile image loading
function handleProfileImageLoading() {
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        profileImg.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = this.parentElement.querySelector('.image-overlay');
            if (placeholder) {
                placeholder.style.opacity = '1';
            }
        });
    }
}

// Initialize custom cursor
function initializeCustomCursor() {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        // Smooth follower movement
        followerX += (mouseX - followerX) * 0.05;
        followerY += (mouseY - followerY) * 0.05;
        
        // Update positions
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .nav-menu a, .social-link, .quick-link-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Hide cursor on mobile
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .quick-link-card, .contact-item, .social-link');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
    
    // Animate numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

// Animate number
function animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 16);
}

// Initialize skill bars
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const percentage = progressBar.getAttribute('data-percentage');
                    progressBar.style.width = percentage + '%';
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            bar.style.width = '0%';
            observer.observe(bar);
        });
    }
}

// Initialize filters
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('[data-category]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            filterItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Add page transitions
function addPageTransitions() {
    // Add fade-in effect to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    // Fade in after page loads
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// Initialize navigation
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add scroll effects
function addScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }
    
    // Parallax effect for floating elements
    const floatingElements = document.querySelectorAll('.floating-circle');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.quick-link-card, .timeline-content, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn, .lang-btn, .theme-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        font-size: 0.875rem;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);