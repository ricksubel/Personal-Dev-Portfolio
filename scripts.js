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
    const skillsSection = document.querySelector('#section-skills');
    const contactSection = document.querySelector('#section-contact');

    const clearHashFromUrl = () => {
        if (!history.replaceState) return;
        history.replaceState(null, '', window.location.pathname + window.location.search);
    };

    const scrollToElement = (element, behavior = 'smooth') => {
        if (!element) return;
        element.scrollIntoView({ behavior, block: 'start' });
    };

    if (window.location.hash) {
        const initialId = window.location.hash.slice(1);
        const initialTarget = initialId ? document.getElementById(initialId) : null;

        if (initialTarget) {
            requestAnimationFrame(() => scrollToElement(initialTarget, 'auto'));
        }

        clearHashFromUrl();
    }

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


            // EYEBROW ANIMTION 
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


    // CLOSE MENU
    // const closeMenu = () => {
    //     nav?.classList.remove('nav--open');
    //     toggle?.setAttribute('aria-expanded', 'false');
    // };

    // toggle?.addEventListener('click', () => {
    //     const isOpen = nav?.classList.toggle('nav--open');
    //     toggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
    // });

    // links?.forEach((link) => {
    //     link.addEventListener('click', () => closeMenu());
    // });

    // const brandLink = document.querySelector('.nav__brand');
    // brandLink?.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     closeMenu();

    //     const pageTop = document.querySelector('#page-top');
    //     if (pageTop) {
    //         scrollToElement(pageTop);
    //     } else {
    //         window.scrollTo({ top: 0, behavior: 'smooth' });
    //     }

    //     clearHashFromUrl();
    // });

    // const internalAnchors = document.querySelectorAll('a[href^="#"]:not([href="#"]):not(.nav__brand)');
    // internalAnchors.forEach((anchor) => {
    //     anchor.addEventListener('click', (event) => {
    //         const href = anchor.getAttribute('href');
    //         if (!href || href.length <= 1) return;

    //         const targetId = href.slice(1);
    //         const target = document.getElementById(targetId);
    //         if (!target) return;

    //         event.preventDefault();
    //         if (anchor.classList.contains('nav__link')) {
    //             closeMenu();
    //         }

    //         scrollToElement(target);

    //         clearHashFromUrl();
    //     });
    // });

    // window.addEventListener('scroll', () => {
    //     if (header) {
    //         header.classList.toggle('site-header--scrolled', window.scrollY > 24);
    //     }
    // }, { passive: true });

    // backToTop?.addEventListener('click', () => {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // });

    // CONTACT FORM SUBMIT BUTTON
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

    // CAROUSEL FUNCTIONS
    projectCarousels.forEach((carousel) => {
        const viewport = carousel.querySelector('.projects__viewport');
        const track = carousel.querySelector('.projects__track');
        const prevBtn = carousel.querySelector('.projects__nav--prev');
        const nextBtn = carousel.querySelector('.projects__nav--next');

        if (!viewport || !track || !prevBtn || !nextBtn) return;

        const ambient = document.createElement('div');
        ambient.className = 'projects__ambient';
        ambient.setAttribute('aria-hidden', 'true');
        carousel.insertBefore(ambient, viewport);

        // THIN ACCENT LINES ANIMATION
        const ambientLines = Array.from({ length: 28 }, () => {
            const el = document.createElement('span');
            el.className = 'projects__ambient-line';
            const height = 1 + Math.random() * 1.5;
            const opacity = 0.4 + Math.random() * 0.35;
            const lengthFactor = 0.2 + Math.random() * 0.65;
            const speedScale = 0.18 + Math.random() * 2.2;

            el.style.height = `${height.toFixed(2)}px`;
            el.style.opacity = opacity.toFixed(2);
            el.style.top = `${Math.random() * 100}%`;
            ambient.appendChild(el);

            return {
                el,
                lengthFactor,
                speedScale,
                x: 0,
                lengthPx: 0,
                initialized: false,
            };
        });

        let ambientWidth = 1;
        const syncAmbientMetrics = () => {
            const rect = ambient.getBoundingClientRect();
            ambientWidth = rect.width || viewport.clientWidth || 1;

            ambientLines.forEach((line) => {
                line.lengthPx = Math.max(ambientWidth * line.lengthFactor, 48);
                line.el.style.width = `${line.lengthPx}px`;

                if (!line.initialized) {
                    line.x = Math.random() * ambientWidth;
                    line.initialized = true;
                } else {
                    line.x = Math.min(line.x, ambientWidth);
                }

                line.el.style.transform = `translate3d(${line.x}px, 0, 0)`;
            });
        };

        syncAmbientMetrics();

        if (window.ResizeObserver) {
            const ambientResizeObserver = new ResizeObserver(() => syncAmbientMetrics());
            ambientResizeObserver.observe(ambient);
        } else {
            window.addEventListener('resize', syncAmbientMetrics);
        }

        const baseSpeed = 28;
        let lastFrame = performance.now();
        let currentBoost = 0;
        let targetBoost = 0;
        let focusCurrent = 1;
        let focusTarget = 1;
        let isScrollActive = false;
        let scrollIdleTimeout = 0;

        // Animate lines horizontally, reacting to scroll speed and carousel focus
        // const stepAmbient = (time) => {
        //     const delta = Math.min((time - lastFrame) / 1000, 0.045);
        //     lastFrame = time;

        //     targetBoost = Math.max(targetBoost * 0.9, 0);
        //     currentBoost += (targetBoost - currentBoost) * 0.12;
        //     focusCurrent += (focusTarget - focusCurrent) * 0.08;

        //     const compositeSpeed = (baseSpeed + currentBoost) * Math.max(focusCurrent, 0.12);

        //     ambientLines.forEach((line) => {
        //         if (!isScrollActive) {
        //             line.x += compositeSpeed * line.speedScale * delta;

        //             const exitThreshold = ambientWidth + line.lengthPx * 1.3;
        //             if (line.x > exitThreshold) {
        //                 line.x = -line.lengthPx - Math.random() * ambientWidth * 0.25;
        //                 line.el.style.top = `${Math.random() * 100}%`;
        //             }
        //         }

        //         line.el.style.transform = `translate3d(${line.x}px, 0, 0)`;
        //     });

        //     window.requestAnimationFrame(stepAmbient);
        // };

        // window.requestAnimationFrame((time) => {
        //     lastFrame = time;
        //     stepAmbient(time);
        // });

        let lastScrollY = window.scrollY;
        let lastScrollTime = performance.now();

        const handleAmbientScroll = () => {
            const now = performance.now();
            const deltaY = Math.abs(window.scrollY - lastScrollY);
            const deltaT = Math.max(now - lastScrollTime, 16);
            const velocity = deltaY / deltaT;

            targetBoost = Math.min(velocity * 1600, 160);

            if (!isScrollActive) {
                isScrollActive = true;
            }

            window.clearTimeout(scrollIdleTimeout);
            scrollIdleTimeout = window.setTimeout(() => {
                isScrollActive = false;
            }, 160);

            lastScrollY = window.scrollY;
            lastScrollTime = now;
        };

        window.addEventListener('scroll', handleAmbientScroll, { passive: true });

        const slowAmbient = () => {
            focusTarget = 0.35;
        };

        const restoreAmbient = () => {
            focusTarget = 1;
        };

        viewport.addEventListener('mouseenter', slowAmbient);
        viewport.addEventListener('mouseleave', restoreAmbient);
        viewport.addEventListener('focusin', slowAmbient);
        viewport.addEventListener('focusout', restoreAmbient);

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


    // BACK-TO-TOP ARROW BUTTON REVEAL
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

    // BACK-TO-TOP ARROW BUTTON FUNCTION
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
