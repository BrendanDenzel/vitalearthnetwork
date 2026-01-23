document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.tab-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));

      // Hide all sections
      sections.forEach(sec => sec.style.display = 'none');

      // Add active class to clicked tab
      tab.classList.add('active');

      // Show the corresponding section
      const tabId = tab.dataset.tab;
      document.getElementById(tabId).style.display = 'block';
    });
  });
});

  document.querySelector('.back-to-top').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 768) return; // mobile only

  const images = document.querySelectorAll(".about-banner img");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0
    }
  );

  images.forEach(img => {
    img.classList.add("fade-in");
    observer.observe(img);
  });

  images.forEach((img, index) => {
  img.style.transitionDelay = `${index * 0.05}s`;
});

});


const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("pulse");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1
  }
);

document.querySelectorAll(".pulse-wrapper").forEach(el => {
  observer.observe(el);
});

document.querySelectorAll(".pulse-wrapper").forEach(el => {
  el.classList.add("pulse");
});


document.addEventListener("DOMContentLoaded", () => {
  const donateBtn = document.querySelector(".donate-button");
  if (donateBtn) {
    // Wait 2 seconds (2000ms) before popping in
    setTimeout(() => {
      donateBtn.classList.add("pop-in");
    }, 1500);
  }
});

const mobileFooter = document.querySelector(".mobile-donation-footer3");

// Slide up on page load quickly
window.addEventListener("load", () => {
  if (mobileFooter) {
    setTimeout(() => {
      mobileFooter.classList.add("visible");
    }, 100); // tiny delay to ensure CSS applies
  }
});

// Scroll-based hide/show
window.addEventListener("scroll", () => {
  if (!mobileFooter) return;

  const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

  if (scrollPercent > 50) {
    mobileFooter.classList.remove("visible");
  } else {
    mobileFooter.classList.add("visible");
  }
});









