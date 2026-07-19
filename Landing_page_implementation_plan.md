# Implementation Plan: Premium Landing Page

## Goal Description
To make this product feel like a world-class SaaS platform, we need a professional marketing landing page. Currently, the root (`/`) loads the map directly. I will restructure the app to provide a stunning landing page experience that introduces the user to the platform before they enter the application.

## Proposed Architecture

### 1. Route Restructuring
- **Move Map Dashboard**: The current `src/app/page.tsx` (the map interface) will be moved to a new route: `src/app/map/page.tsx`.
- **Navigation Update**: The existing `Header.tsx` will be updated so the "Map" button links to `/map`.

### 2. The New Landing Page (`src/app/page.tsx`)
I will design a highly professional, modern landing page right at the root.

**Aesthetics & Design**:
- Ultra-premium feel: Dark mode optimized, smooth animated gradients, glassmorphism UI elements, and sleek typography.
- Built using Tailwind CSS and `lucide-react` icons.

**Key Sections**:
1. **Hero Section**: A dramatic headline ("Navigate the Future of Premium Fuel"), a subtitle explaining the value proposition, and a prominent **"Launch Radar"** Call-To-Action (CTA) button linking to `/map`.
2. **Features Grid**: Highlighting the platform's core strengths:
   - *Interactive Mapping* (Real-time tracking of 120+ stations)
   - *Data Science Intelligence* (Macro supply vs demand tracking)
   - *Automated ML Engine* (Time-series and Random Forest predictions)
   - *Community Crowdsourcing* (User-submitted pumps and data)
3. **Analytics Teaser**: A visual mockup/preview of the Business Intelligence dashboard to wow visitors.
4. **Final CTA & Footer**: A polished footer to wrap up the page.

## Open Questions

> [!TIP]
> **Landing Page Vibe**: I will design the landing page to be extremely high-end and modern (think Apple or Vercel landing pages). It will default to respecting the user's Dark/Light mode toggle, but will look especially stunning in Dark Mode. Are you okay with this premium, high-tech aesthetic?
