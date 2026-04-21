// DOM Elements
const elements = {
  currentYear: document.querySelector('.current-year'),
  headerTime: document.getElementById('header-time'),
  nepalTimeDisplay: document.getElementById('nepal-time'),
  planBtn: document.getElementById('plan-btn'),
  heroPlanBtn: document.getElementById('plan-btn-hero'),
  trekLength: document.getElementById('trek-length'),
  planResult: document.getElementById('plan-result'),
  brandLogo: document.getElementById('brand-logo'),
  planModal: document.getElementById('plan-modal'),
  closeModal: document.getElementById('close-modal'),
  modalTitle: document.getElementById('modal-title'),
  modalDescription: document.getElementById('modal-description'),
  modalList: document.getElementById('modal-list'),
  modalImage: document.getElementById('modal-image'),
  modalDetails: document.getElementById('modal-details'),
  learnButtons: document.querySelectorAll('.learn-more'),
  acceptBtn: document.getElementById('cookie-accept'),
  declineBtn: document.getElementById('cookie-decline'),
  consentBanner: document.getElementById('cookie-consent'),
  contactForm: document.getElementById('contact-form'),
  formMessage: document.getElementById('form-message'),
  nameInput: document.getElementById('name'),
  emailInput: document.getElementById('email'),
};

// Cookie Consent Functions
function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}

function deleteCookie(name) {
  setCookie(name, "", -1);
}

function showCookieConsent() {
  const hasConsent = getCookie('cookieConsent');
  if (!hasConsent && elements.consentBanner) {
    elements.consentBanner.classList.remove('hidden');
  }
}

function hideCookieConsent() {
  if (elements.consentBanner) {
    elements.consentBanner.classList.add('hidden');
  }
}

function acceptCookies() {
  setCookie('cookieConsent', 'accepted', 365);
  hideCookieConsent();
}

function declineCookies() {
  setCookie('cookieConsent', 'declined', 365);
  hideCookieConsent();
}

function updateYear() {
  if (elements.currentYear) elements.currentYear.textContent = new Date().getFullYear();
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
  if (elements.headerTime) elements.headerTime.textContent = `Kathmandu: ${time}`;
  if (elements.nepalTimeDisplay) elements.nepalTimeDisplay.textContent = time;
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
    image: 'cardio.jpg',
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
  if (elements.planResult) {
    elements.planResult.innerHTML = `<strong>${plan.title}</strong><p>${plan.info}</p>`;
  }
}

function openPlanModal(planKey) {
  const plan = planDetails[planKey];
  if (!plan || !elements.planModal || !elements.modalTitle || !elements.modalDescription || !elements.modalList || !elements.modalImage || !elements.modalDetails) return;

  elements.modalTitle.textContent = plan.title;
  elements.modalDescription.innerHTML = `<p>${plan.description}</p>`;
  elements.modalList.innerHTML = plan.list.map(item => `<li>${item}</li>`).join('');
  elements.modalDetails.innerHTML = plan.details ? `<p>${plan.details}</p>` : '';
  elements.modalImage.src = plan.image;
  elements.modalImage.alt = `${plan.title} image`;
  elements.planModal.classList.remove('hidden');
}

function closeModalFn() {
  if (elements.planModal) elements.planModal.classList.add('hidden');
}

function setupPlanButtons() {
  if (elements.planBtn) {
    elements.planBtn.addEventListener('click', () => showPlan(elements.trekLength.value));
  }

  if (elements.heroPlanBtn) {
    elements.heroPlanBtn.addEventListener('click', () => {
      showPlan(elements.trekLength.value);
      elements.planResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
}

function setupLogoModal() {
  if (!elements.brandLogo) return;
  
  elements.brandLogo.addEventListener('click', (event) => {
    event.preventDefault();
    if (planDetails.cardio) {
      openPlanModal('cardio');
    }
  });

  if (elements.planModal) {
    elements.planModal.addEventListener('click', (event) => {
      if (event.target === elements.planModal) {
        closeModalFn();
      }
    });
  }

  if (elements.closeModal) {
    elements.closeModal.addEventListener('click', closeModalFn);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModalFn();
  });
}

function setupLearnButtons() {
  elements.learnButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const planKey = button.dataset.plan;
      openPlanModal(planKey);
    });
  });
}

