// Priority: User pref → System preference → Default light theme
const THEME_STORAGE_KEY = 'theme';
const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');

function applyThemeSetting(setting) {
  if (setting === 'system') {
    document.documentElement.dataset.theme = systemQuery.matches ? 'dark' : 'light';
  } else {
    document.documentElement.dataset.theme = setting;
  }
}

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

if (savedTheme) {
  // User has made a choice — respect it
  applyThemeSetting(savedTheme);
} else {
  // No saved choice — check system preference
  applyThemeSetting('system');
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

const dropdown = document.querySelector('.dropdown');
const dropdownTrigger = document.querySelector('.theme-trigger');
const dropdownMenu = document.querySelector('.dropdown-content');
const themeButtons = document.querySelectorAll('.dropdown-content button[data-theme]');

function updateSelectedTheme(setting) {
  themeButtons.forEach((button) => {
    const isSelected = button.dataset.theme === setting;
    button.classList.toggle('is-selected', isSelected);
  });
}

function positionDropdownMenu() {
  if (!dropdownTrigger || !dropdownMenu) return;
  const rect = dropdownTrigger.getBoundingClientRect();
  dropdownMenu.style.top = `${Math.round(rect.bottom + 8)}px`;
  dropdownMenu.style.left = `${Math.round(rect.left)}px`;
}

function setDropdownOpen(isOpen) {
  if (!dropdown) return;
  dropdown.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('dropdown-open', isOpen);
  if (isOpen) {
    positionDropdownMenu();
  }
}

if (savedTheme) {
  updateSelectedTheme(savedTheme);
} else {
  updateSelectedTheme('system');
}

if (dropdown && dropdownTrigger) {
  dropdownTrigger.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpening = !dropdown.classList.contains('is-open');
    setDropdownOpen(isOpening);
  });

  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      setDropdownOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setDropdownOpen(false);
    }
  });

  window.addEventListener('resize', () => {
    if (dropdown.classList.contains('is-open')) {
      positionDropdownMenu();
    }
  });

  window.addEventListener('scroll', () => {
    if (dropdown.classList.contains('is-open')) {
      positionDropdownMenu();
    }
  });
}

if (dropdownMenu) {
  dropdownMenu.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-theme]');
    if (!button) return;
    const nextTheme = button.dataset.theme;
    if (!nextTheme) return;
    applyThemeSetting(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    updateSelectedTheme(nextTheme);
    setDropdownOpen(false);
  });
}

systemQuery.addEventListener('change', () => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (!storedTheme || storedTheme === 'system') {
    applyThemeSetting('system');
    updateSelectedTheme('system');
  }
});
