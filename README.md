# GHCookwriter Landing Page — Modernized & Optimized

This repository contains the completely modernized, responsive, accessible, and performance-optimized landing page for **GHCookwriter**, author of *The Encounter Trilogy*.

The project has been converted from a legacy Bootstrap 4 and jQuery implementation to a modern tech stack featuring **Tailwind CSS (v3)** and **Vanilla ES6+ JavaScript**. It contains **zero Bootstrap or jQuery dependencies**.

---

## 🚀 Key Improvements

1. **Massive Performance Boost**:
   - Total CSS size reduced from **~385 KB** to a single minified Tailwind file of **28.7 KB** (a **92.5% reduction**).
   - Total JS size reduced from **~455 KB** of libraries (jQuery, Popper, Bootstrap, Owl Carousel, AOS, Isotope, Slick) to a single native script of **6.9 KB** (a **98.4% reduction**).
   - Images compressed, converted to modern **WebP** formats, and scaled down to their exact display dimensions. For example, the homepage hero image was reduced from **4.4 MB** to **108 KB** (a **97.6% reduction**), and character cards were reduced from **~2 MB each** to **~12 KB each**.
2. **Accessible UI/UX**:
   - Rebuilt custom interactive elements (mobile hamburger drawer, book screenshot slideshow, and multi-card cast carousel) from scratch in accessible Vanilla JS.
   - Added skip-to-content bypass links, explicit ARIA attributes (`aria-expanded`, `aria-label`, `aria-hidden`), outline ring focus-visible indicators, and validated semantic HTML markup to comply with **WCAG 2.2 AA** standards.
3. **Advanced SEO**:
   - Fully optimized heading hierarchy.
   - Embedded structured JSON-LD data graphs (Book, Author, Person, and Website schemas) to enhance search engine rich snippets.
   - Configured custom Open Graph, Twitter Cards, canonical tags, `robots.txt`, and a canonical XML sitemap.

---

## 📁 Folder Structure

The project conforms to the following clean production organization:

```text
/ghcook2/
│
├── index.html                  # Main landing page
├── contact.php                 # PHP mailer script (AJAX and fallback support)
├── robots.txt                  # Crawling directives
├── sitemap.xml                 # Search engine site index
├── README.md                   # Project documentation
├── package.json                # Project dependencies and build scripts
├── tailwind.config.js          # Tailwind CSS settings
│
├── assets/
│   ├── css/
│   │   ├── input.css           # Source stylesheet with custom layers
│   │   └── style.css           # Compiled and minified production Tailwind stylesheet
│   │
│   ├── js/
│   │   └── main.js             # Accessible native Vanilla JS components
│   │
│   ├── images/
│   │   ├── (webp assets)       # Highly optimized WebP website images
│   │   └── carousel/           # Optimized character card avatars
│   │
│   └── audio/
│       └── (mp3 files)         # Dramatized book excerpt audio files
│
└── favicon/
    └── (png favicons)          # Multi-size favicons (16x16, 32x32, 180x180, 512x512)
```

---

## 🛠️ Installation & Development Workflow

To customize and build this website locally, ensure you have [Node.js](https://nodejs.org/) installed, and follow these steps:

1. **Install Dependencies**:
   Open a terminal in the `/ghcook2` folder and run:
   ```bash
   npm install
   ```

2. **Tailwind CSS Compilation**:
   - **Development Mode (Auto-watch changes)**:
     ```bash
     npm run watch:css
     ```
   - **Production Build (Minifies output stylesheet)**:
     ```bash
     npm run build:css
     ```

---

## 🌐 Browser Support

- Chrome (Desktop & Mobile)
- Apple Safari (iOS & macOS)
- Microsoft Edge
- Mozilla Firefox

---

## 💡 Accessibility Features (WCAG 2.2 AA)

- **Semantic landmarks** (`<header>`, `<main>`, `<section>`, `<footer>`) to help assistive technologies navigate the page.
- **Skip-to-content bypass link** to allow keyboard-only users to bypass navigation.
- **Fully accessible mobile drawer navigation** featuring outline focus states, escape key close listeners, and ARIA state updates.
- **Form controls** have explicit `<label>` links, `required` field validation, and honeypot spam fields designed for clean submission.
- **Descriptive image alt text** provided on all informative visual assets.

---

## ⚙️ Performance Optimizations

- **Minified Stylesheets**: Production Tailwind CSS is stripped of all unused classes and fully minified.
- **Asynchronous JS Loading**: Native scripts are loaded at the bottom of the document to prevent render-blocking.
- **Asset Offloading**: Large icon fonts have been deleted, replaced by lightweight vector inline SVG code.
- **WebP Encoding**: All PNG and JPEG images have been converted to WebP format, significantly reducing network payloads and speeding up First Contentful Paint (FCP).

---

## 📜 Future Enhancements

- **Stripe / Commerce Integration**: Direct book purchase options on the author site.
- **Book Three Preview**: Adding excerpt audio and page previews for *A Social Encounter* when copy becomes available.

---

## ⚖️ License Information

This template layout preserves credit indicators. Custom content and trilogy branding remain under the copyright of **George H. Cook (GHCookwriter)**.
