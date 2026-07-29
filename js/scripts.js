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
  const floatBtns = document.querySelectorAll(".float-btn");
  const backToTop = document.getElementById("backToTop");
  const contactForm = document.getElementById("contactForm");

  /* ==================== Navbar Scroll Effect ==================== */
  function handleNavbarScroll() {
    if (!navbar) return;
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
    if (!navbarToggler || !navbarNav) return;
    navbarToggler.classList.toggle("active");
    navbarNav.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  }

  function closeMobileMenu() {
    if (!navbarToggler || !navbarNav) return;
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
  function handleFloatBtns() {
    if (window.scrollY > 500) {
      floatBtns.forEach((fb) => fb.classList.add("visible"));
    } else {
      floatBtns.forEach((fb) => fb.classList.remove("visible"));
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
        } else if (target >= 1000) {
          counter.textContent = (target / 1000).toFixed(0) + "K+";
        } else {
          counter.textContent = target + "+";
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
        { threshold: 0.5 },
      );

      observer.observe(counter);
    });
  }

  /* ==================== Partners Slider ==================== */
  function initPartnersSlider() {
    const partnersGrid = document.querySelector(".partners-grid");
    if (!partnersGrid || partnersGrid.dataset.sliderReady === "true") return;
    if (typeof window.jQuery === "undefined" || !window.jQuery.fn.slick) return;

    const $partnersGrid = window.jQuery(partnersGrid);

    $partnersGrid.slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500,
      arrows: false,
      dots: false,
      infinite: true,
      pauseOnHover: false,
      rtl: document.documentElement.dir === "rtl",
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 520,
          settings: {
            slidesToShow: 3,
          },
        },
      ],
    });

    partnersGrid.dataset.sliderReady = "true";
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
      handleFloatBtns();
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
        navbarNav &&
        navbarNav.classList.contains("active") &&
        !navbarNav.contains(e.target) &&
        navbarToggler &&
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

    // Initialize partners slider
    initPartnersSlider();

    // Hide preloader
    hidePreloader();

    // Initial calls
    handleNavbarScroll();
    setActiveNavLink();
    handleFloatBtns();

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

