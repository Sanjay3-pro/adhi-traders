document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  let touchHandled = false;

  const toggleNav = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  };

  // Touch first: prevent the synthesized click from toggling again
  toggle.addEventListener('touchstart', function (e) {
    touchHandled = true;
    toggleNav(e);
    // reset after short delay to allow click event to be ignored
    setTimeout(() => { touchHandled = false; }, 700);
  }, { passive: false });

  toggle.addEventListener('click', function (e) {
    if (touchHandled) return;
    toggleNav(e);
  });

  // Close nav when clicking/tapping outside (mobile)
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});