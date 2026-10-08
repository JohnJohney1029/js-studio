// Replace only this number with your own WhatsApp number.
// Format: country code + number, without +, spaces or dashes.
const WHATSAPP_NUMBER = "923001234567";
const WA_MESSAGE = encodeURIComponent("Hello JS Studio! I want to build a website. I would like to discuss my project.");
document.querySelectorAll('[data-whatsapp]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MESSAGE}`,'_blank','noopener,noreferrer')}));
const menu=document.querySelector('.mobile-nav'), burger=document.querySelector('.hamburger');
burger?.addEventListener('click',()=>menu.classList.toggle('open'));
document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
document.getElementById('year').textContent=new Date().getFullYear();
const dots=[...document.querySelectorAll('.side-dots b')];const sections=[...document.querySelectorAll('.snap')];
const dotObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){let i=sections.indexOf(e.target);dots.forEach(d=>d.classList.remove('active'));if(dots[i])dots[i].classList.add('active')}}),{threshold:.45});sections.forEach(s=>dotObserver.observe(s));


// Underwater-style floating / falling light particles for the full-page background.
const canvas = document.getElementById('waterParticles');
const ctx = canvas?.getContext('2d');
if (canvas && ctx) {
  let particles = [];
  const makeParticle = (fresh = false) => ({
    x: Math.random() * window.innerWidth,
    y: fresh ? Math.random() * window.innerHeight : window.innerHeight + 20,
    r: Math.random() * 2.4 + .35,
    speed: Math.random() * .7 + .18,
    drift: (Math.random() - .5) * .35,
    alpha: Math.random() * .65 + .15,
    glow: Math.random() * 9 + 3
  });
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(180, Math.floor(window.innerWidth / 7));
    particles = Array.from({length: count}, () => makeParticle(true));
  };
  const draw = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of particles) {
      p.y -= p.speed;
      p.x += p.drift + Math.sin(p.y * .012) * .08;
      if (p.y < -20 || p.x < -30 || p.x > window.innerWidth + 30) Object.assign(p, makeParticle(false));
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glow);
      glow.addColorStop(0, `rgba(120,220,255,${p.alpha})`);
      glow.addColorStop(1, 'rgba(30,160,220,0)');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.glow, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(205,245,255,${Math.min(1,p.alpha + .15)})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(draw);
  };
  resize();
  window.addEventListener('resize', resize);
  draw();
}
