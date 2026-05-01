/* ============================================
   WanderLux Travel Agency - JavaScript
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimations();
    initializeCalculator();
    initializeFormValidation();
});

/* ==========================================
   SCROLL ANIMATIONS
   ========================================== */

function initializeScrollAnimations() {
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        scrollAnimateElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        scrollAnimateElements.forEach(element => {
            element.style.animation = 'fadeInUp 0.8s ease forwards';
        });
    }
}

/* ==========================================
   TRIP COST CALCULATOR
   ========================================== */

function initializeCalculator() {
    const calculatorForm = document.getElementById('calculator-form');
    if (!calculatorForm) return;

    // Destination pricing (base cost per person per day)
    const destinationPrices = {
        bali: 150,
        egypt: 120,
        paris: 200,
        'new-zealand': 180,
        thailand: 100,
        japan: 220,
        italy: 190,
        spain: 160
    };

    // Travel style multipliers
    const styleMultipliers = {
        budget: 1,
        standard: 1.5,
        luxury: 2
    };

    calculatorForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const destination = document.getElementById('destination').value;
        const travellers = parseInt(document.getElementById('travellers').value);
        const days = parseInt(document.getElementById('days').value);
        const travelStyle = document.querySelector('input[name="travel-style"]:checked').value;

        // Validate inputs
        if (!destination || !travellers || !days) {
            alert('Please fill in all fields');
            return;
        }

        // Calculate cost
        const basePrice = destinationPrices[destination];
        const multiplier = styleMultipliers[travelStyle];
        const totalCost = basePrice * travellers * days * multiplier;

        // Get destination name from select
        const destinationSelect = document.getElementById('destination');
        const destinationName = destinationSelect.options[destinationSelect.selectedIndex].text.split('(')[0].trim();

        // Format travel style name
        const styleDisplay = travelStyle.charAt(0).toUpperCase() + travelStyle.slice(1);

        // Display result
        displayCalculatorResult(destinationName, travellers, days, totalCost, styleDisplay, basePrice, multiplier);
    });

    function displayCalculatorResult(destination, travellers, days, total, style, basePrice, multiplier) {
        // Show result section
        const resultSection = document.getElementById('result-section');
        resultSection.style.display = 'block';

        // Update result text
        const resultText = document.getElementById('result-text');
        resultText.textContent = `Estimated cost for ${travellers} traveller${travellers > 1 ? 's' : ''} to ${destination} for ${days} day${days > 1 ? 's' : ''}: $${total.toLocaleString()} – ${style} Travel Package.`;

        // Update breakdown
        const breakdownList = document.getElementById('breakdown-list');
        breakdownList.innerHTML = `
            <li>
                <span>Daily Cost per Person (${destination}):</span>
                <span>$${basePrice}</span>
            </li>
            <li>
                <span>Number of Travellers:</span>
                <span>${travellers}</span>
            </li>
            <li>
                <span>Number of Days:</span>
                <span>${days}</span>
            </li>
            <li>
                <span>Travel Style Multiplier (${style}):</span>
                <span>${multiplier}x</span>
            </li>
            <li style="border-top: 1px solid var(--border-color); padding-top: 0.5rem; margin-top: 0.5rem;">
                <span><strong>Subtotal Calculation:</strong></span>
                <span><strong>$${basePrice} × ${travellers} × ${days} × ${multiplier} = $${total.toLocaleString()}</strong></span>
            </li>
        `;

        // Update total
        document.getElementById('total-cost').textContent = `$${total.toLocaleString()}`;

        // Scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ==========================================
   FORM VALIDATION
   ========================================== */

function initializeFormValidation() {
    const appointmentForm = document.getElementById('appointment-form');
    const contactForm = document.getElementById('contact-form');

    if (appointmentForm) {
        setupFormValidation(appointmentForm, 'appointment');
    }

    if (contactForm) {
        setupFormValidation(contactForm, 'contact');
    }
}

function setupFormValidation(form, formType) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm(form, formType)) {
            handleFormSubmission(form, formType);
        }
    });
}

