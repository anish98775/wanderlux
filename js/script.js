/* ============================================
   WanderLux Travel Agency - JavaScript
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimations();
    initializeHeroSlider();
    initializeCalculator();
    initializeFormValidation();
});

/* ==========================================
   HERO SLIDER
   ========================================== */

function initializeHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!slides.length || !dots.length) return;

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === index);
        });
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });
        currentSlide = index;
    }

    function startAutoSlide() {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            showSlide(currentSlide);
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
            startAutoSlide();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    showSlide(currentSlide);
    startAutoSlide();
}

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

    const destinationPrices = {
        bali: 180,
        egypt: 140,
        paris: 280,
        'new-zealand': 250,
        thailand: 120,
        japan: 300,
        italy: 260,
        spain: 190
    };

    const styleMultipliers = {
        budget: 1.0,
        standard: 1.8,
        luxury: 3.2
    };

    const seasonalAdjustments = {
        peak: 1.3,
        shoulder: 1.1,
        off: 0.85
    };

    calculatorForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const destination = document.getElementById('destination').value;
        const travellers = parseInt(document.getElementById('travellers').value, 10);
        const days = parseInt(document.getElementById('days').value, 10);
        const travelStyle = document.querySelector('input[name="travel-style"]:checked')?.value || 'budget';
        const season = document.querySelector('input[name="season"]:checked')?.value || 'shoulder';

        if (!destination || !travellers || !days) {
            showCalculatorError('Please fill in all required fields');
            return;
        }

        if (travellers < 1 || travellers > 20) {
            showCalculatorError('Number of travellers must be between 1 and 20');
            return;
        }

        if (days < 1 || days > 365) {
            showCalculatorError('Number of days must be between 1 and 365');
            return;
        }

        const basePrice = destinationPrices[destination] || 0;
        const styleMultiplier = styleMultipliers[travelStyle] || 1;
        const seasonalMultiplier = seasonalAdjustments[season] || 1;

        let subtotal = basePrice * travellers * days * styleMultiplier;
        subtotal *= seasonalMultiplier;

        const taxesAndFees = subtotal * 0.15;
        const flightEstimate = destination === 'bali' || destination === 'thailand' ? 800 : 1200;
        const totalFlights = flightEstimate * travellers;
        const totalCost = Math.round(subtotal + taxesAndFees + totalFlights);

        const destinationSelect = document.getElementById('destination');
        const destinationName = destinationSelect.options[destinationSelect.selectedIndex].text.split('(')[0].trim();
        const styleDisplay = travelStyle.charAt(0).toUpperCase() + travelStyle.slice(1);
        const seasonDisplay = season.charAt(0).toUpperCase() + season.slice(1);

        displayCalculatorResult(destinationName, travellers, days, totalCost, styleDisplay, seasonDisplay, basePrice, styleMultiplier, seasonalMultiplier, taxesAndFees, totalFlights);
    });

    function showCalculatorError(message) {
        const existingError = document.querySelector('.calculator-error');
        if (existingError) existingError.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'calculator-error';
        errorDiv.style.cssText = `
            background: #fee;
            border: 1px solid #fcc;
            color: #c33;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
        `;
        errorDiv.textContent = message;
        calculatorForm.insertBefore(errorDiv, calculatorForm.firstChild);

        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    function displayCalculatorResult(destination, travellers, days, total, style, season, basePrice, styleMultiplier, seasonalMultiplier, taxesAndFees, totalFlights) {
        const resultSection = document.getElementById('result-section');
        if (!resultSection) return;

        resultSection.style.display = 'block';
        const resultText = document.getElementById('result-text');
        resultText.textContent = `Estimated cost for ${travellers} traveller${travellers > 1 ? 's' : ''} to ${destination} for ${days} day${days > 1 ? 's' : ''}: $${total.toLocaleString()} – ${style} Travel Package (${season} Season).`;

        const breakdownList = document.getElementById('breakdown-list');
        const subtotal = basePrice * travellers * days * styleMultiplier * seasonalMultiplier;

        breakdownList.innerHTML = `
            <li>
                <span>Daily Base Cost (${destination}):</span>
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
                <span>Travel Style (${style}):</span>
                <span>${styleMultiplier}x</span>
            </li>
            <li>
                <span>Seasonal Adjustment (${season}):</span>
                <span>${seasonalMultiplier}x</span>
            </li>
            <li>
                <span>Subtotal (before taxes/flights):</span>
                <span>$${Math.round(subtotal).toLocaleString()}</span>
            </li>
            <li>
                <span>Estimated Taxes & Fees (15%):</span>
                <span>$${Math.round(taxesAndFees).toLocaleString()}</span>
            </li>
            <li>
                <span>International Flights:</span>
                <span>$${totalFlights.toLocaleString()}</span>
            </li>
            <li style="border-top: 2px solid var(--border-color); padding-top: 0.5rem; margin-top: 0.5rem; font-weight: bold;">
                <span><strong>Total Estimated Cost:</strong></span>
                <span><strong>$${total.toLocaleString()}</strong></span>
            </li>
        `;

        document.getElementById('total-cost').textContent = `$${total.toLocaleString()}`;
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
        setupFormValidation(appointmentForm);
    }

    if (contactForm) {
        setupFormValidation(contactForm);
    }
}

function setupFormValidation(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm(form)) {
            handleFormSubmission(form);
        }
    });

    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('focus', () => {
            const errorElement = document.getElementById(`${input.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('show');
            }
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const formElements = form.querySelectorAll('input, select, textarea');

    formElements.forEach(element => {
        if (element.hasAttribute('required')) {
            if (!validateField(element)) {
                isValid = false;
            }
        }
    });

    return isValid;
}

function validateField(element) {
    const value = element.value.trim();
    const errorElement = document.getElementById(`${element.id}-error`);
    let isValid = true;
    let errorMessage = '';

    if (!value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (element.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (element.type === 'tel') {
        const phoneRegex = /^[\d\s+\-()]+$/;
        if (!phoneRegex.test(value) || value.replace(/[^\d]/g, '').length < 8) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    } else if (element.type === 'date') {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            isValid = false;
            errorMessage = 'Please select a future date';
        }
    } else if (element.type === 'number') {
        const numValue = parseInt(value, 10);
        const min = element.min ? parseInt(element.min, 10) : null;
        const max = element.max ? parseInt(element.max, 10) : null;
        if (min !== null && numValue < min) {
            isValid = false;
            errorMessage = `Minimum value is ${min}`;
        }
        if (max !== null && numValue > max) {
            isValid = false;
            errorMessage = `Maximum value is ${max}`;
        }
    } else if (element.tagName === 'TEXTAREA' && value.length < 10) {
        isValid = false;
        errorMessage = 'Please provide at least 10 characters';
    }

    if (errorElement) {
        if (isValid) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
            errorElement.style.display = 'none';
        } else {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            errorElement.style.display = 'block';
        }
    }

    element.style.borderColor = isValid ? '' : 'var(--accent-color)';
    element.style.boxShadow = isValid ? '' : '0 0 0 3px rgba(229, 62, 62, 0.12)';

    return isValid;
}

function handleFormSubmission(form) {
    const successMessage = form.querySelector('.success-message');
    if (successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    }

    const formData = new FormData(form);
    console.log('Form submission:', Object.fromEntries(formData));
}
