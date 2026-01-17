// Find elements
const image = document.querySelector('.story-image img');
const caption = document.querySelector('#story-caption');
const restartBtn = document.querySelector('#restart-btn');

// Story content
const captions = [
  "Click the image to begin...",
  "Chapter 1: The beginning...",
  "Chapter 2: The journey...",
  "Chapter 3: The challenge...",
  "Chapter 4: The turning point...",
  "Chapter 5: The resolution..."
];

// Track current step
let currentStep = 0;

// Listen for clicks
image.addEventListener('click', function() {
  currentStep++;
  if (currentStep < captions.length) {
    // Update caption
    caption.textContent = captions[currentStep];
    // Update image
    image.src = `assets/images/love-0${currentStep + 1}.png`;
    // Update progress dots
    updateProgress(currentStep);
    
    // Show restart button on last page
    if (currentStep === captions.length - 1) {
      restartBtn.classList.add('visible');
    }
  }
});

// Restart button click handler
restartBtn.addEventListener('click', function() {
  currentStep = 0;
  caption.textContent = captions[0];
  image.src = 'assets/images/love-01.png';
  updateProgress(0);
  restartBtn.classList.remove('visible');
});

function updateProgress(step) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index <= step) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}