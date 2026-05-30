# Magnate Korea Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark, futuristic agency homepage for Magnate Korea with a Spline 3D robot hero, animated sections, and a working contact form.

**Architecture:** Single Next.js 14 App Router page assembling six standalone components (Navbar, Hero, Services, About, Contact, Footer). Each component owns its own animations via Framer Motion. Shared design tokens live in `lib/constants.ts`. No external data fetching in v1 — all content is static.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, @splinetool/react-spline, EmailJS, Lucide React, Vercel

> **Note:** Next.js 16.2.6 was installed (latest, vs. plan's Next.js 14 target). Tailwind CSS v4 is included. All CSS in this plan uses Tailwind v4 syntax. The App Router patterns are identical.

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/app/layout.tsx` | Root layout, font loading (Syne, Inter, Pretendard), metadata |
| `src/app/page.tsx` | Page shell — assembles all section components |
| `src/app/globals.css` | Tailwind directives, dot-grid bg, custom scrollbar |
| `src/lib/constants.ts` | All static content: nav links, services data, about stats, social links |
| `src/components/Navbar.tsx` | Transparent → blur navbar, smooth scroll, mobile drawer |
| `src/components/Hero.tsx` | Spline embed, text overlay, staggered entrance animation |
| `src/components/Services.tsx` | 3-column card grid with hover glow and scroll reveal |
| `src/components/About.tsx` | Stats count-up + company narrative, scroll-triggered |
| `src/components/Contact.tsx` | Validated form, EmailJS submission, all states |
| `src/components/Footer.tsx` | Wordmark, nav links, social icons, copyright |
| `src/components/SplineScene.tsx` | Spline loader wrapper with PNG fallback and error handling |
| `public/images/robot-fallback.png` | Static fallback PNG (manual export from Spline) |
| `public/fonts/Pretendard-*.woff2` | Self-hosted Korean font files |
| `.env.local` | EmailJS keys (never committed) |
| `.env.example` | Key names only |

---

## Task 1: Project Scaffolding

**Files:**
- Create: all project root files

- [ ] **Step 1: Bootstrap Next.js project**

```bash
cd D:/project/MAGNATE_HOME
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

When prompted, accept defaults. This creates `src/app/`, `tailwind.config.ts`, `tsconfig.json`, `next.config.ts`.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion @splinetool/react-spline lucide-react @emailjs/browser
```

- [ ] **Step 3: Create `.env.example`**

```bash
# .env.example
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Create `.env.local` with the same keys (values empty for now — form will show "coming soon" state until filled).

- [ ] **Step 4: Add `.superpowers/` and `.env.local` to `.gitignore`**

Open `.gitignore` and add:
```
.env.local
.superpowers/
```

- [ ] **Step 5: Commit scaffold**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 14 project with dependencies"
```

---

## Task 2: Design Tokens & Constants

**Files:**
- Create: `src/lib/constants.ts`

- [ ] **Step 1: Write constants file**

```typescript
// src/lib/constants.ts

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const SERVICES = [
  {
    id: 'strategy',
    icon: 'BarChart2',
    titleEn: 'Strategy Consulting',
    titleKo: '전략 컨설팅',
    descEn: 'We align your digital ambitions with clear, actionable roadmaps tailored to your business context.',
    descKo: '비즈니스 목표에 맞는 디지털 전략 로드맵을 설계합니다.',
  },
  {
    id: 'transformation',
    icon: 'RefreshCw',
    titleEn: 'Digital Transformation',
    titleKo: '디지털 전환',
    descEn: 'End-to-end modernization of your systems, workflows, and customer experiences.',
    descKo: '시스템과 프로세스의 전방위적 디지털 전환을 지원합니다.',
  },
  {
    id: 'development',
    icon: 'Code2',
    titleEn: 'Custom Development',
    titleKo: '맞춤 개발',
    descEn: 'Web and app solutions engineered precisely for your requirements — no templates, no shortcuts.',
    descKo: '요구사항에 맞게 설계된 웹·앱 솔루션을 제공합니다.',
  },
] as const;

export const ABOUT_STATS = [
  { value: 50, suffix: '+', labelEn: 'Projects Delivered', labelKo: '프로젝트 완료' },
  { value: 3,  suffix: '+', labelEn: 'Years of Experience', labelKo: '운영 연수' },
  { value: 20, suffix: '+', labelEn: 'Global Clients', labelKo: '글로벌 클라이언트' },
] as const;

export const SOCIAL_LINKS = [
  { platform: 'LinkedIn', href: 'https://linkedin.com/company/magnatekorea', label: 'LinkedIn' },
  { platform: 'GitHub',   href: 'https://github.com/magnatekorea', label: 'GitHub' },
] as const;

export const CONTACT_EMAIL = 'hello@magnatekorea.com';

export const SPLINE_SCENE_URL = 'https://prod.spline.design/qBCBPTsCSmcuOrmVTm0vsbbX/scene.splinecode';

```

- [ ] **Step 2: Commit**

```bash
git add src/lib/constants.ts .env.example
git commit -m "feat: add design constants and content data"
```

---

## Task 3: Global Styles & Layout

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Tailwind v4 does not use `tailwind.config.ts` — all config is in `globals.css` via `@theme`. Skip this step.**

- [ ] **Step 2: Verify Tailwind v4 is set up**

In Tailwind v4, there is no `tailwind.config.ts`. Open `src/app/globals.css` and verify it starts with `@import "tailwindcss"` — this was generated by create-next-app. Do NOT create a `tailwind.config.ts`.

- [ ] **Step 3: Update `globals.css`**

Replace the entire file content with:

```css
@import "tailwindcss";

@theme {
  --color-accent: #00E5CC;
  --font-syne: 'Syne', system-ui, sans-serif;
  --font-inter: 'Inter', system-ui, sans-serif;
  --font-pretendard: 'Pretendard', system-ui, sans-serif;
  --max-width-container: 1280px;
}

@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: #000000;
    color: #ffffff;
  }
  .dot-grid {
    background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px);
    background-size: 32px 32px;
  }
}