/* ==================== Product Modal ==================== */
// Product and service data
const productData = {
  "alumina-balls": {
    titleAr: "كرات ألومينا",
    titleEn: "Alumina Balls",
    descAr:
      "كرات طحن ألومينا عالية الكثافة والصلادة لضمان كفاءة طحن أعلى ومعدل تآكل منخفض داخل الطواحين.",
    descEn:
      "High-density, high-hardness alumina grinding balls designed for efficient milling and low wear rates.",
    image: "assets/images/Products/alumina-balls.webp",
    code: "MD-AB-G1",
    formula: "Al2O3",
    specs: [
      { item: "Al2O3", value: ">= 92%" },
      { item: "Bulk Density", value: "3.60 - 3.70 g/cm3" },
      { item: "Water Absorption", value: "<= 0.01%" },
      { item: "Mohs Hardness", value: "9" },
      { item: "Crushing Strength", value: ">= 1800 N (20 mm)" },
    ],
    applicationsAr: [
      "طحن الخامات التعدينية",
      "السيراميك والبورسلين",
      "الدهانات والكيماويات",
      "المعالجة الدقيقة للمواد",
    ],
    applicationsEn: [
      "Mineral milling",
      "Ceramics and porcelain",
      "Paints and chemicals",
      "Fine material processing",
    ],
  },
  feldspar: {
    titleAr: "فلسبار",
    titleEn: "Feldspar",
    descAr:
      "نوفر خام الفلسبار بعدة أشكال تشغيلية لتلبية احتياجات صناعات السيراميك والزجاج: فلسبار مجروش، فلسبار درجة أولى، وفلسبار مطحون.",
    descEn:
      "We provide feldspar in multiple processing forms for ceramics and glass: crushed feldspar, first-grade feldspar, and crushed feldspar.",
    image: "assets/images/Products/feldspar.webp",
    variants: [
      {
        titleAr: "فلسبار مجروش (عادي)",
        titleEn: "Feldspar Rocks (Regular)",
        image: "assets/images/Products/feldspar.webp",
        code: "MD-FS-R",
        formula: "KAlSi3O8",
        specs: [
          { item: "SiO2", value: "66 - 70%" },
          { item: "Al2O3", value: "16 - 19%" },
          { item: "K2O + Na2O", value: "9 - 12%" },
          { item: "Fe2O3", value: "<= 0.4%" },
          { item: "Moisture", value: "<= 0.5%" },
        ],
        applicationsAr: ["السيراميك", "الزجاج", "الفريت", "المينا"],
        applicationsEn: ["Ceramics", "Glass", "Frit", "Enamel"],
      },
      {
        titleAr: "فلسبار درجة أولى",
        titleEn: "Feldspar Grade 1",
        image: "assets/images/Products/feldspar-deg-1.webp",
        code: "MD-FS-G1",
        formula: "KAlSi3O8",
        specs: [
          { item: "SiO2", value: "68 - 72%" },
          { item: "Al2O3", value: "17 - 19%" },
          { item: "K2O + Na2O", value: "10 - 13%" },
          { item: "Fe2O3", value: "<= 0.25%" },
          { item: "TiO2", value: "<= 0.10%" },
        ],
        applicationsAr: [
          "السيراميك الفاخر",
          "البورسلين",
          "الأدوات الصحية",
          "الزجاج عالي الجودة",
        ],
        applicationsEn: [
          "Premium ceramics",
          "Porcelain",
          "Sanitary ware",
          "High-quality glass",
        ],
      },
      {
        titleAr: "فلسبار مطحون",
        titleEn: "Crushed Feldspar",
        image: "assets/images/Products/crushed-feldspar.webp",
        code: "MD-FS-GR",
        formula: "KAlSi3O8",
        specs: [
          { item: "SiO2", value: "67 - 71%" },
          { item: "Al2O3", value: "16 - 18.5%" },
          { item: "K2O + Na2O", value: "9 - 12%" },
          { item: "Fe2O3", value: "<= 0.30%" },
          { item: "Fineness", value: "45 - 200 micron" },
        ],
        applicationsAr: [
          "الجليز",
          "الطلاءات",
          "السيراميك",
          "الإضافات المعدنية",
        ],
        applicationsEn: ["Glaze", "Coatings", "Ceramics", "Mineral additives"],
      },
    ],
  },
  "crushed-glass": {
    titleAr: "زجاج مطحون",
    titleEn: "Crushed Glass",
    descAr:
      "زجاج مطحون بدرجات نعومة مختلفة ومنخفض الشوائب، مناسب للخلطات الصناعية وتطبيقات السيراميك ومواد البناء.",
    descEn:
      "Crushed glass with controlled fineness and low impurities for ceramic mixes and construction formulations.",
    image: "assets/images/Products/crushed-glass.webp",
    code: "MD-GG-G1",
    formula: "SiO2-rich glass",
    specs: [
      { item: "SiO2", value: "68 - 74%" },
      { item: "CaO", value: "8 - 12%" },
      { item: "Na2O", value: "10 - 15%" },
      { item: "Fe2O3", value: "<= 0.20%" },
      { item: "Fineness", value: "75 - 300 micron" },
    ],
    applicationsAr: [
      "السيراميك",
      "مركبات البناء",
      "الخلطات الأسمنتية",
      "الراتنجات",
    ],
    applicationsEn: [
      "Ceramics",
      "Construction compounds",
      "Cementitious blends",
      "Resin fillers",
    ],
  },
  "crushed-silica-sand": {
    titleAr: "رمل سيليكا مطحون",
    titleEn: "Crushed Silica Sand",
    descAr:
      "سيليكا مطحونة بنعومات متدرجة لتناسب الدهانات، الجليز، والخلطات الصناعية التي تتطلب توزيعاً حبيبياً دقيقاً.",
    descEn:
      "Crushed silica with controlled fineness for paints, glaze systems, and industrial mixes requiring tight particle distribution.",
    image: "assets/images/Products/crushed-silica-sand.webp",
    code: "MD-GSS-G1",
    formula: "SiO2",
    specs: [
      { item: "SiO2", value: ">= 98.5%" },
      { item: "Fe2O3", value: "<= 0.05%" },
      { item: "Moisture", value: "<= 0.5%" },
      { item: "Fineness", value: "45 - 150 micron" },
      { item: "Whiteness", value: ">= 90" },
    ],
    applicationsAr: ["الدهانات", "الجليز", "الفيلر الصناعي", "الكيماويات"],
    applicationsEn: ["Paints", "Glaze", "Industrial filler", "Chemicals"],
  },
  "mill-gravel": {
    titleAr: "زلط الطواحين",
    titleEn: "Mill Gravel",
    descAr:
      "زلط طواحين قوي ومنتقى لتحسين أداء الطحن والحفاظ على ثبات الجودة داخل خطوط الإنتاج.",
    descEn:
      "Selected durable mill gravel that improves grinding performance and process consistency.",
    image: "assets/images/Products/mill-gravel.webp",
    code: "MD-MG-G1",
    specs: [
      { item: "Material", value: "High-silica natural stones" },
      { item: "Hardness", value: "6 - 7 Mohs" },
      { item: "Size Range", value: "20 - 90 mm" },
      { item: "Water Absorption", value: "<= 1.0%" },
      { item: "Crushing Resistance", value: "High" },
    ],
    applicationsAr: [
      "طحن المواد الخام",
      "طواحين السيراميك",
      "التحضير قبل الطحن الناعم",
    ],
    applicationsEn: [
      "Raw material grinding",
      "Ceramic mills",
      "Pre-milling preparation",
    ],
  },
  quartz: {
    titleAr: "كوارتز",
    titleEn: "Quartz",
    descAr:
      "كوارتز عالي النقاء مجروش ومطحون بمقاسات متنوعة ليلبي احتياجات صناعات الزجاج والسيراميك والتطبيقات الدقيقة.",
    descEn:
      "High-purity quartz in crushed and ground forms for glass, ceramics, and precision industrial applications.",
    image: "assets/images/Products/quartz.webp",
    code: "MD-Q-G1",
    formula: "SiO2",
    specs: [
      { item: "SiO2", value: ">= 99.0%" },
      { item: "Fe2O3", value: "<= 0.03%" },
      { item: "Al2O3", value: "<= 0.20%" },
      { item: "Moisture", value: "<= 0.5%" },
      { item: "Available Sizes", value: "0.1 - 3.0 mm / powder grades" },
    ],
    applicationsAr: [
      "الزجاج",
      "السيراميك",
      "الإلكترونيات",
      "المرشحات الصناعية",
    ],
    applicationsEn: ["Glass", "Ceramics", "Electronics", "Industrial filters"],
  },
  "silica-sand": {
    titleAr: "رمال السيليكا",
    titleEn: "Silica Sand",
    descAr:
      "نوفر رمال السيليكا بنوعين رئيسيين لتلبية متطلبات التشغيل المختلفة: رمال سيليكا خام ورمال سيليكا مطحونة بنعومات متعددة.",
    descEn:
      "We provide silica sand in two main forms to meet different process needs: raw silica sand and crushed silica sand with multiple fineness grades.",
    image: "assets/images/Products/silica-sand.webp",
    variants: [
      {
        titleAr: "رمال سيليكا خام",
        titleEn: "Raw Silica Sand",
        image: "assets/images/Products/silica-sand.webp",
        code: "MD-SS-R",
        formula: "SiO2",
        specs: [
          { item: "SiO2", value: ">= 99.2%" },
          { item: "Fe2O3", value: "<= 0.02%" },
          { item: "Al2O3", value: "<= 0.30%" },
          { item: "Moisture", value: "<= 0.5%" },
          { item: "Grain Size", value: "0.1 - 0.8 mm" },
        ],
        applicationsAr: ["صناعة الزجاج", "المسابك", "السيراميك", "مواد البناء"],
        applicationsEn: [
          "Glass manufacturing",
          "Foundry",
          "Ceramics",
          "Construction",
        ],
      },
      {
        titleAr: "رمال سيليكا مطحونة",
        titleEn: "Crushed Silica Sand",
        image: "assets/images/Products/crushed-silica-sand.webp",
        code: "MD-GSS-G1",
        formula: "SiO2",
        specs: [
          { item: "SiO2", value: ">= 98.5%" },
          { item: "Fe2O3", value: "<= 0.05%" },
          { item: "Moisture", value: "<= 0.5%" },
          { item: "Fineness", value: "45 - 150 micron" },
          { item: "Whiteness", value: ">= 90" },
        ],
        applicationsAr: ["الدهانات", "الجليز", "الفيلر الصناعي", "الكيماويات"],
        applicationsEn: ["Paints", "Glaze", "Industrial filler", "Chemicals"],
      },
    ],
  },
  "sanitary-ware-scrap-grinding": {
    titleAr: "تكسير وطحن كسر الصحى والسيراميك",
    titleEn: "Sanitary Ware Scrap Crushing & Grinding",
    descAr:
      "خدمات طحن كسر الصحى والسيراميك وفق معايير تشغيل دقيقة مع التحكم فى المقاسات والنعومات لضمان منتج نهائى متجانس.",
    descEn:
      "Crushing and grinding services for sanitary ware and ceramic scraps with strict size and fineness control for homogeneous final output.",
    image: "assets/images/Products/sanitary-ware-scrap.webp",
    detailImages: [
      {
        src: "assets/images/Products/sanitary-ware-scrap.webp",
        altAr: "تكسير وطحن كسر الصحى والسيراميك - صورة 1",
        altEn: "Sanitary Ware Scrap Crushing & Grinding - Image 1",
      },
      {
        src: "assets/images/Products/sanitary-ware-scrap-1.webp",
        altAr: "تكسير وطحن كسر الصحى والسيراميك - صورة 2",
        altEn: "Sanitary Ware Scrap Crushing & Grinding - Image 2",
      },
    ],
    code: "MM-SVC-01",
    specs: [
      { item: "Feed Type", value: "Sanitary ware and ceramic scrap" },
      { item: "Output Fineness", value: "Customized (customer spec)" },
      { item: "Sorting", value: "Impurity removal before grinding" },
      { item: "Moisture Control", value: "Controlled during process" },
      { item: "Batch Consistency", value: "High" },
    ],
    applicationsAr: [
      "إعادة التدوير الصناعي",
      "خلطات الجسم السيراميكي",
      "إضافات مواد البناء",
      "تقليل فاقد الإنتاج",
    ],
    applicationsEn: [
      "Industrial recycling",
      "Ceramic body mixes",
      "Construction additives",
      "Production waste reduction",
    ],
  },
};

