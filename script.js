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