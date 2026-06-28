 
import { RainSystem, PetalSystem } from './canvas.js';

const SectionController = (() => {

  const THRESHOLD = 0.18;

  
  const observeReveal = () => {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    }, { threshold: THRESHOLD });

    revealEls.forEach(el => observer.observe(el));
  };
 
  const observeRain = () => {
    const section = document.getElementById('s2-ocean');
    const canvas  = document.getElementById('rain-canvas');
    if (!section || !canvas) return;

    RainSystem.init(canvas);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          canvas.classList.add('active');
          RainSystem.start();
        } else {
          canvas.classList.remove('active');
          RainSystem.stop();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(section);
  };
 
  const observePetals = () => {
    const section = document.getElementById('s5-dawn');
    const canvas  = document.getElementById('petal-canvas');
    if (!section || !canvas) return;

    PetalSystem.init(canvas);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          PetalSystem.start();
        } else {
          PetalSystem.stop();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(section);
  };
 
  const observeNavHighlight = () => {
    const sections = document.querySelectorAll('.voyage-section');
    const navDots  = document.querySelectorAll('.nav-dot');
    if (!navDots.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navDots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.section === id);
          });
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(s => observer.observe(s));
  };

  const init = () => {
    observeReveal();
    observeRain();
    observePetals();
    observeNavHighlight();
  };

  return { init };
})();

export default SectionController;