function setupFormValidation() {
  if (!elements.contactForm) return;
  
  // Real-time validation for name
  if (elements.nameInput) {
    elements.nameInput.addEventListener('input', () => {
      validateField(elements.nameInput, 'name');
    });
  }

  // Real-time validation for email
  if (elements.emailInput) {
    elements.emailInput.addEventListener('input', () => {
      validateField(elements.emailInput, 'email');
    });
    elements.emailInput.addEventListener('blur', () => {
      validateField(elements.emailInput, 'email');
    });
  }

  // Real-time validation for experience
  const experienceInput = document.getElementById('experience');
  if (experienceInput) {
    experienceInput.addEventListener('change', () => {
      validateField(experienceInput, 'experience');
    });
  }

  // Form submission
  elements.contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFormSubmit();
  });
}

function validateField(input, fieldType) {
  const feedback = input.parentElement.querySelector('.field-feedback');
  let isValid = false;
  let message = '';

  if (fieldType === 'name') {
    const value = input.value.trim();
    if (value === '') {
      message = 'Please enter your name';
    } else if (value.length < 2) {
      message = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
      message = 'Name can only contain letters';
    } else {
      isValid = true;
      message = 'Looking good!';
    }
  } else if (fieldType === 'email') {
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === '') {
      message = 'Please enter your email';
    } else if (!emailRegex.test(value)) {
      message = 'Please enter a valid email';
    } else {
      isValid = true;
      message = 'Email verified!';
    }
  } else if (fieldType === 'experience') {
    const value = input.value.trim();
    if (value === '') {
      message = 'Please select your experience level';
    } else {
      isValid = true;
      message = `You selected ${value} level`;
    }
  }

  // Update visual state
  if (isValid) {
    input.classList.remove('invalid');
    input.classList.add('valid');
  } else {
    input.classList.remove('valid');
    input.classList.add('invalid');
  }

  if (feedback) {
    feedback.textContent = message;
  }

  return isValid;
}

function handleFormSubmit() {
  const nameValid = validateField(elements.nameInput, 'name');
  const emailValid = validateField(elements.emailInput, 'email');
  const experienceInput = document.getElementById('experience');
  const experienceValid = validateField(experienceInput, 'experience');

  if (nameValid && emailValid && experienceValid) {
    showFormMessage(
      'Success! Your training plan request has been sent. Check your email for details!',
      'success'
    );
    elements.contactForm.reset();
    // Remove validation classes
    elements.contactForm.querySelectorAll('.valid, .invalid').forEach(el => {
      el.classList.remove('valid', 'invalid');
    });
  } else {
    showFormMessage(
      'Please fix the errors above before submitting',
      'error'
    );
  }
}

function showFormMessage(message, type) {
  if (!elements.formMessage) return;
  
  elements.formMessage.textContent = message;
  elements.formMessage.classList.remove('success', 'error');
  elements.formMessage.classList.add('show', type);

  // Auto-hide success message after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      elements.formMessage.classList.remove('show');
    }, 5000);
  }
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

// Initialize all features
function initializeApp() {
  updateYear();
  refreshTime();
  setupPlanButtons();
  setupLogoModal();
  setupLearnButtons();
  setupFormValidation();
  revealOnScroll();
  showCookieConsent();
  
  // Setup cookie consent buttons
  if (elements.acceptBtn) elements.acceptBtn.addEventListener('click', acceptCookies);
  if (elements.declineBtn) elements.declineBtn.addEventListener('click', declineCookies);
}

// Event Listeners
window.addEventListener('load', initializeApp);
window.addEventListener('scroll', revealOnScroll);
setInterval(refreshTime, 1000);