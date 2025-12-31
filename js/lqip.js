document.addEventListener('DOMContentLoaded', () => {
  // Find all images used with LQIP
  const imgs = document.querySelectorAll('.lqip-img');
  imgs.forEach(img => {
    // If already loaded (from cache), mark as loaded
    if (img.complete && img.naturalWidth) {
      img.classList.add('loaded');
      return;
    }
    img.addEventListener('load', () => img.classList.add('loaded'));
    img.addEventListener('error', () => img.classList.add('loaded'));
  });
});