'use client'

import { useState, useEffect, useRef } from 'react'
import { SPLINE_VIEWER_URL } from '@/lib/constants'

interface Props {
  className?: string
}

/**
 * Embeds a published Spline scene via iframe (the my.spline.design viewer link).
 * - A solid black cover sits over the iframe during load and fades out once the
 *   scene is ready, so the viewer's green loading background never shows through.
 * - The cover becomes pointer-events-none after the reveal so the robot can
 *   track the cursor.
 * - Failsafe reveal at 12s in case onLoad never fires.
 */
export default function SplineScene({ className = '' }: Props) {
  const [revealed, setRevealed] = useState(false)
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Reveal no matter what after 12s (slow connections / missed onLoad).
    failsafe.current = setTimeout(() => setRevealed(true), 12000)
    return () => {
      if (revealTimer.current) clearTimeout(revealTimer.current)
      if (failsafe.current) clearTimeout(failsafe.current)
    }
  }, [])

  const handleLoad = () => {
    // onLoad fires when the page loads, but the 3D scene needs a moment more to
    // paint past its green background — wait briefly, then fade the cover out.
    if (revealTimer.current) clearTimeout(revealTimer.current)
    revealTimer.current = setTimeout(() => setRevealed(true), 1400)
  }

  return (
    <div className={`relative bg-black ${className}`}>
      {/* Spline iframe */}
      <iframe
        src={SPLINE_VIEWER_URL}
        title="Magnate Korea 3D scene"
        onLoad={handleLoad}
        style={{ background: '#000' }}
        className="absolute inset-0 w-full h-full border-0"
        allow="autoplay; fullscreen"
      />

      {/* Black reveal cover — hides the green loading state, fades out when ready */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
          revealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Cover the "Built with Spline" badge (bottom-right of the iframe). */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-14 w-44 bg-black" />
    </div>
  )
}
