/* ================================
   CONFIG
================================ */

const SHEET_API_URL =
  "https://sheets.googleapis.com/v4/spreadsheets/1ui7pQWsbuua6XX2M44JYPyZM2sJNnj65bAnExIuyvBQ/values/DATA%20SHEET!E2?key=AIzaSyCRg9TGevbqT7CxFGuFQvRBaPcTk4aMpAk";

/* ================================
   FETCH DONATION TOTAL
================================ */

function loadRaisedAmountFromSheet() {
  fetch(SHEET_API_URL)
    .then(res => res.json())
    .then(data => {
      const raised = parseFloat(data.values?.[0]?.[0]) || 0;

      document.querySelectorAll('.donate-card').forEach(card => {
        card.dataset.raised = raised;
      });

      updateDonationCards();
    })
    .catch(err => {
      console.error("Google Sheets fetch failed:", err);
    });
}

/* ================================
   UPDATE PROGRESS BARS
================================ */

function updateDonationCards() {
  document.querySelectorAll('.donate-card').forEach(card => {
    const raised = parseFloat(card.dataset.raised) || 0;
    const goal = Math.round(parseFloat(card.dataset.goal) || 1);

    const percentage = Math.min((raised / goal) * 100, 100);
    const toGo = Math.max(goal - raised, 0);

    card.querySelectorAll('.raised-amount').forEach(el => {
      el.textContent = `$${raised.toFixed(2)}`;
      el.value = raised.toFixed(2);
    });

    const goalEl = card.querySelector('.goal-amount');
    goalEl.textContent = `$${goal.toLocaleString()}`;
    goalEl.value = goal;

    const toGoEl = card.querySelector('.to-go-amount');
    toGoEl.textContent = `$${toGo.toFixed(2)}`;
    toGoEl.value = toGo.toFixed(2);

    const percentEl = card.querySelector('.progress-value');
    percentEl.textContent = `${percentage.toFixed(2)}%`;
    percentEl.value = percentage.toFixed(2);

    card.querySelector('.progress1').style.width = `${percentage}%`;
  });
}

/* ================================
   INIT
================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Run immediately on page load / refresh
  loadRaisedAmountFromSheet();

  // Run every 5 minutes (300,000 ms)
  setInterval(loadRaisedAmountFromSheet, 300000);
});
