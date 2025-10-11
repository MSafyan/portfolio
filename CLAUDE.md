# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a 3D portfolio website built with React, Three.js, and Tailwind CSS. The portfolio showcases mobile and web development projects, work experience, certifications, and testimonials using immersive 3D animations and visual effects.

**Tech Stack:**
- React 18.2 with Vite as the build tool
- Three.js with React Three Fiber (@react-three/fiber) and Drei (@react-three/drei) for 3D rendering
- Tailwind CSS for styling with custom theme configuration
- Framer Motion for animations
- EmailJS for contact form functionality
- React Modal for project detail views

**Node Version:** Node 18 (specified in src/main.jsx:5)
**Package Manager:** Yarn (yarn.lock present)

## Development Commands

```bash
# Install dependencies
yarn install

# Start development server (default port 5173)
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## Architecture

### Component Structure

The application follows a single-page architecture with section-based navigation:

**Main Layout (src/App.jsx):**
- BrowserRouter wrapper for routing
- Navbar (sticky navigation)
- Hero (landing section with 3D Spaceman model)
- About (services overview)
- Experience (work history timeline)
- Certifications (credential showcase)
- Works (project portfolio with category filtering)
- Tech (technology stack icons)
- Feedbacks (client testimonials carousel)
- Contact (email contact form with 3D Earth model)
- StarsCanvas (background animation)

**Component Categories:**

1. **Canvas Components (src/components/canvas/):**
   - `Ball.jsx` - Animated 3D tech icon spheres
   - `Computers.jsx` - Desktop computer model (unused in current version)
   - `Earth.jsx` - Rotating Earth model for contact section
   - `Stars.jsx` - Particle star field background
   - `Spaceman.jsx` (referenced in Hero) - Animated astronaut model

2. **Section Components (src/components/):**
   - Each major section is a standalone component
   - Most sections are wrapped with `SectionWrapper` HOC for consistent animations

3. **HOC (Higher-Order Components) (src/hoc/):**
   - `SectionWrapper.jsx` - Wraps components with Framer Motion stagger animations, adds section IDs for navigation, and applies consistent padding/layout

### Data Management

All content data is centralized in `src/constants/index.js`:
- `resumeData` - Complete resume information including experience, projects, education, certifications
- `navLinks` - Navigation menu items
- `services` - About section service cards
- `technologies` - Tech stack icons and names
- `experiences` - Work experience timeline data
- `testimonials` - Client feedback/reviews
- `projects` - Portfolio projects with categories (website/mobile/design), tags, images, and external links
- `certifications` - Professional certifications with badges

### Styling System

**Tailwind Configuration (tailwind.config.cjs):**
- JIT mode enabled for optimal build size
- Custom color palette:
  - `primary`: #050816 (dark blue background)
  - `secondary`: #aaa6c3 (light purple text)
  - `tertiary`: #151030 (section backgrounds)
  - `black-100`: #100d25, `black-200`: #090325
  - `white-100`: #f3f3f3
- Custom box shadow: `card` shadow for depth effects
- Custom breakpoint: `xs` at 450px
- Background image: `hero-pattern` for hero section

**Shared Styles (src/styles.js):**
- Exports reusable className strings for consistent spacing and typography
- Used throughout components for responsive text sizing

### Animation System

**Motion Utilities (src/utils/motion.js):**
- `textVariant(delay)` - Text entrance animation from top
- `fadeIn(direction, type, delay, duration)` - Directional fade-in (currently simplified to fade only)
- `zoomIn(delay, duration)` - Scale-up entrance
- `slideIn(direction, type, delay, duration)` - Slide from edges
- `staggerContainer(staggerChildren, delayChildren)` - Container for sequential child animations

These are applied via Framer Motion's `variants` prop on `motion` components.

### 3D Model Integration

**GLTF Models:**
- Located in `src/assets/3d/` and `public/`
- Loaded using `@react-three/drei`'s `useGLTF` hook
- Vite configured to handle `.glb` and `.gltf` files (vite.config.js:7)

**Canvas Setup Pattern:**
```jsx
<Canvas>
  <Suspense fallback={<CanvasLoader />}>
    <OrbitControls />
    <Lighting />
    <Model />
  </Suspense>
</Canvas>
```

### Image Assets

Project images are organized by category in `src/assets/`:
- Company logos in `src/assets/company/`
- Project-specific screenshots in subdirectories (e.g., `attendance/`, `climateIq/`, `driver/`, `consumer/`)
- All assets imported and exported via `src/assets/index.js`
- Image optimization uses `.webp` format where possible

## Key Features

**3D Rendering:**
- Interactive 3D models powered by Three.js
- Performance-optimized with React Suspense and lazy loading
- OrbitControls for user interaction with 3D objects
- Responsive canvas sizing based on screen width

**Project Filtering:**
- Projects are categorized: "website", "mobile", "design"
- `TabBar.jsx` component handles category filtering
- Each project includes multiple screenshots in modal view
- External links for GitHub, App Store, and Play Store

**Contact Form:**
- Integrated with EmailJS (@emailjs/browser)
- Form validation and submission handling
- 3D Earth model as visual backdrop

**Parallax Effects:**
- Custom parallax layers in Hero section using SVG images
- Creates depth effect on scroll

## Common Development Tasks

**Adding a New Project:**
1. Add project images to `src/assets/` and appropriate subdirectory
2. Export images from `src/assets/index.js`
3. Add project object to `projects` array in `src/constants/index.js` with:
   - `id`, `name`, `description`
   - `category` ("website", "mobile", or "design")
   - `dimensionsCategory` (controls modal layout)
   - `tags` (technology stack)
   - `image` (main thumbnail)
   - `images` (array for modal carousel)
   - `source_code_link`, `android_link` (optional)

**Adding a New Experience:**
1. Add company logo to `src/assets/company/` or main assets directory
2. Export from `src/assets/index.js`
3. Add experience object to `experiences` array in `src/constants/index.js`

**Modifying 3D Models:**
1. Replace GLTF/GLB files in `src/assets/3d/` or `public/`
2. Update imports in respective canvas component
3. Adjust scale/position props on `<primitive>` element

**Updating Theme Colors:**
- Edit `tailwind.config.cjs` theme.extend.colors
- Colors are referenced throughout components using Tailwind utility classes

## Deployment

The project is configured for Vercel deployment (`vercel.json` present).

**Build Output:**
- Vite bundles to `dist/` directory
- Static assets are hashed for cache busting
- 3D models and large assets should be optimized for web before deployment

## Performance Considerations

- Large 3D models can impact load time - optimize GLTF files using gltf-pipeline or Draco compression
- Images use lazy loading via React Suspense
- Canvas components check window width to conditionally render on mobile
- Consider reducing polygon count on 3D models for mobile devices
- The `isDesktop` check in Hero.jsx (Hero.jsx:6) controls model positioning
