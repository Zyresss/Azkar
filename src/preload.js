/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

const scrollSection = document.getElementById('scrollSection');

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

function setActive(element) {
  // Remove active class from all links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  // Add active class to clicked link
  element.classList.add('active');
}


scrollSection.addEventListener('wheel', (e) => {
  const scrollTop = scrollSection.scrollTop;
  const scrollHeight = scrollSection.scrollHeight;
  const clientHeight = scrollSection.clientHeight;

  // Check if we're at the top or bottom
  if (
      (scrollTop <= 0 && e.deltaY < 0) || // At top and scrolling up
      (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0) // At bottom and scrolling down
  ) {
      e.preventDefault(); // Prevent main window scroll
      return;
  }

  // Normal smooth scroll within the section
  e.preventDefault();
  scrollSection.scrollBy({
      top: e.deltaY * 0.14,
      behavior: 'smooth'
  });
});