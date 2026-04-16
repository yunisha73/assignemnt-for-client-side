const currentYear = document.querySelector('.current-year');
const headerTime = document.getElementById('header-time');
const checklistButtons = document.querySelectorAll('.check-item');
const checklistResult = document.getElementById('checklist-result');
const checklistBtn = document.getElementById('checklist-btn');

function updateYear() {
  if (currentYear) currentYear.textContent = new Date().getFullYear();
}

function getNepalTime() {
  const options = {
    timeZone: 'Asia/Kathmandu',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  return new Intl.DateTimeFormat('en-GB', options).format(new Date());
}

function refreshTime() {
  if (headerTime) headerTime.textContent = `Kathmandu: ${getNepalTime()}`;
}

function updateChecklist() {
  const selected = Array.from(checklistButtons)
    .filter(btn => btn.classList.contains('active'))
    .map(btn => btn.dataset.item);

  if (!checklistResult) return;

  if (selected.length === 0) {
    checklistResult.textContent = 'Select items from the checklist to confirm your safety essentials.';
    return;
  }

  checklistResult.innerHTML = `<strong>Checklist ready</strong><p>${selected.length} item(s) selected: ${selected.join(', ')}.</p>`;
}

function setupChecklist() {
  checklistButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('active');
      updateChecklist();
    });
  });
}

function setupButton() {
  if (!checklistBtn) return;
  checklistBtn.addEventListener('click', () => {
    if (checklistButtons.length > 0) {
      checklistButtons[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      checklistButtons[0].classList.add('active');
      updateChecklist();
    }
  });
}

function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(item => {
    const top = item.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      item.classList.add('visible');
    }
  });
}

window.addEventListener('load', () => {
  updateYear();
  refreshTime();
  setupChecklist();
  setupButton();
  revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);
setInterval(refreshTime, 1000);
