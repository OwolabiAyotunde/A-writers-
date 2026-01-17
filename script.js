// A+ Writers — Interactions and Quiz

// Util: DOM helpers
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

// Footer year
qs('#year').textContent = new Date().getFullYear();

// Scroll reveal via IntersectionObserver
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in-view');
    });
  },
  { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
);

// Apply reveal to section children and cards
qsa('.section .container > *').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
qsa('.card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Parallax subtle movement for shapes
const parallax = () => {
  const y = window.scrollY || 0;
  qsa('.shape-1').forEach(el => (el.style.transform = `translateY(${y * 0.06}px)`));
  qsa('.shape-2').forEach(el => (el.style.transform = `translateY(${y * -0.04}px)`));
  qsa('.shape-3').forEach(el => (el.style.transform = `translateY(${y * 0.03}px)`));
};
window.addEventListener('scroll', parallax, { passive: true });
parallax();

// 3D tilt effect on cards
const tiltCards = qsa('.tilt-card');
tiltCards.forEach(card => {
  const rotate = (ev) => {
    const rect = card.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -6; // rotateX
    const ry = ((x / rect.width) - 0.5) * 6;   // rotateY
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  };
  const reset = () => { card.style.transform = 'perspective(900px) translateY(0)'; };
  card.addEventListener('mousemove', rotate);
  card.addEventListener('mouseleave', reset);
  card.addEventListener('blur', reset);
});

// Smooth anchor scroll for nav
qsa('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    const target = qs(`#${CSS.escape(id)}`);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Contact form behavior: open WhatsApp with prefilled message
const form = qs('#contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = qs('#name').value.trim();
  const email = qs('#email').value.trim();
  const qualification = qs('#qualification').value.trim();
  const message = qs('#message').value.trim();
  const text = encodeURIComponent(
    `A+ Writers – Quote Request%0A%0AName: ${name}%0AEmail: ${email}%0AQualification/Course: ${qualification}%0A%0AMessage:%0A${message}`
  );
  const wa = `https://wa.me/2348161892889?text=${text}`;
  window.open(wa, '_blank', 'noopener');
});

// Care Certificate Quiz
const quizData = [
  {
    q: 'Which statement best describes the Care Certificate?',
    options: [
      'A degree-level qualification',
      'Standards for health & social care support workers',
      'A mandatory university module',
      'A clinical license'
    ],
    answer: 1
  },
  {
    q: 'Duty of care means:',
    options: [
      'Ignoring risks when busy',
      'Putting the person’s best interests first and preventing harm',
      'Following instructions without thinking',
      'Letting colleagues decide alone'
    ],
    answer: 1
  },
  {
    q: 'Confidentiality requires you to:',
    options: [
      'Share private details with friends',
      'Only share information on a need-to-know basis',
      'Post updates on social media',
      'Tell anyone who asks'
    ],
    answer: 1
  },
  {
    q: 'Person-centred care focuses on:',
    options: [
      'Organisational convenience',
      'Individual preferences, values, and choices',
      'Staff schedules only',
      'Budget constraints'
    ],
    answer: 1
  },
  {
    q: 'Which is a sign of possible abuse?',
    options: [
      'Unexplained injuries or sudden fearfulness',
      'Consistent care planning',
      'Appropriate food choices',
      'Regular family visits'
    ],
    answer: 0
  },
  {
    q: 'Safeguarding is primarily about:',
    options: [
      'Protecting people from abuse, neglect, and harm',
      'Increasing paperwork only',
      'Avoiding communication with families',
      'Replacing person-centred care'
    ],
    answer: 0
  },
  {
    q: 'Effective communication includes:',
    options: [
      'Active listening and clear language',
      'Interrupting regularly',
      'Using jargon only',
      'Avoiding non-verbal cues'
    ],
    answer: 0
  },
  {
    q: 'Record keeping should be:',
    options: [
      'Accurate, timely, and objective',
      'Based on assumptions',
      'Left incomplete',
      'Written only at the end of the month'
    ],
    answer: 0
  },
  {
    q: 'Infection prevention includes:',
    options: [
      'Hand hygiene and PPE where appropriate',
      'Ignoring symptoms',
      'Reusing single-use items',
      'Skipping cleaning routines'
    ],
    answer: 0
  },
  {
    q: 'Equality and diversity promote:',
    options: [
      'Respect and fair access for all',
      'Favouring certain groups',
      'Uniform care plans for everyone',
      'Excluding preferences'
    ],
    answer: 0
  },
  {
    q: 'Health and safety requires:',
    options: [
      'Risk assessment and safe practices',
      'Ignoring hazards',
      'Working without training',
      'No reporting of incidents'
    ],
    answer: 0
  },
  {
    q: 'Fluids and nutrition support includes:',
    options: [
      'Monitoring intake aligned with individual needs',
      'One-size-fits-all diet',
      'Restricting fluids randomly',
      'Ignoring dehydration'
    ],
    answer: 0
  },
  {
    q: 'Privacy and dignity in care means:',
    options: [
      'Respecting personal space and choices',
      'Discussing personal issues publicly',
      'Rushing tasks regardless of preference',
      'Ignoring cultural values'
    ],
    answer: 0
  },
  {
    q: 'Safely handling information involves:',
    options: [
      'Secure storage and controlled access',
      'Sharing passwords',
      'Leaving files unlocked',
      'Unencrypted emails with sensitive data'
    ],
    answer: 0
  },
  {
    q: 'The Mental Capacity Act supports:',
    options: [
      'Decision-making respecting a person’s abilities and rights',
      'Staff choices only',
      'Automatic decisions without assessment',
      'Ignoring best interests'
    ],
    answer: 0
  }
];

let current = -1; // -1 indicates not started
let score = 0;
const quizBody = qs('#quiz-body');
const nextBtn = qs('#next-btn');
const prevBtn = qs('#prev-btn');
const progressBar = qs('.progress-bar');
const progressText = qs('.progress-text');

function updateProgress() {
  const total = quizData.length;
  const shown = Math.max(0, current + 1);
  const pct = Math.round((shown / total) * 100);
  progressBar.style.width = `${pct}%`;
  progressText.textContent = `${shown} / ${total}`;
}

function renderQuestion() {
  const total = quizData.length;
  if (current >= total) return renderSummary();

  const { q, options, answer } = quizData[current];
  quizBody.innerHTML = `
    <div class="quiz-card show">
      <div class="quiz-question"><strong>Q${current + 1}.</strong> ${q}</div>
      <div class="quiz-options" role="group" aria-label="answer choices">
        ${options.map((opt, i) => `<button class="quiz-option" data-index="${i}">${opt}</button>`).join('')}
      </div>
      <div class="quiz-feedback" aria-live="polite"></div>
    </div>
  `;

  const opts = qsa('.quiz-option', quizBody);
  const feedback = qs('.quiz-feedback', quizBody);
  let answered = false;

  opts.forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const idx = Number(btn.dataset.index);
      opts.forEach(o => o.disabled = true);
      if (idx === answer) {
        btn.classList.add('correct');
        feedback.textContent = 'Correct!';
        score += 1;
      } else {
        btn.classList.add('incorrect');
        opts[answer]?.classList.add('correct');
        feedback.textContent = 'Not quite — review the standards and try again.';
      }
      nextBtn.textContent = current === total - 1 ? 'Finish' : 'Next';
    });
  });

  prevBtn.disabled = current <= 0;
  nextBtn.textContent = 'Next';
  updateProgress();
}

function renderSummary() {
  const total = quizData.length;
  quizBody.innerHTML = `
    <div class="quiz-summary show">
      <h3>Your Performance</h3>
      <p><strong>${score}</strong> out of <strong>${total}</strong> correct.</p>
      <p>Keep practicing to master Care Certificate standards and safe, person-centred care.</p>
      <div style="margin-top: 16px;">
        <button id="restart-btn" class="btn btn-primary">Start Again</button>
      </div>
    </div>
  `;
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  const restart = qs('#restart-btn');
  restart.addEventListener('click', () => {
    score = 0;
    current = 0;
    nextBtn.disabled = false;
    renderQuestion();
  });
  progressBar.style.width = '100%';
  progressText.textContent = `${quizData.length} / ${quizData.length}`;
}

// Quiz navigation
nextBtn.addEventListener('click', () => {
  if (current === -1) {
    current = 0;
    nextBtn.textContent = 'Next';
    renderQuestion();
  } else if (current < quizData.length) {
    current += 1;
    if (current < quizData.length) renderQuestion();
    else renderSummary();
  }
});

prevBtn.addEventListener('click', () => {
  if (current > 0) {
    current -= 1;
    renderQuestion();
  }
});