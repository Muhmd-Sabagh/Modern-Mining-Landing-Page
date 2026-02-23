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
        { threshold: 0.5 },
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
// Product data with details from specification sheets
const productData = {
  "mill-gravel": {
    titleAr: "زلط الطواحين",
    titleEn: "Mill Gravel",
    descAr:
      "توفر المؤسسة الحديثة لتوريد خامات المناجم والمحاجر - Modern Mining زلط الطواحين عالي النقاء خالي من الشوائب يحافظ على جودة الخامات المطحونة ويضمن ثبات المواصفات وأداء مثالياً في الاستخدامات الصناعية.",
    descEn:
      "Modern Mining provides high-purity mill gravel free from impurities that maintains the quality of ground materials and ensures consistent specifications and optimal performance in industrial applications.",
    image: "assets/images/Products/feldspar.png",
    specs: null,
    applicationsAr: [
      "طحن الخامات المعدنية",
      "صناعة السيراميك",
      "صناعة الزجاج",
      "الصناعات الكيميائية",
    ],
    applicationsEn: [
      "Mineral grinding",
      "Ceramics industry",
      "Glass industry",
      "Chemical industries",
    ],
  },
  "k-feldspar": {
    titleAr: "فلسبار بوتاسيومي",
    titleEn: "K-Feldspar",
    descAr:
      "توفر المؤسسة الحديثة لتوريد خامات المناجم والمحاجر - Modern Mining خام الفلسبار البوتاسيومي عالي الجودة والمعالج وفق أعلى معايير التعدين الحديثة ليلبي متطلبات صناعات السيراميك والبورسلين والزجاج والأدوات الصحية. يتميز خام الفلسبار لدينا بثبات التركيب الكيميائي وكفاءة الانصهار مما يساهم في جودة المنتج النهائي ورفع كفاءة التشغيل لعملائنا. يتم إنتاج الفلسبار بعدة درجات وبنعومات مختلفة (مجروش ومطحون) حيث تصل درجة الطحن حتى 45 ميكرون.",
    descEn:
      "Modern Mining provides high-quality potassium feldspar processed according to the highest modern mining standards to meet the requirements of ceramics, porcelain, glass, and sanitary ware industries. Our feldspar is characterized by stable chemical composition and efficient melting, contributing to final product quality and operational efficiency for our customers. Feldspar is produced in various grades and fineness (crushed and ground) with grinding fineness up to 45 microns.",
    image: "assets/images/Products/feldspar.png",
    formula: "K Al Si₃ O₈",
    code: "MD - PF - G1",
    specs: [
      { item: "SiO₂", value: "66.5 ± 1" },
      { item: "Al₂O₃", value: "18 ± 0.05" },
      { item: "Fe₂O₃", value: "0.2 ± 0.02" },
      { item: "TiO₂", value: "0.04 ± 0.02" },
      { item: "MgO", value: "0.046 ± 0.003" },
      { item: "K₂O", value: "8" },
      { item: "CaO", value: "0.088 ± 0.005" },
      { item: "P₂O₅", value: "0.029 ± 0.005" },
      { item: "Na₂O", value: "3.6 ± 0.02" },
    ],
    applicationsAr: [
      "السيراميك",
      "البورسلين",
      "الزجاج",
      "الأدوات الصحية",
      "الجليز",
    ],
    applicationsEn: [
      "Ceramics",
      "Porcelain",
      "Glass",
      "Sanitary ware",
      "Glaze",
    ],
  },
  "silica-flour": {
    titleAr: "دقيق السيليكا",
    titleEn: "Silica Flour",
    descAr:
      "توفر المؤسسة الحديثة لتوريد خامات المناجم والمحاجر - Modern Mining دقيق السيليكا بنعومات تصل إلى 45 ميكرون، يستخدم في صناعة الفيبرجلاس والدهانات والطلاءات والمواد العازلة.",
    descEn:
      "Modern Mining provides silica flour with fineness up to 45 microns, used in fiberglass, paints, coatings, and insulation materials manufacturing.",
    image: "assets/images/Products/feldspar.png",
    formula: "SiO₂",
    specs: null,
    applicationsAr: [
      "الفيبرجلاس",
      "الدهانات",
      "الطلاءات",
      "المواد العازلة",
      "الصناعات الكيميائية",
    ],
    applicationsEn: [
      "Fiberglass",
      "Paints",
      "Coatings",
      "Insulation materials",
      "Chemical industries",
    ],
  },
  "silica-sand": {
    titleAr: "رمال السيليكا",
    titleEn: "Silica Sand",
    descAr:
      "توفر المؤسسة الحديثة لتوريد خامات المناجم والمحاجر - Modern Mining خام رمال السيليكا عالية النقاء والمعالجة وفق أحدث تقنيات التعدين الحديثة. ننتج رمال السيليكا بدرجات ومقاسات حبيبية مختلفة تلبي متطلبات صناعة الزجاج والمسابك والسيراميك ومواد البناء.",
    descEn:
      "Modern Mining provides high-purity silica sand processed according to the latest modern mining technologies. We produce silica sand in various grades and grain sizes to meet the requirements of glass, foundry, ceramics, and construction materials industries.",
    image: "assets/images/Products/feldspar.png",
    formula: "SiO₂",
    code: "MD - SS - G1",
    specs: [
      { item: "SiO₂", value: "99.5 ± 0.2" },
      { item: "Al₂O₃", value: "0.2 ± 0.05" },
      { item: "Na₂O", value: "0.08 ± 0.02" },
      { item: "MgO", value: "0.004 ± 0.001" },
      { item: "K₂O", value: "< 0.01" },
      { item: "CaO", value: "0.02 ± 0.005" },
      { item: "TiO₂", value: "0.019 ± 0.005" },
      { item: "Fe₂O₃", value: "0.015 ± 0.002" },
    ],
    granulometry: {
      ar: "أكبر من 0.600 مم: أقل من 3% | أصغر من 0.100 مم: أقل من 5%",
      en: "Over 0.600 mm: less than 3% | Under 0.100 mm: less than 5%",
    },
    applicationsAr: [
      "صناعة الزجاج",
      "المسابك",
      "السيراميك",
      "مواد البناء",
      "البصريات",
    ],
    applicationsEn: [
      "Glass manufacturing",
      "Foundries",
      "Ceramics",
      "Construction materials",
      "Optics",
    ],
  },
  "feldspar-g2": {
    titleAr: "فلسبار درجة ثانية",
    titleEn: "Feldspar Grade 2",
    descAr:
      "فلسبار مطحون بدرجات نعومة مختلفة تصل حتى 45 ميكرون باستخدام أحدث تقنيات المعالجة والطحن لصناعات السيراميك والبورسلين والجليز.",
    descEn:
      "Ground feldspar in various fineness grades up to 45 microns using the latest processing and grinding technologies for ceramics, porcelain, and glaze industries.",
    image: "assets/images/Products/feldspar.png",
    formula: "K Al Si₃ O₈",
    code: "MD - PF - G2",
    specs: [
      { item: "SiO₂", value: "73.5 ± 1" },
      { item: "Al₂O₃", value: "13 ± 0.05" },
      { item: "Na₂O", value: "3.5 ± 0.05" },
      { item: "K₂O", value: "4" },
      { item: "CaO", value: "0.12 ± 0.01" },
      { item: "MgO", value: "0.12 ± 0.005" },
      { item: "Fe₂O₃", value: "0.5 ± 0.05" },
    ],
    applicationsAr: ["السيراميك", "البورسلين", "الجليز", "البلاط"],
    applicationsEn: ["Ceramics", "Porcelain", "Glaze", "Tiles"],
  },
  "ground-glass": {
    titleAr: "زجاج مطحون",
    titleEn: "Ground Glass",
    descAr:
      "توفر المؤسسة الحديثة لتوريد خامات المناجم والمحاجر - Modern Mining زجاج مطحون بدرجات ونعومات مختلفة خالي من الشوائب يستخدم بكفاءة في صناعات السيراميك والبلاستيك ومواد البناء.",
    descEn:
      "Modern Mining provides ground glass in various grades and fineness, free from impurities, efficiently used in ceramics, plastics, and construction materials industries.",
    image: "assets/images/Products/feldspar.png",
    specs: null,
    applicationsAr: [
      "السيراميك",
      "البلاط",
      "البلاستيك",
      "مواد البناء",
      "الجليز",
    ],
    applicationsEn: [
      "Ceramics",
      "Tiles",
      "Plastics",
      "Construction materials",
      "Glaze",
    ],
  },
  "feldspar-g1": {
    titleAr: "فلسبار درجة أولى",
    titleEn: "Feldspar Grade 1",
    descAr:
      "فلسبار عالي الجودة بنسبة نقاء مرتفعة، مثالي للصناعات التي تتطلب مواصفات دقيقة مثل السيراميك الفاخر والبورسلين والأدوات الصحية.",
    descEn:
      "High-quality feldspar with high purity levels, ideal for industries requiring precise specifications like luxury ceramics, porcelain, and sanitary ware.",
    image: "assets/images/Products/feldspar.png",
    formula: "K Al Si₃ O₈",
    code: "MD - PF - G1",
    specs: [
      { item: "SiO₂", value: "66.5 ± 1" },
      { item: "Al₂O₃", value: "18 ± 0.05" },
      { item: "Fe₂O₃", value: "0.2 ± 0.02" },
      { item: "TiO₂", value: "0.04 ± 0.02" },
      { item: "MgO", value: "0.046 ± 0.003" },
      { item: "K₂O", value: "8" },
      { item: "CaO", value: "0.088 ± 0.005" },
      { item: "P₂O₅", value: "0.029 ± 0.005" },
      { item: "Na₂O", value: "3.6 ± 0.02" },
    ],
    applicationsAr: [
      "السيراميك الفاخر",
      "البورسلين",
      "الأدوات الصحية",
      "الزجاج البصري",
    ],
    applicationsEn: [
      "Luxury ceramics",
      "Porcelain",
      "Sanitary ware",
      "Optical glass",
    ],
  },
  quartz: {
    titleAr: "كوارتز",
    titleEn: "Quartz",
    descAr:
      "توفر المؤسسة الحديثة لتوريد خامات المناجم والمحاجر - Modern Mining خام رمال الكوارتز عالي النقاء والمعالج. يتم إنتاج الكوارتز مجروش بمختلف المقاسات ومطحون بمختلف النعومات لتلبية احتياجات الاستخدامات الصناعية المتنوعة مع ثبات الجودة ودقة المواصفات وفق أعلى معايير المعالجة والطحن.",
    descEn:
      "Modern Mining provides high-purity processed quartz sand. Quartz is produced crushed in various sizes and ground in various fineness to meet diverse industrial application needs with consistent quality and precise specifications according to the highest processing and grinding standards.",
    image: "assets/images/Products/feldspar.png",
    formula: "SiO₂",
    code: "MD - Q - G1",
    specs: [
      { item: "SiO₂", value: "99.3 ± 0.2" },
      { item: "Al₂O₃", value: "0.06 ± 0.03" },
      { item: "Na₂O", value: "< 0.01" },
      { item: "MgO", value: "< 0.01" },
      { item: "K₂O", value: "< 0.01" },
      { item: "CaO", value: "< 0.01" },
      { item: "TiO₂", value: "< 0.01" },
      { item: "Fe₂O₃", value: "0.02 ± 0.005" },
    ],
    applicationsAr: [
      "صناعة الزجاج",
      "الإلكترونيات",
      "المواد الكاشطة",
      "الصناعات الكيميائية",
      "الطاقة الشمسية",
    ],
    applicationsEn: [
      "Glass manufacturing",
      "Electronics",
      "Abrasives",
      "Chemical industries",
      "Solar energy",
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

  // Set specs table
  const specsSection = document.getElementById("modalProductSpecs");
  const specsBody = document.getElementById("modalSpecsBody");

  if (product.specs && product.specs.length > 0) {
    specsSection.style.display = "block";
    specsBody.innerHTML = product.specs
      .map((spec) => `<tr><td>${spec.item}</td><td>${spec.value}</td></tr>`)
      .join("");
  } else {
    specsSection.style.display = "none";
  }

  // Set product info (code and formula)
  const codeWrapper = document.getElementById("modalCodeNo");
  const codeEl = document.getElementById("modalCode");
  const formulaWrapper = document.getElementById("modalFormulaWrapper");
  const formulaEl = document.getElementById("modalFormula");

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

  // Set applications
  const appsList = document.getElementById("modalAppsList");
  const apps = isArabic ? product.applicationsAr : product.applicationsEn;
  appsList.innerHTML = apps.map((app) => `<li>${app}</li>`).join("");

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
