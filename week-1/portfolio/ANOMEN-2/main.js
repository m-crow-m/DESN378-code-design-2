const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
}

const PROJECTS = [
  {
    title: "Room Magazine",
    description: "ergonomic layout design",
    images: [
      "assets/images/Metal_Magazine_JIC.jpg",
      "assets/images/Metal_Magazine_JIC2.jpg",
      "assets/images/Metal_Magazine_JIC3.jpg",
      "assets/images/Metal_Magazine_JIC4.jpg",
      "assets/images/Metal_Magazine_JIC5.jpg",
      "assets/images/Metal_Magazine_JIC6.jpg"
    ],
    details: "Editorial spread designed for ROOM Magazine 2025"
  },
  {
    title: "BRANDING 1",
    description: "Poster & logo design for Neon Groove Dance Studio, 2025.",
    images: [
      "assets/images/insta-postcool_neon.png",
      "assets/images/billboard_neon2.png",
      "assets/images/insta-post_neon.png",
      "assets/images/insta-post3_neon.png",
      "assets/images/NG.jpg"
    ],
    details: "Poster and logo design for 'neon groove dance studio' 2025"
  },
  {
    title: "CALENDAR",
    description: "2026 calendar",
    images: [
      "assets/images/Calender2026-13.jpg",
      "assets/images/Calender2026-01.jpg",
      "assets/images/Calender2026-02.jpg",
      "assets/images/Calender2026-03.jpg",
      "assets/images/Calender2026-04.jpg",
      "assets/images/Calender2026-05.jpg",
      "assets/images/Calender2026-06.jpg",
      "assets/images/Calender2026-07.jpg",
      "assets/images/Calender2026-08.jpg",
      "assets/images/Calender2026-09.jpg",
      "assets/images/Calender2026-10.jpg",
      "assets/images/Calender2026-11.jpg",
      "assets/images/Calender2026-12.jpg"
    ],
    details: "2026 calendar"
  }
];

function closeDetails() {
  document.getElementById('details').classList.add('hidden');
}

// Step 1: Find the button
// What selector goes here? Look at your HTML — what class is on the button?
const toggle = document.querySelector(".theme-toggle");

// Step 2: Listen for clicks
toggle.addEventListener('click', function() {
  console.log('clicked!');
  // Toggle between light and dark themes using data-theme attribute
  const currentTheme = document.documentElement.dataset.theme;;
  let newTheme;
  if (currentTheme === 'dark') {
    newTheme = 'light';
  } else {
    newTheme = 'dark';
  }
  document.documentElement.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);  // NEW: Save to memory
});
