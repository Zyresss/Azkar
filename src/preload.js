/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  // "dark" and "light" themes

  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  if (savedTheme === 'dark') {
    document.getElementById('dark').checked = true;
  }
  else {
    document.getElementById('light').checked = true;
  }
  document.getElementById('dark').addEventListener('change', () => setTheme('dark'));
  document.getElementById('light').addEventListener('change', () => setTheme('light'));

})

function setActive(element) {
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  element.classList.add('active');
}
// themes
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme)
}

function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || light;
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
}

function setDefaultActiveLink() {
  const currentPage = window.location.pathname.split('/').pop(); // Get the current page filename
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      setActive(link); // Set the link as active
    }
  });
}

// Call the function when the page loads
window.onload = setDefaultActiveLink;

const scrollSection = document.getElementById('scrollSection');

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

let currentPage = null;


function showMorningAzkar() {
  document.getElementById('main').style.display = 'none';
  document.getElementById('morningPage').style.display = 'block';
  currentPage = 'morningPage';
  initializeCarousel('subBoxes-mo', 'prevButton-mo', 'nextButton-mo');
}

function showEveningAzkar() {
  document.getElementById('main').style.display = 'none';
  document.getElementById('eveningPage').style.display = 'block';
  currentPage = 'eveningPage';
  initializeCarousel('subBoxes-ev', 'prevButton-ev', 'nextButton-ev');
}

function showSleepAzkar() {
  document.getElementById('main').style.display = 'none';
  document.getElementById('sleepPage').style.display = 'block';
  currentPage = 'sleepPage';
  initializeCarousel('subBoxes-sl', 'prevButton-sl', 'nextButton-sl');
}

function showWakingUpAzkar() {
  document.getElementById('main').style.display = 'none';
  document.getElementById('wakingupPage').style.display = 'block';
  currentPage = 'wakingupPage';
  initializeCarousel('subBoxes-wa', 'prevButton-wa', 'nextButton-wa');
}

function showAfterPrayerAzkar() {
  document.getElementById('main').style.display = 'none';
  document.getElementById('afterPrayerPage').style.display = 'block';
  currentPage = 'afterPrayerPage';
  initializeCarousel('subBoxes-af', 'prevButton-af', 'nextButton-af');
}

function home() {
  // Hide current page if one is active
  if (currentPage) {
    document.getElementById(currentPage).style.display = 'none';
  }
  // Show main page
  document.getElementById('main').style.display = 'block';
  // Reset current page
  currentPage = null;
}

function initializeCarousel(subBoxesId, prevButtonId, nextButtonId) {
  const subBoxes = document.getElementById(subBoxesId);
  const prevButton = document.getElementById(prevButtonId);
  const nextButton = document.getElementById(nextButtonId);
  let currentPosition = 0;
  
  // Calculate total boxes dynamically
  const totalBoxes = subBoxes.children.length;
  
  // Set container width based on number of boxes
  subBoxes.style.width = `${totalBoxes * 500}px`;

  prevButton.addEventListener('click', () => {
    if (currentPosition > 0) {
      currentPosition -= 1;
      subBoxes.style.transform = `translateX(-${currentPosition * 500}px)`;
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentPosition < totalBoxes - 1) {
      currentPosition += 1;
      subBoxes.style.transform = `translateX(-${currentPosition * 500}px)`;
    }
  });
}