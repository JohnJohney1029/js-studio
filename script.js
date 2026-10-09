/* JS STUDIO — interactions and lightweight cinematic motion */
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js-ready");

  // WhatsApp links can carry a specific message via data-message.
  const whatsappNumber = "923167342317"; // Replace with your WhatsApp number, digits only.
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    const message = link.dataset.message || "Hello JS Studio! I'd like to discuss a website project.";
    link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Sticky header styling.
  const header = document.getElementById("siteHeader");
  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Accessible mobile navigation.
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.getElementById("mobileNav");
  function closeMenu() {
    hamburger?.classList.remove("active");
    hamburger?.setAttribute("aria-expanded", "false");
    mobileNav?.classList.remove("open");
    mobileNav?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  }
  hamburger?.addEventListener("click", () => {
    const opening = !mobileNav.classList.contains("open");
    hamburger.classList.toggle("active", opening);
    hamburger.setAttribute("aria-expanded", String(opening));
    mobileNav.classList.toggle("open", opening);
    mobileNav.setAttribute("aria-hidden", String(!opening));
    document.body.classList.toggle("menu-open", opening);
  });
  mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 700) closeMenu(); });

  // Reveal cards as they enter the viewport. Keep all content visible if unsupported.
  const revealElements = document.querySelectorAll(".reveal, .intro-main h2, .section-title, .statement-copy h2, .work-head h2, .contact h2, .steps, .contact");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -45px 0px" });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("show"));
  }

  // Side position indicators track the main content sections.
  const sections = [...document.querySelectorAll("main [data-section]")];
  const dots = [...document.querySelectorAll(".side-dots b")];
  if ("IntersectionObserver" in window && sections.length && dots.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = sections.indexOf(entry.target);
        dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
      });
    }, { threshold: 0.32 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Subtle hero depth on mouse devices only; never overrides mobile layout.
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (hero && heroContent && !reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    hero.addEventListener("mousemove", (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 7;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 7;
      heroContent.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }, { passive: true });
    hero.addEventListener("mouseleave", () => { heroContent.style.transform = "translate3d(0,0,0)"; });
  }

  // Falling water particles — only top to bottom; pause when tab is hidden.
  const canvas = document.getElementById("waterParticles");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let raf = 0;
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.7);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const amount = window.innerWidth < 700 ? 32 : 66;
      particles = Array.from({ length: amount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.8 + 0.45,
        speed: Math.random() * 0.48 + 0.22,
        opacity: Math.random() * 0.25 + 0.07
      }));
    };
    const draw = () => {
      if (document.hidden) { raf = 0; return; }
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        p.y += p.speed;
        if (p.y > window.innerHeight + 8) { p.y = -8; p.x = Math.random() * window.innerWidth; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94, 211, 255, ${p.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && raf) { cancelAnimationFrame(raf); raf = 0; }
      else if (!document.hidden && !raf) draw();
    });
  }

  // Thin dual-colour tech trail on desktop; disabled for touch and reduced-motion users.
  const trailCanvas = document.getElementById("mouseTrail");
  if (trailCanvas && !reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const trailCtx = trailCanvas.getContext("2d");
    let mouseX = -100, mouseY = -100, currentX = -100, currentY = -100;
    let points = [];
    let trailRaf = 0;
    const resizeTrail = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      trailCanvas.width = Math.round(window.innerWidth * dpr);
      trailCanvas.height = Math.round(window.innerHeight * dpr);
      trailCanvas.style.width = `${window.innerWidth}px`;
      trailCanvas.style.height = `${window.innerHeight}px`;
      trailCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener("mousemove", (event) => { mouseX = event.clientX; mouseY = event.clientY; }, { passive: true });
    const drawTrail = () => {
      if (document.hidden) { trailRaf = 0; return; }
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;
      if (mouseX >= 0 && mouseY >= 0) points.push({ x: currentX, y: currentY, life: 1 });
      if (points.length > 28) points.shift();
      trailCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (points.length > 2) {
        const strokePath = () => {
          trailCtx.beginPath();
          trailCtx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length - 1; i++) {
            const p = points[i], next = points[i + 1];
            trailCtx.quadraticCurveTo(p.x, p.y, (p.x + next.x) / 2, (p.y + next.y) / 2);
          }
          trailCtx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        };
        strokePath();
        trailCtx.strokeStyle = "rgba(0, 105, 220, .75)";
        trailCtx.lineWidth = 6;
        trailCtx.lineCap = "round";
        trailCtx.lineJoin = "round";
        trailCtx.shadowBlur = 12;
        trailCtx.shadowColor = "rgba(0, 105, 255, .5)";
        trailCtx.stroke();
        strokePath();
        trailCtx.strokeStyle = "rgba(95, 225, 255, .92)";
        trailCtx.lineWidth = 2;
        trailCtx.shadowBlur = 7;
        trailCtx.shadowColor = "rgba(95, 225, 255, .7)";
        trailCtx.stroke();
        trailCtx.shadowBlur = 0;
      }
      points.forEach((p) => { p.life -= 0.045; });
      points = points.filter((p) => p.life > 0);
      trailRaf = requestAnimationFrame(drawTrail);
    };
    resizeTrail();
    drawTrail();
    window.addEventListener("resize", resizeTrail, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && trailRaf) { cancelAnimationFrame(trailRaf); trailRaf = 0; }
      else if (!document.hidden && !trailRaf) drawTrail();
    });
  }
});
