import { switchToHome, switchToFavorites } from './exercises.js';

// Current active page
let currentPage = 'home';

// Mobile menu elements
let mobileMenu = null;
let burgerButton = null;
let closeButton = null;
let overlay = null;

// Switch page and update UI
export function switchPage(page) {
  if (currentPage === page) return;

  currentPage = page;
  
  const navLinks = document.querySelectorAll('.header__nav-link');
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === page) {
      link.classList.add('header__nav-link--active');
    } else {
      link.classList.remove('header__nav-link--active');
    }
  });

  const mobileNavLinks = document.querySelectorAll('.mobile-menu__nav-link');
  mobileNavLinks.forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === page) {
      link.classList.add('mobile-menu__nav-link--active');
    } else {
      link.classList.remove('mobile-menu__nav-link--active');
    }
  });

  if (page === 'home') {
    switchToHome();
  } else if (page === 'favorites') {
    switchToFavorites();
  }
}

// Open mobile menu
function openMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.add('is-open');
    burgerButton.classList.add('is-hidden');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Close mobile menu
function closeMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.remove('is-open');
    burgerButton.classList.remove('is-hidden');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initialize header event listeners
export function initHeader() {
  // Desktop nav links
  const navLinks = document.querySelectorAll('.header__nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      if (page) {
        switchPage(page);
      }
    });
  });

  // Mobile menu elements
  mobileMenu = document.querySelector('.mobile-menu');
  burgerButton = document.querySelector('.header__burger');
  closeButton = document.querySelector('.mobile-menu__close');
  overlay = document.getElementById('overlay');

  // Burger button
  if (burgerButton) {
    burgerButton.addEventListener('click', openMobileMenu);
  }

  // Close button
  if (closeButton) {
    closeButton.addEventListener('click', closeMobileMenu);
  }

  // Mobile nav links
  const mobileNavLinks = document.querySelectorAll('.mobile-menu__nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      if (page) {
        switchPage(page);
        closeMobileMenu();
      }
    });
  });

  // Close menu on backdrop click
  if (mobileMenu) {
    mobileMenu.addEventListener('click', e => {
      if (e.target === mobileMenu) {
        closeMobileMenu();
      }
    });
  }
}

// Get current page
export function getCurrentPage() {
  return currentPage;
}

