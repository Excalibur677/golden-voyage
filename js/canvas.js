 
const RainSystem = (() => {
  let canvas, ctx, drops = [], animId;
  const COUNT = 120;

  const createDrop = () => ({
    x:     Math.random() * (canvas?.width ?? window.innerWidth),
    y:     Math.random() * -200,
    len:   Math.random() * 18 + 8,
    speed: Math.random() * 5 + 8,
    opacity: Math.random() * 0.4 + 0.2,
    width: Math.random() * 1 + 0.5,
  });

  const init = (canvasEl) => {
    canvas = canvasEl;
    ctx    = canvas.getContext('2d');
    resize();
    drops  = Array.from({ length: COUNT }, createDrop);
    window.addEventListener('resize', resize, { passive: true });
  };

  const resize = () => {
    if (!canvas) return;
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  const draw = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drops.forEach(d => {
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 2, d.y + d.len);
      ctx.strokeStyle = `rgba(168, 218, 220, ${d.opacity})`;
      ctx.lineWidth   = d.width;
      ctx.stroke();

      d.y += d.speed;
      d.x -= 1.5; // slight diagonal
      if (d.y > canvas.height + 20) {
        Object.assign(d, createDrop());
      }
    });

    animId = requestAnimationFrame(draw);
  };

  const start = () => { if (!animId) draw(); };
  const stop  = () => { cancelAnimationFrame(animId); animId = null; };

  return { init, start, stop };
})();
 
const PetalSystem = (() => {
  let canvas, ctx, petals = [], animId;
  const COUNT = 35;

  const PETAL_COLORS = ['#FFB4A2', '#FF8A80', '#FFCDD2', '#FF7043', '#FFAB91'];

  const createPetal = (startFresh = false) => ({
    x:       Math.random() * (canvas?.width ?? window.innerWidth),
    y:       startFresh ? Math.random() * -300 : Math.random() * (canvas?.height ?? window.innerHeight),
    size:    Math.random() * 10 + 6,
    speedY:  Math.random() * 1.5 + 0.8,
    speedX:  (Math.random() - 0.5) * 1.2,
    rot:     Math.random() * Math.PI * 2,
    rotSpd:  (Math.random() - 0.5) * 0.06,
    opacity: Math.random() * 0.5 + 0.4,
    color:   PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    sway:    Math.random() * Math.PI * 2,
    swaySpd: Math.random() * 0.02 + 0.01,
  });

  const drawPetal = (p) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle   = p.color;
    ctx.beginPath();
   
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
      const px = Math.cos(angle) * p.size;
      const py = Math.sin(angle) * p.size;
      ctx.ellipse(px * 0.6, py * 0.6, p.size * 0.5, p.size * 0.3, angle, 0, Math.PI * 2);
    }
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(0, 0, p.size * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = '#F4D03F';
    ctx.fill();
    ctx.restore();
  };

  const init = (canvasEl) => {
    canvas = canvasEl;
    ctx    = canvas.getContext('2d');
    resize();
    petals = Array.from({ length: COUNT }, () => createPetal(false));
    window.addEventListener('resize', resize, { passive: true });
  };

  const resize = () => {
    if (!canvas) return;
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  const draw = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    petals.forEach(p => {
      p.sway  += p.swaySpd;
      p.x     += p.speedX + Math.sin(p.sway) * 0.5;
      p.y     += p.speedY;
      p.rot   += p.rotSpd;

      drawPetal(p);

      if (p.y > canvas.height + 30 || p.x < -30 || p.x > canvas.width + 30) {
        Object.assign(p, createPetal(true));
      }
    });

    animId = requestAnimationFrame(draw);
  };

  const start = () => { if (!animId) draw(); };
  const stop  = () => { cancelAnimationFrame(animId); animId = null; };

  return { init, start, stop };
})();

export { RainSystem, PetalSystem };
