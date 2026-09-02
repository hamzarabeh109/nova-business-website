// NOVA Website JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Reveal elements on page load / scroll
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  // Mobile menu
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.classList.toggle("active", isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Header effect while scrolling
  const header = document.getElementById("header");

  const updateHeader = () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }
  };

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // Active navigation link
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    {
      threshold: 0.35
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // Contact form
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name =
        contactForm.querySelector('[name="name"]')?.value.trim() || "";

      const email =
        contactForm.querySelector('[name="email"]')?.value.trim() || "";

      const message =
        contactForm.querySelector('[name="message"]')?.value.trim() || "";

      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      const subject = encodeURIComponent(
        `NOVA Project Request from ${name}`
      );

      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`
      );

      window.location.href =
        `mailto:hello@nova.digital?subject=${subject}&body=${body}`;
    });
  }

  // Scroll to top button
  const scrollTop = document.querySelector(".scroll-top");

  if (scrollTop) {
    window.addEventListener(
      "scroll",
      () => {
        scrollTop.classList.toggle("visible", window.scrollY > 500);
      },
      { passive: true }
    );

    scrollTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Current year
  const yearElement = document.querySelector("[data-year]");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
