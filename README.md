# The Golden Voyage 

A parallax scrolling web experience inspired by Eastern maritime mythology.
Built for IIT Bombay Techfest — original concept, zero borrowed IP.
**Live Site:** [golden-voyager.netlify.app](https://golden-voyager.netlify.app)
## Quick Start

1. Open VS Code in this folder
2. Install **Live Server** extension (Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. Opens at `http://localhost:5500`

## File Structure

```
cursed-voyage/
├── index.html          ← Page structure (5 sections)
├── assets/svg/         ← All SVG illustrations
│   ├── ship.svg
│   ├── torii.svg
│   ├── umi-bozu.svg
│   ├── ghost-ship.svg
│   ├── lantern.svg
│   ├── cherry-blossom.svg
│   ├── treasure.svg
│   ├── wave-back.svg
│   ├── wave-mid.svg
│   └── wave-front.svg
├── css/
│   ├── main.css        ← Design tokens, reset, base type
│   ├── animations.css  ← All keyframes
│   ├── sections.css    ← Per-section layout
│   └── responsive.css  ← Mobile breakpoints
└── js/
    ├── main.js         ← Entry point
    ├── parallax.js     ← rAF scroll loop
    ├── canvas.js       ← Rain + petal particles
    ├── sections.js     ← Intersection Observer
    └── effects.js      ← Special FX
```

## Sections

| # | Name | Highlight |
|---|------|-----------|
| 1 | The Harbour | Sun orb, 3-layer clouds, Torii gate |
| 2 | Open Water | Hokusai waves, rain canvas |
| 3 | The Sea God | Umi-bozu rising, scroll-reactive eyes |
| 4 | Ghost Fleet | 4-depth fleet, rising lanterns |
| 5 | The Return | Cherry petals canvas, dawn light |

