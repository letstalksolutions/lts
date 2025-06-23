// JavaScript for Let's Talk Solutions website

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports.isValidEmail = isValidEmail;
}

if (typeof document !== 'undefined') {

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle menu button appearance
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    
    if (testimonialDots.length > 0) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Remove active class from all slides and dots
                testimonialSlides.forEach(slide => {
                    slide.classList.remove('active');
                });
                testimonialDots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                // Add active class to current slide and dot
                testimonialSlides[index].classList.add('active');
                dot.classList.add('active');
            });
        });
        
        // Auto-rotate testimonials
        let currentSlide = 0;
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            
            // Remove active class from all slides and dots
            testimonialSlides.forEach(slide => {
                slide.classList.remove('active');
            });
            testimonialDots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Add active class to current slide and dot
            testimonialSlides[currentSlide].classList.add('active');
            testimonialDots[currentSlide].classList.add('active');
        }, 5000);
    }
    
    // Sticky header
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.padding = '10px 0';
                header.style.background = 'rgba(13, 25, 65, 0.95)';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '';
                header.style.background = '';
                header.style.boxShadow = '';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    mobileMenuBtn.click();
                }
            }
        });
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length > 0) {
        const checkIfInView = () => {
            animateElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        };
        
        window.addEventListener('scroll', checkIfInView);
        checkIfInView(); // Check on initial load
    }
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            
            // Reset error messages
            this.querySelectorAll('.error-message').forEach(error => {
                error.remove();
            });
            
            // Validate name
            if (!nameInput.value.trim()) {
                isValid = false;
                showError(nameInput, 'Please enter your name');
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                isValid = false;
                showError(emailInput, 'Please enter your email');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email address');
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                isValid = false;
                showError(messageInput, 'Please enter your message');
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // In a real implementation, you would send the form data to a server here
            }
        });
        
        function showError(input, message) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            
            input.parentNode.appendChild(errorMessage);
            input.classList.add('error');
        }
        
    }
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                });
                
                // Open clicked item if it wasn't already open
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
});



// Cookie Consent Popup Logic
const cookieConsentPopup = document.getElementById("cookie-consent-popup");
const acceptCookiesBtn = document.getElementById("accept-cookies-btn");

if (cookieConsentPopup && acceptCookiesBtn) {
    // Check if consent was already given
    if (!getCookie("cookie_consent_accepted")) {
        cookieConsentPopup.style.display = "flex"; // Show the popup
    }

    acceptCookiesBtn.addEventListener("click", function() {
        setCookie("cookie_consent_accepted", "true", 365);
        cookieConsentPopup.style.display = "none";
    });
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
}
 LW-4-create-a-linkedin-url-page
    // Add Secure and SameSite=Lax attributes for enhanced security
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; Secure; SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {LW-4-create-a-linkedin-url-page
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

}
main
