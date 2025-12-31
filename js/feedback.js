document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'adhiFeedback';

  // Elements (created in HTML)
  const openButtons = document.querySelectorAll('.feedback-open');
  const modal = document.querySelector('.feedback-modal');
  const overlay = document.querySelector('.feedback-overlay');
  const closeBtn = document.querySelector('.feedback-close');
  const starContainer = document.querySelector('.feedback-stars');
  const ratingInput = document.querySelector('#feedback-rating');
  const nameInput = document.querySelector('#feedback-name');
  const commentInput = document.querySelector('#feedback-comment');
  const submitBtn = document.querySelector('#feedback-submit');
  const messageBox = document.querySelector('.feedback-message');
  const badge = document.querySelector('#rating-badge');

  if (!modal || !starContainer || !submitBtn) return;

  function loadFeedback() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveFeedback(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }

  function calcSummary(entries) {
    if (!entries.length) return { avg: 0, count: 0 };
    const sum = entries.reduce((s, e) => s + (e.rating || 0), 0);
    return { avg: Math.round((sum / entries.length) * 10) / 10, count: entries.length };
  }

  function updateBadge() {
    if (!badge) return;
    const entries = loadFeedback();
    const { avg, count } = calcSummary(entries);
    badge.textContent = `⭐ ${avg} (${count})`;
  }



  // Stars rendering
  function renderStars(value = 0) {
    starContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('button');
      star.type = 'button';
      star.className = 'star' + (i <= value ? ' on' : '');
      star.setAttribute('aria-label', `${i} star`);
      star.dataset.value = i;
      star.innerHTML = '★';
      star.addEventListener('click', () => {
        ratingInput.value = i;
        renderStars(i);
      });
      starContainer.appendChild(star);
    }
  }

  function openModal() {
    modal.classList.add('open');
    overlay.classList.add('open');
    renderStars(Number(ratingInput.value) || 0);
    messageBox.textContent = '';
    nameInput.value = '';
    commentInput.value = '';
  }

  function closeModal() {
    modal.classList.remove('open');
    overlay.classList.remove('open');
  }

  openButtons.forEach(b => b.addEventListener('click', openModal));
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  submitBtn.addEventListener('click', () => {
    const rating = Number(ratingInput.value) || 0;
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (!rating || rating < 1 || rating > 5) {
      messageBox.textContent = 'Please select a star rating.';
      return;
    }

    const entries = loadFeedback();
    entries.unshift({ name, comment, rating, ts: Date.now() });
    saveFeedback(entries);

    messageBox.textContent = 'Thank you for your feedback!';
    updateBadge();

    // show quick success and close
    setTimeout(() => closeModal(), 1200);
  });

  // initial render
  updateBadge();
  renderStars(0);
});