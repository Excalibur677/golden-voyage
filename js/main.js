 
import ParallaxEngine   from './parallax.js';
import SectionController from './sections.js';
import EffectsEngine    from './effects.js';

const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hidden'), 1800);
});
document.addEventListener('DOMContentLoaded', () => {

   
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

   
  SectionController.init();   
  EffectsEngine.init();        

  if (!prefersReducedMotion) {
    ParallaxEngine.init();     
  }

 
  document.querySelectorAll('.nav-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.dataset.section;
      const target   = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const audio     = document.getElementById('ocean-audio');
  const soundBtn  = document.getElementById('sound-btn');
  let   playing   = false;

  audio.volume = 0.35;

  soundBtn.addEventListener('click', () => {
    if (!playing) {
      audio.play().then(() => {
        playing = true;
        soundBtn.classList.remove('muted');
        soundBtn.setAttribute('aria-label', 'Mute ocean sound');
      }).catch(() => {});
    } else {
      audio.pause();
      playing = false;
      soundBtn.classList.add('muted');
      soundBtn.setAttribute('aria-label', 'Unmute ocean sound');
    }
  });

  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursor-trail');
  let   mouseX = 0, mouseY = 0;
  let   trailX = 0, trailY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
    cursor.style.opacity = '1';
  });

  document.addEventListener('mousedown', () => {
    cursor.classList.add('clicking');
    cursorTrail.classList.add('clicking');
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking');
    cursorTrail.classList.remove('clicking');
  });

  document.querySelectorAll('a, button, .nav-dot').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  const animateTrail = () => {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  };
  animateTrail();

   
  document.fonts.ready.then(() => {
    document.body.classList.add('fonts-loaded');
  });
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (isTouchDevice) {
    const tiltLayers = document.querySelectorAll('.parallax-layer');
    let tiltX = 0, tiltY = 0;
    let targetX = 0, targetY = 0;
    const TILT_STRENGTH = 12;
    const LERP = 0.06;

    window.addEventListener('deviceorientation', e => {
      const gamma = Math.max(-45, Math.min(45, e.gamma ?? 0));
      const beta  = Math.max(-45, Math.min(45, (e.beta ?? 0) - 30));
      targetX = (gamma / 45) * TILT_STRENGTH;
      targetY = (beta  / 45) * TILT_STRENGTH;
    }, { passive: true });

    const animateTilt = () => {
      tiltX += (targetX - tiltX) * LERP;
      tiltY += (targetY - tiltY) * LERP;

      tiltLayers.forEach((layer, i) => {
        const depth  = parseFloat(layer.dataset.parallaxSpeed) || 0.3;
        const moveX  = tiltX * depth * 2;
        const moveY  = tiltY * depth * 2;
        const current = layer.style.transform || '';
        const baseY  = current.match(/translateY\(([^)]+)\)/)?.[1] ?? '0px';
        layer.style.transform = `translateY(${baseY}) translateX(${moveX}px)`;
      });

      requestAnimationFrame(animateTilt);
    };

    animateTilt();

    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      const permBtn = document.createElement('button');
      permBtn.textContent = 'Enable Tilt Effect';
      permBtn.style.cssText = `
        position: fixed;
        bottom: 5rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        padding: 0.6rem 1.4rem;
        background: rgba(254,243,226,0.9);
        border: 2px solid #F4A261;
        border-radius: 999px;
        font-family: 'Noto Serif JP', serif;
        font-size: 0.85rem;
        color: #1D3557;
        cursor: pointer;
        backdrop-filter: blur(8px);
        box-shadow: 0 4px 24px rgba(29,53,87,0.15);
      `;
      document.body.appendChild(permBtn);

      permBtn.addEventListener('click', () => {
        DeviceOrientationEvent.requestPermission().then(state => {
          if (state === 'granted') {
            window.addEventListener('deviceorientation', () => {}, { passive: true });
            permBtn.remove();
          }
        }).catch(() => {});
      });
    }
  }

});
