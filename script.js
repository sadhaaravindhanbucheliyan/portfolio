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

        if (header) {
            if (scrollPos > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

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
    // 5. Dynamic Project Modals Portfolio Engine
    // ==========================================
    
    // Comprehensive structured data for all portfolio projects
    const projectData = {
        "superstore": {
            title: "Executive Superstore Sales Report",
            image: "assets/projects/superstore.jpg",
            desc: "An interactive, corporate strategic analysis platform built to transform multi-regional sales records into diagnostic layers. Includes automated cohort metrics, segment profit tracking, and custom predictive parameters.",
            tags: ["Power Query", "DAX Calculations", "Data Modeling", "ETL Engineering"]
        },
        "supply-chain-dashboard": {
            title: "Supply Chain Performance Dashboard",
            image: "assets/projects/supply-chain.jpg",
            desc: "A premium analytical control dashboard monitoring supply chain operational health. Features end-to-end flow tracking, order fulfillments, optimization vectors, and bottleneck signaling.",
            tags: ["Power BI", "Supply Chain Architecture", "KPI Tracking", "Advanced DAX"]
        },
        "supplier-tracker": {
            title: "Supplier Delay & Logistics Tracker",
            image: "assets/projects/supplier-delay.jpg",
            desc: "A localized operational ledger tracking inbound carrier latency, lead-time variances, and supplier performance rankings to safeguard warehouse inventory buffers.",
            tags: ["Logistics Strategy", "Data Analytics", "Performance Metrics", "Power BI"]
        },
        "operations-efficiency": {
            title: "Operations Efficiency Analysis",
            image: "assets/projects/operations.jpg",
            desc: "Deep diagnostic metrics monitoring day-to-day fulfillment run-rates, labor utilization models, and outbound throughput efficiency.",
            tags: ["Operations Research", "Data Visualization", "Process Map", "Power BI"]
        },
        "warehouse-pathfinder": {
            title: "Autonomous Warehouse Pathfinder",
            image: "assets/projects/pathfinder.jpg",
            desc: "Algorithmic routing engines calculating the absolute shortest pick-path inside automated storage facilities using node networks and advanced Python logic algorithms.",
            tags: ["Python", "Pathfinding Algorithms", "Optimization", "A/B Testing"]
        },
        "operational-flow": {
            title: "Operational Flow Scripting",
            image: "assets/projects/flow-script.jpg",
            desc: "Automation scripts processing internal queue logs to dynamically forecast inventory capacity constraints and balanced workforce management distributions.",
            tags: ["Python Automation", "Data Cleansing", "Pandas Core", "Scripting Engine"]
        },
        "risk-engine": {
            title: "Risk Matrix & Feasibility Engine",
            image: "assets/projects/risk-matrix.jpg",
            desc: "A computing script parsing risk coefficients across supply lanes, determining operational feasibility scores under disruptive global events.",
            tags: ["Algorithmic Logic", "Risk Modeling", "Python Developer", "NumPy Integration"]
        },
        "etl-automation": {
            title: "Supply Chain Dataset ETL Automation",
            image: "assets/projects/etl-pipeline.jpg",
            desc: "An automated data cleaning engine built to pick up, standardize, handle null values, and structure messy supply chain legacy logs into production-grade reporting formats.",
            tags: ["ETL Engineering", "Pandas Dataframes", "Data Integration", "Python Scripts"]
        },
        "grid-storage": {
            title: "Long-Duration Grid Storage Study",
            image: "assets/projects/grid-storage.jpg",
            desc: "Technical assessment of engineering scalability and cost-benefit frameworks analyzing Compressed Air Energy Storage (CAES) parameters for power grid distributions.",
            tags: ["CAES Architecture", "Feasibility Study", "Energy Analytics", "Cost Analysis"]
        },
        "tars-wbs": {
            title: "TARS System Project Plan (WBS)",
            image: "assets/projects/tars-wbs.jpg",
            desc: "A comprehensive project breakdown detailing the work structures, milestones, resource parameters, and execution timelines for highly sophisticated multi-stage systems.",
            tags: ["Project Planning", "WBS Architecture", "Resource Matrix", "Risk Management"]
        },
        "capsule-landing": {
            title: "Safe Capsule Landing System",
            image: "assets/projects/capsule-landing.jpg",
            desc: "Engineering design study evaluating terminal speed calculations, impact dampeners, and deceleration deployment triggers to protect critical transit payload packages.",
            tags: ["Engineering Calculations", "System Safety", "Physics Analysis", "Structural Design"]
        }
    };

    const projectTriggers = document.querySelectorAll('.project-trigger');
    const projectModal = document.getElementById('project-modal');
    const closeProjectBtn = document.getElementById('close-project-modal');
    
    // Modal Element Pointers
    const modalTitle = document.getElementById('modal-title');
    const modalImg = document.getElementById('modal-img');
    const modalDesc = document.getElementById('modal-desc');
    const modalTagsContainer = document.getElementById('modal-tags');

    // Attach Click Events to all dynamic items
    projectTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const projectKey = trigger.getAttribute('data-project');
            const data = projectData[projectKey];

            if (data && projectModal) {
                // Populate the shared popup with specific project info
                if (modalTitle) modalTitle.textContent = data.title;
                if (modalImg) {
                    modalImg.src = data.image;
                    modalImg.alt = `${data.title} View`;
                }
                if (modalDesc) modalDesc.textContent = data.desc;
                
                // Construct clean tags inside the popup box
                if (modalTagsContainer) {
                    modalTagsContainer.innerHTML = '';
                    data.tags.forEach(tagText => {
                        const span = document.createElement('span');
                        span.className = 'timeline-tag';
                        span.textContent = tagText;
                        modalTagsContainer.appendChild(span);
                    });
                }

                // Make the overlay visible safely
                projectModal.classList.add('modal-active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close button trigger handling setup
    if (closeProjectBtn && projectModal) {
        closeProjectBtn.addEventListener('click', () => {
            projectModal.classList.remove('modal-active');
            document.body.style.overflow = '';
        });
    }

    // Outer backdrop closing fallback selection
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('modal-active');
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