@utility container-app {
  max-width: var(--max-width-container);
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

@utility section-padding {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

@media (min-width: 1024px) {
  .container-app {
    padding-left: 3rem;
    padding-right: 3rem;
  }
  .section-padding {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
}
```

> **Tailwind v4 note:** Custom utilities use `@utility` instead of `@layer utilities { ... }`. Colors, fonts, and spacing are defined in `@theme { ... }` as CSS custom properties. Class names like `text-accent`, `font-syne`, `font-inter`, `font-pretendard` are generated automatically from `@theme` variables and work identically in component code.

- [ ] **Step 4: Download Pretendard font files**

Download woff2 files from https://github.com/orioncactus/pretendard/releases (latest release → `Pretendard-1.x.x.zip` → extract `woff2/` folder).

Copy these three files to `public/fonts/`:
- `Pretendard-Regular.woff2`
- `Pretendard-SemiBold.woff2`
- `Pretendard-Bold.woff2`

- [ ] **Step 5: Update `src/app/layout.tsx`**

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Magnate Korea — Digital Transformation Consulting',
  description:
    'Magnate Korea partners with businesses to navigate digital transformation. Strategy consulting and custom development. Insight Connects. We Build What Matters.',
  openGraph: {
    title: 'Magnate Korea',
    description: 'Insight Connects. We Build What Matters.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 6: Simplify `src/app/page.tsx` to a placeholder**

```typescript
// src/app/page.tsx
export default function Home() {
  return <main>Magnate Korea</main>
}
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```

Open http://localhost:3000. Expected: plain white page with "Magnate Korea" text. No errors in terminal.

- [ ] **Step 8: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: global styles, fonts, and layout shell"
```

---

## Task 4: Navbar Component

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create Navbar**

```typescript
// src/components/Navbar.tsx
'use client'

import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/lib/constants'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass =
    'text-sm text-[#888888] hover:text-white transition-colors duration-200'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-black/60 border-b border-white/10' : ''
      }`}
    >
      <div className="container-app flex items-center justify-between h-16">
        {/* Wordmark */}
        <span className="font-syne font-bold text-white text-base tracking-wide">
          MAGNATE KOREA
        </span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm border border-accent text-accent px-4 py-2 rounded hover:bg-accent hover:text-black transition-all duration-200"
          >
            Get in Touch →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-black z-40 flex flex-col items-center justify-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-2xl text-white hover:text-accent transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-xl border border-accent text-accent px-6 py-3 rounded hover:bg-accent hover:text-black transition-all"
            onClick={() => setOpen(false)}
          >
            Get in Touch →
          </a>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Add Navbar to page**

```typescript
// src/app/page.tsx
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div style={{ height: '200vh' }} />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev`. Open http://localhost:3000. Check:
- Navbar is transparent at top
- On scroll, background blurs and border appears
- Mobile: hamburger opens/closes drawer
- No TypeScript errors in terminal

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/app/page.tsx
git commit -m "feat: Navbar with scroll blur and mobile drawer"
```

---

## Task 5: Spline Scene Wrapper

**Files:**
- Create: `src/components/SplineScene.tsx`

- [ ] **Step 1: Prepare fallback image**

Export a screenshot/PNG from the Spline editor (File → Export → Image) and save as `public/images/robot-fallback.png`. Minimum size: 800×900px. If not available yet, create a placeholder: a plain dark PNG at that size.

- [ ] **Step 2: Create SplineScene component**

```typescript
// src/components/SplineScene.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { SPLINE_SCENE_URL } from '@/lib/constants'

interface Props {
  className?: string
}

export default function SplineScene({ className = '' }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // useRef to avoid stale closure in the timeout callback
  const loadedRef = useRef(false)

  // Dynamic import to avoid SSR issues with Spline
  const [SplineComponent, setSplineComponent] = useState<React.ComponentType<{
    scene: string
    onLoad?: () => void
    className?: string
  }> | null>(null)

  useEffect(() => {
    import('@splinetool/react-spline').then((mod) => {
      setSplineComponent(() => mod.default)
    })

    // 8-second timeout — check ref (not state) to avoid stale closure
    timerRef.current = setTimeout(() => {
      if (!loadedRef.current) setError(true)
    }, 8000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleLoad = () => {
    loadedRef.current = true
    setLoaded(true)
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Fallback PNG — shown until Spline loads or on error */}
      <Image
        src="/images/robot-fallback.png"
        alt="Magnate Korea — NEXBOT"
        fill
        className={`object-contain transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
        priority
      />

      {/* Spline scene */}
      {SplineComponent && !error && (
        <SplineComponent
          scene={SPLINE_SCENE_URL}
          onLoad={handleLoad}
          className={`w-full h-full transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/SplineScene.tsx public/images/robot-fallback.png
git commit -m "feat: SplineScene wrapper with PNG fallback and 8s timeout"
```

---

## Task 6: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create Hero component**

```typescript
// src/components/Hero.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SplineScene from '@/components/SplineScene'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
})

export default function Hero() {
  const [showScroll, setShowScroll] = useState(true)

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY <= 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-black dot-grid">
      {/* Spline Robot — desktop: right 60%, mobile: full width low opacity */}
      <div className="absolute inset-0 md:left-[40%] z-10 opacity-20 md:opacity-100">
        <SplineScene className="w-full h-full" />
      </div>

      {/* Text overlay */}
      <div className="relative z-20 flex flex-col justify-end min-h-screen pb-20 md:pb-16">
        <div className="container-app">
          <div className="max-w-[520px] text-center md:text-left">

            <motion.p
              {...fadeUp(0)}
              className="font-inter font-medium text-accent text-[13px] tracking-[0.3em] mb-4"
            >
              MAGNATE KOREA
            </motion.p>

            <motion.h1 {...fadeUp(0.15)} className="font-syne font-extrabold text-white leading-tight mb-2"
              style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}
            >
              Insight Connects.
            </motion.h1>

            <motion.h1
              {...fadeUp(0.3)}
              className="font-syne font-extrabold leading-tight mb-6"
              style={{
                fontSize: 'clamp(36px, 6vw, 64px)',
                background: 'linear-gradient(90deg, #00E5CC, #3D8BFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              We Build What Matters.
            </motion.h1>

            <motion.p
              {...fadeUp(0.45)}
              className="font-inter text-[#888888] text-lg mb-2"
            >
              Digital Transformation Consulting & Development
            </motion.p>

            <motion.p
              {...fadeUp(0.45)}
              className="font-pretendard text-[#666666] text-base mb-8"
            >
              소통과 인사이트로 디지털 전환을 이끕니다
            </motion.p>

            <motion.div {...fadeUp(0.6)}>
              <a
                href="#contact"
                className="inline-block border border-accent text-accent px-6 py-3 rounded text-sm font-medium hover:bg-accent hover:text-black transition-all duration-200"
              >
                Get in Touch →
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        animate={{ opacity: showScroll ? 1 : 0, y: showScroll ? 0 : 8 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-[#555555]" size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Add Hero to page**

```typescript
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Open http://localhost:3000. Check:
- Full-height black hero with dot grid
- Robot (fallback PNG) visible on right
- Text animates in from bottom
- Gradient on "We Build What Matters."
- Scroll chevron visible, fades on scroll
- Mobile: robot is dim background, text readable

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/app/page.tsx
git commit -m "feat: Hero section with Spline robot and staggered animations"
```

---

## Task 7: Services Section

**Files:**
- Create: `src/components/Services.tsx`

- [ ] **Step 1: Create Services component**

```typescript
// src/components/Services.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { BarChart2, RefreshCw, Code2, LucideIcon } from 'lucide-react'
import { SERVICES } from '@/lib/constants'

const ICONS: Record<string, LucideIcon> = {
  BarChart2,
  RefreshCw,
  Code2,
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = ICONS[service.icon]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      className="group bg-[#111111] border border-white/5 rounded-xl p-8 hover:border-accent/40 hover:shadow-[0_0_24px_rgba(0,229,204,0.1)] hover:scale-[1.02] transition-all duration-250"
    >
      <Icon className="text-accent mb-5" size={32} />
      <h3 className="font-syne font-semibold text-white text-xl mb-1">
        {service.titleEn}
      </h3>
      <p className="font-pretendard text-[#666666] text-sm mb-3">
        {service.titleKo}
      </p>
      <p className="font-inter text-[#888888] text-sm leading-relaxed mb-2">
        {service.descEn}
      </p>
      <p className="font-pretendard text-[#555555] text-sm leading-relaxed">
        {service.descKo}
      </p>
    </motion.div>
  )
}

export default function Services() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true })

  return (
    <section id="services" className="bg-[#0A0A0A] section-padding">
      <div className="container-app">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-syne font-semibold text-white text-4xl md:text-5xl mb-4">
            What We Do
          </h2>
          <p className="font-inter text-[#888888] text-lg">
            Transforming how businesses operate in the digital age
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Services to page**

```typescript
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Scroll down past hero. Check:
- 3 cards appear with staggered fade-up on scroll
- Hover: glow border + subtle scale
- Icons render in cyan-teal
- Bilingual text visible

- [ ] **Step 4: Commit**

```bash
git add src/components/Services.tsx src/app/page.tsx
git commit -m "feat: Services section with scroll-reveal cards and hover glow"
```

---

## Task 8: About Section

**Files:**
- Create: `src/components/About.tsx`

- [ ] **Step 1: Create About component**

```typescript
// src/components/About.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ABOUT_STATS } from '@/lib/constants'

function useCountUp(target: number, duration = 1500, active = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])

  return count
}

function StatItem({ stat, active }: { stat: (typeof ABOUT_STATS)[number]; active: boolean }) {
  const count = useCountUp(stat.value, 1500, active)
  return (
    <div className="text-center lg:text-left">
      <div className="font-syne font-extrabold text-accent" style={{ fontSize: 'clamp(48px, 5vw, 72px)' }}>
        {count}{stat.suffix}
      </div>
      <div className="font-inter text-[#888888] text-sm mt-1">{stat.labelEn}</div>
      <div className="font-pretendard text-[#666666] text-xs mt-0.5">{stat.labelKo}</div>
    </div>
  )
}

export default function About() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' })
  const textRef = useRef(null)
  const textInView = useInView(textRef, { once: true, margin: '-100px' })

  return (
    <section id="about" className="bg-black section-padding">
      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-3 gap-8">
            {ABOUT_STATS.map((stat) => (
              <StatItem key={stat.labelEn} stat={stat} active={statsInView} />
            ))}
          </div>

          {/* Narrative */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: -20 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="font-inter font-medium text-accent text-xs tracking-[0.3em] mb-4">
              ABOUT US
            </p>
            <h2 className="font-syne font-semibold text-white text-3xl md:text-4xl leading-tight mb-6">
              We Think in Systems.<br />We Build for Humans.
            </h2>
            <p className="font-inter text-[#888888] text-base leading-[1.75] mb-4">
              Magnate Korea partners with ambitious businesses to navigate digital complexity. We combine strategic insight with technical execution to deliver transformations that last.
            </p>
            <p className="font-pretendard text-[#666666] text-base leading-[1.75]">
              마그네이트코리아는 소통과 인사이트를 바탕으로 클라이언트의 디지털 전환을 이끕니다. 전략적 사고와 기술 실행력을 결합해 지속 가능한 변화를 만들어 냅니다.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add About to page**

```typescript
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Scroll to About section. Check:
- Numbers count up from 0 once section enters view
- Text block slides in from left
- Stats, EN narrative, and KO narrative all visible

- [ ] **Step 4: Commit**

```bash
git add src/components/About.tsx src/app/page.tsx
git commit -m "feat: About section with count-up stats and bilingual narrative"
```

---

## Task 9: Contact Section

**Files:**
- Create: `src/components/Contact.tsx`

- [ ] **Step 1: Create Contact component**

```typescript
// src/components/Contact.tsx
'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import { CONTACT_EMAIL } from '@/lib/constants'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

type FormData = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<FormData>

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name || data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters'
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address'
  if (!data.message || data.message.trim().length < 20) errors.message = 'Message must be at least 20 characters'
  return errors
}

const emailjsConfigured =
  !!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
  !!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
  !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [state, setState] = useState<FormState>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setState('submitting')
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { from_name: form.name, from_email: form.email, message: form.message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      setState('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setState('error')
    }
  }

  const fieldClass = (field: keyof FormErrors) =>
    `w-full bg-black border rounded-lg px-4 py-3 text-white placeholder-[#555555] focus:outline-none transition-colors duration-200 ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-500'
        : 'border-white/10 focus:border-accent'
    }`

  return (
    <section id="contact" className="bg-[#0A0A0A] section-padding">
      <div className="container-app">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-syne font-semibold text-white text-4xl md:text-5xl mb-4">
            Let's Work Together
          </h2>
          <p className="font-inter text-[#888888] text-lg">Tell us about your project</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-6" noValidate>

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className={fieldClass('name')}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className={fieldClass('email')}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              placeholder="Tell us about your project..."
              rows={6}
              value={form.message}
              onChange={handleChange}
              className={fieldClass('message')}
            />
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Submit */}
          {!emailjsConfigured ? (
            <button
              type="button"
              disabled
              title="Contact form coming soon"
              className="w-full bg-[#333] text-[#666] font-semibold py-4 rounded-lg cursor-not-allowed text-sm"
            >
              Contact Form Coming Soon
            </button>
          ) : (
            <button
              type="submit"
              disabled={state === 'submitting'}
              className="w-full bg-accent text-black font-semibold py-4 rounded-lg hover:bg-[#00ccb4] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {state === 'submitting' ? (
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" />
              ) : (
                'Send Message'
              )}
            </button>
          )}

          {/* Status messages */}
          {state === 'success' && (
            <p className="text-green-400 text-center text-sm">
              Thank you! We'll be in touch.
            </p>
          )}
          {state === 'error' && (
            <p className="text-red-400 text-center text-sm">
              Something went wrong. Please email us directly at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-white">
                {CONTACT_EMAIL}
              </a>
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Contact to page**

```typescript
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Scroll to Contact. Check:
- Without EmailJS keys: button shows "Contact Form Coming Soon" (disabled)
- With keys: form is active, validates on submit
- Submit with empty fields: red validation errors appear inline
- TypeScript: no errors in terminal

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.tsx src/app/page.tsx
git commit -m "feat: Contact form with validation, EmailJS, and all submission states"
```

---

## Task 10: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create Footer**

```typescript
// src/components/Footer.tsx
import { Linkedin, Github } from 'lucide-react'
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants'

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  LinkedIn: Linkedin,
  GitHub: Github,
}

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Wordmark + slogan */}
          <div>
            <span className="font-syne font-bold text-white text-base tracking-wide block mb-2">
              MAGNATE KOREA
            </span>
            <p className="font-inter text-[#888888] text-sm">
              Insight Connects. We Build What Matters.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-2 md:items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-inter text-[#888888] text-sm hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex gap-4 md:justify-end">
            {SOCIAL_LINKS.map((social) => {
              const Icon = SOCIAL_ICONS[social.platform]
              return Icon ? (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-[#888888] hover:text-white transition-colors"
                >
                  <Icon size={20} />
                </a>
              ) : null
            })}
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 mt-8 pt-6 text-center">
          <p className="font-inter text-[#555555] text-xs">
            © 2026 Magnate Korea. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Assemble final page**

```typescript
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Verify full page in browser**

Scroll through entire page:
- All sections render with correct styles
- Navbar, Hero, Services, About, Contact, Footer all present
- No hydration errors in browser console
- No TypeScript errors in terminal

- [ ] **Step 4: Run production build to catch any issues**

```bash
npm run build
```

Expected: successful build with no errors. Warnings about image optimization are acceptable.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx src/app/page.tsx
git commit -m "feat: Footer and complete page assembly"
```

---

## Task 11: Static Assets & OG Image

**Files:**
- Create: `public/og-image.png`
- Create: `src/app/favicon.ico`
- Create: `public/icon.png`

- [ ] **Step 1: Create OG image**

Create a 1200×630px image with:
- Black background (`#000000`)
- `MAGNATE KOREA` text in white, centered, large
- `Insight Connects. We Build What Matters.` in `#00E5CC` below
- Save as `public/og-image.png`

Use any image editor (Figma, Canva, GIMP). A placeholder black PNG is acceptable for now.

- [ ] **Step 2: Create favicon**

Create a 32×32px icon: cyan `#00E5CC` letter "M" on black background.
Save as `src/app/favicon.ico` (Next.js App Router detects the favicon from `src/app/favicon.ico`, not `public/`) and also save as `public/icon.png`.

- [ ] **Step 3: Commit**

```bash
git add public/og-image.png src/app/favicon.ico public/icon.png
git commit -m "feat: add OG image and favicon assets"
```

---

## Task 12: Deploy to Vercel

- [ ] **Step 1: Push to GitHub**

Create a new GitHub repository (e.g., `magnate-korea-web`) and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/magnate-korea-web.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Deploy on Vercel**

1. Go to https://vercel.com and sign in
2. Click "Add New Project" → Import from GitHub
3. Select `magnate-korea-web` repository
4. Framework preset: Next.js (auto-detected)
5. In "Environment Variables", add:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   (leave values empty for now if not yet configured)
6. Click "Deploy"

- [ ] **Step 3: Verify live deployment**

Open the Vercel preview URL. Check all sections render correctly on the live deployment.

- [ ] **Step 4: Configure Spline scene URL**

Once you have the actual Spline export URL:
1. Update `SPLINE_SCENE_URL` in `src/lib/constants.ts`
2. Commit and push — Vercel auto-deploys

---

## Open Items Checklist (Before Go-Live)

- [ ] Obtain Spline export URL (Spline editor → Share → Embed → copy scene URL) and update `SPLINE_SCENE_URL` in `constants.ts`
- [ ] Export robot PNG from Spline → `public/images/robot-fallback.png`
- [ ] Set up EmailJS account, create service + template, fill in `.env.local` keys
- [ ] Update real LinkedIn + GitHub URLs in `constants.ts`
- [ ] Confirm stat numbers (50+ projects, 3+ years, 20+ clients) in `constants.ts`
- [ ] Confirm contact email (`hello@magnatekorea.com`) in `constants.ts`
- [ ] Add Pretendard woff2 files to `public/fonts/`
- [ ] Create final OG image and favicon in brand style
- [ ] Connect custom domain in Vercel dashboard
