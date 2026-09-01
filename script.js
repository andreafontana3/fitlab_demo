// script.js
document.addEventListener('DOMContentLoaded', function() {
    
    // ============ NAVBAR ============
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Funzione per aprire/chiudere il menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
        hamburger.setAttribute('aria-expanded', expanded);
    }
    
    if (hamburger && navMenu) {
        // Supporto sia per click che per touchstart (mobile)
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('touchstart', function(e) {
            e.preventDefault(); // previeni il doppio evento click fantasma su alcuni browser
            toggleMenu();
        }, { passive: false });
        
        // Chiudi il menu quando si clicca su un link
        document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
            // Anche per touchstart
            link.addEventListener('touchstart', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }, { passive: true });
        });
    }
    
    // ============ FAQ ACCORDION ============
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const faqIcon = button.querySelector('.faq-icon');
            
            // Chiudi le altre
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                    item.querySelector('.faq-icon').textContent = '+';
                }
            });
            
            // Toggle corrente
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
        // Calcola la larghezza di una card (incluso margine)
        function getScrollAmount() {
            const firstCard = carousel.querySelector('.review-card');
            if (!firstCard) return 300;
            const cardWidth = firstCard.offsetWidth;
            const gap = parseFloat(getComputedStyle(carousel).columnGap) || 32;
            return cardWidth + gap;
        }
        
        function scrollCarousel(direction) {
            const amount = getScrollAmount();
            carousel.scrollBy({
                left: direction * amount,
                behavior: 'smooth'
            });
        }
        
        // Event listener per click e touchstart
        prevBtn.addEventListener('click', () => scrollCarousel(-1));
        nextBtn.addEventListener('click', () => scrollCarousel(1));
        
        prevBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            scrollCarousel(-1);
        }, { passive: false });
        
        nextBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            scrollCarousel(1);
        }, { passive: false });
        
        // Aggiorna lo stato dei bottoni (opzionale)
        function updateButtons() {
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            prevBtn.style.opacity = carousel.scrollLeft <= 10 ? '0.5' : '1';
            nextBtn.style.opacity = carousel.scrollLeft >= maxScroll - 10 ? '0.5' : '1';
            prevBtn.style.pointerEvents = carousel.scrollLeft <= 10 ? 'none' : 'auto';
            nextBtn.style.pointerEvents = carousel.scrollLeft >= maxScroll - 10 ? 'none' : 'auto';
        }
        
        carousel.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);
        updateButtons();
    }
    
});
