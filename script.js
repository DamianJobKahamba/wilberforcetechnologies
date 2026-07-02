document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Mark the active nav link based on the current page
    const currentPage = document.body.getAttribute('data-page');
    if (currentPage) {
        document.querySelectorAll('.nav-link[data-page]').forEach(function (link) {
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll for in-page anchor links only (e.g. #contact, #explore)
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 76;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }
        });
    });

    // Navbar shadow/solid background on scroll
    const navbar = document.querySelector('.navbar');
    function handleNavbarScroll() {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        }
    }
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // Fade-in reveal for elements marked with .reveal
    const revealEls = document.querySelectorAll('.reveal, .mission-item, .product-card, .founder-card');
    revealEls.forEach(function (el) {
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });

    // Contact form (mailto handoff)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            const mailtoLink = 'mailto:contact@wilberforcetech.com?subject=' +
                encodeURIComponent(subject) +
                '&body=' +
                encodeURIComponent('From: ' + name + ' (' + email + ')\n\nMessage:\n' + message);

            window.location.href = mailtoLink;

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent!';

            this.reset();

            setTimeout(function () {
                submitBtn.textContent = originalText;
            }, 3000);
        });
    }
});
