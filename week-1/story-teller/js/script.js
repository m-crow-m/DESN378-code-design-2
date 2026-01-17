// Find elements
const image = document.querySelector('.story-image img');
const caption = document.querySelector('#story-caption');
const restartBtn = document.querySelector('#restart-btn');
const eyelidTop = document.querySelector('.eyelid-top');
const eyelidBottom = document.querySelector('.eyelid-bottom');

// Story content
const captions = [
  "Click the image to begin...",
  "Chapter 1: Meeting...",
  "Chapter 2: Falling in love...",
  "Chapter 3: Growing together...",
  "Chapter 4: We are born dying...",
  "Happy Valentines Day"
];

// Track current step
let currentStep = 0;
let isAnimating = false;

// Blink animation function
function blinkTransition(newImageSrc, callback) {
  if (isAnimating) return;
  isAnimating = true;
  
  // Start blur and close eyelids
  image.classList.add('blinking');
  eyelidTop.classList.add('closing');
  eyelidBottom.classList.add('closing');
  
  // When fully closed, change the image
  setTimeout(() => {
    image.src = newImageSrc;
    
    // Open eyelids after image loads
    setTimeout(() => {
      eyelidTop.classList.remove('closing');
      eyelidBottom.classList.remove('closing');
      image.classList.remove('blinking');
      
      setTimeout(() => {
        isAnimating = false;
        if (callback) callback();
      }, 250);
    }, 100);
  }, 250);
}

// Listen for clicks
image.addEventListener('click', function() {
  if (isAnimating) return;
  
  if (currentStep < captions.length - 1) {
    currentStep++;
    
    // Update caption immediately
    caption.textContent = captions[currentStep];
    
    // Animate image transition
    blinkTransition(`assets/images/love-0${currentStep + 1}.png`, function() {
      // Update progress dots after animation
      updateProgress(currentStep);
      
      // Show restart button on last page
      if (currentStep === captions.length - 1) {
        restartBtn.classList.add('visible');
      }
    });
  }
});

// Restart button click handler
restartBtn.addEventListener('click', function() {
  if (isAnimating) return;
  
  blinkTransition('assets/images/love-01.png', function() {
    currentStep = 0;
    caption.textContent = captions[0];
    updateProgress(0);
    restartBtn.classList.remove('visible');
  });
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