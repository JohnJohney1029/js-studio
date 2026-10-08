/* =========================================================
   JS STUDIO — CINEMATIC SCROLL SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     WHATSAPP
  ------------------------------------------------------- */

  const whatsappNumber = "92XXXXXXXXXX";

  const whatsappMessage =
    "Hello JS Studio! I want to discuss a website project.";

  document.querySelectorAll("[data-whatsapp]").forEach(link => {

    link.href =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    link.target = "_blank";
    link.rel = "noopener noreferrer";

  });


  /* -------------------------------------------------------
     CURRENT YEAR
  ------------------------------------------------------- */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* -------------------------------------------------------
     MOBILE MENU
  ------------------------------------------------------- */

  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  if (hamburger && mobileNav) {

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileNav.classList.toggle("open");
    });

    mobileNav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileNav.classList.remove("open");
      });

    });

  }


  /* -------------------------------------------------------
     SCROLL REVEAL
  ------------------------------------------------------- */

  const revealElements = document.querySelectorAll(
    ".reveal, .service-card, .work-item, " +
    ".section-title, .intro h2, .statement h2, " +
    ".work-head h2, .process h2, .contact h2, " +
    ".statement-copy, .statement-image, .steps, " +
    ".contact"
  );


  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px"
    }
  );


  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* -------------------------------------------------------
     IMAGE PARALLAX
  ------------------------------------------------------- */

  const images = document.querySelectorAll(
    ".service-image img, .statement-image img, .work-item img"
  );


  function imageParallax() {

    const viewportHeight = window.innerHeight;

    images.forEach(image => {

      const rect = image.getBoundingClientRect();

      if (
        rect.bottom > 0 &&
        rect.top < viewportHeight
      ) {

        const center =
          rect.top + rect.height / 2;

        const distance =
          (center - viewportHeight / 2) * 0.035;

        image.style.transform =
          `scale(1.03) translateY(${distance}px)`;

      }

    });

  }


  window.addEventListener(
    "scroll",
    imageParallax,
    { passive: true }
  );

  imageParallax();


  /* -------------------------------------------------------
     ACTIVE SIDE DOTS
  ------------------------------------------------------- */

  const sections = document.querySelectorAll(
    "main > section"
  );

  const dots = document.querySelectorAll(
    ".side-dots b"
  );


  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          const index =
            [...sections].indexOf(entry.target);

          dots.forEach(dot =>
            dot.classList.remove("active")
          );

          if (dots[index]) {
            dots[index].classList.add("active");
          }

        }

      });

    },
    {
      threshold: 0.45
    }
  );


  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  /* -------------------------------------------------------
     MOUSE MOVEMENT — HERO DEPTH
  ------------------------------------------------------- */

  const hero = document.querySelector(".hero");
  const heroContent =
    document.querySelector(".hero-content");


  if (hero && heroContent) {

    hero.addEventListener("mousemove", event => {

      const x =
        (event.clientX / window.innerWidth - 0.5) * 10;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 10;

      heroContent.style.transform =
        `translate(${x}px, ${y}px)`;

    });


    hero.addEventListener("mouseleave", () => {

      heroContent.style.transform =
        "translate(0, 0)";

    });

  }


  /* -------------------------------------------------------
     WATER PARTICLES
  ------------------------------------------------------- */

  const canvas =
    document.getElementById("waterParticles");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let particles = [];

  function resizeCanvas() {

    canvas.width =
      window.innerWidth * devicePixelRatio;

    canvas.height =
      window.innerHeight * devicePixelRatio;

    canvas.style.width =
      window.innerWidth + "px";

    canvas.style.height =
      window.innerHeight + "px";

    ctx.scale(
      devicePixelRatio,
      devicePixelRatio
    );

  }


  function createParticles() {

    particles = [];

    const amount =
      window.innerWidth < 700 ? 35 : 70;


    for (let i = 0; i < amount; i++) {

      particles.push({

        x: Math.random() * window.innerWidth,

        y: Math.random() * window.innerHeight,

        size:
          Math.random() * 2.5 + 0.5,

        speed:
          Math.random() * 0.35 + 0.08,

        opacity:
          Math.random() * 0.45 + 0.15

      });

    }

  }


  function drawParticles() {

    ctx.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );


    particles.forEach(particle => {

      particle.y -= particle.speed;


      if (particle.y < -10) {
        particle.y =
          window.innerHeight + 10;

        particle.x =
          Math.random() * window.innerWidth;
      }


      ctx.beginPath();

      ctx.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(80, 200, 255, ${particle.opacity})`;

      ctx.fill();

    });


    requestAnimationFrame(drawParticles);

  }


  resizeCanvas();

  createParticles();

  drawParticles();


  window.addEventListener("resize", () => {

    resizeCanvas();

    createParticles();

  });


});
