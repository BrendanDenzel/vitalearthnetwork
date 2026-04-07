/* ============================================================
   donationprogress.js
   Handles BOTH progress bars:
     Bar 1 – Wildlife fundraise  (existing, from Google Sheets)
     Bar 2 – Cleanup / pieces    (from Supabase, same as map section)
   ============================================================ */

/* ── CONFIG ─────────────────────────────────────────────── */

// Set > 0 to override the wildlife raised amount (dev/testing)
const TEMP_RAISED = 198.75;
const USE_TEMP_TOTAL = TEMP_RAISED > 0;

const SHEET_API_URL =
  "https://sheets.googleapis.com/v4/spreadsheets/1ui7pQWsbuua6XX2M44JYPyZM2sJNnj65bAnExIuyvBQ/values/DATA%20SHEET!E2?key=AIzaSyCRg9TGevbqT7CxFGuFQvRBaPcTk4aMpAk";

// Supabase config (same as map section)
const SUPABASE_URL = "https://rgnthnpusmzsdjksxcns.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnbnRobnB1c216c2Rqa3N4Y25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NjYwODcsImV4cCI6MjA4ODU0MjA4N30.R7gyp_D51Nhs16TMUDhu43mNChjDi7fLw0aZUVkh02s";

// Cleanup bar goal (pieces, not money)
const CLEANUP_GOAL = 100000;


/* ── EASING ─────────────────────────────────────────────── */

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}


/* ── ANIMATED COUNTER ───────────────────────────────────── */

/**
 * Animate a number from 0 → target inside an element.
 * @param {Element} el        – the element whose textContent to update
 * @param {number}  target    – final value
 * @param {string}  prefix    – e.g. "$" or ""
 * @param {number}  decimals  – decimal places
 * @param {number}  duration  – ms
 */
function animateCounter(el, target, prefix = "$", decimals = 2, duration = 1800) {
  if (!el) return;
  const startTime = performance.now();

  function tick(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easeOutCubic(progress);
    const current  = eased * target;

    el.textContent = prefix + current.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}


/* ── ANIMATE A SINGLE BAR ───────────────────────────────── */

function animateBar(fillEl, targetPct, delay = 80) {
  if (!fillEl) return;
  fillEl.style.width = "0%";
  setTimeout(() => { fillEl.style.width = targetPct + "%"; }, delay);
}


/* ── WILDLIFE BAR (bar 1, existing donate-card on page) ─── */

function updateDonationCards(raised) {
  document.querySelectorAll(".donate-card").forEach(card => {
    const goal       = Math.round(parseFloat(card.dataset.goal) || 1);
    const percentage = Math.min((raised / goal) * 100, 100);
    const toGo       = Math.max(goal - raised, 0);

    card.querySelectorAll(".raised-amount").forEach(el => {
      el.textContent = `$${raised.toFixed(2)}`;
      el.value = raised.toFixed(2);
    });

    const goalEl = card.querySelector(".goal-amount");
    if (goalEl) { goalEl.textContent = `$${goal.toLocaleString()}`; goalEl.value = goal; }

    const toGoEl = card.querySelector(".to-go-amount");
    if (toGoEl) { toGoEl.textContent = `$${toGo.toFixed(2)}`; toGoEl.value = toGo.toFixed(2); }

    const pctEl = card.querySelector(".progress-value");
    if (pctEl) { pctEl.textContent = `${percentage.toFixed(2)}%`; }

    const bar = card.querySelector(".progress1");
    if (bar) animateBar(bar, percentage, 200);
  });
}


/* ── MOBILE FOOTER – BAR 1 (wildlife) ──────────────────── */

function updateWildlifeBar(wildlifeRaised, wildlifeGoal) {
  const fill1  = document.querySelector(".mf-bar1-fill");
  const label1 = document.querySelector(".mf-bar1-label");
  const pct1   = Math.min((wildlifeRaised / wildlifeGoal) * 100, 100);

  animateBar(fill1, pct1, 300);
  animateCounter(label1, wildlifeRaised, "$", 2, 1800);
}


/* ── MOBILE FOOTER – BAR 2 (cleanup, from Supabase) ─────── */

async function updateCleanupBar() {
  try {
    // Load Supabase only if not already loaded
    if (!window.supabase) {
      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }

    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data, error } = await client
      .from("cleanups")
      .select("amount_collected");

    if (error || !data) return;

    let totalPieces = 0;
    data.forEach(row => {
      const v = parseFloat(String(row.amount_collected || "0").replace(/,/g, "").trim());
      if (Number.isFinite(v)) totalPieces += v;
    });
    totalPieces = Math.round(totalPieces);

    const fill2  = document.querySelector(".mf-bar2-fill");
    const label2 = document.querySelector(".mf-bar2-label");
    const pct2   = Math.min((totalPieces / CLEANUP_GOAL) * 100, 100);

    animateBar(fill2, pct2, 500);
    // No $ prefix, 0 decimals — these are pieces
    animateCounter(label2, totalPieces, "", 0, 1800);

  } catch (err) {
    console.warn("Cleanup bar Supabase fetch failed:", err);
  }
}


/* ── FETCH + INIT ───────────────────────────────────────── */

function loadRaisedAmountFromSheet() {
  if (USE_TEMP_TOTAL) {
    updateDonationCards(TEMP_RAISED);
    updateWildlifeBar(TEMP_RAISED, 1000);
    updateCleanupBar();
    return;
  }

  fetch(SHEET_API_URL)
    .then(r => r.json())
    .then(data => {
      const raised = parseFloat(data.values?.[0]?.[0]) || 0;
      updateDonationCards(raised);

      const firstCard = document.querySelector(".donate-card");
      const goal = firstCard ? Math.round(parseFloat(firstCard.dataset.goal) || 1000) : 1000;
      updateWildlifeBar(raised, goal);
      updateCleanupBar();
    })
    .catch(err => console.error("Google Sheets fetch failed:", err));
}

document.addEventListener("DOMContentLoaded", () => {
  loadRaisedAmountFromSheet();
  setInterval(loadRaisedAmountFromSheet, 300000);
});