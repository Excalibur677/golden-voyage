 
const EffectsEngine = (() => {
 
  const generateFoamSparkles = () => {
    const section = document.getElementById('s2-ocean');
    if (!section) return;

    const SPARKLE_COUNT = 20;
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const dot = document.createElement('div');
      dot.className = 'foam-sparkle';
      dot.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: ${Math.random() * 40 + 5}%;
        animation-delay: ${Math.random() * 3}s;
        animation-duration: ${Math.random() * 2 + 1.5}s;
        width: ${Math.random() * 5 + 3}px;
        height: ${Math.random() * 5 + 3}px;
      `;
      section.appendChild(dot);
    }
  };

  
  const animateGodEyes = () => {
    const section  = document.getElementById('s3-seagod');
    const eyeLeft  = document.querySelector('.god-eye-left');
    const eyeRight = document.querySelector('.god-eye-right');
    if (!section || !eyeLeft || !eyeRight) return;

    const onScroll = () => {
      const rect     = section.getBoundingClientRect();
      const progress = 1 - Math.max(0, Math.min(1, rect.top / window.innerHeight));
      const scale    = 0.6 + progress * 0.8;
      const opacity  = Math.min(1, progress * 1.5);
      const glow     = Math.round(8 + progress * 24);

      [eyeLeft, eyeRight].forEach(eye => {
        eye.style.transform = `scale(${scale})`;
        eye.style.opacity   = opacity;
        eye.style.boxShadow = `0 0 ${glow}px ${Math.round(glow * 0.4)}px rgba(244, 162, 97, 0.7)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  
  const animateLanterns = () => {
    const lanterns = document.querySelectorAll('.lantern-wrap');
    if (!lanterns.length) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      lanterns.forEach((lantern, i) => {
        const counterShift = scrollY * -0.12 * (1 + i * 0.1);
        lantern.style.transform = `translateY(${counterShift}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  };
 
  const animateSun = () => {
    const sun = document.querySelector('.sun-orb');
    if (!sun) return;
     
    sun.style.animationDelay = `${Math.random() * 2}s`;
  };
 
  const animateFog = () => {
    const fog     = document.querySelector('.fog-layer');
    const section = document.getElementById('s4-fleet');
    if (!fog || !section) return;

    const onScroll = () => {
      const sectionTop  = section.offsetTop;
      const relScroll   = window.scrollY - sectionTop;
      const shift       = relScroll * 0.15;
      fog.style.transform = `translateX(${shift}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  };
 
  const animateWaterShimmer = () => {
    const shimmer = document.querySelector('.water-shimmer');
    if (!shimmer) return;

    let t = 0;
    const tick = () => {
      t += 0.008;
      const offset = Math.sin(t) * 15;
      shimmer.style.transform = `translateX(${offset}px)`;
      requestAnimationFrame(tick);
    };
    tick();
  };

  const init = () => {
    generateFoamSparkles();
    animateGodEyes();
    animateLanterns();
    animateSun();
    animateFog();
    animateWaterShimmer();
  };

  return { init };
})();

export default EffectsEngine;
