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
        if (header) {
            if (scrollPos > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Back to top floating button visibility
        if (backToTopBtn) {
            if (scrollPos > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    };

    window.addEventListener('scroll', handleScrollEffects);
    handleScrollEffects();

    // ==========================================
    // 2. Mobile Navigation Drawer Menu Toggle
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        if (!mobileToggle || !navMenu) return;
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };

    const closeMenu = () => {
        if (!mobileToggle || !navMenu) return;
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && 
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
        rootMargin: '-30% 0px -60% 0px',
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
    
    revealItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.style.opacity = '1';
                target.style.transform = 'translateY(0)';
                observer.unobserve(target);
            }
        });
    }, revealObserverOptions);

    revealItems.forEach(item => revealObserver.observe(item));

    // ==========================================
    // 5. Project Modals / Popups Handler
    // ==========================================
    const openBtn = document.getElementById('open-superstore-modal');
    const closeBtn = document.getElementById('close-superstore-modal');
    const modal = document.getElementById('superstore-modal');

    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('modal-active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('modal-active');
            document.body.style.overflow = '';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('modal-active');
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================
    // 6. Interactive Contact Form Handler
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btnText = formSubmitBtn.querySelector('span');
            const btnIcon = formSubmitBtn.querySelector('i');
            const originalText = btnText ? btnText.textContent : 'Send Message';
            const originalIconClass = btnIcon ? btnIcon.className : '';

            if (btnText) btnText.textContent = 'Sending Message...';
            if (btnIcon) btnIcon.className = 'fa-solid fa-circle-notch fa-spin';
            formSubmitBtn.disabled = true;
            
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            console.log('Sending message:', { name, email, subject, message });

            setTimeout(() => {
                if (btnText) btnText.textContent = 'Message Sent!';
                if (btnIcon) btnIcon.className = 'fa-solid fa-check';
                
                if (formFeedback) {
                    formFeedback.style.display = 'block';
                    formFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`;
                    formFeedback.className = 'form-feedback success';
                }

                contactForm.reset();

                setTimeout(() => {
                    if (btnText) btnText.textContent = originalText;
                    if (btnIcon) btnIcon.className = originalIconClass;
                    formSubmitBtn.disabled = false;
                    if (formFeedback) {
                        formFeedback.style.display = 'none';
                        formFeedback.className = 'form-feedback';
                    }
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
                
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight + 5;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});