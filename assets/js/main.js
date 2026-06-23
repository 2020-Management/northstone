/* ============================================================
   Northstone Invest — main script
   ------------------------------------------------------------
   Progressive enhancement only. Everything works without JS;
   these handlers add reveal-on-scroll, the mobile nav, the
   insights filter, and the contact form's thank-you state.
   ============================================================ */

(function () {
  "use strict";

  /* ---- Reveal on scroll ---- */
  function initReveal() {
    var targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---- Mobile nav disclosure ---- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Close after following an in-page link.
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- FAQ marker: swap + / − (rotation is handled in CSS) ---- */
  function initFaq() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var marker = item.querySelector(".faq-marker");
      if (!marker) return;
      var sync = function () { marker.textContent = item.open ? "−" : "+"; };
      sync();
      item.addEventListener("toggle", sync);
    });
  }

  /* ---- Insights filter chips ---- */
  function initFilter() {
    var chips = document.querySelectorAll(".chip-filter");
    // Filterable items: the featured block and every grid card carry data-category.
    var items = document.querySelectorAll("[data-category]");
    if (!chips.length || !items.length) return;

    var grid = document.querySelector(".insights-grid .card-grid");
    var empty = document.querySelector(".insights-empty");

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var filter = chip.dataset.filter;

        chips.forEach(function (c) { c.classList.toggle("is-active", c === chip); });

        var shown = 0;
        items.forEach(function (item) {
          var show = filter === "all" || item.dataset.category === filter;
          item.classList.toggle("is-hidden", !show);
          if (show) shown += 1;
        });

        // Show an empty-state note when a category matches nothing.
        if (empty) empty.hidden = shown !== 0;
        if (grid) grid.hidden = shown === 0;
      });
    });
  }

  /* ---- Contact form → thank-you state ---- */
  function initContactForm() {
    var form = document.getElementById("inquiry-form");
    var thanks = document.getElementById("inquiry-thanks");
    if (!form || !thanks) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      // --- Real submission goes here. ---
      // GitHub Pages is static, so wire this to a hosted form handler
      // (Formspree, Web3Forms, a serverless function, …):
      //
      //   fetch(form.action, { method: "POST", body: new FormData(form) })
      //     .then(showThanks).catch(showError);
      //
      // For now we show the success state client-side only.
      showThanks();
    });

    function showThanks() {
      form.hidden = true;
      thanks.hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function init() {
    initReveal();
    initNav();
    initFaq();
    initFilter();
    initContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
