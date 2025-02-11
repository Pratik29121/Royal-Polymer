'use strict';

/**
 * add event on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/**
 * navbar functionality
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  
  const isExpanded = navbar.classList.contains("active");
  navToggler.setAttribute("aria-expanded", isExpanded);
}

addEventOnElem(navToggler, "click", toggleNavbar);

document.addEventListener("click", function(e) {
  const isClickInsideNav = navbar.contains(e.target);
  const isClickOnToggler = navToggler.contains(e.target);
  
  if (!isClickInsideNav && !isClickOnToggler && navbar.classList.contains("active")) {
    closeNavbar();
  }
});

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  navToggler.setAttribute("aria-expanded", false);
  
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.style.display = 'none';
  });
}

const dropdownLinks = document.querySelectorAll(".navbar-list > li > .navbar-link");

dropdownLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    if (window.innerWidth < 992) { 
      e.preventDefault();
      const dropdownMenu = this.nextElementSibling;
      
      if (dropdownMenu && dropdownMenu.classList.contains("dropdown-menu")) {
        dropdownLinks.forEach(otherLink => {
          if (otherLink !== link) {
            const otherMenu = otherLink.nextElementSibling;
            if (otherMenu && otherMenu.classList.contains("dropdown-menu")) {
              otherMenu.style.display = "none";
            }
          }
        });
        
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
      }
    }
  });
});

window.addEventListener("resize", function() {
  if (window.innerWidth >= 992) {
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
      menu.style.display = "";
    });
  }
});

/**
 * header active state
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn?.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn?.classList.remove("active");
  }
});
