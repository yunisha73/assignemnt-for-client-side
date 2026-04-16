const currentYear = document.querySelector('.current-year');
const headerTime = document.getElementById('header-time');
const nepalTimeDisplay = document.getElementById('nepal-time');
const planBtn = document.getElementById('plan-btn');
const heroPlanBtn = document.getElementById('plan-btn-hero');
const trekLength = document.getElementById('trek-length');
const planResult = document.getElementById('plan-result');
const brandLogo = document.getElementById('brand-logo');
const planModal = document.getElementById('plan-modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalList = document.getElementById('modal-list');
const modalImage = document.getElementById('modal-image');
const learnButtons = document.querySelectorAll('.learn-more');

function updateYear() {
  const year = new Date().getFullYear();
  if (currentYear) currentYear.textContent = year;
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
  const time = getNepalTime();
  if (headerTime) headerTime.textContent = `Kathmandu: ${time}`;
  if (nepalTimeDisplay) nepalTimeDisplay.textContent = time;
}

function buildPlan(duration) {
  const plans = {
    weekend: {
      title: 'Weekend hike ready',
      info: 'Focus on short cardio sessions, long walks with your pack, and light stretching. Train 3–4 times this week to stay energized on compact trails.',
    },
    '7-days': {
      title: '7-day trek preparation',
      info: 'Add hill repeats, strength training for legs and core, and at least one 15+ km hike with your gear. Keep hydration and nutrition consistent.',
    },
    '14-days': {
      title: 'Expedition-ready plan',
      info: 'Build endurance with long back-to-back hikes, altitude awareness, and recovery sessions. Prioritize hiking boots, layered gear, and gradual pace training.',
    },
  };
  return plans[duration] || plans.weekend;
}

const planDetails = {
  cardio: {
    title: 'Cardio plan',
    description: 'Boost trail endurance with interval stair climbs, timed hikes, and pack walks.',
    details: 'Focus on building steady aerobic capacity with repeated moderate efforts. Alternate intense uphill intervals with easy recovery walks so your legs adapt without overtraining.',
    list: [
      '3 cardio sessions per week',
      '20–40 minute intervals or hill repeats',
      'One longer walk with a light pack',
    ],
    image: 'https://images.unsplash.com/photo-1526401281623-99d69955d75d?auto=format&fit=crop&w=900&q=80',
  },
  strength: {
    title: 'Strength plan',
    description: 'Build leg power and core resilience for rocky terrain and heavy backpacks.',
    details: 'Use a mix of weighted lifts, bodyweight moves and loaded step-ups to simulate real trail stress. Rest between heavy sessions to avoid fatigue and protect joints.',
    list: [
      '2–3 strength sessions per week',
      'Squats, lunges, deadlifts, and weighted step-ups',
      'Focus on back support, hip stability, and posture',
    ],
    image: 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=900&q=80',
  },
  flexibility: {
    title: 'Flexibility plan',
    description: 'Improve recovery and reduce soreness with daily mobility and stretching.',
    details: 'Add morning and evening routines to keep joints supple. Combine dynamic warm-ups before hikes with static stretches after workouts, and hold stretches for 30 seconds each.',
    list: [
      'Daily hip openers and hamstring stretches',
      'Dynamic warm-ups before hikes',
      'Evening foam rolling and breath work',
    ],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
  },
};

function showPlan(duration) {
  const plan = buildPlan(duration);
  if (planResult) {
    planResult.innerHTML = `<strong>${plan.title}</strong><p>${plan.info}</p>`;
  }
}

function openPlanModal(planKey) {
  const plan = planDetails[planKey];
  const modalDetails = document.getElementById('modal-details');
  if (!plan || !planModal || !modalTitle || !modalDescription || !modalList || !modalImage || !modalDetails) return;

  modalTitle.textContent = plan.title;
  modalDescription.innerHTML = `<p>${plan.description}</p>`;
  modalList.innerHTML = plan.list.map(item => `<li>${item}</li>`).join('');
  modalDetails.innerHTML = plan.details ? `<p>${plan.details}</p>` : '';
  modalImage.src = plan.image;
  modalImage.alt = `${plan.title} image`;
  planModal.classList.remove('hidden');
}

function closeModalFn() {
  if (planModal) planModal.classList.add('hidden');
}

function setupPlanButtons() {
  if (planBtn) {
    planBtn.addEventListener('click', () => showPlan(trekLength.value));
  }

  if (heroPlanBtn) {
    heroPlanBtn.addEventListener('click', () => {
      showPlan(trekLength.value);
      planResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
}

function setupLogoModal() {
  if (!brandLogo) return;
  brandLogo.addEventListener('click', (event) => {
    event.preventDefault();
    if (planDetails.cardio) {
      openPlanModal('cardio');
    }
  });

  if (!planModal) return;

  planModal.addEventListener('click', (event) => {
    if (event.target === planModal) {
      closeModalFn();
    }
  });

  if (closeModal) {
    closeModal.addEventListener('click', closeModalFn);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModalFn();
  });
}

function setupLearnButtons() {
  learnButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const planKey = button.dataset.plan;
      openPlanModal(planKey);
    });
  });
}

function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  reveals.forEach((item) => {
    const elementTop = item.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      item.classList.add('visible');
    }
  });
}

window.addEventListener('load', () => {
  updateYear();
  refreshTime();
  setupPlanButtons();
  setupLogoModal();
  setupLearnButtons();
  revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);
setInterval(refreshTime, 1000);
