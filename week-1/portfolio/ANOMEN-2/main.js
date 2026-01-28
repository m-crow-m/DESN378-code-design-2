const PROJECTS = [
  {
    title: "Room Magazine",
    description: "ergonomic layout design",
    images: [
      "assets/Metal_Magazine_JIC.jpg",
      "assets/Metal_Magazine_JIC2.jpg",
      "assets/Metal_Magazine_JIC3.jpg",
      "assets/Metal_Magazine_JIC4.jpg",
      "assets/Metal_Magazine_JIC5.jpg",
      "assets/Metal_Magazine_JIC6.jpg"
    ],
    details: "Editorial spread designed for ROOM Magazine 2025"
  },
  {
    title: "BRANDING 1",
    description: "Poster & logo design for Neon Groove Dance Studio, 2025.",
    images: [
      "assets/insta-postcool_neon.png",
      "assets/billboard_neon2.png",
      "assets/insta-post_neon.png",
      "assets/insta-post3_neon.png",
      "assets/NG.jpg"
    ],
    details: "Poster and logo design for 'neon groove dance studio' 2025"
  },
  {
    title: "CALENDAR",
    description: "2026 calendar",
    images: [
      "assets/Calender2026-13.jpg",
      "assets/Calender2026-01.jpg",
      "assets/Calender2026-02.jpg",
      "assets/Calender2026-03.jpg",
      "assets/Calender2026-04.jpg",
      "assets/Calender2026-05.jpg",
      "assets/Calender2026-06.jpg",
      "assets/Calender2026-07.jpg",
      "assets/Calender2026-08.jpg",
      "assets/Calender2026-09.jpg",
      "assets/Calender2026-10.jpg",
      "assets/Calender2026-11.jpg",
      "assets/Calender2026-12.jpg"
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
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    html.setAttribute('data-theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
  }
});
