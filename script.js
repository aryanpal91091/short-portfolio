/**
 * ARYAN PAL — PORTFOLIO CLIENT APPLICATION ENGINE
 * Production-ready interactions, modal controllers, interview scheduler, copy triggers, and contact form handling.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. DYNAMIC YEAR & SCROLL PROGRESS
  // ==========================================================================
  const copyrightYearEl = document.getElementById('copyright-year');
  if (copyrightYearEl) {
    copyrightYearEl.textContent = new Date().getFullYear();
  }

  const scrollProgress = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const navAnchors = document.querySelectorAll('.nav-anchor');
  const pageSections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scroll progress bar
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / (scrollHeight || 1)) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    // Navbar appearance
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Active Section Spy
    let currentId = 'home';
    pageSections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });

    navAnchors.forEach(anchor => {
      anchor.classList.remove('active');
      if (anchor.getAttribute('href') === `#${currentId}`) {
        anchor.classList.add('active');
      }
    });
  }, { passive: true });

  // ==========================================================================
  // 2. MOBILE NAVIGATION DRAWER
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    function toggleMenu() {
      const isOpen = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    }

    mobileToggle.addEventListener('click', toggleMenu);

    navAnchors.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================================================
  // 3. BACK TO TOP
  // ==========================================================================
  const btnBackToTop = document.getElementById('btn-back-to-top');
  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 4. CASE STUDY MODAL ENGINE
  // ==========================================================================
  const modalOverlay = document.getElementById('case-study-modal');
  const modalCloseTrigger = document.getElementById('modal-close-trigger');
  const modalBodyContainer = document.getElementById('modal-body-container');
  const caseStudyTriggers = document.querySelectorAll('.open-case-study');

  const projectDetailsMap = {
    'palmart': {
      title: 'PALMART ENTERPRISE PRO',
      subtitle: 'POS & Inventory Management System',
      badge: 'Full-Stack Enterprise',
      image: 'assets/palmart-cover.jpg',
      description: 'A full-stack supermarket management system designed to streamline billing, inventory tracking, sales reporting, and business analytics.',
      architecturePoints: [
        'POS & Billing Engine: High-speed barcode/item lookup with transactional integrity and auto-generated digital invoices.',
        'Role-Based Authorization: Granular permissions tailored for Cashier, Manager, and Administrator personas using secure JWT tokens.',
        'Business Analytics & ML: Integrated demand forecasting, market basket analysis for bundling insights, and automated daily/weekly sales synthesis.',
        'Reliable Storage & Recovery: Relational data modeled in PostgreSQL via Prisma ORM with automated database backup triggers and Docker containerization.'
      ],
      techStack: ['React 19', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Redux', 'JWT', 'Docker', 'Git & GitHub'],
      githubUrl: 'https://github.com/aryanpal91091/palmart-enterprises',
      liveDemoUrl: null
    },
    'signal-drift': {
      title: 'SIGNAL DRIFT',
      subtitle: '3D Zero-Gravity Space Navigation Game | S.T.E.M Jam 2026',
      badge: '3D WebGL / Physics',
      image: 'assets/signal-drift-cover.jpg',
      description: 'An immersive 3D space navigation experience where players maneuver through a zero-gravity environment, avoid asteroids, and navigate toward a transmission beacon.',
      architecturePoints: [
        '6DOF Flight Physics: Custom zero-gravity momentum simulation with linear inertia, angular damping, and thruster vector calculation.',
        'Procedural Asteroid Fields: Algorithmic mesh generation and distance-based level of detail for performant rendering in WebGL.',
        'Signal & Raycasting Logic: Real-time raycasting against asteroid bounding spheres to calculate signal degradation and line-of-sight occlusion to the beacon.',
        'Custom GLSL Shaders: Real-time post-processing shaders simulating cockpit HUD artifacts, chromatic aberration, scanlines, and digital distortion upon collision.'
      ],
      techStack: ['JavaScript', 'Three.js', 'WebGL', 'GLSL Shaders', 'Physics Simulation', 'Raycasting'],
      githubUrl: null,
      liveDemoUrl: 'https://space-aesteroid-signal-game.vercel.app/'
    },
    'resqroute': {
      title: 'ResQRoute',
      subtitle: 'AI-Powered Emergency Response System',
      badge: 'Emergency Coordination Platform',
      image: 'assets/resqroute-cover.png',
      description: 'An emergency response coordination platform designed to connect citizens, ambulance services, traffic police, and hospitals through a unified system.',
      disclaimer: 'Demonstration and research prototype only. Must not be used or relied upon as a substitute for official municipal emergency response services.',
      architecturePoints: [
        'Rapid SOS Workflow: Geolocation-assisted emergency trigger transmitting patient coordinates and incident severity.',
        'Unified Stakeholder Portal: Synchronized dashboard keeping ambulance drivers, hospital ER staff, and traffic monitoring units aligned.',
        'AI Decision Support: Heuristic and ML triage scoring prioritizing severe emergencies and computing estimated time of arrival.',
        'Live Route Tracking: Map visualization of emergency transit corridors designed to assist in minimizing transit congestion.'
      ],
      techStack: ['React', 'JavaScript', 'Node.js', 'AI/ML', 'Maps API', 'REST APIs'],
      githubUrl: null,
      liveDemoUrl: 'https://emergency-sos-system-six.vercel.app/'
    }
  };

  function openCaseStudy(projectId) {
    const data = projectDetailsMap[projectId];
    if (!data || !modalBodyContainer) return;

    modalBodyContainer.innerHTML = `
      <div style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.35rem;">
        ${data.subtitle}
      </div>
      <h2 style="font-size: 2rem; margin-bottom: 1rem; color: var(--text-primary);">${data.title}</h2>
      
      <div style="width: 100%; height: 260px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-medium);">
        <img src="${data.image}" alt="${data.title} Visual Preview" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 1.5rem;">
        ${data.description}
      </p>

      ${data.disclaimer ? `
        <div style="font-size: 0.82rem; font-family: var(--font-mono); color: #fb7185; background: rgba(244, 63, 94, 0.08); border: 1px solid rgba(244, 63, 94, 0.25); padding: 0.75rem 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
          ⚠️ <strong>Notice:</strong> ${data.disclaimer}
        </div>
      ` : ''}

      <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--text-primary);">Engineering Architecture & Capabilities</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.75rem; padding-left: 0;">
        ${data.architecturePoints.map(point => `
          <li style="display: flex; gap: 0.6rem; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5;">
            <span style="color: var(--accent-cyan); margin-top: 2px;">▹</span>
            <span>${point}</span>
          </li>
        `).join('')}
      </ul>

      <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--text-primary);">Technologies Employed</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 2rem;">
        ${data.techStack.map(tech => `
          <span style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: var(--radius-sm); font-size: 0.8rem; font-family: var(--font-mono); color: var(--text-secondary);">
            ${tech}
          </span>
        `).join('')}
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
        ${data.liveDemoUrl ? `
          <a href="${data.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <span>Launch Live Demo</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        ` : ''}

        ${data.githubUrl ? `
          <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            <span>View Source Code</span>
          </a>
        ` : ''}

        <button class="btn btn-outline btn-sm" id="btn-modal-dismiss">
          <span>Close Window</span>
        </button>
      </div>
    `;

    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const dismissBtn = document.getElementById('btn-modal-dismiss');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', closeModal);
    }
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  caseStudyTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project-id');
      openCaseStudy(pId);
    });
  });

  if (modalCloseTrigger) {
    modalCloseTrigger.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // ==========================================================================
  // 5. SCHEDULE INTERVIEW BOOKING ENGINE
  // ==========================================================================
  const interviewModal = document.getElementById('interview-modal');
  const interviewCloseTrigger = document.getElementById('interview-close-trigger');
  const openInterviewButtons = document.querySelectorAll('.open-interview-modal');
  const bookingForm = document.getElementById('interview-booking-form');
  const bookingFormView = document.getElementById('booking-form-view');
  const bookingConfView = document.getElementById('booking-confirmation-view');
  const bookingErrorMsg = document.getElementById('booking-error-msg');
  const bookDateInput = document.getElementById('book-date');
  const typeCards = document.querySelectorAll('.interview-type-card');
  const btnDoneBooking = document.getElementById('btn-done-booking');
  const btnDownloadIcs = document.getElementById('btn-download-ics');

  // Set minimum date to today
  if (bookDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookDateInput.min = today;
    bookDateInput.value = today;
  }

  // Handle format radio selection
  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  function openInterviewModal() {
    if (!interviewModal) return;
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    }
    // Reset view
    bookingFormView.style.display = 'block';
    bookingConfView.style.display = 'none';
    bookingErrorMsg.style.display = 'none';

    interviewModal.classList.add('open');
    interviewModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeInterviewModal() {
    if (!interviewModal) return;
    interviewModal.classList.remove('open');
    interviewModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openInterviewButtons.forEach(btn => {
    btn.addEventListener('click', openInterviewModal);
  });

  if (interviewCloseTrigger) {
    interviewCloseTrigger.addEventListener('click', closeInterviewModal);
  }

  if (btnDoneBooking) {
    btnDoneBooking.addEventListener('click', closeInterviewModal);
  }

  if (interviewModal) {
    interviewModal.addEventListener('click', (e) => {
      if (e.target === interviewModal) closeInterviewModal();
    });
  }

  let lastBookingData = null;

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('book-name').value.trim();
      const email = document.getElementById('book-email').value.trim();
      const company = document.getElementById('book-company').value.trim();
      const role = document.getElementById('book-role').value.trim();
      const date = document.getElementById('book-date').value;
      const time = document.getElementById('book-time').value;
      const notes = document.getElementById('book-notes').value.trim();
      const formatRadio = document.querySelector('input[name="interview-type"]:checked');
      const format = formatRadio ? formatRadio.value : 'Technical Walkthrough (45 min)';

      if (!name || !email || !company || !role || !date || !time) {
        bookingErrorMsg.className = 'form-status-display error';
        bookingErrorMsg.textContent = 'Please fill out all required booking fields.';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        bookingErrorMsg.className = 'form-status-display error';
        bookingErrorMsg.textContent = 'Please enter a valid work email address.';
        return;
      }

      // Generate Reference Code
      const refId = `AP-INT-${Math.floor(1000 + Math.random() * 9000)}`;

      lastBookingData = {
        refId,
        name,
        email,
        company,
        role,
        date,
        time,
        format,
        notes
      };

      // Populate Confirmation View
      document.getElementById('conf-ref-id').textContent = refId;
      document.getElementById('conf-interviewer').textContent = `${name} (${company})`;
      document.getElementById('conf-date').textContent = new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      document.getElementById('conf-time').textContent = time;
      document.getElementById('conf-format').textContent = format;

      bookingFormView.style.display = 'none';
      bookingConfView.style.display = 'block';

      // Prefilled mailto dispatch to ensure candidate receives notification
      const emailSubject = `Interview Scheduled [${refId}]: ${name} (${company}) with Aryan Pal`;
      const emailBody = `Interview Request Details:\n\nReference: ${refId}\nInterviewer: ${name}\nEmail: ${email}\nCompany: ${company}\nTarget Role: ${role}\nDate: ${date}\nTime Slot: ${time}\nFormat: ${format}\nNotes: ${notes || 'None provided'}\n\nCandidate: Aryan Pal (palaryan7546@gmail.com / +91 9109163433)`;

      const mailtoUrl = `mailto:palaryan7546@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 1000);

      triggerToast('Interview scheduled! Opening dispatch confirmation...');
    });
  }

  // Calendar Invite (.ICS) Generator
  if (btnDownloadIcs) {
    btnDownloadIcs.addEventListener('click', () => {
      if (!lastBookingData) return;

      const dateClean = lastBookingData.date.replace(/-/g, '');
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Aryan Pal Portfolio//Interview Scheduler//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:REQUEST',
        'BEGIN:VEVENT',
        `UID:${lastBookingData.refId}@aryanpal.dev`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `DTSTART;VALUE=DATE:${dateClean}`,
        `SUMMARY:Interview with Aryan Pal - ${lastBookingData.format}`,
        `DESCRIPTION:Interview Booking Reference: ${lastBookingData.refId}\\nCandidate: Aryan Pal\\nInterviewer: ${lastBookingData.name} (${lastBookingData.company})\\nRole: ${lastBookingData.role}\\nTime Slot: ${lastBookingData.time}\\nNotes: ${lastBookingData.notes || 'None'}`,
        'LOCATION:Google Meet / Zoom / Microsoft Teams',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Interview_Aryan_Pal_${lastBookingData.refId}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      triggerToast('Downloaded .ics calendar invite!');
    });
  }

  // Global Escape Key Listener for all modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay && modalOverlay.classList.contains('open')) {
        closeModal();
      }
      if (interviewModal && interviewModal.classList.contains('open')) {
        closeInterviewModal();
      }
    }
  });

  // ==========================================================================
  // 6. TOAST NOTIFICATIONS & COPY TRIGGERS
  // ==========================================================================
  const toastBanner = document.getElementById('toast-banner');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout = null;

  function triggerToast(text) {
    if (!toastBanner || !toastMessage) return;
    toastMessage.textContent = text;
    toastBanner.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastBanner.classList.remove('show');
    }, 2800);
  }

  const copyButtons = document.querySelectorAll('.copy-action-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const stringToCopy = btn.getAttribute('data-copy');
      if (!stringToCopy) return;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(stringToCopy)
          .then(() => triggerToast(`Copied to clipboard: ${stringToCopy}`))
          .catch(() => fallbackCopy(stringToCopy));
      } else {
        fallbackCopy(stringToCopy);
      }
    });
  });

  function fallbackCopy(str) {
    const tempInput = document.createElement('input');
    tempInput.value = str;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    triggerToast(`Copied to clipboard: ${str}`);
  }

  // ==========================================================================
  // 7. FUNCTIONAL CONTACT FORM (VALIDATION + RELIABLE MAILTO DISPATCH)
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      // Field validation
      if (!name || !email || !subject || !message) {
        formStatus.className = 'form-status-display error';
        formStatus.textContent = 'Please complete all required fields.';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formStatus.className = 'form-status-display error';
        formStatus.textContent = 'Please enter a valid email address.';
        return;
      }

      // Authentic behavior: Provide honest feedback and launch default email client
      formStatus.className = 'form-status-display success';
      formStatus.innerHTML = `Thank you, <strong>${escapeHTML(name)}</strong>! Preparing your message for direct transmission to <em>palaryan7546@gmail.com</em>...`;

      const mailtoUrl = `mailto:palaryan7546@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 900);

      contactForm.reset();
      triggerToast('Message prepared! Opening email client...');
    });
  }

  // XSS Sanitizer Helper
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

});