function validateForm(form, formType) {
    let isValid = true;
    const formElements = form.querySelectorAll('input, select, textarea');

    formElements.forEach(element => {
        if (element.hasAttribute('required')) {
            if (!validateField(element, formType)) {
                isValid = false;
            }
        }
    });

    return isValid;
}

function validateField(element, formType) {
    const value = element.value.trim();
    const errorElement = document.getElementById(`${element.id}-error`);
    let isValid = true;
    let errorMessage = '';

    // Check if required
    if (!value) {
        isValid = false;
        errorMessage = 'This field is required';
    } 
    // Validate email
    else if (element.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    // Validate phone
    else if (element.type === 'tel') {
        const phoneRegex = /^[\d\s+\-()]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    // Validate date
    else if (element.type === 'date') {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            errorMessage = 'Please select a future date';
        }
    }
    // Validate checkbox consent
    else if (element.type === 'checkbox' && element.name === 'consent') {
        if (!element.checked) {
            isValid = false;
            errorMessage = 'You must agree to be contacted';
        }
    }
    // Validate text length
    else if (element.tagName === 'TEXTAREA' && value.length < 10) {
        isValid = false;
        errorMessage = 'Please provide at least 10 characters';
    }

    // Display or hide error message
    if (errorElement) {
        if (isValid) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            element.style.borderColor = '';
        } else {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            element.style.borderColor = 'var(--accent-color)';
        }
    }

    return isValid;
}

function handleFormSubmission(form, formType) {
    // Show success message
    let successMessageId;
    
    if (formType === 'appointment') {
        successMessageId = 'success-message';
    } else if (formType === 'contact') {
        successMessageId = 'contact-success-message';
    }

    const successMessage = document.getElementById(successMessageId);
    if (successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth' });

        // Reset form after some time
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    }

    // Log form data (replace with actual submission)
    const formData = new FormData(form);
    console.log('Form Data:', Object.fromEntries(formData));

    /* 
    IMPORTANT NOTE FOR DEPLOYMENT:
    To actually send emails, you need to implement one of these solutions:
    
    1. EMAILJS (Easy, free, no backend needed):
       - Sign up at https://www.emailjs.com/
       - Include their library: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/build/index.min.js"></script>
       - Initialize: emailjs.init('YOUR_PUBLIC_KEY');
       - Send email: emailjs.send('SERVICE_ID', 'TEMPLATE_ID', formData);
    
    2. FORMSPREE (Free, simple):
       - Change form action to: https://formspree.io/f/YOUR_FORM_ID
       - Change form method to: POST
    
    3. NETLIFY FORMS (If hosting on Netlify):
       - Add netlify attribute and hidden field
    
    For now, the form data is logged to console and message shows success.
    */
}

/* ==========================================
   REAL-TIME FIELD VALIDATION
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            // Get form type from closest form
            const form = input.closest('form');
            let formType = 'appointment';
            
            if (form && form.id === 'contact-form') {
                formType = 'contact';
            }
            
            validateField(input, formType);
        });

        input.addEventListener('focus', () => {
            const errorElement = document.getElementById(`${input.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
            input.style.borderColor = '';
        });
    });
});

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add active class to current nav link
document.addEventListener('DOMContentLoaded', () => {
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });
});

/* ==========================================
   FORM RESET WITH VALIDATION CLEANUP
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('reset', () => {
            // Clear all error messages
            const errorMessages = form.querySelectorAll('.error-message');
            errorMessages.forEach(error => {
                error.textContent = '';
                error.style.display = 'none';
            });

            // Clear invalid field styling
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.style.borderColor = '';
            });
        });
    });
});

/* ==========================================
   CONSOLE MESSAGE FOR DEVELOPERS
   ========================================== */

console.log('%cWanderLux Travel Agency', 'font-size: 20px; font-weight: bold; color: #2c3e50;');
console.log('%cDeveloper Note: To enable email functionality, implement EmailJS or similar service.', 'color: #e74c3c; font-weight: bold;');
console.log('%cSee comments in script.js for email implementation options.', 'color: #3498db;');
