// JAVASCRIPT CODE

// FORM CONTROL FOR CONTACT SECTION
(() => {
    const header = document.querySelector('.site-header');
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('#nav-menu');
    const links = menu?.querySelectorAll('.nav__link');
    const backToTop = document.querySelector('.back-to-top');
    const yearEl = document.querySelector('#year');
    const contactForm = document.querySelector('#contact-form');
    const eyebrow = document.querySelector('.eyebrow');
    const heroSection = document.querySelector('.hero');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const projectCarousels = document.querySelectorAll('[data-carousel]');
    const skillsSection = document.querySelector('#skills');
    const contactSection = document.querySelector('#contact');

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    if (eyebrow && eyebrow.textContent) {
        const original = eyebrow.textContent.trim();
        if (original) {
            const letters = Array.from(original);
            const createdLetters = [];

            const assignRandomMotion = (span) => {
                const delay = 1 + Math.random() * 0.6;
                span.style.setProperty('--float-delay', `${delay.toFixed(2)}s`);
                span.style.setProperty('--float-x', `${(Math.random() * 26 - 13).toFixed(1)}px`);
                span.style.setProperty('--float-y', `${(Math.random() * 22 - 11).toFixed(1)}px`);
            };

            eyebrow.textContent = '';
            eyebrow.setAttribute('role', 'text');
            eyebrow.setAttribute('aria-label', original);

            letters.forEach((char) => {
                const span = document.createElement('span');
                span.className = 'eyebrow__letter';
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.setAttribute('aria-hidden', 'true');
                assignRandomMotion(span);
                eyebrow.appendChild(span);
                createdLetters.push(span);
            });

            if (!prefersReducedMotion.matches && heroSection) {
                const playEyebrowAnimation = () => {
                    createdLetters.forEach(assignRandomMotion);
                    eyebrow.classList.remove('is-animating');
                    void eyebrow.offsetWidth; // force reflow to restart animation
                    eyebrow.classList.add('is-animating');
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            playEyebrowAnimation();
                        } else {
                            eyebrow.classList.remove('is-animating');
                        }
                    });
                }, { threshold: 0.35 });

                observer.observe(heroSection);
            } else {
                eyebrow.classList.add('is-animating');
            }
        }
    }

    const closeMenu = () => {
        nav?.classList.remove('nav--open');
        toggle?.setAttribute('aria-expanded', 'false');
    };

    toggle?.addEventListener('click', () => {
        const isOpen = nav?.classList.toggle('nav--open');
        toggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
    });

    links?.forEach((link) => {
        link.addEventListener('click', () => closeMenu());
    });

    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('site-header--scrolled', window.scrollY > 24);
        }
    }, { passive: true });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    contactForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(contactForm);
        const name = (data.get('name') || '').toString().trim();
        const email = (data.get('email') || '').toString().trim();
        const message = (data.get('message') || '').toString().trim();

        const subject = encodeURIComponent(`New inquiry from ${name || 'your website'}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

        window.location.href = `mailto:ricksubel@gmail.com?subject=${subject}&body=${body}`;
        contactForm.reset();
    });

    projectCarousels.forEach((carousel) => {
        const viewport = carousel.querySelector('.projects__viewport');
        const track = carousel.querySelector('.projects__track');
        const prevBtn = carousel.querySelector('.projects__nav--prev');
        const nextBtn = carousel.querySelector('.projects__nav--next');

        if (!viewport || !track || !prevBtn || !nextBtn) return;

        const getStep = () => {
            const firstCard = track.querySelector('.card');
            if (!firstCard) return viewport.clientWidth;
            const styles = window.getComputedStyle(track);
            const gap = parseFloat(styles.columnGap || styles.gap || '0');
            return firstCard.getBoundingClientRect().width + gap;
        };

        const clampScroll = () => {
            const maxScroll = viewport.scrollWidth - viewport.clientWidth;
            if (viewport.scrollLeft > maxScroll) {
                viewport.scrollLeft = maxScroll;
            }
        };

        const updateControls = () => {
            const maxScroll = viewport.scrollWidth - viewport.clientWidth - 2;
            prevBtn.disabled = viewport.scrollLeft <= 2;
            nextBtn.disabled = viewport.scrollLeft >= maxScroll;
        };

        const scrollByStep = (direction) => {
            const amount = getStep() * direction;
            viewport.scrollTo({ left: viewport.scrollLeft + amount, behavior: 'smooth' });
        };

        const handleWheel = (event) => {
            if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
                event.preventDefault();
                viewport.scrollTo({ left: viewport.scrollLeft + event.deltaX * 0.6, behavior: 'smooth' });
            }
        };

        prevBtn.addEventListener('click', () => scrollByStep(-1));
        nextBtn.addEventListener('click', () => scrollByStep(1));

        viewport.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                scrollByStep(1);
            }
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                scrollByStep(-1);
            }
        });

        viewport.addEventListener('wheel', handleWheel, { passive: false });

        const onScroll = () => {
            window.requestAnimationFrame(updateControls);
        };

        viewport.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', () => {
            clampScroll();
            updateControls();
        });

        updateControls();
    });

    if (backToTop && skillsSection) {
        const toggleBackToTop = (entries) => {
            entries.forEach((entry) => {
                const showArrow = entry.boundingClientRect.top < 0;
                backToTop.classList.toggle('is-visible', showArrow);
            });
        };

        const observer = new IntersectionObserver(toggleBackToTop, {
            root: null,
            threshold: [0, 0.2],
        });

        observer.observe(skillsSection);
    }

    if (backToTop && contactSection) {
        const triggerPulse = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    backToTop.classList.remove('back-to-top--pulse');
                    void backToTop.offsetWidth;
                    backToTop.classList.add('back-to-top--pulse');

                    window.clearTimeout(backToTop._pulseTimeout);
                    backToTop._pulseTimeout = window.setTimeout(() => {
                        backToTop.classList.remove('back-to-top--pulse');
                    }, 8000);
                }
            });
        };

        const observer = new IntersectionObserver(triggerPulse, {
            root: null,
            threshold: 0.5,
            rootMargin: '-20% 0px -20% 0px',
        });

        observer.observe(contactSection);
    }
})();
