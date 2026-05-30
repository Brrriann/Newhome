'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Glowing cyan cursor with a reticle ring.
 * - Desktop / fine-pointer only (hidden on touch).
 * - Tracks the pointer tightly (no visible trailing) so it never appears to
 *   lag or drift during scroll.
 * - Grows when hovering interactive elements (a, button, [data-cursor]).
 * - Hidden while the pointer is over an iframe (Spline robot) or off-page.
 * - Respects prefers-reduced-motion (renders nothing).
 */
export default function CustomCursor() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Very snappy spring — settles within ~1 frame, so no perceptible trail.
  const springCfg = { stiffness: 1200, damping: 50, mass: 0.25 }
  const dotX = useSpring(x, springCfg)
  const dotY = useSpring(y, springCfg)
  // Ring follows just a touch looser for a subtle reticle feel.
  const ringX = useSpring(x, { stiffness: 700, damping: 40, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 700, damping: 40, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || reduceMotion) {
      setEnabled(false)
      return
    }
    setEnabled(true)

    const move = (e: MouseEvent) => {
      // clientX/clientY are viewport-relative — correct for position: fixed.
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      setHovering(!!target?.closest('a, button, [data-cursor]'))
    }

    // Hide when the pointer enters an iframe (parent stops getting mousemove)
    // or leaves the window; show again on re-entry.
    const root = document.documentElement
    const hide = () => setVisible(false)
    const show = () => setVisible(true)

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    root.addEventListener('mouseleave', hide)
    root.addEventListener('mouseenter', show)
    window.addEventListener('blur', hide)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      root.removeEventListener('mouseleave', hide)
      root.removeEventListener('mouseenter', show)
      window.removeEventListener('blur', hide)
    }
  }, [reduceMotion, x, y])

  if (!enabled) return null

  return (
    <>
      {/* Reticle ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full border border-accent/60"
          animate={{
            width: hovering ? 52 : 34,
            height: hovering ? 52 : 34,
            opacity: hovering ? 0.9 : 0.5,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          style={{ translateX: '-50%', translateY: '-50%' }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full bg-accent shadow-[0_0_12px_rgba(0,229,204,0.8)]"
          animate={{ width: hovering ? 6 : 8, height: hovering ? 6 : 8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{ translateX: '-50%', translateY: '-50%' }}
        />
      </motion.div>
    </>
  )
}
