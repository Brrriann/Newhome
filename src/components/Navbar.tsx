'use client'

import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/lib/constants'
import { Menu, X } from 'lucide-react'
import MagneticButton from '@/components/MagneticButton'

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
          <MagneticButton
            href="#contact"
            strength={10}
            className="inline-block text-sm border border-accent text-accent px-4 py-2 rounded hover:bg-accent hover:text-black transition-colors duration-200"
          >
            Get in Touch →
          </MagneticButton>
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
