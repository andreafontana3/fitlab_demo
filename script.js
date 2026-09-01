document.addEventListener('DOMContentLoaded', function () {

    // ============ NAVBAR SCROLL ============
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ============ MENU HAMBURGER ============
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
            hamburger.setAttribute('aria-expanded', expanded);
        }

        hamburger.addEventListener('click', toggleMenu);
        // Fix per dispositivi touch
        hamburger.addEventListener('touchstart', function (e) {
            e.preventDefault();
            toggleMenu();
        }, { passive: false });

        // Chiudi menu al click su link
        document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ============ FAQ ACCORDION ============
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const faqIcon = button.querySelector('.faq-icon');

            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                    item.querySelector('.faq-icon').textContent = '+';
                }
            });

            faqItem.classList.toggle('active');
            if (faqItem.classList.contains('active')) {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                faqIcon.textContent = '×';
            } else {
                faqAnswer.style.maxHeight = '0';
                faqIcon.textContent = '+';
            }
        });
    });

    // ============ CAROSELLO RECENSIONI ============
    const carousel = document.getElementById('reviewsCarousel');
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');

    if (carousel && prevBtn && nextBtn) {
        console.log('Carosello trovato, collego eventi');

        function getScrollAmount() {
            const firstCard = carousel.querySelector('.review-card');
            if (!firstCard) return 320;
            const style = getComputedStyle(carousel);
            const gap = parseFloat(style.columnGap) || 32;
            return firstCard.offsetWidth + gap;
        }

        function scrollCarousel(direction) {
            const amount = getScrollAmount();
            carousel.scrollBy({
                left: direction * amount,
                behavior: 'smooth'
            });
            console.log('Scroll di ' + direction * amount + 'px');
        }

        // Eventi per click (desktop)
        prevBtn.addEventListener('click', () => scrollCarousel(-1));
        nextBtn.addEventListener('click', () => scrollCarousel(1));

        // Eventi per touch (mobile) – disabilita temporaneamente per test
        // prevBtn.addEventListener('touchstart', (e) => { e.preventDefault(); scrollCarousel(-1); }, { passive: false });
        // nextBtn.addEventListener('touchstart', (e) => { e.preventDefault(); scrollCarousel(1); }, { passive: false });

        // Aggiorna stato bottoni (solo visivo, non blocca i click)
        function updateButtons() {
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            prevBtn.style.opacity = carousel.scrollLeft <= 10 ? '0.4' : '1';
            nextBtn.style.opacity = carousel.scrollLeft >= maxScroll - 10 ? '0.4' : '1';
        }

        carousel.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);
        updateButtons();
    } else {
        console.error('Errore: elementi carosello non trovati. Controlla gli ID: reviewsCarousel, prevReview, nextReview');
    }

});
