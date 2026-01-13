/* =====================================================
   Modern Mining - Language Switcher
   Arabic/English toggle functionality
   ===================================================== */

(function () {
  "use strict";

  /* ==================== Language Configuration ==================== */
  const LANG_CONFIG = {
    ar: {
      dir: "rtl",
      lang: "ar",
      title: "Modern Mining | من قلب الأرض .. نصنع الجودة",
      stylesheet: "css/styles-ar.css",
    },
    en: {
      dir: "ltr",
      lang: "en",
      title: "Modern Mining | From the Heart of the Earth, We Craft Quality",
      stylesheet: "css/styles-en.css",
    },
  };

  /* ==================== State ==================== */
  let currentLang = localStorage.getItem("modernmining-lang") || "ar";

  /* ==================== DOM Elements ==================== */
  const langButtons = document.querySelectorAll(".lang-btn");

  /* ==================== Get Translated Text ==================== */
  function getTranslatedText(element, lang) {
    return element.getAttribute(`data-${lang}`) || element.textContent;
  }

  /* ==================== Get Translated Placeholder ==================== */
  function getTranslatedPlaceholder(element, lang) {
    return (
      element.getAttribute(`data-placeholder-${lang}`) || element.placeholder
    );
  }

  /* ==================== Switch Language ==================== */
  function switchLanguage(lang) {
    if (!LANG_CONFIG[lang]) return;

    const config = LANG_CONFIG[lang];
    currentLang = lang;

    // Save preference
    localStorage.setItem("modernmining-lang", lang);

    // Update document attributes
    document.documentElement.setAttribute("lang", config.lang);
    document.documentElement.setAttribute("dir", config.dir);
    document.body.setAttribute("dir", config.dir);

    // Update page title
    document.title = config.title;

    // Load appropriate stylesheet
    updateStylesheet(lang);

    // Update active button state
    langButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-lang") === lang) {
        btn.classList.add("active");
      }
    });

    // Translate all elements with data-ar/data-en attributes
    translateElements(lang);

    // Translate placeholders
    translatePlaceholders(lang);

    // Update arrow icons direction
    updateArrowIcons(lang);

    // Dispatch custom event
    document.dispatchEvent(
      new CustomEvent("languageChanged", {
        detail: { lang: lang, config: config },
      })
    );

    console.log(`Language switched to: ${lang}`);
  }

  /* ==================== Update Stylesheet ==================== */
  function updateStylesheet(lang) {
    // Check if English stylesheet link exists
    let enStylesheet = document.querySelector('link[href*="styles-en.css"]');
    const arStylesheet = document.querySelector('link[href*="styles-ar.css"]');

    if (lang === "en") {
      // Add English stylesheet if not exists
      if (!enStylesheet && arStylesheet) {
        enStylesheet = document.createElement("link");
        enStylesheet.rel = "stylesheet";
        enStylesheet.href = LANG_CONFIG.en.stylesheet;
        arStylesheet.parentNode.insertBefore(
          enStylesheet,
          arStylesheet.nextSibling
        );
      }
    }
  }

  /* ==================== Translate Elements ==================== */
  function translateElements(lang) {
    // Get all elements with translation attributes
    const elements = document.querySelectorAll("[data-ar], [data-en]");

    elements.forEach((element) => {
      const translatedText = getTranslatedText(element, lang);
      if (translatedText) {
        // Handle different element types
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          // Don't change input values, handled separately
        } else {
          element.textContent = translatedText;
        }
      }
    });
  }

  /* ==================== Translate Placeholders ==================== */
  function translatePlaceholders(lang) {
    const inputs = document.querySelectorAll(
      "[data-placeholder-ar], [data-placeholder-en]"
    );

    inputs.forEach((input) => {
      const translatedPlaceholder = getTranslatedPlaceholder(input, lang);
      if (translatedPlaceholder) {
        input.placeholder = translatedPlaceholder;
      }
    });
  }

  /* ==================== Update Arrow Icons ==================== */
  function updateArrowIcons(lang) {
    const arrowIcons = document.querySelectorAll(
      ".product-card-link i, .news-card-link i"
    );

    arrowIcons.forEach((icon) => {
      icon.className = lang === "ar" ? "bi bi-arrow-left" : "bi bi-arrow-right";
    });

    // Update footer link arrows
    const footerLinks = document.querySelectorAll(".footer-links a");
    footerLinks.forEach((link) => {
      // Arrow direction is handled by CSS
    });
  }

  /* ==================== Initialize ==================== */
  function init() {
    // Set up language button click handlers
    langButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang");
        if (lang && lang !== currentLang) {
          switchLanguage(lang);
        }
      });
    });

    // Apply saved language preference on load
    switchLanguage(currentLang);

    console.log("Language Switcher Initialized");
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose API for external use
  window.ModernMiningLang = {
    switch: switchLanguage,
    getCurrent: () => currentLang,
    getConfig: () => LANG_CONFIG,
  };
})();
