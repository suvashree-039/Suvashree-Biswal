// --- Main Menu Toggle ---
const hamMenuBtn = document.querySelector(".header__main-ham-menu-cont");
const smallMenu = document.querySelector(".header__sm-menu");
const headerHamMenuBtn = document.querySelector(".header__main-ham-menu");
const headerHamMenuCloseBtn = document.querySelector(".header__main-ham-menu-close");
const headerSmallMenuLinks = document.querySelectorAll(".header__sm-menu-link");

hamMenuBtn.addEventListener("click", () => {
  smallMenu.classList.toggle("header__sm-menu--active");

  const isMenuOpen = !headerHamMenuBtn.classList.contains("d-none");
  headerHamMenuBtn.classList.toggle("d-none", isMenuOpen);
  headerHamMenuCloseBtn.classList.toggle("d-none", !isMenuOpen);
});

headerSmallMenuLinks.forEach(link => {
  link.addEventListener("click", () => {
    smallMenu.classList.remove("header__sm-menu--active");
    headerHamMenuBtn.classList.remove("d-none");
    headerHamMenuCloseBtn.classList.add("d-none");
  });
});

// --- Redirect Logo Click ---
const headerLogoContainer = document.querySelector(".header__logo-container");

if (headerLogoContainer) {
  headerLogoContainer.addEventListener("click", () => {
    location.href = "index.html";
  });
}

// --- DOMContentLoaded Fixes ---
document.addEventListener("DOMContentLoaded", () => {
  // Fix for missing .header__sm-menu-content wrapper
  const smallMenu = document.querySelector(".header__sm-menu");
  const smallMenuContent = document.querySelector(".header__sm-menu > .header__sm-menu-content");

  if (smallMenu && !smallMenuContent) {
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "header__sm-menu-content";

    while (smallMenu.firstChild) {
      contentWrapper.appendChild(smallMenu.firstChild);
    }

    smallMenu.appendChild(contentWrapper);
  }

  // Fix for typo tag <d0iv> in skills section
  document.querySelectorAll("d0iv.skills__skill").forEach(invalidSkillDiv => {
    const newDiv = document.createElement("div");
    newDiv.className = "skills__skill";
    newDiv.textContent = invalidSkillDiv.textContent;
    invalidSkillDiv.parentNode.replaceChild(newDiv, invalidSkillDiv);
  });

  // --- Night Mode Toggle ---
  const currentTheme = localStorage.getItem("theme") || "normal";

  if (currentTheme === "night") {
    document.body.classList.add("night-mode");
    updateIcons(true);
  }

  function toggleNightMode() {
    const isNightMode = document.body.classList.toggle("night-mode");
    localStorage.setItem("theme", isNightMode ? "night" : "normal");
    updateIcons(isNightMode);
  }

  function updateIcons(isNightMode) {
    const desktopIcon = document.querySelector(".night-mode-toggle__icon");
    const mobileIcon = document.querySelector(".night-mode-toggle-mobile .night-mode-toggle__icon");

    if (desktopIcon) {
      desktopIcon.src = isNightMode ? "moon.svg" : "sun.svg";
      desktopIcon.alt = isNightMode ? "Switch to Normal Mode" : "Switch to Night Mode";
    }

    if (mobileIcon) {
      mobileIcon.src = isNightMode ? "moon.svg" : "sun.svg";
      mobileIcon.alt = isNightMode ? "Switch to Normal Mode" : "Switch to Night Mode";
    }
  }

  const toggleButton = document.querySelector(".night-mode-toggle");
  const toggleButtonMobile = document.querySelector(".night-mode-toggle-mobile");

  if (toggleButton) {
    toggleButton.addEventListener("click", toggleNightMode);
  }

  if (toggleButtonMobile) {
    toggleButtonMobile.addEventListener("click", toggleNightMode);
  }
});
