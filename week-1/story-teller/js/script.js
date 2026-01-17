// Find elements
const image = document.querySelector('.story-image img');
const caption = document.querySelector('#story-caption');
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
  }
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