# Magnate Korea — Homepage Design Spec
**Date:** 2026-05-30  
**Status:** Draft

---

## Overview

A dark, futuristic agency homepage for **Magnate Korea**, a digital transformation consulting & development studio targeting domestic and international clients. The hero section features a Spline 3D robot asset ("NEXBOT") as the primary visual anchor.

**Slogan:** "Insight Connects. We Build What Matters."  
**Design Direction:** "Orbital" — fullscreen robot-first hero, maximum visual impact  
**Language:** English primary, Korean secondary (bilingual where noted)

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14 (App Router) | SEO, performance, API routes |
| Styling | Tailwind CSS | Utility-first, rapid development |
| Animation | Framer Motion | Scroll-triggered animations, count-ups |
| 3D Asset | `@splinetool/react-spline` | Official Spline embed, retains interactivity |
| Language | TypeScript | Type safety |
| Form | EmailJS | No-backend email sending, free tier sufficient for v1 |
| Deployment | Vercel | Zero-config, CDN, domain support |

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#000000` | Main background |
| `bg-secondary` | `#0A0A0A` | Section / card backgrounds |
| `bg-card` | `#111111` | Service cards |
| `accent` | `#00E5CC` | Primary accent (cyan-teal) |
| `text-primary` | `#FFFFFF` | Headings, body |
| `text-muted` | `#888888` | Subtitles, captions |

### Typography

| Role | Font | Weight | Size | Language |
|------|------|--------|------|----------|
| Display heading | Syne | 800 | 56–72px | EN |
| Section heading | Syne | 600 | 36–48px | EN |
| Body copy | Inter | 400 | 16px | EN |
| Label / caption | Inter | 500 | 12–13px | EN |
| Korean body | Pretendard | 400–600 | 16px | KO |
| Korean heading | Pretendard | 700 | 24–36px | KO |

