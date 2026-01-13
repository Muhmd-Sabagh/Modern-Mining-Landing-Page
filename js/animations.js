/* =====================================================
   Modern Mining - Animations JavaScript
   Scroll animations and GSAP effects
   ===================================================== */

(function () {
  "use strict";

  /* ==================== AOS Initialization ==================== */
  function initAOS() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 50,
        delay: 0,
        anchorPlacement: "top-bottom",
        disable: function () {
          // Disable on mobile for better performance
          return (
            window.innerWidth < 768 &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
          );
        },
      });

      // Refresh AOS on window resize
      window.addEventListener("resize", function () {
        AOS.refresh();
      });

      console.log("AOS Initialized");
    }
  }

  /* ==================== GSAP Animations ==================== */
  function initGSAP() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.log("GSAP or ScrollTrigger not available");
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Parallax
    gsap.to(".hero-bg img", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Hero Content Animation
    gsap.from(".hero-content", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3,
    });

    // Hero Badge Animation
    gsap.from(".hero-badge", {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: 0.5,
    });

    // Hero Stats Counter Animation
    gsap.from(".hero-stat", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hero-stats",
        start: "top 80%",
      },
    });

    // Section Headers Animation
    gsap.utils.toArray(".section-header").forEach((header) => {
      gsap.from(header, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
        },
      });
    });

    // Product Cards Stagger Animation
    ScrollTrigger.batch(".product-card", {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        }),
      start: "top 85%",
    });

    // Set initial state for product cards
    gsap.set(".product-card", { opacity: 0, y: 50 });

    // Board Cards Animation
    ScrollTrigger.batch(".board-card", {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "back.out(1.2)",
        }),
      start: "top 85%",
    });

    gsap.set(".board-card", { opacity: 0, y: 40, scale: 0.95 });

    // Why Us Cards Animation
    ScrollTrigger.batch(".why-us-card", {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power2.out",
        }),
      start: "top 80%",
    });

    gsap.set(".why-us-card", { opacity: 0, y: 40 });

    // News Cards Animation
    ScrollTrigger.batch(".news-card", {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power2.out",
        }),
      start: "top 85%",
    });

    gsap.set(".news-card", { opacity: 0, x: 50 });

    // Contact Section Animation
    gsap.from(".contact-info", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".contact-wrapper",
        start: "top 75%",
      },
    });

    gsap.from(".contact-form-wrapper", {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".contact-wrapper",
        start: "top 75%",
      },
    });

    // Footer Animation
    gsap.from(".footer-main > div", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
      },
    });

    // About Image Reveal
    gsap.from(".about-image", {
      clipPath: "inset(0 100% 0 0)",
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: ".about-image",
        start: "top 75%",
      },
    });

    // About Image Badge Animation
    gsap.from(".about-image-badge", {
      scale: 0,
      rotation: -180,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".about-image",
        start: "top 60%",
      },
    });

    // About Features Animation
    gsap.from(".about-feature", {
      x: -30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-features",
        start: "top 80%",
      },
    });

    // Vision Mission Cards Animation
    gsap.from(".vm-card", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".vision-mission",
        start: "top 80%",
      },
    });

    console.log("GSAP Animations Initialized");
  }

  /* ==================== Intersection Observer Animations ==================== */
  function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll(
      ".fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .scale-in, .stagger-item"
    );

    if (animatedElements.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((element) => {
      observer.observe(element);
    });

    console.log("Intersection Observer Initialized");
  }

  /* ==================== Smooth Reveal Animation ==================== */
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal");

    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  /* ==================== Hover Effects Enhancement ==================== */
  function initHoverEffects() {
    // Product card hover tilt effect
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
      });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;

        this.style.position = "relative";
        this.style.overflow = "hidden";
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple animation if not exists
    if (!document.querySelector("#ripple-styles")) {
      const style = document.createElement("style");
      style.id = "ripple-styles";
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ==================== Scroll Progress Indicator ==================== */
  function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement("div");
    progressBar.id = "scroll-progress";
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(135deg, #c9a227 0%, #e6c547 100%);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    });
  }

  /* ==================== Parallax Background Effect ==================== */
  function initParallax() {
    const parallaxElements = document.querySelectorAll(".parallax");

    if (parallaxElements.length === 0) return;

    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;

      parallaxElements.forEach((element) => {
        const speed = element.dataset.speed || 0.5;
        element.style.backgroundPositionY = `${scrolled * speed}px`;
      });
    });
  }

  /* ==================== Initialize All Animations ==================== */
  function init() {
    // Wait for page to load completely
    initAOS();
    initGSAP();
    initIntersectionObserver();
    initRevealAnimations();
    initHoverEffects();
    initScrollProgress();
    initParallax();

    console.log("All Animations Initialized");
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Also run after window load for any lazy-loaded content
  window.addEventListener("load", () => {
    // Refresh AOS after images load
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  });
})();
