// Add at the top
let azkarData = {};

// Load JSON data on startup
window.addEventListener('DOMContentLoaded', () => {
  // ... existing DOMContentLoaded code ...
  
  // Add fetch call inside the existing DOMContentLoaded
  fetch('azkar.json')
    .then(response => response.json())
    .then(data => {
      azkarData = data;
      console.log('Azkar data loaded successfully');
    })
    .catch(error => console.error('Error loading azkar data:', error));
});

// Modified category functions with dynamic content loading
function loadCategoryContent(category, containerId, prevButtonId, nextButtonId) {
  const container = document.getElementById(containerId);
  if (!container || !azkarData[category]) return;

  // Clear existing content
  container.innerHTML = '';
  
  // Create new boxes from JSON data
  azkarData[category].forEach(entry => {
    const div = document.createElement('div');
    div.className = 'sub-box';
    div.innerHTML = `
      <div class="hadith">
        <p>${entry.text.replace(/\n/g, '<br>')}</p>
      </div>
    `;
    container.appendChild(div);
  });

  // Reinitialize carousel with new content
  initializeCarousel(containerId, prevButtonId, nextButtonId);
}

// Modified existing category functions
function showMorningAzkar() {
  document.getElementById('main').style.display = 'none';
  document.getElementById('morningPage').style.display = 'block';
  currentPage = 'morningPage';
  loadCategoryContent('morning', 'subBoxes-mo', 'prevButton-mo', 'nextButton-mo');
}

function showEveningAzkar() {
  document.getElementById('main').style.display = 'none';
  document.getElementById('eveningPage').style.display = 'block';
  currentPage = 'eveningPage';
  loadCategoryContent('evening', 'subBoxes-ev', 'prevButton-ev', 'nextButton-ev');
}

function showSleepAzkar() {
  document.getElementById('main').style.display = 'none';
  document.getElementById('sleepPage').style.display = 'block';
  currentPage = 'sleepPage';
  loadCategoryContent('sleep', 'subBoxes-sl', 'prevButton-sl', 'nextButton-sl');
}

function showWakingUpAzkar() {
  document.getElementById('main').style.display = 'none';
  document.getElementById('wakingupPage').style.display = 'block';
  currentPage = 'wakingupPage';
  loadCategoryContent('waking', 'subBoxes-wa', 'prevButton-wa', 'nextButton-wa');
}

function showAfterPrayerAzkar() {
  document.getElementById('main').style.display = 'none';
  document.getElementById('afterPrayerPage').style.display = 'block';
  currentPage = 'afterPrayerPage';
  loadCategoryContent('afterPrayer', 'subBoxes-af', 'prevButton-af', 'nextButton-af');
}

// Keep the rest of your existing code unchanged
// ... (initializeCarousel, home, theme functions, etc) ...