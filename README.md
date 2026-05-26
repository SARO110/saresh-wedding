# #SaResh Wedding Website
### Sanjay & Reshma · 24 & 25 May 2025

A fully hand-coded, responsive wedding website replicating the style and content of saresh.us.

---

## 📁 Project Structure

```
saresh-wedding/
│
├── index.html          ← Main HTML file (all sections)
│
├── css/
│   └── style.css       ← All styles (variables, layout, animations, responsive)
│
├── js/
│   └── main.js         ← Countdown timer, nav, scroll reveal, RSVP, lightbox
│
└── images/             ← Drop your photos here (see below)
    ├── hero-bg.jpg     ← Full-screen hero background
    ├── story-1.jpg     ← "First Meeting" photo
    ├── story-2.jpg     ← "Falling in Love" photo
    └── story-3.jpg     ← "The Proposal" photo
```

---

## 🖼️ Adding Real Photos

All image slots have elegant SVG placeholders by default. To use real photos:

**Hero background** — replace the `<svg class="hero__pattern">` block or place a real image at `images/hero-bg.jpg`.

**Story photos** — replace each `.story__photo--placeholder` div with:
```html
<img src="images/story-1.jpg" alt="Our Story" />
```

**Gallery** — replace the `.gallery__photo-ph` divs with real `<img>` tags.

---

## 🚀 How to Run

Just open `index.html` in any modern browser — no build step required.

For a local dev server:
```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## ✨ Features

- **Sticky navigation** with smooth scroll & active link highlight
- **Live countdown timer** to the wedding date
- **Scroll-reveal animations** (fade up / left / right)
- **Parallax hero** background effect
- **Events cards** with hover effects
- **Travel & Venue** section with map placeholder
- **Gallery** with lightbox (click to expand)
- **RSVP form** with validation and success state
- **Rotating mandala** footer decoration
- **Fully responsive** — mobile, tablet, desktop

---

## 🎨 Design Tokens

| Token          | Value     | Usage               |
|----------------|-----------|---------------------|
| `--cream`      | `#FDFBF7` | Page background     |
| `--gold`       | `#B8955A` | Accents, borders    |
| `--brown-dark` | `#4A3520` | Headings, dark text |
| `--dark-bg`    | `#2C1F10` | Dark sections       |

**Fonts used (Google Fonts):**
- `Great Vibes` — script / logo
- `Cormorant Garamond` — headings / serif
- `Jost` — body text / UI

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout              |
|------------|---------------------|
| > 900px    | Full desktop layout |
| ≤ 900px    | Single column       |
| ≤ 640px    | Mobile + hamburger menu |
