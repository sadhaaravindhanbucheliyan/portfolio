/**
 * JavaScript Interactions - Sadha Aravindh Anbucheliyan Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Header Scroll & Back to Top Toggle
    // ==========================================
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScrollEffects = () => {
        const scrollPos = window.scrollY;

        // Header glass visual update
        if (scrollPos > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top floating button visibility
        if (scrollPos > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleScrollEffects);
    // Initial check in case page is refreshed in the middle
    handleScrollEffects();

    // ==========================================
    // 2. Mobile Navigation Drawer Menu Toggle
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Prevent body scrolling when menu is active
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };

    const closeMenu = () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close mobile menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // ==========================================
    // 3. Active Nav Link Highlighting on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    const navObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the main viewport area
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    // ==========================================
    // 4. Scroll Reveal Animations (Fade in)
    // ==========================================
    const revealItems = document.querySelectorAll('.glass-panel, .info-card, .project-card, .timeline-item, .extra-card, .hero-content, .hero-visual');
    
    // Add CSS initial state class dynamically
    revealItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.style.opacity = '1';
                target.style.transform = 'translateY(0)';
                observer.unobserve(target); // Only animate once
            }
        });
    }, revealObserverOptions);

    revealItems.forEach(item => revealObserver.observe(item));

  document.addEventListener('DOMContentLoaded', () => {
   
    // ==========================================
    // 6. Interactive Contact Form Handler
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Change button state to loading
            const btnText = formSubmitBtn.querySelector('span');
            const btnIcon = formSubmitBtn.querySelector('i');
            const originalText = btnText.textContent;
            const originalIconClass = btnIcon.className;

            btnText.textContent = 'Sending Message...';
            btnIcon.className = 'fa-solid fa-circle-notch fa-spin';
            formSubmitBtn.disabled = true;
            
            // Collect Form Values (Useful for real server integrations later)
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Log details in developer console to verify fields are properly mapped
            console.log('Sending message:', { name, email, subject, message });

            // Simulate form submission API call (1.5 seconds delay)
            setTimeout(() => {
                // Reset button states
                btnText.textContent = 'Message Sent!';
                btnIcon.className = 'fa-solid fa-check';
                
                // Show positive visual feedback
                formFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`;
                formFeedback.className = 'form-feedback success';

                // Reset form fields
                contactForm.reset();

                // Reset button back to original state after 3 seconds
                setTimeout(() => {
                    btnText.textContent = originalText;
                    btnIcon.className = originalIconClass;
                    formSubmitBtn.disabled = false;
                    formFeedback.style.display = 'none';
                    formFeedback.className = 'form-feedback';
                }, 4000);

            }, 1500);
        });
    }

    // ==========================================
    // 7. Accessibility & SMOOTH SCROLL offsets
    // ==========================================
    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight + 5; // Offset header plus minor margin
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
});