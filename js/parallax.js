  

const ParallaxEngine = (() => {
  let layers   = [];
  let ticking  = false;
  let scrollY  = 0;

  const collectLayers = () => {
    layers = Array.from(document.querySelectorAll('[data-parallax-speed]')).map(el => ({
      el,
      speed:    parseFloat(el.dataset.parallaxSpeed) || 0,
      offsetY:  el.dataset.parallaxOffset ? parseFloat(el.dataset.parallaxOffset) : 0,
    }));
  };

 
  const applyTransforms = () => {
    layers.forEach(({ el, speed, offsetY }) => {
      const sectionTop  = el.closest('.voyage-section')?.offsetTop ?? 0;
      const relScroll   = scrollY - sectionTop + offsetY;
      const shift       = relScroll * speed;
      el.style.transform = `translateY(${shift}px)`;
    });
    ticking = false;
  };
 
  const updateProgressBar = () => {
    const bar     = document.getElementById('progress-bar');
    if (!bar) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct       = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
    bar.style.width = `${Math.min(pct, 100)}%`;
  };
 
  const onScroll = () => {
    scrollY = window.scrollY;
    updateProgressBar();
    if (!ticking) {
      requestAnimationFrame(applyTransforms);
      ticking = true;
    }
  };
 
  const init = () => {
    collectLayers();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', collectLayers, { passive: true });
     
    onScroll();
  };

  return { init, collectLayers };
})();

export default ParallaxEngine;
