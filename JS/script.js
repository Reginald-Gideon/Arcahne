const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('main-nav');
const themeToggle = document.getElementById('theme-toggle');

navToggle?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

const closeAllDropdowns = () => {
    document.querySelectorAll('.dropdown.dropdown-open').forEach((dropdown) => {
        dropdown.classList.remove('dropdown-open');
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
};

const toggleDropdown = (toggle) => {
    const parentLi = toggle.closest('.dropdown');
    const isOpen = !parentLi.classList.contains('dropdown-open');
    closeAllDropdowns();
    parentLi.classList.toggle('dropdown-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
};

document.addEventListener('click', (event) => {
    const toggle = event.target.closest('.dropdown-toggle');
    if (toggle) {
        event.preventDefault();
        toggleDropdown(toggle);
        return;
    }

    if (!event.target.closest('.dropdown')) {
        closeAllDropdowns();
    }
});

const applyTheme = (isDark) => {
    document.body.classList.toggle('dark-mode', isDark);
    themeToggle?.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
};

const storedTheme = localStorage.getItem('site-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
applyTheme(initialDark);

themeToggle?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    applyTheme(isDark);
    localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
});
