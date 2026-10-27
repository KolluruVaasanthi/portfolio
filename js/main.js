/**
 * ===================================================================
 * VAASANTHI KOLLURU - PORTFOLIO INTERACTIVITY SCRIPT
 * Vanilla JavaScript (ES6+) - 100% Client-Side for GitHub Pages
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initNavigation();
  initSkillFilters();
  initProjectModals();
  initContactForm();
  initClipboardButtons();
  initBackToTop();
  initMorseSimulator();
});

/* -------------------------------------------------------------------
   1. THEME SWITCHER (DARK / LIGHT WITH LOCALSTORAGE)
   ------------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme === 'light' || (!storedTheme && !prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }
}

/* -------------------------------------------------------------------
   2. HERO TYPING ANIMATION
   ------------------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'Software Developer',
    'ECE Undergrad @ VFSTR',
    'Python & Core CS Enthusiast',
    'Embedded Systems & IoT Builder',
    'Metamaterial Simulation Explorer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Short pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* -------------------------------------------------------------------
   3. NAVIGATION & SCROLL OBSERVER
   ------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Navbar glass blur background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // Active link detection based on scroll position
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (targetNavLink) targetNavLink.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------------
   4. SKILLS FILTERING
   ------------------------------------------------------------------- */
function initSkillFilters() {
  const filterButtons = document.querySelectorAll('.skills-filter-container .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------------
   5. PROJECT DETAILS & MODAL DIALOGS
   ------------------------------------------------------------------- */
const projectData = {
  laser: {
    title: "Laser-Based Line-of-Sight Morse Communication System",
    badge: "Hardware & Algorithm",
    category: "Embedded Systems / Arduino",
    summary: "Designed and engineered an optical line-of-sight wireless communication system transmitting alphanumeric data encoded as Morse code signals using high-speed semiconductor laser diodes and Arduino microcontrollers.",
    problemStatement: "Traditional radio-frequency (RF) communication faces heavy interference, regulatory bandwidth licensing constraints, and vulnerability to RF eavesdropping in sensitive or congested environments. An optical line-of-sight laser communication system offers a secure, unguided, and licence-free alternative for point-to-point data transmission.",
    architecture: [
      "Transmitter Module: Arduino Uno/Nano interfaced with a 650nm optical red laser diode module driven by pulse-width timing logic.",
      "Transmission Channel: Free-space optical line-of-sight (LOS) propagation.",
      "Receiver Module: High-sensitivity photodetector circuit (LDR / Photodiode with comparator) calibrated with dynamic thresholding to eliminate ambient room lighting interference.",
      "Decoding Engine: Algorithmic time-interval measurement tracking dot, dash, intra-character, and word gaps, mapping timing pulses back to ASCII strings in real time."
    ],
    metrics: [
      "Low Latency: Instantaneous serial monitor decoding with error-tolerant timing windows (±15% jitter tolerance).",
      "Ambient Immunity: Dynamic hysteresis comparator eliminating false triggers from fluorescent and sunlight sources.",
      "Scalability: Foundation ready for phototransistor array upgrade for high-baud rate data bursts."
    ],
    techStack: ["Arduino (C/C++)", "Laser Diode (650nm)", "Photodetector / Op-Amp", "Morse Decoding Algorithm", "Hardware Interfacing"]
  },
  metamaterial: {
    title: "Terahertz Metamaterial Absorber for High-Frequency Applications",
    badge: "RF & Wave Simulation",
    category: "Electromagnetics / CST Studio",
    summary: "Designed, modeled, and parametrically optimized a high-performance Terahertz (THz) metamaterial absorber achieving 99.9% peak absorption at 4.5 THz for electromagnetic shielding and sensitive detection.",
    problemStatement: "In terahertz frequency bands (0.1 to 10 THz), conventional electromagnetic absorbing materials are either excessively bulky, chemically unstable, or exhibit poor absorption efficiency. Metamaterial surfaces engineered with sub-wavelength resonant metallic unit cells provide ultra-thin, highly localized electromagnetic wave traps with near-unity absorption.",
    architecture: [
      "Unit Cell Geometry: Sub-wavelength periodic resonator array composed of a patterned metallic top patch, dielectric spacer layer, and continuous metallic ground plane (MIM configuration).",
      "Simulation Tool: Modeled in CST Microwave Studio using Frequency Domain and Transient Solvers with periodic boundary conditions (Unit Cell Floquet ports).",
      "Impedance Matching: Optimized effective relative permittivity ε(ω) and permeability μ(ω) to match free-space impedance (377 Ω), minimizing reflection to zero.",
      "S-Parameter Analysis: Verified reflection coefficient S11 < -10 dB across the resonant band, guaranteeing >90% power absorption."
    ],
    metrics: [
      "99.9% Peak Absorption: Extreme energy trapping at 4.5 THz.",
      "Reflection S11 < -10 dB: Excellent impedance matching with negligible back-scattering.",
      "Compact Form Factor: Microscopic sub-wavelength cell geometry suitable for on-chip photonic integration."
    ],
    techStack: ["CST Microwave Studio", "ANSYS HFSS", "Electromagnetic Wave Theory", "S-Parameter Analysis", "Impedance Matching"]
  },
  portfolio: {
    title: "Modern Interactive Portfolio & Technical Showcase",
    badge: "Web Development",
    category: "HTML5 / CSS3 / JavaScript",
    summary: "A production-grade, fully responsive developer portfolio built from scratch with zero framework overhead, featuring dynamic theming, live simulators, accessible components, and instant GitHub Pages deployment.",
    problemStatement: "Showcasing both software engineering and hardware/RF design requires a clean, high-performance web presence that loads instantly, feels modern, and provides interactive proof of technical projects.",
    architecture: [
      "Semantic HTML5: Clean hierarchy, structured micro-data, and accessibility standards (ARIA roles).",
      "Modern CSS3: Custom CSS variables for instant dark/light mode toggling, responsive flex/grid layouts, and glassmorphic styling.",
      "Vanilla JavaScript (ES6+): Modular state handling, live interactive Morse simulator with Web Audio API, and zero external runtime dependencies.",
      "GitHub Pages Deployment: Static structure allowing automated CI/CD deployment directly from git commits."
    ],
    metrics: [
      "100/100 Lighthouse Performance Ready: Zero bulky node runtime on client, fast static loading.",
      "Zero Build Step Required: Can be previewed and deployed directly in any browser.",
      "Cross-Device Responsive: Tested across desktop, tablet, and mobile viewport widths."
    ],
    techStack: ["HTML5", "CSS3 / Custom Properties", "JavaScript (ES6+)", "Web Audio API", "GitHub Pages"]
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalCategory = document.getElementById('modal-category');
  const modalSummary = document.getElementById('modal-summary');
  const modalProblem = document.getElementById('modal-problem');
  const modalArchitectureList = document.getElementById('modal-architecture');
  const modalMetricsList = document.getElementById('modal-metrics');
  const modalTechStack = document.getElementById('modal-tech');
  const modalMorseContainer = document.getElementById('modal-morse-container');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('[data-open-project]');

  if (!modalOverlay) return;

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;
    modalCategory.textContent = data.category;
    modalSummary.textContent = data.summary;
    modalProblem.textContent = data.problemStatement;

    // Architecture list
    modalArchitectureList.innerHTML = '';
    data.architecture.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      modalArchitectureList.appendChild(li);
    });

    // Metrics list
    modalMetricsList.innerHTML = '';
    data.metrics.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      modalMetricsList.appendChild(li);
    });

    // Tech stack chips
    modalTechStack.innerHTML = '';
    data.techStack.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'project-tag';
      span.textContent = tag;
      modalTechStack.appendChild(span);
    });

    // Show Morse simulator only on laser project
    if (projectId === 'laser' && modalMorseContainer) {
      modalMorseContainer.style.display = 'block';
    } else if (modalMorseContainer) {
      modalMorseContainer.style.display = 'none';
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-open-project');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------------
   6. INTERACTIVE MORSE CODE SIMULATOR (WITH AUDIO & LASER BLINK)
   ------------------------------------------------------------------- */
function initMorseSimulator() {
  const morseInput = document.getElementById('morse-input');
  const morseOutput = document.getElementById('morse-output');
  const transmitBtn = document.getElementById('transmit-btn');
  const laserBulb = document.getElementById('laser-bulb');
  const soundToggle = document.getElementById('sound-toggle');

  if (!morseInput || !morseOutput || !transmitBtn || !laserBulb) return;

  const MORSE_CODE_MAP = {
    'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',   'E': '.',
    'F': '..-.',  'G': '--.',   'H': '....',  'I': '..',    'J': '.---',
    'K': '-.-',   'L': '.-..',  'M': '--',    'N': '-.',    'O': '---',
    'P': '.--.',  'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
    'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',  'Y': '-.--',
    'Z': '--..',  '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '0': '-----', ' ': '/'
  };

  function textToMorse(text) {
    return text.toUpperCase().split('').map(char => MORSE_CODE_MAP[char] || '').join(' ');
  }

  // Real-time translation update
  morseInput.addEventListener('input', () => {
    const text = morseInput.value.trim();
    if (!text) {
      morseOutput.textContent = '... --- ... (SOS)';
      return;
    }
    const morse = textToMorse(text);
    morseOutput.textContent = morse;
  });

  // Audio Context for Morse Tone (700Hz sine wave)
  let audioCtx = null;
  function playTone(duration) {
    if (!soundToggle || !soundToggle.checked) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + (duration / 1000));
    } catch (e) {
      console.warn("Audio Context not supported or allowed", e);
    }
  }

  let isTransmitting = false;

  transmitBtn.addEventListener('click', async () => {
    if (isTransmitting) return;

    const text = morseInput.value.trim() || "SOS";
    const morse = textToMorse(text);
    morseOutput.textContent = morse;

    isTransmitting = true;
    transmitBtn.disabled = true;
    transmitBtn.textContent = 'Transmitting Laser...';

    const DOT_TIME = 120; // ms
    const DASH_TIME = DOT_TIME * 3;
    const SYMBOL_GAP = DOT_TIME;
    const LETTER_GAP = DOT_TIME * 3;
    const WORD_GAP = DOT_TIME * 7;

    for (let i = 0; i < morse.length; i++) {
      const symbol = morse[i];

      if (symbol === '.') {
        laserBulb.classList.add('transmitting');
        playTone(DOT_TIME);
        await sleep(DOT_TIME);
        laserBulb.classList.remove('transmitting');
        await sleep(SYMBOL_GAP);
      } else if (symbol === '-') {
        laserBulb.classList.add('transmitting');
        playTone(DASH_TIME);
        await sleep(DASH_TIME);
        laserBulb.classList.remove('transmitting');
        await sleep(SYMBOL_GAP);
      } else if (symbol === ' ') {
        await sleep(LETTER_GAP);
      } else if (symbol === '/') {
        await sleep(WORD_GAP);
      }
    }

    laserBulb.classList.remove('transmitting');
    isTransmitting = false;
    transmitBtn.disabled = false;
    transmitBtn.innerHTML = `
      <svg class="btn-icon" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      Transmit via Laser
    `;
  });

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/* -------------------------------------------------------------------
   7. CONTACT FORM SUBMISSION & FEEDBACK
   ------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alert = document.getElementById('form-alert');

  if (!form || !alert) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      alert.className = 'form-alert';
      alert.style.display = 'block';
      alert.style.background = 'rgba(239, 68, 68, 0.15)';
      alert.style.borderColor = 'rgba(239, 68, 68, 0.3)';
      alert.style.color = '#f87171';
      alert.textContent = 'Please fill out all required fields.';
      return;
    }

    // Success state
    alert.className = 'form-alert success';
    alert.textContent = `Thank you, ${name}! Your email client will open to send your message.`;

    // Construct mailto link
    const mailtoUrl = `mailto:kolluruvaasanthi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    
    // Open user's email client
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 800);

    form.reset();

    setTimeout(() => {
      alert.style.display = 'none';
    }, 6000);
  });
}

/* -------------------------------------------------------------------
   8. ONE-CLICK CLIPBOARD COPY
   ------------------------------------------------------------------- */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('[data-copy-target]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy-target');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalTitle = btn.getAttribute('title') || 'Copy';
        btn.setAttribute('title', 'Copied!');
        btn.style.color = 'var(--accent-emerald)';

        setTimeout(() => {
          btn.setAttribute('title', originalTitle);
          btn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  });
}

/* -------------------------------------------------------------------
   9. BACK TO TOP BUTTON
   ------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
