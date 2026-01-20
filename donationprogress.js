document.querySelectorAll('.donate-card').forEach(card => {
  const raised = parseFloat(card.dataset.raised);

  // ROUND GOAL TO WHOLE DOLLARS
  const goal = Math.round(parseFloat(card.dataset.goal));

  const percentage = Math.min((raised / goal) * 100, 100);
  const toGo = Math.max(goal - raised, 0);

  // Raised (with decimals)
  card.querySelectorAll('.raised-amount').forEach(el => {
    el.textContent = `$${raised.toFixed(2)}`;
    el.value = raised.toFixed(2);
  });

  // Goal (NO decimals)
  const goalEl = card.querySelector('.goal-amount');
  goalEl.textContent = `$${goal.toLocaleString()}`;
  goalEl.value = goal;

  // To Go (2 decimals for accuracy)
  const toGoEl = card.querySelector('.to-go-amount');
  toGoEl.textContent = `$${toGo.toFixed(2)}`;
  toGoEl.value = toGo.toFixed(2);

  // Percentage
  const percentEl = card.querySelector('.progress-value');
  percentEl.textContent = `${percentage.toFixed(2)}%`;
  percentEl.value = percentage.toFixed(2);

  // Progress bar
  card.querySelector('.progress1').style.width = `${percentage}%`;
});