// Get current language
function getCurrentLang() {
  return document.documentElement.lang === "ar" ? "ar" : "en";
}

// Open product modal
function openProductModal(productId) {
  const product = productData[productId];
  if (!product) return;

  const modal = document.getElementById("productModal");
  const lang = getCurrentLang();
  const isArabic = lang === "ar";

  // Set image
  document.getElementById("modalProductImage").src = product.image;
  document.getElementById("modalProductImage").alt = isArabic
    ? product.titleAr
    : product.titleEn;

  // Set title
  const titleEl = document.getElementById("modalProductTitle");
  titleEl.textContent = isArabic ? product.titleAr : product.titleEn;
  titleEl.setAttribute("data-ar", product.titleAr);
  titleEl.setAttribute("data-en", product.titleEn);

  // Set description
  const descEl = document.getElementById("modalProductDescription");
  descEl.textContent = isArabic ? product.descAr : product.descEn;
  descEl.setAttribute("data-ar", product.descAr);
  descEl.setAttribute("data-en", product.descEn);

  const galleryContainer = document.getElementById("modalProductGallery");
  if (product.detailImages && product.detailImages.length > 0) {
    galleryContainer.style.display = "grid";
    galleryContainer.innerHTML = product.detailImages
      .map(
        (img) => `
          <figure class="product-modal-gallery-item">
            <img src="${img.src}" alt="${isArabic ? img.altAr : img.altEn}" />
          </figure>
        `,
      )
      .join("");
  } else {
    galleryContainer.style.display = "none";
    galleryContainer.innerHTML = "";
  }

  // Variant container (used for grouped products like feldspar)
  const variantsContainer = document.getElementById("modalProductVariants");
  const specsSection = document.getElementById("modalProductSpecs");
  const specsBody = document.getElementById("modalSpecsBody");
  const codeWrapper = document.getElementById("modalCodeNo");
  const codeEl = document.getElementById("modalCode");
  const formulaWrapper = document.getElementById("modalFormulaWrapper");
  const formulaEl = document.getElementById("modalFormula");
  const applicationsSection = document.getElementById("modalApplications");
  const appsList = document.getElementById("modalAppsList");
  const apps = isArabic ? product.applicationsAr : product.applicationsEn;

  // Grouped variants mode
  if (product.variants && product.variants.length > 0) {
    variantsContainer.style.display = "grid";
    variantsContainer.innerHTML = product.variants
      .map((variant) => {
        const variantTitle = isArabic ? variant.titleAr : variant.titleEn;
        const variantApps = isArabic
          ? variant.applicationsAr || []
          : variant.applicationsEn || [];
        const specsRows = (variant.specs || [])
          .map((spec) => `<tr><td>${spec.item}</td><td>${spec.value}</td></tr>`)
          .join("");

        return `
          <article class="product-variant-card">
            <div class="product-variant-header">
              <img src="${variant.image}" alt="${variantTitle}" />
              <div>
                <h5>${variantTitle}</h5>
                <p>${isArabic ? "نوع فلسبار" : "Feldspar Type"}</p>
              </div>
            </div>
            <div class="product-variant-meta">
              ${
                variant.code
                  ? `<span><strong>${
                      isArabic ? "الكود:" : "Code:"
                    }</strong> ${variant.code}</span>`
                  : ""
              }
              ${
                variant.formula
                  ? `<span><strong>${
                      isArabic ? "الصيغة:" : "Formula:"
                    }</strong> ${variant.formula}</span>`
                  : ""
              }
            </div>
            <div class="specs-table-wrapper">
              <table class="specs-table">
                <thead>
                  <tr>
                    <th>${isArabic ? "العنصر" : "Item"}</th>
                    <th>${isArabic ? "النسبة / القيمة" : "Value"}</th>
                  </tr>
                </thead>
                <tbody>${specsRows}</tbody>
              </table>
            </div>
            <ul class="product-variant-apps">
              ${variantApps.map((app) => `<li>${app}</li>`).join("")}
            </ul>
          </article>
        `;
      })
      .join("");

    specsSection.style.display = "none";
    codeWrapper.style.display = "none";
    formulaWrapper.style.display = "none";
    applicationsSection.style.display = "none";
  } else {
    variantsContainer.style.display = "none";
    variantsContainer.innerHTML = "";

    if (product.specs && product.specs.length > 0) {
      specsSection.style.display = "block";
      specsBody.innerHTML = product.specs
        .map((spec) => `<tr><td>${spec.item}</td><td>${spec.value}</td></tr>`)
        .join("");
    } else {
      specsSection.style.display = "none";
    }

    if (product.code) {
      codeWrapper.style.display = "flex";
      codeEl.textContent = product.code;
    } else {
      codeWrapper.style.display = "none";
    }

    if (product.formula) {
      formulaWrapper.style.display = "flex";
      formulaEl.textContent = product.formula;
    } else {
      formulaWrapper.style.display = "none";
    }

    applicationsSection.style.display = "block";
    appsList.innerHTML = (apps || []).map((app) => `<li>${app}</li>`).join("");
  }

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close product modal
function closeProductModal() {
  const modal = document.getElementById("productModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Initialize modal event listeners
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("productModal");

  if (modal) {
    // Close on overlay click
    modal
      .querySelector(".product-modal-overlay")
      .addEventListener("click", closeProductModal);

    // Close on close button click
    modal
      .querySelector(".product-modal-close")
      .addEventListener("click", closeProductModal);

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeProductModal();
      }
    });
  }
});
