if (window.lucide) {
    window.lucide.createIcons();
}

const menuToggle = document.querySelector('.site-header__toggle');
const mobileMenu = document.querySelector('#mobile-menu');

if (menuToggle && mobileMenu) {
    const closeMenu = () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
        mobileMenu.classList.remove('is-open');
    };

    const openMenu = () => {
        menuToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.hidden = false;
        mobileMenu.classList.add('is-open');
    };

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            closeMenu();
            return;
        }

        openMenu();
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

const header = document.querySelector('.site-header');
const anchorLinks = document.querySelectorAll('.site-header a[href^="#"], .mobile-nav a[href^="#"], .site-footer a[href^="#"]');

anchorLinks.forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href');

        if (!targetId || targetId === '#') {
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (!targetElement) {
            return;
        }

        event.preventDefault();

        const headerOffset = header ? header.offsetHeight + 24 : 110;
        const targetTop = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
            top: Math.max(targetTop, 0),
            behavior: 'smooth'
        });

        window.history.pushState(null, '', targetId);
    });
});

const revealOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
});
