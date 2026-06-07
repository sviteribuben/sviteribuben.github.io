# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website (sviteribuben.github.io) built in a minimalist "Monospace Web" style, inspired by terminal aesthetics. The site is deployed on GitHub Pages and showcases the work experience, skills, and projects of Dmitry Boldyrev, a Data Steward/Analyst/Engineer.

**Language**: Content is in Russian (ru)

## Architecture

### Core Structure
- **index.html** - Main portfolio page with sections: about, experience, skills, projects, education, contacts
- **news.html** - Project news/updates page
- **claude.html** - Additional page (purpose TBD)
- **css/** - Stylesheets organized by purpose
  - `reset.css` - CSS reset for cross-browser compatibility
  - `style.css` - Main monospace styling with CSS variables
  - `style-news.css` - Styles specific to news page
- **js/script.js** - Interactive features and animations
- **img/** - Images and assets (profile photo, favicon, project screenshots)

### Design System

The site uses a monospace/terminal aesthetic with these key principles:

**CSS Variables** (in `style.css`):
```css
--mono-font: monospace font stack
--char-width: 0.6em (character width for grid alignment)
--line-height: 1.4
--grid-size: calc(var(--char-width) * 80) (80-character width)
--bg-color: #000 (black background)
--text-color: #fff (white text)
```

**Layout**: Uses semantic HTML with `<table>` for header layout and CSS Grid for responsive sections. Content is constrained to 80-character monospace grid width.

### JavaScript Features

The `script.js` file provides:
- **Debug grid overlay** - Visual grid for development (localhost only)
- **Smooth scroll navigation** - Anchor link animations
- **Active section highlighting** - TOC updates on scroll
- **Scroll animations** - Fade-in effects for sections
- **Typography enhancements** - Automatic em-dash conversion
- **Gradient generator** - Interactive CSS gradient tool (appears to be for a separate tool page)

## Development Workflow

### Local Development
```bash
# Serve locally (any simple HTTP server works)
python -m http.server 8000
# or
npx serve
```

Then open `http://localhost:8000` in browser.

### Deployment to GitHub Pages
```bash
# Commit changes
git add .
git commit -m "Description of changes"

# Push to main branch (auto-deploys to GitHub Pages)
git push origin main
```

Site deploys automatically from the `main` branch root directory.

### Testing
- Test responsive design at different viewport sizes
- Verify smooth scroll and animations work
- Check debug grid appears only on localhost
- Validate all internal links and anchor navigation

## Content Updates

### Updating Portfolio Content
Edit `index.html` directly:
- Personal info: Header `<table>` section
- Work experience: `#experience` section
- Skills: `#skills` section with nested grid
- Projects: `#projects` section
- Contact links: `#contacts` section

### Styling Changes
Modify CSS variables in `style.css` `:root` to change:
- Color scheme (bg-color, text-color, accent-color)
- Typography (mono-font, line-height)
- Layout dimensions (grid-size, char-width)

### Adding New Pages
Follow the existing pattern:
1. Create new `.html` file in root
2. Include same CSS: `reset.css` and `style.css`
3. Add link in navigation (`#TOC` in index.html)
4. Maintain monospace aesthetic and semantic HTML structure

## Technical Constraints

- **No build process** - Pure HTML/CSS/JS, no bundlers or preprocessors
- **GitHub Pages hosting** - Static files only, deployed from main branch
- **Monospace grid alignment** - All content should align to the character grid
- **Semantic HTML** - Use proper HTML5 elements for accessibility
- **Mobile responsive** - Design adapts to smaller screens while maintaining readability

## Key Files to Preserve

- `img/55034808.jpeg` - Profile photo
- `img/favicon.ico` - Site favicon
- `css/reset.css` - Critical for cross-browser consistency
- All project screenshots in `img/` directory
