const navToggle = document.querySelector('.nav-toggle');
const shrineNav = document.querySelector('.shrine-nav');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');

navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    shrineNav.classList.toggle('is-open', !isOpen);
});

shrineNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        shrineNav.classList.remove('is-open');
    });
});

document.querySelectorAll('.gallery-card').forEach((card) => {
    card.addEventListener('click', () => {
        lightboxImage.src = card.dataset.image;
        lightboxImage.alt = card.querySelector('img').alt;
        lightboxCaption.textContent = card.dataset.title;
        lightbox.showModal();
    });
});

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
});

document.querySelector('#year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.shrine-section, .gallery-card, .favorite-list article, .media-card').forEach((element) => revealObserver.observe(element));