Font loading: `next/font/google` for Syne + Inter; Pretendard via `next/font/local` (woff2 files self-hosted in `public/fonts/Pretendard-*.woff2` for performance and licensing — download from [github.com/orioncactus/pretendard](https://github.com/orioncactus/pretendard)).  
Fallback stack: `system-ui, -apple-system, sans-serif`

### Layout Constraints

- Max-width container: `1280px`, centered, horizontal padding `24px` (mobile) / `48px` (desktop)
- Section vertical padding: `80px` (mobile) / `120px` (desktop)

---

## Page Structure

```
/
├── Navbar
├── Hero (100vh fullscreen)
├── Services
├── About
├── Contact
└── Footer
```

---

## Section Specifications

### Navbar

- **Default state:** transparent background, no border
- **Scrolled state (scroll > 80px):** `backdrop-blur-md bg-black/60 border-b border-white/10` — animated transition 300ms ease
- **Left:** `MAGNATE KOREA` wordmark — Syne 700, 16px, white
- **Right (desktop):** nav links `Services` / `About` / `Contact` (smooth scroll anchors) + CTA button `Get in Touch →` (scrolls to `#contact`)
- **CTA style:** `border border-[#00E5CC] text-[#00E5CC] px-4 py-2 rounded` → hover: `bg-[#00E5CC] text-black` transition 200ms
- **Mobile (<768px):** hamburger icon (3 lines → X animation); slide-in drawer from right, full-height, black background, links stacked vertically
- **Z-index:** `z-50`, always above Spline canvas

### Hero

**Layout:** `min-h-screen relative overflow-hidden bg-black`

**Background:** CSS dot-grid pattern via `background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`, `background-size: 32px 32px`

**Spline Robot:**
- Source: Spline community file — https://app.spline.design/community/file/67babb82-9cf8-4e62-9811-3c5a342578d6
- Editor link: https://my.spline.design/nexbotrobotcharacterconcept-qBCBPTsCSmcuOrmVTm0vsbbX/
- Embed URL: `https://prod.spline.design/qBCBPTsCSmcuOrmVTm0vsbbX/scene.splinecode`
- Component: `<Spline scene={SPLINE_SCENE_URL} />` from `@splinetool/react-spline`
- Position: `absolute right-0 top-0 w-[60%] h-full` on desktop; `w-full opacity-20` on mobile (robot visible as atmospheric background, text readable on top)
- `pointer-events-auto` — mouse interaction enabled
- **Hero z-index stack (bottom to top):** dot-grid bg (`z-0`) → Spline canvas (`z-10`) → text overlay (`z-20`) → scroll indicator (`z-30`) → Navbar (`z-50`)
- **Loading state:** while Spline loads, show a static PNG fallback image of the robot (`/images/robot-fallback.png` — export from Spline as PNG). Fade out fallback → fade in Spline on `onLoad` callback.
- **Error state:** if Spline fails to load after 8s, fallback image persists (no error message shown to user)

**Text overlay (desktop: bottom-left `absolute bottom-16 left-8 max-w-[500px]`; mobile: `relative text-center px-6 pt-24`):**

| Element | Content | Style |
|---------|---------|-------|
| Label | `MAGNATE KOREA` | Inter 500, 13px, `#00E5CC`, `tracking-[0.3em]` |
| H1 line 1 | `Insight Connects.` | Syne 800, 64px (desktop) / 40px (mobile), white |
| H1 line 2 | `We Build What Matters.` | Syne 800, 64px (desktop) / 40px (mobile), gradient `#00E5CC → #0099FF` |
| Subtitle EN | `Digital Transformation Consulting & Development` | Inter 400, 18px, `#888888` |
| Subtitle KO | `소통과 인사이트로 디지털 전환을 이끕니다` | Pretendard 400, 16px, `#666666` |
| CTA | `Get in Touch →` | See Navbar CTA style |

**Animation (Framer Motion):**
- Each text element: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
- Duration: `0.6s`, easing: `easeOut`
- Stagger: `0.15s` between each element (label → H1 line 1 → H1 line 2 → subtitle → CTA)

**Scroll indicator:** `absolute bottom-8 left-1/2 -translate-x-1/2` — animated bouncing chevron-down icon, `opacity-0` when `scrollY > 100`

### Services

**Anchor:** `id="services"`  
**Background:** `#0A0A0A`  
**Section heading:** `What We Do` — Syne 600, 40px, centered, white  
**Sub-heading:** `Transforming how businesses operate in the digital age` — Inter 400, 18px, `#888888`, centered

**Grid:** `grid grid-cols-1 md:grid-cols-3 gap-6 mt-16`

**Card anatomy:**
- Container: `bg-[#111111] border border-white/5 rounded-xl p-8`
- Hover: `border-[#00E5CC]/40 shadow-[0_0_24px_rgba(0,229,204,0.1)] scale-[1.02]` — transition 250ms
- Animation: `initial={{ opacity: 0, y: 30 }}` → in-view: `{ opacity: 1, y: 0 }`, duration 0.5s, stagger 0.1s per card

**Service cards content:**

| Card | Icon | Title | Description (EN) | Description (KO) |
|------|------|-------|-------------------|-------------------|
| 1 | `BarChart2` (Lucide) | Strategy Consulting | We align your digital ambitions with clear, actionable roadmaps tailored to your business context. | 비즈니스 목표에 맞는 디지털 전략 로드맵을 설계합니다. |
| 2 | `RefreshCw` (Lucide) | Digital Transformation | End-to-end modernization of your systems, workflows, and customer experiences. | 시스템과 프로세스의 전방위적 디지털 전환을 지원합니다. |
| 3 | `Code2` (Lucide) | Custom Development | Web and app solutions engineered precisely for your requirements — no templates, no shortcuts. | 요구사항에 맞게 설계된 웹·앱 솔루션을 제공합니다. |

Icon style: Lucide icon, 32px, `#00E5CC`

### About

**Anchor:** `id="about"`  
**Background:** `#000000`  
**Layout:** `grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`

**Left — Statistics:**

| Stat | Value | Label (EN) | Label (KO) |
|------|-------|------------|------------|
| Projects | `50+` | Projects Delivered | 프로젝트 완료 |
| Experience | `3+` | Years of Experience | 운영 연수 |
| Clients | `20+` | Global Clients | 글로벌 클라이언트 |

- Numbers: Syne 800, 64px, `#00E5CC`
- Labels EN: Inter 500, 14px, `#888888`
- Labels KO: Pretendard 400, 13px, `#666666`
- Count-up animation: triggered when section enters viewport (`useInView` with `once: true`), duration 1.5s, easing `easeOut`
- Stats displayed in a 3-column sub-grid with dividers

**Right — Narrative:**
- Section label: `ABOUT US` — Inter 500, 12px, `#00E5CC`, letter-spacing wide
- Heading: `We Think in Systems. We Build for Humans.` — Syne 600, 32px, white
- Body EN: `Magnate Korea partners with ambitious businesses to navigate digital complexity. We combine strategic insight with technical execution to deliver transformations that last.`
- Body KO: `마그네이트코리아는 소통과 인사이트를 바탕으로 클라이언트의 디지털 전환을 이끕니다. 전략적 사고와 기술 실행력을 결합해 지속 가능한 변화를 만들어 냅니다.`
- Font: EN → Inter 400, 16px, `#888888`; KO → Pretendard 400, 16px, `#666666`
- Line height: `1.75`

### Contact

**Anchor:** `id="contact"`  
**Background:** `#0A0A0A`  
**Section heading:** `Let's Work Together` — Syne 600, 40px, centered, white  
**Sub-heading:** `Tell us about your project` — Inter 400, 18px, `#888888`, centered

**Form layout:** `max-w-xl mx-auto mt-12 flex flex-col gap-6`

| Field | Type | Placeholder | Validation |
|-------|------|-------------|------------|
| Name | text | `Your Name` | Required, min 2 chars |
| Email | email | `your@email.com` | Required, valid email format |
| Message | textarea (6 rows) | `Tell us about your project...` | Required, min 20 chars |

**Field style:** `bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00E5CC]` — transition 200ms

**Validation error state:** red border `border-red-500/60` + error message below field in `text-red-400 text-sm`

**Submit button:** `w-full bg-[#00E5CC] text-black font-semibold py-4 rounded-lg` → hover: `bg-[#00ccb4]` — disabled + spinner while submitting

**Submission states:**
- Idle → Submitting (button shows spinner, disabled) → Success (`Thank you! We'll be in touch.` — green text, form cleared) → Error (`Something went wrong. Please email us directly at hello@magnatekorea.com` — red text)

**Backend:** EmailJS — `emailjs.send(serviceId, templateId, formData)`. Keys stored in `.env.local` as `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`. Fallback `mailto:hello@magnatekorea.com` shown on error.  
**Staging behavior:** if EmailJS env vars are not set, the submit button is disabled and shows `"Contact form coming soon"` tooltip — form is never broken/silently failing.

### Footer

**Background:** `#000000`, `border-t border-white/10`, `py-12`

**Layout:** `grid grid-cols-1 md:grid-cols-3 gap-8 items-center`

| Column | Content |
|--------|---------|
| Left | `MAGNATE KOREA` wordmark (Syne 700, white) + `Insight Connects. We Build What Matters.` (Inter 400, 14px, `#888888`) |
| Center | Nav links: Services / About / Contact (smooth scroll) — Inter 400, 14px, `#888888`, hover `#00E5CC` |
| Right | Social icons: LinkedIn (`https://linkedin.com/company/magnatekorea` — placeholder) + GitHub (`https://github.com/magnatekorea` — placeholder), 20px, `#888888` hover white |

**Bottom row:** `border-t border-white/5 mt-8 pt-6 text-center` — `© 2026 Magnate Korea. All rights reserved.` — Inter 400, 13px, `#555555`

---

## Animations Summary

| Element | Initial | Animate | Duration | Easing | Trigger |
|---------|---------|---------|----------|--------|---------|
| Hero label | `opacity:0, y:20` | `opacity:1, y:0` | 0.6s | easeOut | mount |
| Hero H1 line 1 | `opacity:0, y:20` | `opacity:1, y:0` | 0.6s | easeOut | mount +0.15s |
| Hero H1 line 2 | `opacity:0, y:20` | `opacity:1, y:0` | 0.6s | easeOut | mount +0.30s |
| Hero subtitle | `opacity:0, y:20` | `opacity:1, y:0` | 0.6s | easeOut | mount +0.45s |
| Hero CTA | `opacity:0, y:20` | `opacity:1, y:0` | 0.6s | easeOut | mount +0.60s |
| Service cards | `opacity:0, y:30` | `opacity:1, y:0` | 0.5s | easeOut | scroll in view, stagger 0.1s |
| About stats | count 0 → value | — | 1.5s | easeOut | scroll in view, once |
| About text block | `opacity:0, x:-20` | `opacity:1, x:0` | 0.6s | easeOut | scroll in view |
| Spline canvas | `opacity:0` | `opacity:1` | 0.8s | easeIn | onLoad callback |
| Navbar bg | transparent | blur+border | 300ms | ease | scroll > 80px |

---

## Responsive Behavior

| Breakpoint | Navbar | Hero | Services | About |
|------------|--------|------|----------|-------|
| Mobile <768px | hamburger drawer | robot `opacity-20` background, text centered full-width | 1 column | stacked, stats row |
| Tablet 768–1024px | full nav | robot ~50% width | 2 columns | side by side |
| Desktop >1024px | full nav | robot 60% right | 3 columns | 2-column split |

---

## Metadata & SEO

| Tag | Value |
|-----|-------|
| `<title>` | `Magnate Korea — Digital Transformation Consulting` |
| `description` | `Magnate Korea partners with businesses to navigate digital transformation. Strategy consulting and custom development. Insight Connects. We Build What Matters.` |
| OG image | `/og-image.png` — 1200×630px, dark background, logo + slogan |
| Favicon | `/favicon.ico` + `/icon.png` (32×32 cyan "M" on black) |
| `lang` | `en` (primary) |

---

## File Structure

```
D:/project/MAGNATE_HOME/
├── public/
│   ├── favicon.ico
│   ├── icon.png
│   ├── og-image.png
│   ├── fonts/
│   │   └── Pretendard-*.woff2     # self-hosted Korean font
│   └── images/
│       └── robot-fallback.png     # static PNG export from Spline (1200×900px)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── lib/
│       └── constants.ts
├── .env.local          # EmailJS keys (not committed)
├── .env.example        # Key names only
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Out of Scope (v1)

- Portfolio / case studies section
- Team introduction section
- CMS integration
- i18n routing (Korean/English language switcher)
- Blog
- Analytics integration

---

## Open Items (to confirm with client)

- [x] Spline scene URL confirmed: `https://prod.spline.design/qBCBPTsCSmcuOrmVTm0vsbbX/scene.splinecode`
- [ ] EmailJS account credentials (serviceId, templateId, publicKey)
- [ ] Real LinkedIn / GitHub profile URLs
- [ ] Final stat numbers (projects, years, clients)
- [ ] Contact email address (`hello@magnatekorea.com` used as placeholder)
- [ ] Domain / hosting preference
