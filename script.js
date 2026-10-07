// JS Web Studio - main interactions
// Change this number to your WhatsApp number in international format.
// Example Pakistan: 923001234567 (do NOT add + or spaces).
const WHATSAPP_NUMBER = "923167342317";

const whatsappMessage = encodeURIComponent(
  "Hi JS Web Studio! I want to build a website. I would like to discuss my project."
);

function openWhatsApp() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-whatsapp]").forEach((button) => {
  button.addEventListener("click", openWhatsApp);
});

const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.textContent = isOpen ? "✕" : "☰";
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    });
  });
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".desktop-nav a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const toast = document.getElementById("toast");
document.querySelectorAll("[data-whatsapp]").forEach((button) => {
  button.addEventListener("click", () => {
    if (toast) {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1800);
    }
  });
});
