// Form handling for Apply Form
const applyForm = document.getElementById('applyForm');
if (applyForm) {
    applyForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            fullName: document.getElementById('fullname').value,
            phone: document.getElementById('phone').value,
            country: document.getElementById('country').value,
            state: document.getElementById('state').value,
            experience: document.getElementById('experience').value,
            timestamp: new Date().toISOString()
        };

        // Log the data (in production, this would send to a backend)
        console.log('KoldCaller Application Submitted:', formData);

        // Store in localStorage for demo purposes
        let applications = JSON.parse(localStorage.getItem('koldcallerApplications')) || [];
        applications.push(formData);
        localStorage.setItem('koldcallerApplications', JSON.stringify(applications));

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10B981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-weight: 600;
            animation: slideIn 0.3s ease-out;
        `;
        successMessage.textContent = '✓ Application submitted! We\'ll be in touch soon.';
        document.body.appendChild(successMessage);

        // Remove message after 4 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 4000);

        // Reset form
        applyForm.reset();
    });
}

// Form handling for Waitlist Form
const waitlistForm = document.getElementById('waitlistForm');
if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const email = document.getElementById('email').value;
        
        const waitlistData = {
            email: email,
            timestamp: new Date().toISOString()
        };

        // Log the data (in production, this would send to a backend)
        console.log('Waitlist Signup:', waitlistData);

        // Store in localStorage for demo purposes
        let waitlistEntries = JSON.parse(localStorage.getItem('koldcallerWaitlist')) || [];
        waitlistEntries.push(waitlistData);
        localStorage.setItem('koldcallerWaitlist', JSON.stringify(waitlistEntries));

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10B981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-weight: 600;
            animation: slideIn 0.3s ease-out;
        `;
        successMessage.textContent = '✓ Welcome to the waitlist! Check your email.';
        document.body.appendChild(successMessage);

        // Remove message after 4 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 4000);

        // Reset form
        waitlistForm.reset();
    });
}

// Add animation for success messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll behavior for button links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation for cards and sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.what-card, .service-card, .how-it-card, .list-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Handle service request button clicks
document.querySelectorAll('.service-card .btn-outline').forEach(btn => {
    btn.addEventListener('click', function() {
        const serviceName = this.closest('.service-card').querySelector('h3').textContent;
        const message = `I'm interested in ${serviceName}. Please contact me!`;
        console.log('Service Request:', message);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3B82F6;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-weight: 600;
        `;
        successMessage.textContent = `✓ Service request for ${serviceName} received!`;
        document.body.appendChild(successMessage);

        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });
});

// Add click tracking for CTA buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('CTA Clicked:', this.textContent);
        // In production, this would track user behavior for analytics
    });
});

// Demo data for localStorage inspection (for development)
function logDemoData() {
    console.log('=== KoldCaller Demo Data ===');
    console.log('Applications:', JSON.parse(localStorage.getItem('koldcallerApplications') || '[]'));
    console.log('Waitlist:', JSON.parse(localStorage.getItem('koldcallerWaitlist') || '[]'));
}

// Make function available in console for debugging
window.logKoldCallerData = logDemoData;

// Log page analytics
console.log('🚀 KoldCaller Landing Page Loaded');
console.log('📊 To view submitted data, run: logKoldCallerData()');
