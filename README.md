# Personal Portfolio

A single-page personal portfolio for Rick Subel showcasing design and technology work. The site combines a cinematic hero, responsive image galleries, a carousel of selected projects, and an accessible contact section—all wrapped in a glassmorphism-inspired aesthetic.

## Highlights

- **Hero with motion** – Animated eyebrow tagline, circular portrait, and call-to-action buttons with responsive sizing.
- **Story-driven About section** – Text and photo grid that adapts per screen size (collage trims to a curated trio on smaller devices).
- **Projects carousel** – Horizontally scrollable card carousel with keyboard controls, snap scrolling, and lazy-loaded imagery.
- **Skills quadrant with portrait overlay** – Four feature cards align to the same height and frame a centered portrait on wide screens.
- **Contact panel** – Accent icons, `mailto:` workflow, and a themed background that mirrors the site’s hero gradient.
- **Progressive enhancements** – Sticky header, back-to-top button with timed pulse, smooth scrolling, and reduced-motion fallbacks.

## Project Structure

```
├── index.html      # Main single-page application
├── styles.css      # Global styles, layout, responsive rules, custom properties
├── scripts.js      # Navigation, carousel controls, animations, utilities
├── Assets/         # Images and icons used across the site
└── 404.html        # Placeholder page for in-progress project links
```

## Getting Started

1. **Clone or download** this repository.
2. Open `index.html` directly in any modern browser.
3. Ensure the `Assets/` directory remains alongside the HTML file so images resolve correctly.

> No build step or package installation is required—the site is plain HTML, CSS, and vanilla JavaScript.

## Key Customization Points

- **Brand colors & radii** – Update CSS custom properties in the `:root` block of `styles.css` (`--color-*`, `--radius-*`).
- **Hero content** – Edit the hero copy, portrait, and CTAs in the `<section id="home">` block of `index.html`.
- **About gallery** – Swap or reorder images in the `.split__media` container. Small screens automatically display selfies 2, 3, and 7.
- **Projects** – Add, remove, or reorder cards in the Projects section. Each card follows an `<article class="card">` pattern.
- **Carousel behavior** – Adjust scroll-snapping or button behavior in the `projectCarousels` logic inside `scripts.js`.
- **Animations** – The eyebrow float and back-to-top pulse are controlled in `scripts.js`; timings can be tweaked via the inline `Math.random()` ranges or corresponding CSS keyframes.

## Accessibility & Responsiveness

- Semantic landmarks (`header`, `main`, `section`, `nav`, `footer`) and ARIA labels for navigation and carousel regions.
- Intersection Observer monitors sections for animations without blocking the main thread.
- Prefers-reduced-motion media queries disable decorative movement for sensitive users.
- Responsive media queries scale typography, hero buttons, and the carousel for small screens.

## Deployment Tips

- Host on any static service (GitHub Pages, Netlify, Vercel, etc.).
- If deploying behind a domain, consider routing `/404.html` for projects labelled “Case study coming soon.”
- For contact form submissions beyond `mailto:`, integrate a serverless function or third-party form service.

## License

This project was produced as part of a Codecademy homework assignment. Adapt or reuse with attribution to the original author.
