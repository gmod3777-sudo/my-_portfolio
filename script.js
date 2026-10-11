const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const progressBar = document.getElementById("progressBar");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll("#navLinks a[href^='#']");

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => activeObserver.observe(section));
