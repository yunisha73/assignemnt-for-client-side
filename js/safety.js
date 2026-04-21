const currentYear = document.querySelector('.current-year');
const headerTime = document.getElementById('header-time');
const checklistButtons = document.querySelectorAll('.check-item');
const checklistResult = document.getElementById('checklist-result');
const checklistBtn = document.getElementById('checklist-btn');
const toggleButtons = document.querySelectorAll('.toggle-btn');
const infoDetails = document.getElementById('infoDetails');
const detailsContent = document.querySelector('.details-content');
const playBtn = document.getElementById('playBtn');
const rescueVideo = document.getElementById('rescueVideo');

const detailsData = {
  altitude: `
    <h2>Altitude Awareness</h2>
    <p>Altitude awareness is the ability to recognize and manage altitude sickness (AMS) when trekking above 2,500 meters. Being informed keeps the whole team safe.</p>
    <h5>Common symptoms</h5>
    <ul>
      <li>Headache and dizziness</li>
      <li>Nausea or vomiting</li>
      <li>Shortness of breath</li>
      <li>Difficulty sleeping</li>
    </ul>
    <h5>How to prevent it</h5>
    <ul>
      <li>Ascend slowly (no more than 300–500m per day)</li>
      <li>Stay hydrated and drink plenty of water</li>
      <li>Avoid alcohol and smoking</li>
      <li>Take rest days to acclimatize</li>
    </ul>
    <h5>What to do in emergency</h5>
    <ul>
      <li>Stop ascending immediately</li>
      <li>Descend to a lower altitude</li>
      <li>Seek medical help if symptoms worsen</li>
    </ul>
  `,
  emergency: `
    <h2>Emergency Kit Essentials</h2>
    <p>Carrying a well-prepared emergency kit is essential for trekking in remote areas of Nepal. It ensures safety and quick response in unexpected situations.</p>
    <h5>Basic items</h5>
    <ul>
      <li>First aid kit (bandages, antiseptic, painkillers)</li>
      <li>Flashlight or headlamp with extra batteries</li>
      <li>Multi-tool or knife</li>
      <li>Whistle for emergency signals</li>
    </ul>
    <h5>Safety equipment</h5>
    <ul>
      <li>Thermal blanket or emergency shelter</li>
      <li>Water purification tablets</li>
      <li>Extra food and water supply</li>
      <li>Map and compass or GPS</li>
    </ul>
    <h5>Why it’s important</h5>
    <ul>
      <li>Helps manage injuries quickly</li>
      <li>Supports survival in remote areas</li>
      <li>Ensures communication in emergencies</li>
    </ul>
  `,
  team: `
    <h2>Team Communication</h2>
    <p>Effective communication is essential during trekking in remote areas of Nepal. It ensures coordination, safety, and quick response in emergencies.</p>
    <h5>Key practices</h5>
    <ul>
      <li>Share your trekking route and daily plan</li>
      <li>Stay together and avoid splitting the group</li>
      <li>Use clear signals or communication methods</li>
    </ul>
    <h5>Communication tools</h5>
    <ul>
      <li>Mobile phones (with local SIM)</li>
      <li>Walkie-talkies or radios</li>
      <li>Satellite phones in remote areas</li>
    </ul>
    <h5>Why it’s important</h5>
    <ul>
      <li>Prevents group members from getting lost</li>
      <li>Helps coordinate rescue in emergencies</li>
      <li>Improves overall trekking safety</li>
    </ul>
  `,
};

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

function setupChecklistButton() {
  if (!checklistBtn) return;
  checklistBtn.addEventListener('click', () => {
    if (checklistButtons.length > 0) {
      checklistButtons[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      checklistButtons[0].classList.add('active');
      updateChecklist();
    }
  });
}

function setupDetailsToggle() {
  if (!infoDetails || !detailsContent) return;

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const detailKey = button.dataset.detail;
      if (!detailsData[detailKey]) return;

      const isActive = infoDetails.classList.contains('active') && infoDetails.dataset.active === detailKey;
      if (isActive) {
        infoDetails.classList.remove('active');
        infoDetails.dataset.active = '';
        button.textContent = 'Learn More';
        return;
      }

      detailsContent.innerHTML = detailsData[detailKey];
      infoDetails.classList.add('active');
      infoDetails.dataset.active = detailKey;
      toggleButtons.forEach(btn => btn.textContent = 'Learn More');
      button.textContent = 'Hide details';
      infoDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function setupPlayButton() {
  if (!playBtn || !rescueVideo) return;

  playBtn.addEventListener('click', () => {
    if (rescueVideo.paused) {
      rescueVideo.play();
      playBtn.textContent = 'Pause video';
    } else {
      rescueVideo.pause();
      playBtn.textContent = 'Play video';
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

window.addEventListener('DOMContentLoaded', () => {
  updateYear();
  refreshTime();
  setupChecklist();
  setupChecklistButton();
  setupDetailsToggle();
  setupPlayButton();
  revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);
setInterval(refreshTime, 1000);
