/* ============================================================
   script.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── Tab navigation ───────────────────────────────────── */
  const tabs     = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".tab-section");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      sections.forEach(sec => (sec.style.display = "none"));
      tab.classList.add("active");
      const tabId = tab.dataset.tab;
      const target = document.getElementById(tabId);
      if (target) target.style.display = "block";
    });
  });

  /* ── Back to top ──────────────────────────────────────── */
  const backBtn = document.querySelector(".back-to-top");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── About banner fade-in (mobile only) ──────────────── */
  if (window.innerWidth <= 768) {
    const images = document.querySelectorAll(".about-banner img");

    const imgObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            imgObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0 }
    );

    images.forEach((img, index) => {
      img.classList.add("fade-in");
      img.style.transitionDelay = `${index * 0.05}s`;
      imgObserver.observe(img);
    });
  }

  /* ── Pulse wrappers ───────────────────────────────────── */
  const pulseObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("pulse");
          pulseObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".pulse-wrapper").forEach(el => {
    pulseObserver.observe(el);
    el.classList.add("pulse");
  });

  /* ── Donate button pop-in (mobile footer) ────────────── */
  const donateBtn = document.querySelector(".mf-donate-btn");
  if (donateBtn) {
    setTimeout(() => donateBtn.classList.add("pop-in"), 1500);
  }

  /* ── Mobile footer slide-up ───────────────────────────── */
  const mobileFooter = document.querySelector(".mobile-donation-footer3");

  if (mobileFooter) {
    // Slide up shortly after load
    window.addEventListener("load", () => {
      setTimeout(() => mobileFooter.classList.add("visible"), 100);
    });

    // Hide/show based on scroll position
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const scrollPct =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

      if (scrollPct > 85) {
        mobileFooter.classList.remove("visible");
      } else {
        mobileFooter.classList.add("visible");
      }

      lastScroll = window.scrollY;
    });
  }

});