'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Glowing cyan cursor with a trailing ring.
 * - Desktop / fine-pointer only (hidden on touch).
 * - Ring lags the dot via spring physics for a fluid feel.
 * - Grows when hovering interactive elements (a, button, [data-cursor]).
 * - Respects prefers-reduced-motion (renders nothing).
 */
export default function CustomCursor() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  // Hidden while the pointer is over an iframe (e.g. the Spline scene), where
  // the parent document stops receiving mousemove and the dot would freeze.
  const [visible, setVisible] = useState(true)

  // Raw pointer position
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Springy ring follows the dot
  const ringX = useSpring(x, { stiffness: 250, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 250, damping: 28, mass: 0.6 })

  const rafRef = useRef<number | null>(null)
  const latest = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Only enable for fine pointers (mouse), and not under reduced motion
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || reduceMotion) {
      setEnabled(false)
      return
    }
    setEnabled(true)

    const move = (e: MouseEvent) => {
      // Always keep the newest coords; RAF reads them so we never lag behind.
      latest.current = { x: e.clientX, y: e.clientY }
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        x.set(latest.current.x)
        y.set(latest.current.y)
        rafRef.current = null
      })
    }

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      setHovering(!!target?.closest('a, button, [data-cursor]'))
    }

    // The pointer entering an iframe (e.g. the Spline robot) stops mousemove
    // from reaching this page, freezing the dot. Hide it whenever the pointer
    // leaves the page area (mouseleave on <html>) or focus moves to the iframe
    // (window blur). Show it again when the pointer re-enters or moves here.
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
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [reduceMotion, x, y])

  if (!enabled) return null

  return (
    <>
      {/* Outer ring (springy, lags behind) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full border border-accent/60"
          animate={{
            width: hovering ? 56 : 36,
            height: hovering ? 56 : 36,
            opacity: hovering ? 0.9 : 0.5,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{ translateX: '-50%', translateY: '-50%' }}
        />
      </motion.div>

      {/* Inner dot (tracks pointer 1:1) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
        style={{ x, y, opacity: visible ? 1 : 0 }}
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
