/* =====================================================
   Modern Mining - Main Scripts
   Core JavaScript functionality
   ===================================================== */

(function () {
  "use strict";

  /* ==================== DOM Elements ==================== */
  const navbar = document.getElementById("navbar");
  const navbarToggler = document.getElementById("navbarToggler");
  const navbarNav = document.getElementById("navbarNav");
  const navLinks = document.querySelectorAll(".nav-link");
  const backToTop = document.getElementById("backToTop");
  const contactForm = document.getElementById("contactForm");

  /* ==================== Navbar Scroll Effect ==================== */
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  /* ==================== Active Nav Link on Scroll ==================== */
  function setActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  /* ==================== Mobile Menu Toggle ==================== */
  function toggleMobileMenu() {
    navbarToggler.classList.toggle("active");
    navbarNav.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  }

  function closeMobileMenu() {
    navbarToggler.classList.remove("active");
    navbarNav.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  /* ==================== Smooth Scroll ==================== */
  function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetSection.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      closeMobileMenu();
    }
  }

  /* ==================== Back to Top ==================== */
  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* ==================== Contact Form Handling ==================== */
  function handleContactForm(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      showNotification("يرجى ملء جميع الحقول المطلوبة", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showNotification("يرجى إدخال بريد إلكتروني صحيح", "error");
      return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> جاري الإرسال...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Show success message
      showNotification("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.", "success");

      // Reset form
      contactForm.reset();
    }, 2000);
  }

  /* ==================== Notification System ==================== */
  function showNotification(message, type = "success") {
    // Remove existing notifications
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="bi ${
          type === "success"
            ? "bi-check-circle-fill"
            : "bi-exclamation-circle-fill"
        }"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close" aria-label="Close">
        <i class="bi bi-x"></i>
      </button>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === "success" ? "#38a169" : "#e53e3e"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 1rem;
      animation: slideDown 0.3s ease;
    `;

    // Add animation keyframes
    if (!document.querySelector("#notification-styles")) {
      const style = document.createElement("style");
      style.id = "notification-styles";
      style.textContent = `
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        .notification-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .notification-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0;
          font-size: 1.25rem;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .notification-close:hover {
          opacity: 1;
        }
      `;
      document.head.appendChild(style);
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Close button handler
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.remove();
      });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideDown 0.3s ease reverse";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  /* ==================== Counter Animation ==================== */
  function animateCounters() {
    const counters = document.querySelectorAll(".hero-stat-value");

    counters.forEach((counter) => {
      const target =
        parseInt(counter.getAttribute("data-count")) ||
        parseInt(counter.textContent);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current) + "+";
          requestAnimationFrame(updateCounter);
        } else {
          // Format the final number
          if (target >= 1000) {
            counter.textContent = (target / 1000).toFixed(0) + "K+";
          } else {
            counter.textContent = target + "+";
          }
        }
      };

      // Start animation when element is in viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              updateCounter();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(counter);
    });
  }

  /* ==================== Preloader ==================== */
  function hidePreloader() {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }
  }

  /* ==================== Initialize ==================== */
  function init() {
    // Event Listeners
    window.addEventListener("scroll", () => {
      handleNavbarScroll();
      setActiveNavLink();
      handleBackToTop();
    });

    // Mobile menu toggle
    if (navbarToggler) {
      navbarToggler.addEventListener("click", toggleMobileMenu);
    }

    // Smooth scroll for nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", smoothScroll);
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        navbarNav.classList.contains("active") &&
        !navbarNav.contains(e.target) &&
        !navbarToggler.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Back to top button
    if (backToTop) {
      backToTop.addEventListener("click", scrollToTop);
    }

    // Contact form
    if (contactForm) {
      contactForm.addEventListener("submit", handleContactForm);
    }

    // Initialize counter animation
    animateCounters();

    // Hide preloader
    hidePreloader();

    // Initial calls
    handleNavbarScroll();
    setActiveNavLink();
    handleBackToTop();

    // Log initialization
    console.log("Modern Mining - Scripts Initialized");
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
